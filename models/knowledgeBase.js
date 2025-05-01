const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/knowledgeBase.json');

// Read knowledge base
const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Write updated knowledge base
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Find an answer
const findAnswer = (question) => {
  const knowledge = readData();
  const found = knowledge.find(q => q.question.toLowerCase() === question.toLowerCase());
  return found ? found.answer : null;
};

// Add a new question-answer pair
const addKnowledge = (question, answer) => {
  const knowledge = readData();
  knowledge.push({ question, answer });
  writeData(knowledge);
};

module.exports = {
  findAnswer,
  addKnowledge,
  readData,   // ✅ Export this function also!
};
