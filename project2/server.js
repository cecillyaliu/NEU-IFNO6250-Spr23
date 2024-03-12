const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const chat = require('./chat');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); 


app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

// Create a new session (login)
app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!chat.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  chat.addUser(username);

  res.cookie('sid', sid);
  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
    if (!sessions.containsUser(username)) {
      chat.deleteUser(username);
    }
  }
  res.json({ wasLoggedIn: !!username }); 
});


app.get('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const users = chat.users || [];
  const messages = chat.messages || [];

  res.json({ users, messages });
});

app.post('/api/message', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { message } = req.body;

  if(!message && message !== '') {
    res.status(400).json({ error: 'required-message' });
    return;
  } 

  if (chat.hasHtml(message)) {
    res.status(400).json({ error: 'invalid-message' });
    return;
  }

  chat.messages.push({username, message});

  res.json({ username, message: message });
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));