const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const doAuth = passport.authenticate('jwt', {
    session: false
});
const Bot = require('../models/bot');
const Domain = require('../models/domain');

router.post('/UserService/GetUserBotMetaData', doAuth, async (req, res) => {
    let botList = await Bot.find({});
    if(_.isEmpty(botList)) {
        res.status(500).json({error: 'Bots not setup correctly. No bots found'});
    }
    return res.status(200).json({botList});
});

router.post('/UserService/GetDomainsMetaData', doAuth, async (req, res) => {
    let domainsList = await Domain.find({});
    if(_.isEmpty(domainsList)) {
        res.status(500).json({error: 'Domains not setup correctly. No domains found'});
    }
    return res.status(200).json({domainsList});
});

module.exports = router;
