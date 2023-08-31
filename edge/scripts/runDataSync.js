const MongoClient = require('mongodb').MongoClient;
const {MONGO_URI} = require('../config');
const crewData = require("../data/crews.json");

async function getClient() {
    try {
        return await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
    } catch (err) {
        console.log("unable to connect to DB", err);
    }
}

(async () => {
    let client = await getClient();
    console.log('Connected to DB. Starting DB data population');
    await populateCrews(client);
    await client.close();
})();

async function populateCrews(client) {
    try {
        const database = client.db("olg");
        const crews = database.collection("users");
        const crewData = require('../data/crews');

        const result = await crews.insertMany(crewData);
        console.log(`${result.insertedCount} crews were inserted`);
        console.log('Creating indexes on crew table');
        await crews.createIndex({userId: 1}, {unique: true});
    } catch(err) {
        console.log("Error occurred while trying to load the crews collection. Error:", err.message);
    }
}
