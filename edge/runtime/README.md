# Runtime for frontm.js framework
The runtime will be handle with a class: **FrontmRuntime**. 
To import and instantiate the runtime:
```javascript
const { FrontmRuntime } = require('../runtime');
const runtime = new FrontmRuntime(config);
```
The runtime will set up a new connection to mongodb and redis, and will provide a method to execute the bot.
# Flow
The idea is that the edge server creates only one instance of the runtime when the server is initialised. The entry point of the runtime will be a method called: `execute` that will receive only one attribute that will be the event. The runtime will validate the conversation and will call the `BotsRunner` that will be responsable of creating the context for the bot and executing it.
The capabilities will be loaded when the `FrontmRuntime` is instantiated, opening a connection to mongodb and also redis.
# Structure

The runtime is separated into two main modules: **capabilities** and **botsRunner** that will be handled by **FrontmRuntime** class.

### FrontmRuntime
This class will initialise the capabilities and the botsRunner. It's the replacement of Agent Guard in our backend, validating the event to be sent to the botRunner

### Capabilities

Each capability will have a separate folder inside the capabilities module, the entry point of the capability must be **index.js** and it must export a function with this signature:
```javascript
async function execute(payload) {}
module.exports = {
  execute
};
```
For simplicity we will have only one package.json for the entire runtime. If a capability needs some specific dependency, install that dependency at the root level.

### Bots runner
Bots runner will be responsable of the execution of the bot, providing the bot context. 
The bot context will provide the basic capabilities for the bot to run, including a custom version of `frontmlib` adapted to run the edge capabilities.

