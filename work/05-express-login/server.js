const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static(path.join(__dirname, 'public')));

const sessions = {};
const words = {};

app.get('/', (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId && sessions[sessionId]) {
    res.redirect('/word');
    return;
  }

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
      </head>
      <body>
        <div class="panel">
          <img style='width:200px;height:200px' class="logo" src="/public/images/chacha2.jpg" alt="logo"/>
          <h1>Please enter your username to login:</h1>
          <p>Note: Only letters or numbers, no dog or other characters</p>
          <form action="/" method="post">
            <input type="text" name="username" placeholder="Enter your username">
            <button type="submit">Log in</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/', (req, res) => {
  const { username } = req.body;
  if (!username || username === 'dog' || !/^[a-zA-Z0-9]+$/.test(username)) {
    res.status(401).send(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
        </head>
        <body>
          <div class="panel">
            <p>Invalid username. Usernames can only contain letters and numbers, and cannot be "dog".</p>
            <a href="/login">Back to login</a>
          </div>
        </body>
      </html>
    `);
    return;
  }

  const sessionId = uuidv4();
  sessions[sessionId] = { username };
  if (!words[username]) {
      words[username] = '';
  }

  res.cookie('sessionId', sessionId, 
  { maxAge: 60000,
    httpOnly: true,
 });
  res.redirect('/word');
});

app.get('/word', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessions[sessionId]) {
      res.redirect('/');
      return;
    }
  
    const { username } = sessions[sessionId];
    res.send(`
      <html>
        <body>
          <h1>Hello, ${username}! </h1>
          <h1>your stored word is: ${words[username]}</h1>
          <p>Change your word:</p>
          <form action="/word" method="post">
            <input type="text" name="word" placeholder="Enter a word" value="${words[username]}">
            <button type="submit">Change</button>
          </form>
          <a href="/logout">Logout</a>
        </body>
      </html>
    `);
  });

app.post('/word', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessions[sessionId]) {
      res.redirect('/');
      return;
    }
  
    const { username } = sessions[sessionId];
    const { word } = req.body;
    words[username] = word;
  
    res.redirect('/word');
  });


app.get('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessions[sessionId]) {
        return res.status(401).send('Invalid session');
    }
    delete sessions[sessionId];
    res.clearCookie('sessionId');
    res.redirect('/');
});

app.listen(8080, () => {
    console.log('Server started on port 8080');
});