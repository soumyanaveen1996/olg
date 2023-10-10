const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const doAuth = passport.authenticate('jwt', {
    session: false
});
const KeyValue = require('../models/keyvalue');
const config = require('../../config');
const {IMO_KEY, NODE_ID_KEY, ADMIN_ROLE, C2E_STATUS_KEY, E2C_STATUS_KEY, SYNC_DATA_POINTS, SYNC_STATUSES} = config;

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
        let cloudToEdgeStatus = {};
        cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_STATUS] = SYNC_STATUSES.PENDING;
        await KeyValue.updateOne({key: C2E_STATUS_KEY}, {$set: {value: cloudToEdgeStatus}}, {upsert: true});
        return res.status(200).json({success: true});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.get('/AdminService/getEdgeConfig', doAuth, async (req, res) => {
    try {
        verifyAdminAccess(req);
        let response = await KeyValue.find({key: {$in: [IMO_KEY, C2E_STATUS_KEY, E2C_STATUS_KEY, NODE_ID_KEY]}});
        let keyValues = _.chain(response).keyBy('key').mapValues('value').value();

        let finalResponse = {
            imo: _.get(keyValues, IMO_KEY),
            nodeId: _.get(keyValues, NODE_ID_KEY),
            lastSyncTime: _.get(keyValues, `${C2E_STATUS_KEY}.${SYNC_DATA_POINTS.SYNC_TIME}`),
            cloudToEdgeSyncStatus: _.get(keyValues, `${C2E_STATUS_KEY}`),
            edgeToCloudSyncStatus: _.get(keyValues, `${E2C_STATUS_KEY}`),
        };
        return res.status(200).json(finalResponse);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;
