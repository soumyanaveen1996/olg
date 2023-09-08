const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const doAuth = passport.authenticate('jwt', {
    session: false
});
const Bot = require('../models/bot');

router.post('/UserService/GetUserBotMetaData', doAuth, async (req, res) => {
    let botList = await Bot.find({});
    if(_.isEmpty(botList)) {
        res.status(500).json({error: 'Bots not setup correctly. No bots found'});
    }
    return res.status(200).json({botList});
});

module.exports = router;
