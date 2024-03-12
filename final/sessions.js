const { sessions } = require("./data");
const { v4: uuidv4 } = require("uuid");

const addSession = (username) => {
  const sid = uuidv4();
  sessions[sid] = { username };
  return sid;
};

const checkSession = (sid) => {
  return sessions[sid];
};

module.exports = {
  addSession,
  checkSession
};