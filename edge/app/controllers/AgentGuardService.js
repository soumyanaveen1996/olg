const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const doAuth = passport.authenticate('jwt', {
    session: false
});

router.post('/AgentGuardService/Execute', doAuth, (req, res) => {
    return res.status(200).json({message: 'success'});
});

module.exports = router;
