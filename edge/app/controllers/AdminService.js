const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const doAuth = passport.authenticate('jwt', {
    session: false
});
const KeyValue = require('../models/keyvalue');
const config = require('../../config');
const {IMO_KEY, LAST_SYNC_TIME_KEY, NODE_ID_KEY, ADMIN_ROLE, CLOUD_TO_EDGE_SYNC_KEY, SYNC_STATUS} = config;

function verifyAdminAccess(req) {
    let user = req.user;
    let isAdminUser = _.get(user, 'userRole') === ADMIN_ROLE;
    if(!isAdminUser) {
        throw new Error('Invalid access. Only Admin user can access this API');
    }
}

router.post('/AdminService/updateEdgeConfig', doAuth, async (req, res) => {
    try {
        verifyAdminAccess(req);
        let imo = req.body.imo;
        if(_.isEmpty(imo)) {
            return res.status(500).json({error: 'IMO required'});
        }

        await KeyValue.updateOne({key: IMO_KEY}, {$set: {value: imo}}, {upsert: true});
        await KeyValue.updateOne({key: CLOUD_TO_EDGE_SYNC_KEY}, {$set: {value: SYNC_STATUS.PENDING}}, {upsert: true});
        return res.status(200).json({success: true});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.get('/AdminService/getEdgeConfig', doAuth, async (req, res) => {
    try {
        verifyAdminAccess(req);
        let response = await KeyValue.find({key: {$in: [IMO_KEY, LAST_SYNC_TIME_KEY, NODE_ID_KEY]}});
        let keyValues = _.chain(response).keyBy('key').mapValues('value').value();

        let finalResponse = {
            imo: _.get(keyValues, IMO_KEY),
            lastSyncTime: _.get(keyValues, LAST_SYNC_TIME_KEY),
            nodeId: _.get(keyValues, NODE_ID_KEY)
        };
        return res.status(200).json(finalResponse);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;
