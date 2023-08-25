# How to set up the edge server on your laptop
###### Last updated on: 25/Aug/2023

## Prerequisites
#### <span style="color: blue"> Software Installation
The following software must be installed on the laptop before starting the edge server. For MongoDB installation, you can refer to the instructions [here](https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-os-x/). Homebrew is the simplest way to install both software. 
  - npm and node v16.0 or above
  - MongoDB 
  - Redis
    ``` 
      brew install mongodb
      brew install redis
      brew list
    ```
  - Optional: Any Mongo DB client to view the local db - like MongoDBCompass

#### <span style="color: blue"> File permissions setup
After cloning the repo, change the permissions of the following scripts to make them executable
```
chmod 755 scripts/startup.sh
chmod 755 scripts/shutdown.sh
```
#### <span style="color: blue"> Configuration changes
- The configuration for the local setup uses the following ports:
    ```
      Redis: 6379
      Mongo: 27017
      Express: 4001
    ```
  If any changes are necessary, you can update the `config.js` file

### <span style="color: green"> Steps to start the server locally
- Once the prerequisites are completed, run the `scripts/startup.sh` on your terminal. This will 
  - Start the MongoDB server (as a daemon process). This will use the `mongod` process to start the server.
  - Start the Redis server (this uses brew to start the server)
  - Install all the node dependencies for the server
  - Populate the mongo db with sample data
  - <span style="color: red">*Note* </span>: If any changes are required, as per the laptop setup, please modify the script accordingly but do not check in the changes
- Run `npm start` to start the express server.

### <span style="color: green"> Steps to shut down the server locally
- Stop the express server on the console (Ctrl + C)
- To stop the MongoDB and Redis instances, run the `scripts/shutdown.sh` on your terminal.   
