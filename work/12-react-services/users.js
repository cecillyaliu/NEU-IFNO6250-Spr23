
const { users } = require("./information");

const checkUsername = (username) => {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
};

const checkWord = (word) => {
    let isValid = true;
    isValid = !!word && word.trim();
    isValid = isValid && word.match(/^[A-Za-z]+$/);
    return isValid;
  };

const addUser = (username, word = "") => {
  if (!users[username]) {
    users[username] = { username, word };
  }
  return users[username];
};

const findUser = (username) => {
  if (users[username]) {
    return users[username];
  }
};

const changeWord = (username, word) => {
  if (users[username]) {
    users[username].word = word;
  }
  return users[username];
};

module.exports = {
  checkUsername,
  addUser,
  findUser,
  changeWord,
  checkWord,
};