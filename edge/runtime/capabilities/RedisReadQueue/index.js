'use strict';
const redis = require('../../utils/redisUtils').redisConnection;
const _ = require('lodash');

const ACTIONS = {
  GET_PAGINATED_USER_QUEUE_MESSAGES: 'getPaginatedUserQueueMessages',
};

// validation
let validate = function(input) {
  let {
    userId,
    ipAddress,
    dataKey,
    multiKeys,
    agentGuardKeys,
    pattern,
    action,
  } = input;
  if (
    _.isEmpty(userId) &&
    _.isEmpty(ipAddress) &&
    _.isEmpty(dataKey) &&
    _.isEmpty(multiKeys) &&
    _.isEmpty(agentGuardKeys) &&
    _.isEmpty(pattern) &&
    _.isEmpty(action)
  ) {
    return 'User uuid or IP Address or dataKey or multiKeys or pattern is required input';
  }
  return null;
};

const PAGE_SIZE = 50;
const DAY_SECONDS = 24 * 60 * 60;
let TWO_WEEKS_SECS = 14 * DAY_SECONDS;
let TWO_WEEKS_MS = 14 * DAY_SECONDS * 1000;
const CACHE_KEY = {
  USER_QUEUE_MSG: 'QUEUE_MSG_',
  CONVERSATION_MESSAGE: 'CONV_MSG_',
};

function populateMessageStatusForUser(msg, userId) {
  let opened = _.get(msg, 'opened');
  let delivered = _.get(msg, 'delivered');
  let deleted = _.get(msg, 'deleted');

  msg.isOpened = opened ? opened.indexOf(userId) !== -1 : true;
  msg.isDelivered = delivered ? delivered.indexOf(userId) !== -1 : true;
  msg.isDeleted = deleted ? deleted.indexOf(userId) !== -1 : false;

  delete msg.opened;
  delete msg.delivered;
  delete msg.deleted;
}

async function handleAction(event, redis) {
  let finalResponse = null;
  let { action, startTime = '-inf', userId } = event;
  let pipeline = redis.pipeline();

  switch (action) {
    case ACTIONS.GET_PAGINATED_USER_QUEUE_MESSAGES:
      let userQueueCacheKey = `${CACHE_KEY.USER_QUEUE_MSG}${userId}`;
      let currentTime = Date.now();
      await redis.zremrangebyscore(userQueueCacheKey, '-inf', currentTime - TWO_WEEKS_MS); // delete expired message ids from user queue
      let conversationIdMessageIds = await redis.zrangebyscore(userQueueCacheKey, startTime, 'inf', 'LIMIT', 0, PAGE_SIZE) || [];
      let messageCacheKeys = conversationIdMessageIds.map(messageId => { return `${CACHE_KEY.CONVERSATION_MESSAGE}${messageId}` });
      let response = [];
      _.forEach(messageCacheKeys, key => {
        pipeline.get(key, (error, content) => {
          if (_.isNull(content)) {
            return true;
          }
          let message = JSON.parse(content);
          populateMessageStatusForUser(message, userId);
          response.push(message);
        });
      });
      await pipeline.exec();
      finalResponse = response;
      break;
  }

  return finalResponse;
}

