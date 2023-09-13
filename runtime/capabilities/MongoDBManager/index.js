const _ = require('lodash');
const moment = require('moment');
const mongoHandler = require('../../utils/mongoUtils');

const ERROR_MESSAGES = {
  UNAUTH_ACCESS: 'User does not have access to the domain'
};

const ACTIONS = {
  query: 'query',
  count: 'count',
  aggregate: 'aggregate',
  insertOne: 'insertOne',
  insertArray: 'insertArray',
  update: 'update',
  updateMany: 'updateMany',
  del: 'delete',
  deleteMany: 'deleteMany'
};

function queryCollection(collection, event) {
  return collection
    .find(event.query, event.projection)
    .sort(event.sort)
    .collation(event.collation)
    .skip(event.skip)
    .limit(event.limit)
    .toArray()
    .then(result => {
      return { statusCode: 200, body: result };
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: err };
    });
}

let query = async (db, event) => {
  try {
    let { collection } = event;
    let dbCollection = await db.collection(collection);
    return queryCollection(dbCollection, event);
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};


let count = async (db, event) => {
  try {
    let dbCollection = await db.collection(event.collection);
    return dbCollection
      .count(event.query)
      .then(result => {
        return { statusCode: 200, body: result };
      })
      .catch(err => {
        console.log('=> an error occurred: ', err);
        return { statusCode: 500, body: err };
      });
  } catch (err) {
    console.log('Error occurred in count operation: ', err);
    return { statusCode: 500, body: err.message };
  }
}

function runAggregation(db, event) {
  return db.collection(event.collection)
    .aggregate(event.query)
    .sort(event.sort)
    .skip(event.skip)
    .limit(event.limit)
    .toArray()
    .then(result => {
      return { statusCode: 200, body: result };
    })
    .catch(err => {
      console.log('=> an error occurred in aggregate: ', err);
      return { statusCode: 500, body: err };
    });
}
let aggregate = async (db, event) => {
  let results = await runAggregation(db, event);
  if (results.statusCode === 500) {
    return results;
  }
};

function insertManyIntoCollection(collection, documents) {
  return collection
    .insertMany(documents, { ordered: true })
    .then(() => {
      return { statusCode: 200, body: 'success' };
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: err };
    });
}

let insertOne = (db, event) => {
  event.documents = [event.document];
  return insertArray(db, event);
};

function processDateFields(documents, dateFields) {
  if (_.isEmpty(dateFields)) {
    return;
  }

  _.forEach(documents, document => {
    let dateFieldProperties = _.pick(document, dateFields);
    _.forEach(dateFieldProperties, (val, key) => {
      document[key] = new Date(moment(val).format('YYYY-MM-DDTHH:mm:ss'));
    });
  });
}

let insertArray = async (db, event) => {
  try {
    let { documents, collection, dateFields } = event;
    let dbCollection = await db.collection(collection);

    processDateFields(documents, dateFields);

    return insertManyIntoCollection(dbCollection, documents);
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};

async function updateCollection(collection, document, query, options) {
  let doc = {};
  doc['$set'] = document;
  return collection
    .updateOne(query, doc, options)
    .then(() => {
      console.log('=> update something');
      return { statusCode: 200, body: 'success' };
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

let updateManyCollection = async (collection, document, query, options, updateOperator = "$set", useInputDoc) => {
  let docWithOperator = {};
  docWithOperator[updateOperator] = document;
  return collection.updateMany(query, useInputDoc ? document : docWithOperator, options)
    .then(() => {
      return { statusCode: 200, body: "success" };
    })
    .catch((err) => {
      console.log("=> an error occurred: ", err);
      return { statusCode: 500, body: err.message };
    });
};

let update = async (db, event, updateMany) => {
  try {
    let { document, collection, options, query, updateOperator, useInputDoc = false } = event;
    let dbCollection = await db.collection(collection);
    if (updateMany) {
      return updateManyCollection(dbCollection, document, query, options, updateOperator, useInputDoc);
    }
    return updateCollection(dbCollection, document, query, options);
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};

let updateMany = async (db, event) => {
  return update(db, event, true);
};

async function deleteFromCollection(collection, query) {
  return collection
    .deleteOne(query)
    .then(() => {
      return { statusCode: 200, body: 'success' };
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: err };
    });
}

let deleteManyFromCollection = async (collection, query) => {
  if (_.isEmpty(query)) {
    return { statusCode: 500, body: "Invalid query for deleteMany action" };
  }
  return collection
    .deleteMany(query)
    .then(() => {
      return { statusCode: 200, body: "success" };
    })
    .catch((err) => {
      console.log("=> an error occurred: ", err);
      return { statusCode: 500, body: err };
    });
};

let del = async (db, event, deleteMany) => {
  try {
    let { collection, query } = event;
    let dbCollection = await db.collection(collection);
    if (deleteMany) {
      return deleteManyFromCollection(dbCollection, query);
    }
    return deleteFromCollection(dbCollection, query);
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};

let deleteMany = async (db, event) => {
  return del(db, event, true);
}

async function checkUserAccessToDB(event) {
  let { userId, db, adminAccess } = event;
  if (adminAccess) {
    await frontmlib.addLogEntry('MongoDBManager', { level: 'INFO', message: 'Admin Access', data: { event } });
    return;
  }

  if (!userId) {
    await frontmlib.addLogEntry('MongoDBManager', { level: 'WARNING', message: 'User Id not being passed', data: { event } });
    return;
  }

  let user = await frontmlib.getUser(userId);
  let domainsSearch = _.get(user, 'domainsSearch', []);
  if (_.indexOf(domainsSearch, db) === -1) {
    await frontmlib.addLogEntry('MongoDBManager', { level: 'WARNING', message: 'User does not have access to the domain', data: { userId, db } });
    throw new Error(`${ERROR_MESSAGES.UNAUTH_ACCESS}. User Id: ${userId}. Domain: ${db}`);
  }
}

async function execute(event) {
  const client = mongoHandler.mongoConnection;
  try {
    switch (event.action) {
      case ACTIONS.query: {
        return query(client.db(event.db), event);
      }
      case ACTIONS.count: {
        return count(client.db(event.db), event);
      }
      case ACTIONS.aggregate: {
        return aggregate(client.db(event.db), event);
      }
      case ACTIONS.insertOne: {
        return insertOne(client.db(event.db), event);
      }
      case ACTIONS.insertArray: {
        return insertArray(client.db(event.db), event);
      }
      case ACTIONS.update: {
        return update(client.db(event.db), event);
      }
      case ACTIONS.updateMany: {
        return updateMany(client.db(event.db), event);
      }
      case ACTIONS.del: {
        return del(client.db(event.db), event);
      }
      case ACTIONS.deleteMany: {
        return deleteMany(client.db(event.db), event);
      }
      default: {
        console.log('=> Invalid action');
        return { statusCode: 500, body: 'Invalid action' };
      }
    }
  } catch (err) {
    console.log('=> an error occurred: ', err);
    return err;
  }
};

module.exports = { execute };

