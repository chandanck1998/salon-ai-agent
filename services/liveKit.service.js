const { AccessToken } = require('livekit-server-sdk');
require('dotenv').config();

const createToken = (identity, roomName) => {
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity }
  );
  token.addGrant({ roomJoin: true, room: roomName });
  console.log(`Generated LiveKit token for identity ${identity} in room ${roomName}`);
  return token.toJwt();
};

module.exports = { createToken };
