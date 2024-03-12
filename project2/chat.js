const users = [];

const messages = [
];

function addUser(user) {
    if (!user || !users.includes(user)) {
      users.push(user);
    }
};

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
  };
  
  function addMessage(sender, text ) {
     messages[messages.length] = {"sender": sender, "text": text};
  };

  const deleteUser = (username) => {
    const idx = users.indexOf(username);
    if(idx > -1){ users.splice(idx, 1)}
  }

  function hasHtml(inputString) {
    const pattern = /<.*?>/s;
    return pattern.test(inputString);
  }

  const chat = {
    users,
    messages,
    addMessage,
    isValidUsername,
    addUser,
    deleteUser,
    hasHtml
  };

  module.exports = chat;