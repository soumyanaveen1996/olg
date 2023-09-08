const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));
router.use('/', require('./AgentGuardService'));
router.use('/', require('./FileService'));
router.use('/', require('./UserService'));
module.exports = router;
