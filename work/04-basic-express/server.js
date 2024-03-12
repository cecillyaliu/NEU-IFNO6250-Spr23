const { on } = require('events');
const express = require('express');
const app = express();
const PORT = 3000;
const path = require("path");
const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require('./chat-web'); // "chat-web" holds the templates for the generated HTML

app.use('/public',express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});


// Below includes an example of pulling fields from a POST request body
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {

  //console.log(res)
  const data = req.body;
  if (data.sender == '0') {
    chat.addMessage("Bao", data.text);
  } else {
    chat.addMessage("Amit", data.text);
  }
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
