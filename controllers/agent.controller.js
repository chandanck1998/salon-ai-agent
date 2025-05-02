const { createToken } = require('../services/liveKit.service');
const helpRequestModel = require('../models/helpRequest');
const knowledgeBaseModel = require('../models/knowledgeBase');

exports.receiveCall = async (req, res) => {
  try {
    const { question, callerId } = req.body;

    if (!question || !callerId) {
      return res.status(400).json({ message: 'Question and callerId are required.' });
    }

    console.log(`📞 Incoming call question: ${question}`);

    const token = await createToken(callerId, "frontdesk-room");
    console.log(`🔑 Generated LiveKit token for callerId ${callerId}: ${token}`);

    const answer = await knowledgeBaseModel.findAnswer(question);

    if (answer) {
      console.log(`✅ AI Response: ${answer}`);
      return res.status(200).json({ response: answer, livekitToken: token });
    }

    const newHelpRequest = await helpRequestModel.createRequest(question, callerId);

    console.log(`🆘 Text to Supervisor: “Hey, I need help answering: '${question}' from caller ${callerId}.”`);

    return res.status(200).json({
      response: "Let me check with my supervisor and get back to you.",
      livekitToken: token
    });

  } catch (error) {
    console.error('Error in receiveCall:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
