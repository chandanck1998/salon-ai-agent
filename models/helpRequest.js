const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data/helpRequests.json');

const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

exports.createRequest = (question, callerId) => {
  const requests = readData();
  const newRequest = {
    id: uuidv4(),
    question,
    callerId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  requests.push(newRequest);
  writeData(requests);
  return newRequest;
};

exports.resolveRequest = (id, answer) => {
  const requests = readData();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index].status = 'Resolved';
    requests[index].resolvedAt = new Date().toISOString();
    requests[index].answer = answer;
    writeData(requests);
    return true;
  }
  return false;
};

exports.getAllRequests = () => readData();

exports.markUnresolvedAfter = (minutes = 5) => {
  const requests = readData();
  const now = Date.now();
  let updated = false;

  requests.forEach(req => {
    if (req.status === 'Pending') {
      const createdAt = new Date(req.createdAt).getTime();
      const ageInMin = (now - createdAt) / 60000;
      if (ageInMin >= minutes) {
        req.status = 'Unresolved';
        req.unresolvedAt = new Date().toISOString();
        updated = true;
      }
    }
  });

  if (updated) {
    writeData(requests);
    console.log(`⏱️ Some help requests were auto-marked as 'Unresolved' after ${minutes} mins`);
  }
};
