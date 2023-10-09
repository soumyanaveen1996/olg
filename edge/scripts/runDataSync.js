const MongoClient = require('mongodb').MongoClient;
const {MONGO_URI} = require('../config');

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
    console.log('Connected to DB. Starting DB data population');
    await populateCrews(client);
    await populateBotFarm(client);
    await createConversationCollection(client);
    await createKeyValuesCollection(client);
    await populateDomains(client);
    await client.close();
})();

async function populateCrews(client) {
    try {
        const database = client.db("olg");
        const crews = database.collection("users");
        // const crewData = require('../data/crews');
        // const result = await crews.insertMany(crewData);
        // console.log(`${result.insertedCount} crews were inserted`);
        console.log('Creating indexes on crew table');
        await crews.createIndex({userId: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the crews collection. Error:", err.message);
    }
}

async function populateBotFarm(client) {
    try {
        const database = client.db("olg");
        const botFarm = database.collection("botfarm");
        const botFarmData = require('../data/botfarm');

        const result = await botFarm.insertMany(botFarmData);
        console.log(`${result.insertedCount} bots were inserted`);
        console.log('Creating indexes on botFarm table');
        await botFarm.createIndex({botId: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the botFarm collection. Error:", err.message);
    }
}

async function createConversationCollection(client) {
    try {
        const database = client.db("olg");
        const conversations = database.collection("conversations");
        console.log('Creating indexes on conversations table');
        await conversations.createIndex({conversationId: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the conversations collection. Error:", err.message);
    }
}

async function createKeyValuesCollection(client) {
    try {
        const database = client.db("olg");
        const keyValues = database.collection("keyValues");
        console.log('Creating indexes on keyValues table');
        await keyValues.createIndex({key: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the keyValues collection. Error:", err.message);
    }
}
async function populateDomains(client) {
    try {
        const database = client.db("olg");
        const domains = database.collection("domains");
        const domainsData = require('../data/domains');

        const result = await domains.insertMany(domainsData);
        console.log(`${result.insertedCount} domains were inserted`);
        console.log('Creating indexes on domains table');
        await domains.createIndex({userDomain: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the domains collection. Error:", err.message);
    }
}