let readItemsFromCache = function(input) {
  let {
    userId,
    ipAddress,
    dataKey,
    multiKeys,
    agentGuardKeys,
    pattern,
    action,
  } = input;
  return new Promise(function(resolve, reject) {
    if (!_.isEmpty(action)) {
      handleAction(input, redis)
        .then(result => {
          resolve(result);
        });
    } else if (!_.isEmpty(userId)) {
      let response = [];
      redis
        .lrange(userId, 0, 9)
        .then(function(result) {
          _.forEach(result, function(elem) {
            response.push(JSON.parse(elem));
          });
          return redis.ltrim(userId, 10, -1);
        })
        .then(function() {
          resolve(response);
        });
    } else if (!_.isEmpty(ipAddress)) {
      redis
        .get(ipAddress)
        .then(function(result) {
          resolve(result);
        })
    } else if (!_.isEmpty(dataKey)) {
      let response = null;
      if (_.isArray(dataKey)) {
        let pipeline = redis.pipeline();
        _.forEach(dataKey, key => {
          pipeline.get(key);
        });
        pipeline
          .exec()
          .then(function(result) {
            response = _.flatten(_.map(result, arr => arr[1]));
            resolve(response);
          });
      } else {
        redis
          .get(dataKey)
          .then(function(result) {
            resolve(result);
          })
      }
    } else if (!_.isEmpty(multiKeys)) {
      getMultipleKeysFromCache(redis, multiKeys)
        .then(multiKeysResponse => {
          resolve(multiKeysResponse);
        });
    } else if (!_.isEmpty(pattern)) {
      getKeysOnPattern(redis, pattern)
        .then(patternResponse => {
          resolve(patternResponse);
        })
    } else if (!_.isEmpty(agentGuardKeys)) {
      handleCacheGetsForAgentGuard(redis, agentGuardKeys, resolve);
    }
  });
};

function handleCacheGetsForAgentGuard(redis, agentGuardKeys, resolve) {
  let finalResponse = {};
  let { botKey, capKey, userKey, conversationKey, ipAddressKey } = agentGuardKeys;

  let keysToGet = [botKey, capKey];
  if (userKey) {
    keysToGet.push(userKey);
  }
  if (ipAddressKey) {
    keysToGet.push(ipAddressKey);
  }

  getMultipleKeysFromCache(redis, keysToGet)
    .then(response => {
      finalResponse = response;
      let botData = JSON.parse(
        _.get(finalResponse, botKey + '.content') || null
      );
      if (_.isEmpty(botData)) {
        throw new Error('Invalid cache data. Bot data is empty');
      }

      let conversationKeyWithDomain =
        conversationKey + '_' + botData.userDomain;
      return redis.get(conversationKeyWithDomain);
    })
    .then(conversationData => {
      finalResponse[conversationKey] = {
        error: null,
        content: conversationData,
      };
      resolve(finalResponse);
    })
    .catch(err => {
      resolve(finalResponse);
    });
}

function getMultipleKeysFromCache(redis, multiKeys) {
  if (!_.isArray(multiKeys)) {
    multiKeys = [multiKeys];
  }

  let typesReponse = {};
  let typePipeline = redis.pipeline();
  _.forEach(multiKeys, key => {
    typePipeline.type(key, (error, type) => {
      typesReponse[key] = type;
    });
  });

  let multiKeysResponse = {};
  return typePipeline
    .exec()
    .then(function() {
      let getPipeline = redis.pipeline();
      _.forEach(multiKeys, key => {
        let type = typesReponse[key];
        if (type === 'list') {
          getPipeline.lrange(key, 0, -1, (error, content) => {
            multiKeysResponse[key] = { error, content };
          });
        } else if (type === 'string') {
          getPipeline.get(key, (error, content) => {
            multiKeysResponse[key] = { error, content };
          });
        }
      });
      return getPipeline.exec();
    })
    .then(() => {
      return multiKeysResponse;
    });
}

function getKeysOnPattern(redis, pattern) {
  let getKeysOnPatternResults = {};
  return redis
    .keys(pattern)
    .then(function(keys) {
      let pipeline = redis.pipeline();
      _.forEach(keys, key => {
        pipeline.get(key, (error, content) => {
          getKeysOnPatternResults[key] = { error, content };
        });
      });
      return pipeline.exec();
    })
    .then(() => {
      return getKeysOnPatternResults;
    });
}

// main method
async function execute(event) {

  let errorMsg = validate(event);
  if (errorMsg !== null) {
    console.error('error in redis read queue: ', errorMsg);
    return errorMsg;
  }

  readItemsFromCache(event)
    .then(function(response) {
      return response;
    })
    .catch(function(err) {
      console.info(err);
      return err;
    });
};

module.exports = { execute };
