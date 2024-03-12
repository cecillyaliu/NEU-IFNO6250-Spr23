const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {
  // Conditional Chaining operator ?.
  // Use MDN to learn more
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function containsUser(username) {
  return Object.values(sessions).some(
    (session) => session.username === username
  );
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  containsUser
};
