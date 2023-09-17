const _ = require('lodash');
const config = require('../../config');
const express = require('express');
const path = require('path');
const fs = require('fs')
const router = express.Router();
const passport = require('passport');
const doAuth = passport.authenticate('jwt', {
    session: false
});

router.get('/FileService/Get', doAuth, (req, res) => {
    let fileName = req.query.path;
    if(_.isEmpty(fileName)) {
        return res.status(500).json({error: 'Required Fields Missing'});
    }

    try {
        let filePath = path.join(config.ASSET_ROOT_PATH, config.ASSETS_LOCATION, fileName);
        console.log(filePath);
        if(!fs.existsSync(filePath)) {
            return res.status(404).json({error: 'File not found'});
        }
        return res.status(200).sendFile(fileName, {root: path.join(config.ASSET_ROOT_PATH, config.ASSETS_LOCATION)});

    } catch (err) {
        return res.status(404).json({error: `Error occurred: ${err.message}`});
    }
});

module.exports = router;
