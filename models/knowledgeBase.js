const db = require('../firebase');
const collection = db.collection('knowledgeBase');
const uuidv4 = require('uuid').v4;

exports.findAnswer = async (question) => {
  const snapshot = await collection.where('question', '==', question).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data().answer;
};

exports.addKnowledge = async (question, answer) => {
  const theQuestion = question;
  const snapshot = await collection.where('question', '==', theQuestion).get();

  const payload = {
    question: theQuestion,
    answer,
    updatedAt: new Date().toISOString(),
  };

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    await docRef.update(payload);
  } else {
    await collection.add({
      ...payload,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      source: 'supervisor'
    });
  }
};

exports.readData = async () => {
  const snapshot = await collection.orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => doc.data());
};
