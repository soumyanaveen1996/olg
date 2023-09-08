const _ = require('lodash');
const Joi = require('@hapi/joi');
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const doAuth = passport.authenticate('jwt', {
    session: false
});
const Conversation = require('../models/conversation');
const Bot = require('../models/bot');
const FrontmRuntime = require('runtime').FrontmRuntime;
const runtime = new FrontmRuntime();

function validateInput(params) {
    const conversationSchema = Joi.object().keys({
        conversationId: Joi.string().required(),
        bot: Joi.string().required(),
        participants: Joi.array().items(Joi.string()).required()
    });
    const inputSchema = Joi.object().keys({
        capability: Joi.string().required(),
        parameters: Joi.string().required(),
        requestUuid: Joi.string().required(),
        conversation: conversationSchema.required(),
    });
    return inputSchema.validate(params, { allowUnknown: true, });
}

function validateConversationId(userId, botId, inputConvId) {
    let text = _.join(_.sortBy([userId, botId]), '-');
    let convId = userId.substr(0, 10) + "-" + sha1(text).substr(0, 12);
    return (inputConvId === convId);
}
async function validateConversation(conversation, userId) {
    let {conversationId, bot} = conversation;
    let dbBot = await Bot.findOne({botId: bot});
    if(_.isEmpty(dbBot)) {
        throw new Error('Invalid bot');
    }

    if(!validateConversationId(userId, bot, conversationId)) {
        throw new Error('Invalid conversationId for user');
    }

    let dbConv = await Conversation.findOne({conversationId});
    if(_.isEmpty(dbConv)) {
        await new Conversation(conversation).save();
    }
    
    return {botData: dbBot};
}
async function validate(req) {
    const { error } = validateInput(req.body);
    if(error) {
        throw new Error(_.get(error, 'details[0].message'));
    }
    try {
        let params = _.get(req, 'body.parameters');
        req.body.parameters = JSON.parse(params);
    } catch(err) {
        throw new Error('Parameters are not sent correctly');
    }

    let conversation = _.get(req, 'body.conversation');
    let userId = _.get(req, 'user.userId');
    let {botData} = await validateConversation(conversation, userId);
    req.botData = botData;
}

router.post('/AgentGuardService/Execute', doAuth, async (req, res) => {
    try {
        await validate(req);
        let {capability, parameters, requestUuid, conversation} = req.body;
        let user = req.user;
        let botData = req.botData;
        await runtime.execute({capability, parameters, requestUuid, conversation, user, botData});
        return res.status(200).json({message: 'success'});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;
