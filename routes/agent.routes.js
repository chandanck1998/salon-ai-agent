const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');

router.post('/call', agentController.receiveCall);

module.exports = router;
