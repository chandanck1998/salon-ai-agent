const helpRequestModel = require("../models/helpRequest");
const knowledgeBaseModel = require('../models/knowledgeBase');

// Auto-mark unresolved after 5 minutes
helpRequestModel.markUnresolvedAfter(5);

exports.viewDashboard = async (req, res) => {
  const helpRequests = await helpRequestModel.getAllRequests();
  res.render("requests", { helpRequests });
};

exports.submitAnswer = async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  await helpRequestModel.resolveRequest(id, answer);
  const helpRequests = await helpRequestModel.getAllRequests();
  const request = helpRequests.find(r => r.id === id);

  if (request) {
    await knowledgeBaseModel.addKnowledge(request.question, answer);
    console.log(`📩 AI follow-up to ${request.callerId}:`);
    console.log(`🗣️  "Thanks for waiting! Here's the answer to your question: '${request.question}' → ${answer}"`);
  }

  res.redirect("/supervisor/requests");
};

exports.viewLearnedAnswers = async (req, res) => {
  const knowledgeBase = await knowledgeBaseModel.readData();
  res.render("knowledgeBase", { knowledgeBase });
};
