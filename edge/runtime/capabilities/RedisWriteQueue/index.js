const redisConnection = require('../../utils/redisUtils').redisConnection;
const _ = require('lodash');

const DAY_SECONDS = 24 * 60 * 60;
let TWO_WEEKS_SECS = 14 * DAY_SECONDS;
let TWO_WEEKS_MS = 14 * DAY_SECONDS * 1000;
let TWO_MIN_SECS = 2 * 60;

const CACHE_KEY = {
  USER_QUEUE_MSG: 'QUEUE_MSG_',
  CONVERSATION_MESSAGE: 'CONV_MSG_',
};

const TASKS = {
  UPDATE_MESSAGE_STATUS: 'UpdateMessageStatus'
};


// validation
let validate = function(event) {
  let { queueMsgs, ipAddress, data, action, task } = event;

  if (task) {
    return validateTaskInputs(event);
  }

  switch (action) {
    case ACTIONS.DELETE:
      if (
        _.isUndefined(event.key) &&
        (_.isUndefined(event.keys) || _.isEmpty(event.keys))
      ) {
        return 'key is required for delete action';
      }
      break;

    case ACTIONS.UPDATE:
      if (
        _.isUndefined(event.key) &&
        (_.isUndefined(event.keys) || _.isEmpty(event.keys)) &&
        _.isUndefined(event.currentValue) &&
        _.isUndefined(event.newValue)
      ) {
        return 'key/keys, currentValue and newValue is required for update action';
      }
      break;

    case ACTIONS.ADD:
    default:
      let qMsgsEmpty = _.isEmpty(queueMsgs);
      let ipEmpty = _.isEmpty(ipAddress);
      let isDataEmpty = _.isEmpty(data);


      if (qMsgsEmpty && ipEmpty && isDataEmpty) {
        return 'Invalid data for caching';
      }

      if (!qMsgsEmpty) {
        if (!_.isArray(queueMsgs)) {
          queueMsgs = [queueMsgs];
        }

        for (let i = 0; i < _.size(queueMsgs); i++) {
          let doc = queueMsgs[i];
          let userId = doc.userId;
          if (_.isUndefined(userId) || _.isEmpty(userId)) {
            return "userId is required input";
          }
        }
      }

      break;
  }
  return null;
};

function validateTaskInputs(event) {
  let { task, taskInputs } = event;
  switch (task) {
    case TASKS.UPDATE_MESSAGE_STATUS:
      let { action, conversationId, userId } = taskInputs;
      if (_.isEmpty(action) || _.isEmpty(conversationId) || _.isEmpty(userId)) {
        return `Missing inputs for ${TASKS.UPDATE_MESSAGE_STATUS}`;
      }
      break;
    default:
      return `Invalid task ${task}`;
  }
  return null;
}

function addItemsToCache(input) {
  let { queueMsgs, ipAddress, data } = input;

  if (!_.isEmpty(queueMsgs)) {
    if (!_.isArray(queueMsgs)) {
      queueMsgs = [queueMsgs];
    }
    return addQueueMessagesForUser(queueMsgs)
      .then(() => {
        return publishMessages(queueMsgs);
      })
  }

  if (!_.isEmpty(ipAddress)) {
    return writeIpToCache(ipAddress);
  }

  if (!_.isEmpty(data)) {
    if (!_.isArray(data)) {
      data = [data];
    }
    return writeDataToCache(data);
  }
}

function writeDataToCache(dataList) {
  let pipeline = redisConnection.pipeline();

  _.forEach(dataList, data => {
    if (data.isArrayElement) {
      if (_.isUndefined(data.index)) {
        pipeline.rpush(data.key, data.value);
      } else {
        pipeline.lset(data.key, data.index, data.value);
      }
    } else if (data.expiry) {
      pipeline.set(data.key, data.value, 'ex', data.expiry);
    } else {
      pipeline.set(data.key, data.value);
    }
  });

  return pipeline
    .exec()
    .then(function(data) {
      console.log('writeDataToCache is done: ', data);
    })
    .catch(function(err) {
      console.log('writeDataToCache is failed: ', err);
    });
}

function writeIpToCache(ipAddress) {
  let ip = _.keys(ipAddress)[0];
  let val = ipAddress[ip];
  return redisConnection
    .set(ip, val, 'ex', DAY_SECONDS)
    .then(function(data) {
      console.log('writeIpToCache is done: ', data);
    })
    .catch(function(err) {
      console.log('writeIpToCache is failed: ', err);
    });
}

async function addQueueMessagesForUser(queueMsgs) {
  let pipeline = redisConnection.pipeline();
  let TTL = TWO_WEEKS_SECS;
  try {
    let currentTime = Date.now();
    for (let i = 0; i < _.size(queueMsgs); i++) {
      let queueMessage = queueMsgs[i];
      let { userId, conversation, messageId, createdOn, bot, details, conversational } = queueMessage;
      if (bot === 'im-bot' || conversational) {
        TTL = TWO_WEEKS_SECS;
      }
      else {
        TTL = TWO_MIN_SECS;
      }
      let message = _.get(details, '[0].message');
      if (!message) {
        continue;
      }
      let userQueueCacheKey = `${CACHE_KEY.USER_QUEUE_MSG}${userId}`;
      pipeline.zremrangebyscore(userQueueCacheKey, '-inf', currentTime - TWO_WEEKS_MS); // delete expired message ids from user queue
      pipeline.zadd(userQueueCacheKey, createdOn, `${conversation}_${messageId}`); // add the new message to user queue
      pipeline.expire(userQueueCacheKey, TWO_WEEKS_SECS); // reset user's queue expiry time
      pipeline.set(`${CACHE_KEY.CONVERSATION_MESSAGE}${conversation}_${messageId}`, JSON.stringify(queueMessage), 'ex', TTL); // add the new message to redis
      try {
        let resp = await pipeline.exec();
        console.log('addQueueMessagesForUser: redis.write is done: ', resp);
      } catch (err) {
        console.log('addQueueMessagesForUser: error occurred while executing pipeline: ', err);
      }
    }
  } catch (err) {
    console.log('addQueueMessagesForUser: error occurred: ', err);
  }
}

