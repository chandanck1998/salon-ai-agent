const db = require('../firebase');
const { v4: uuidv4 } = require('uuid');

const collection = db.collection('helpRequests');

exports.createRequest = async (question, callerId) => {
  const newRequest = {
    id: uuidv4(),
    question,
    callerId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  await collection.doc(newRequest.id).set(newRequest);
  return newRequest;
};

exports.resolveRequest = async (id, answer) => {
  const doc = collection.doc(id);
  const snapshot = await doc.get();
  if (!snapshot.exists) return false;

  await doc.update({
    status: 'Resolved',
    resolvedAt: new Date().toISOString(),
    answer,
  });
  return true;
};

exports.getAllRequests = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => doc.data());
};

exports.markUnresolvedAfter = async (minutes = 5) => {
  const now = Date.now();
  const snapshot = await collection.where('status', '==', 'Pending').get();

  const batch = db.batch();
  let updated = false;

  snapshot.forEach(doc => {
    const data = doc.data();
    const createdAt = new Date(data.createdAt).getTime();
    const ageInMin = (now - createdAt) / 60000;
    if (ageInMin >= minutes) {
      batch.update(doc.ref, {
        status: 'Unresolved',
        unresolvedAt: new Date().toISOString()
      });
      updated = true;
    }
  });

  if (updated) {
    await batch.commit();
    console.log(`⏱️ Some help requests were auto-marked as 'Unresolved' after ${minutes} mins`);
  }
};
