const {users, posts} = require("./data");

const addPost = (postData) => {
  const newPost = {
    id: posts.length + 1,
    ...postData
  };
  posts.push(newPost);
  return newPost;
}

const checkUsername = (username) => {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
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

module.exports = {
  checkUsername,
  addUser,
  findUser,
  addPost,
};