async function publishMessages(messages) {
  let promises = messages.map(msg => {
    let message = _.get(msg, 'details[0].message');
    if (!message) {
      return null;
    }
    return redisConnection.publish(msg.userId, JSON.stringify(msg));
  });
  promises = _.compact(promises);
  try {
    let data = await Promise.all(promises)
    console.log('publishMessages done: ', data);
  } catch (err) {
    console.log('publishMessages is failed: ', err);
  }
}

const ACTIONS = {
  ADD: 'add',
  DELETE: 'delete',
  UPDATE: 'update',
};

function handleUpdate(event, callback) {
  let updateKeysList = event.key ? [event.key] : event.keys;
  if (event.subStringMatch) {
    redisConnection.defineCommand('stringValueConditionalUpdate', {
      numberOfKeys: 1,
      lua: `
                local str = redis.call('get', KEYS[1]); 
                if str and str.match( str, ARGV[1]) then 
                    str = str.gsub(str, ARGV[1], ARGV[2]); 
                    return redis.call('set', KEYS[1], str);
                else 
                    return redis.error_reply("unable to update string value");
                end `,
    });
  } else {
    redisConnection.defineCommand('stringValueConditionalUpdate', {
      numberOfKeys: 1,
      lua: `
                local str = redis.call('get', KEYS[1]); 
                if str and str == ARGV[1] then 
                    str = str.gsub(str, ARGV[1], ARGV[2]); 
                    return redis.call('set', KEYS[1], str);
                else 
                    return redis.error_reply("unable to update string value");
                end `,
    });
  }

  let updatePipeline = redisConnection.pipeline();
  _.forEach(updateKeysList, key => {
    updatePipeline.stringValueConditionalUpdate(
      key,
      event.currentValue,
      event.newValue
    );
  });
  return updatePipeline
    .exec()
    .then(function(pipelineResult) {
      let response = {};
      _.forEach(pipelineResult, (eachCommandResponse, index) => {
        let [error, success] = eachCommandResponse;
        response[updateKeysList[index]] = { error: _.isUndefined(success) };
      });
      console.log('updated', JSON.stringify(response));
      callback(null, response);
    })
    .catch(function(err) {
      console.log('ERROR in update', err);
      callback(err);
    });
}

async function doTaskActions(event) {
  let { task, taskInputs } = event;
  switch (task) {
    case TASKS.UPDATE_MESSAGE_STATUS:
      await updateMessageStatusForUser(taskInputs);
  }
}

async function updateConversationMessagesForUser(conn, userId, cacheKeys, action) {
  for (let i = 0; i < _.size(cacheKeys); i++) {
    let key = cacheKeys[i];
    let [[existsError, existsResult], [ttlError, ttlResult], [getError, getResults]] = await conn.pipeline().exists(key).ttl(key).get(key).exec();

    if (existsResult === 1 && _.isNull(existsError) && _.isNull(ttlError) && _.isNull(getError)) {
      let message = JSON.parse(getResults);
      let actionUserIds = _.get(message, action, []);
      actionUserIds.push(userId);
      message[action] = _.uniq(actionUserIds);
      await conn.set(key, JSON.stringify(message), 'ex', ttlResult);
    } else {
      console.log(`Not updating key ${key}. existsResult: ${existsResult}. existsError: ${existsError}. ttlError: ${ttlError}. getError: ${getError}`);
    }
  }
}

async function updateMessageStatusForUser(taskInputs) {
  let { action, userId, messageIds = [], conversationId } = taskInputs; // action = "opened"/"delivered"/"deleted"
  let cacheKeys = [];
  if (_.isEmpty(messageIds)) {
    cacheKeys = await redisConnection.keys(`${CACHE_KEY.CONVERSATION_MESSAGE}${conversationId}_*`);
  } else {
    cacheKeys = _.map(messageIds, messageId => `${CACHE_KEY.CONVERSATION_MESSAGE}${conversationId}_${messageId}`);
  }
  await updateConversationMessagesForUser(redisConnection, userId, cacheKeys, action);
}

// main method
async function execute(event) {
  let action = event.action || ACTIONS.ADD;
  event.action = action;

  let errorMsg = validate(event);
  if (errorMsg !== null) {
    console.error('error: ', errorMsg);
    return errorMsg;
    return;
  }

  if (event.task) {
    return doTaskActions(event);
  }

  switch (action) {
    case ACTIONS.DELETE:
      let keysList = event.key ? [event.key] : event.keys;
      let pipeline = redisConnection.pipeline();
      _.forEach(keysList, key => {
        pipeline.del(key);
      });
      pipeline
        .exec()
        .then(function(result) {
          console.info('deleted: ', _.size(result));
          return null;
        })
        .catch(function(err) {
          console.log('ERROR in delete', err);
          return err;
        });
      break;

    case ACTIONS.UPDATE:
      handleUpdate(event, callback).catch(function(err) {
        console.log('ERROR in the last catch', err);
        return err;
      });
      break;

    case ACTIONS.ADD:
    default:
      addItemsToCache(event)
        .then(function() {
          console.info('inserted items into cache: ', event.length);
          return null;
        })
        .catch(function(err) {
          console.log('ERROR in the last catch', err);
          return err;
        });
      break;
  }
};

module.exports = { execute };

