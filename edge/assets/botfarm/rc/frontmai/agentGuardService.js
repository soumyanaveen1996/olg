(function() {
  async function executeCustomCapability(capabilityName, params, sync, requestUuid, botContext, user) {
    const utils = botContext.getCapability('Utils');
    let _ = utils.Lodash;
    let postReq = {
      capability: capabilityName,
      parameters: params,
      requestUuid: requestUuid,
      sync: sync,
    };

    let response = await executeCapability(botContext, user, _, postReq);
    return _.get(response, 'data.content') || [];
  }

  const executeCapability = async function(botContext, user, _, postReq) {
    let conversationContext = botContext.getCapability('ConversationContext');
    let conversation = await conversationContext.getConversationContext(botContext, user);
    addConversationDetailsToRequest(botContext.botManifest.botId, conversation, postReq, _);

    let AgentGuard = botContext.getCapability('AgentGuard');
    if (postReq.parameters) {
      postReq.parameters = JSON.stringify(postReq.parameters);
    }
    return await AgentGuard.execute(postReq);
  };

  const addConversationDetailsToRequest = function(botId, conversation, postReq, _) {
    postReq.conversation = {
      conversationId: conversation.conversationId,
      bot: botId,
    };

    if (_.isUndefined(conversation.created)) {
      postReq.conversation.participants = conversation.participants;
      postReq.conversation.onChannels = conversation.onChannels;
      postReq.conversation.closed = false;
      postReq.conversation.allowNonContactMessages = conversation.allowNonContactMessages;
    }
  };

  return {
    executeCustomCapability,
  };
})();
