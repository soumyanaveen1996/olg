const express = require('express');
const router = express.Router();

router.use('/api', require('./auth'));
router.use('/api', require('./AgentGuardService'));
router.use('/api', require('./FileService'));
router.use('/api', require('./UserService'));
router.use('/api', require('./AdminService'));
router.use('/api', require('./AiccService'));
module.exports = router;
