# How to set up the edge server on your laptop
###### Last updated on: 25/Aug/2023

## Prerequisites
#### <span style="color: blue"> Software Installation </span>
The following software must be installed on the laptop before starting the edge server. 
For MongoDB installation, you can refer to the instructions [here](https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-os-x/). 
Homebrew is the simplest way to install both software. 

- npm and node v16.0 or above
- MongoDB 
- Redis
    ``` 
      brew install mongodb
      brew install redis
      brew list
    ```
- Optional: Any Mongo DB client to view the local db - like MongoDBCompass

#### <span style="color: blue"> File permissions setup </span>
After cloning the repo, change the permissions of the following scripts to make them executable
```
chmod 755 scripts/startup.sh
chmod 755 scripts/shutdown.sh
```
#### <span style="color: blue"> Configuration changes </span>
The configuration for the local setup uses the following ports:
    ```
      Redis: 6379
      Mongo: 27017
      Express: 4001
    ```
If any changes are necessary, you can update the `config.js` file

### <span style="color: green"> Steps to start the server locally </span>
- Once the prerequisites are completed, run the `scripts/startup.sh` on your terminal. This will:
    - Start the MongoDB server (as a daemon process). This will use the `mongod` process to start the server.
    - Start the Redis server (this uses brew to start the server)
    - Install all the node dependencies for the server
    - Populate the mongo db with sample data
    - <span style="color: red">*Note* </span>: If any changes are required, as per the laptop setup, please modify the script accordingly but do not check in the changes
- Run `npm start` to start the express server.

### <span style="color: green"> Steps to shut down the server locally </span>
- Stop the express server on the console (Ctrl + C)
- To stop the MongoDB and Redis instances, run the `scripts/shutdown.sh` on your terminal.   

### <span style="color: green"> Details of the components of the Edge server
Following are the components of the server: 
1. The express server which exposes the API for the web app to connect to
2. The Socket IO component, which the bots will use to stream messages back to the clients
3. The Redis cache - which will be used to publish messages as well as cache any data
4. Mongo DB is the persistent repository in the backend

### <span style="color: green"> Authentication process
1. When the user registers for the first time, they will be required to set a PIN
2. User will be able to reset their PIN
3. User PIN is encrypted in the DB
4. User authenticates with user id and PIN. After successful authentication, the API sends back user details and a JWT token. The token is signed by using an environment variable that is generated in the startup script.
5. For all subsequent authenticated requests (including connecting to socket.io), the token should be present in the request in the Bearer Auth header, or the "token" header.
6. The web app should listen to messages for the user based on the user id.

### <span style="color: green"> Testing on the edge
In the test folder, there are scripts/curl commands to test the edge server
1. There is a client for socket io - this will connect to the socket server and listen for messages (based on user id)
2. There is a client for redis - this will publish messages to a user (based on user id)
3. There is a collection of insomnia requests - you can choose to import these into your client to test the commands

### <span style="color: green"> After user login
After the user logs in successfully, do the following:

1. Get bots data - http://localhost:4001/UserService/GetUserBotMetaData. This will give you all the details of the bots the user has access to.
2. Get the bot files - http://localhost:4001/FileService/Get. Each URL of the bot metadata (botUrl, logoUrl, dependencies - url) has to be downloaded.
3. Get domains data - http://localhost:4001/UserService/GetDomainsMetaData. This will give you all the details of the bots the user has access to.
4. Create context - you will need to create the bot context and plug in all the dependencies. Look at the logic of existing web app.
   This context will usually have
   
   - conversation context -
     - this will have the botId,
     - the conversation id (check the id creation logic in web app - this is a hash of the userId and bot Id)
     - the participants - this will be an array and have the user id
     - domain - the domain in which the conversation is being created in
     
   - Auth - this will give details of the user
   - AgentGuard - this is a wrapper around the rest call - http://localhost:4001/AgentGuardService/Execute
   - remote dependencies - the files that were downloaded via bot metadata
   - Utils - with Lodash, for now.

### <span style="color: green"> Basic bot execution
Execute the life cycle method of the bot. 

1. When the bot opens, you have to call init method.
2. When the user does some action, call next
3. when there is a message from the socket for the bot, call the asyncResult method
4. when the user closes the bot, call done method.

### <span style="color: green"> Updating the bot file 
1. Generate the bundle for the bot file from [olg-edge-bot](https://bitbucket.org/frontm/olg-edge-bot) repository
2. Copy the `dit/main.js` file into `edge/bots/botfarm/olg/bot1/bot1.js` (keep the same `bot1.js` name)

