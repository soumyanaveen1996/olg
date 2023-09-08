(function() {
    let next = function(message, state, previousMessages, botContext) {
        botContext.tell('In next method');
    };

    let greeting = function(state, previousMessages, botContext) {
        botContext.tell('In greeting method');
    }

    let farewell = function(msg, state, previousMessages, botContext) {};

    let asyncResult = function(result, state, previousMessages, botContext) {
        botContext.tell('In asyncResult method');
    };

    return {
        done: farewell,
        init: greeting,
        asyncResult: asyncResult,
        next: next,
        version: '1.0.0',
    };
})();
