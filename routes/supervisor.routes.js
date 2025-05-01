const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisor.controller');

router.get('/requests', supervisorController.viewDashboard);
router.post('/answer/:id', supervisorController.submitAnswer);
router.get('/knowledge-base', supervisorController.viewLearnedAnswers);

module.exports = router;
