const { MongoClient } = require("mongodb");

class MongoDBHandler {
  constructor() {
    this.uri = "mongodb://localhost:27017/"; //default
    this._mongoConnection = new MongoClient(this.uri);
  }

  set uri(uri) {
    this._uri = uri;
  }

  get uri() {
    return this._uri;
  }

  get mongoConnection() {
    if (!this.isConnected) {
      this.connect();
    }
    return this._mongoConnection;
  }

  connect() {
    if (!this.isConnected) {
      console.log("Connecting to MongoDB");
      this._mongoConnection.connect();
      this.isConnected = true;
    }
  }

  disconnect() {
    this._mongoConnection?.close();
    this.isConnected = false;
  }

}

const mongoHandler = new MongoDBHandler();

module.exports = mongoHandler;

