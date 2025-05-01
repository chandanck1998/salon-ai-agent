const helpRequestModel = require("../models/helpRequest");
const knowledgeBaseModel = require('../models/knowledgeBase');

// This will auto-mark pending requests that are older than 5 minutes
helpRequestModel.markUnresolvedAfter(5);

exports.viewDashboard = (req, res) => {
  const helpRequests = helpRequestModel.getAllRequests();
  res.render("requests", { helpRequests });
};

exports.submitAnswer = (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  helpRequestModel.resolveRequest(id, answer);
  const request = helpRequestModel.getAllRequests().find((r) => r.id === id);
  if (request) {
    knowledgeBaseModel.addKnowledge(request.question, answer);

    console.log(`📩 AI follow-up to ${request.callerId}:`);
    console.log(`🗣️  "Thanks for waiting! Here's the answer to your question: '${request.question}' → ${answer}"`);
  }
  res.redirect("/supervisor/requests");
};

exports.viewLearnedAnswers = (req, res) => {
  const knowledgeBase = knowledgeBaseModel.readData();
  res.render("knowledgeBase", { knowledgeBase });
};
