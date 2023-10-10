const MongoClient = require('mongodb').MongoClient;
const {MONGO_URI, MONGO_DB_COLLECTIONS} = require('../config');

async function getClient() {
    try {
        return await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
    } catch (err) {
        console.log("unable to connect to DB", err);
    }
}

(async () => {
    console.log('Running sync file');
    let client = await getClient();
    const database = client.db("olg");
    console.log('Connected to DB. Starting DB data population');
    await populateBotFarm(database);
    await populateDomains(database);
    await createIndex(database, MONGO_DB_COLLECTIONS.USERS, {userId: 1});
    await createIndex(database, MONGO_DB_COLLECTIONS.CONVERSATIONS, {conversationId: 1});
    await createIndex(database, MONGO_DB_COLLECTIONS.KEY_VALUES, {key: 1});
    await createIndex(database, MONGO_DB_COLLECTIONS.COURSES, {courseId: 1});
    await createIndex(database, MONGO_DB_COLLECTIONS.USER_COURSES, {userId: 1, courseId: 1});
    await client.close();
})();

async function populateBotFarm(database) {
    try {
        const botFarm = database.collection(MONGO_DB_COLLECTIONS.BOTFARM);
        const botFarmData = require('../data/botfarm');

        const result = await botFarm.insertMany(botFarmData);
        console.log(`${result.insertedCount} bots were inserted`);
        console.log('Creating indexes on botFarm table');
        await botFarm.createIndex({botId: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the botFarm collection. Error:", err.message);
    }
}


async function createIndex(database, collectionName, indexFields, options = {unique: true}) {
    try {
        const collection = database.collection(collectionName);
        console.log(`Creating indexes on ${collectionName} table`);
        await collection.createIndex(indexFields, options);
    } catch(err) {
        console.log(`Error occurred while trying to load the ${collectionName} collection. Error:, ${err.message}`);
    }
}

async function populateDomains(database) {
    try {
        const domains = database.collection(MONGO_DB_COLLECTIONS.DOMAINS);
        const domainsData = require('../data/domains');

        const result = await domains.insertMany(domainsData);
        console.log(`${result.insertedCount} domains were inserted`);
        console.log('Creating indexes on domains table');
        await domains.createIndex({userDomain: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the domains collection. Error:", err.message);
    }
}
