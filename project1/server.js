const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static(path.join(__dirname, 'public')));

const sessions = {};

const compare = require('./compare');
const wordList = require('./words');
let submitWord = "";

const userProfile = {};

const game = {};
let currentUser = "";

function clear(username){
    if (!game[username]) {
        game[username] = {};
    }
    game[username]['previousGuess'] = "none";
    game[username]['previousGuessNum'] = 0;
    game[username]['previousStatus'] = "none";
    game[username]['word'] = process.env.OVERRIDE || pickWord(wordList);
    game[username]['turns'] = 0;
    game[username]['guessedWord'] = {};
};

function pickWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
};

function validWord(word, len, guessedWord) {
    if (word.length !== len) {
        game[currentUser]['previousStatus'] = "Invalid! Length wrong.";
        return false;
    } else if ( !/^[a-zA-Z]+$/.test(word) ) {
        game[currentUser]['previousStatus'] = "Invalid! Letters only.";
        return false;
    } else if (guessedWord.hasOwnProperty(word)) {
        game[currentUser]['previousStatus'] = "Invalid! Already guessed.";
        return false;
    } else if (!wordList.includes(word)){
        game[currentUser]['previousStatus'] = "Invalid! Not in list.";
        return false;
    } else {
        return true;
    }
};

function exactMatch(word, guess) {
    return word.toUpperCase() === guess.toUpperCase(); // Case-insensitive compare
};

  
app.get('/', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId && sessions[sessionId]) {
        let listItems = "";
        for (let word in game[currentUser]['guessedWord']) {
            listItems += `<li>${word}:&nbsp;${game[currentUser]['guessedWord'][word]}</li>`;
        }
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
                </head>
                <body>
                    <div class="panel">
                        <div class="header">
                            <h1>Guess The Word!</h1>
                        </div>
                        <div class="panel-word">
                            <h3 class="all-words">All Words:</h2>
                            <ul class="words-panel">
                                ${wordList.map(word => `<li>${word}</li>`).join('')}
                            </ul>
                            <h3 class="previous-words">Previously guessed words:</h2>
                            <ul class="guessedWord-panel">
                                ${listItems}
                            </ul>
                        </div>
                        <div class="summary-panel">
                            <h3 class="title0">Previous result:</h4>
                            <p class="text0">${game[currentUser]['previousStatus']}</p>
                            <h3 class="title1">Total guess quantity:</h4> 
                            <p class="text1">${game[currentUser]['turns']}</p>
                            <br>
                            <h4 class="title2">Previous guess:</h4> 
                            <p class="text2">${game[currentUser]['previousGuess']} </p>
                            <h4 class="title3">Previous guess matched number:</h4>
                            <p class="text3">${game[currentUser]['previousGuessNum']}</p>
                        </div>
                        <div class="guess-panel">
                            <form class="guess-input" action="/guess" method="post">
                                <b>Guess the word:</b>
                                <input type="text" name="guessedWord" placeholder="Enter a word">
                                <button type="submit" name="action" value="guess">Confirm</button>
                            </form>
                            <div class="button-container">
                                <form action="/" method="post">
                                    <button type="submit" name="action" value="play-again">Play Again?</button>
                                </form>
                                <form action="/logout" method="get">
                                    <button type="submit">Logout</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </body>
            </html>`);
        return;
    }
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
            </head>
            <body>
                <div class="panel-login">
                    <img style='width:200px;height:200px' class="logo" src="/public/images/chacha2.jpg" alt="logo"/>
                    <h1>Guess the Word!</h1>
                    <h3>Please login first.</h3>
                    <p>* Note: Only letters or numbers, no dog or other characters.</p>          
                    <form action="/login" method="post">
                        <input type="text" name="username" placeholder="Enter your username">
                        <button type="submit">Login</button>
                    </form>
                </div>
            </body>
        </html>
    `);
    return;

});

app.post("/", (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId && sessions[sessionId] && req.body.action === "play-again") {
      clear(currentUser);
      console.log("Hello,", currentUser, "! Enjoy the game!", " The word is ", game[currentUser]['word'], ".(This is for grading and TA testing.)");
      res.redirect("/");
    } else {
        res.status(401).send(`
        <html>
            <head>
            <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
            </head>
            <body>
            <div class="panel-login">
                <p>Invalid user information. Please login again.</p>
                <form action="/login" method="post">
                    <input type="text" name="username" placeholder="Enter your username">
                    <button type="submit">Log in</button>
                </form>
            </div>
            </body>
        </html>
        `);
        return;
    }
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username || username === 'dog' || !/^[a-zA-Z0-9]+$/.test(username)) {
        res.status(401).send(`
        <html>
            <head>
            <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
            </head>
            <body>
            <div class="panel-login">
                <h2>Invalid username. </h2>
                <p>Usernames can only contain letters and numbers, and cannot be "dog".</p>
                <form action="/" method="get">
                    <button type="submit">Try Again</button>
                </form>
            </div>
            </body>
        </html>
        `);
        return;
    }
    currentUser = username;
    if (userProfile.hasOwnProperty(username)) {
        const sessionId = uuidv4();
        sessions[sessionId] = { username };
        res.cookie('sessionId', sessionId, 
        { 
            maxAge: 60000,
            httpOnly: true,
        });
        console.log("Hello,", currentUser, "! Enjoy the game!", " The word is ", game[currentUser]['word'], ".(This is for grading and TA testing.)");
        res.redirect('/');
    } else {
        userProfile[currentUser] = new Date();
        const sessionId = uuidv4();
        sessions[sessionId] = { currentUser };
        res.cookie('sessionId', sessionId, 
        { 
            maxAge: 60000,
            httpOnly: true,
        });
        clear(currentUser);
        console.log("Hello,", currentUser, "! Enjoy the game!", " The word is ", game[currentUser]['word'], ".(This is for grading and TA testing.)");
        res.redirect('/new-game');
    }
    
});

app.get('/new-game', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId && sessions[sessionId]) {
        let listItems = "";
        for (let word in game[currentUser]['guessedWord']) {
            listItems += `<li>${word}:&nbsp;${game[currentUser]['guessedWord'][word]}</li>`;
          }
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
                </head>
                <body>
                    <div class="panel">
                        <div class="header">
                            <h3>Hello, new player! </h3>
                            <h1>Guess The Word!</h1>
                        </div>
                        <div class="panel-word">
                            <h3 class="all-words">All Words:</h2>
                            <ul class="words-panel">
                                ${wordList.map(word => `<li>${word}</li>`).join('')}
                            </ul>
                            <h3 class="previous-words">Previously guessed words:</h2>
                            <ul class="guessedWord-panel">
                                ${listItems}
                            </ul>
                        </div>
                        <div class="summary-panel">
                            <h3 class="title0">Previous result:</h4>
                            <p class="text0">${game[currentUser]['previousStatus']}</p>
                            <h3 class="title1">Total guess quantity:</h4> 
                            <p class="text1">${game[currentUser]['turns']}</p>
                            <br>
                            <h4 class="title2">Previous guess:</h4> 
                            <p class="text2">${game[currentUser]['previousGuess']} </p>
                            <h4 class="title3">Previous guess matched number:</h4>
                            <p class="text3">${game[currentUser]['previousGuessNum']}</p>
                        </div>
                        <div class="guess-panel">
                            <form class="guess-input" action="/guess" method="post">
                                <b>Guess the word:</b>
                                <input type="text" name="guessedWord" placeholder="Enter a word">
                                <button type="submit" name="action" value="guess">Confirm</button>
                            </form>
                            <div class="button-container">
                                <form action="/" method="post">
                                    <button type="submit" name="action" value="play-again">Play Again?</button>
                                </form>
                                <form action="/logout" method="get">
                                    <button type="submit">Logout</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </body>
            </html>`);
        return;
    }
});



app.post('/guess', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessions[sessionId]) {
        res.status(401).send(`
        <html>
            <head>
            <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
            </head>
            <body>
            <div class="panel-login">
                <p>Fail to post '/guess'. Invalid user information. Please login again.</p>
                <form action="/login" method="post">
                    <input type="text" name="username" placeholder="Enter your username">
                    <button type="submit">Log in</button>
                </form>
            </div>
            </body>
        </html>
        `);
        return;
    }
    submitWord = req.body.guessedWord;
    res.redirect('guess');

});

app.get('/guess', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessions[sessionId]) {
        res.send(`
            <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
            </head>
            <body>
                <div class="panel-login">
                <img style='width:200px;height:200px' class="logo" src="/public/images/chacha2.jpg" alt="logo"/>
                <h1>Fail to guess. Invalid login information, please login again.</h1>
                <p>* Note: Only letters or numbers, no dog or other characters.</p>          
                <form action="/login" method="get">
                    <input type="text" name="username" placeholder="Enter your username">
                    <button type="submit">Log in</button>
                </form>
                </div>
            </body>
            </html>
        `);
        return;
    }
    if (exactMatch(game[currentUser]['word'], submitWord)) {
        game[currentUser]['previousStatus'] = "correct";
        res.send(`
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/public/css/styles.css">
            </head>
            <body>
                <div class="panel-login">
                    <img style='width:200px;height:200px' class="logo" src="/public/images/avatar-amit.jpg" alt="logo"/>
                    <h1>Cheers! You have won the game!!</h1>
                    <h2> The secret word is ${game[currentUser]['word']} ! </h2>          
                    <div class="button-container">
                        <form action="/" method="post">
                            <button type="submit" name="action" value="play-again">Play Again?</button>
                        </form>
                        <form action="/logout" method="get">
                            <button type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </body>
        </html>
        `);
        clear(currentUser);
        return;
    }
    if (validWord(submitWord, game[currentUser]['word'].length, game[currentUser]['guessedWord'])) {
        game[currentUser]['turns']++;
        game[currentUser]['previousGuess'] = submitWord;
        game[currentUser]['previousGuessNum'] = compare(game[currentUser]['word'], submitWord);
        game[currentUser]['guessedWord'][submitWord] = game[currentUser]['previousGuessNum'];
        
        game[currentUser]['previousStatus'] = "Wrong, try another one!";
        
        res.redirect('/');
    } else {
        game[currentUser]['turns']++;
        game[currentUser]['previousGuess'] = submitWord;
        game[currentUser]['previousGuessNum'] = 0;
        res.redirect('/');
    }
    
  });


app.get('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessions[sessionId]) {
        return res.status(401).send('Invalid session');
    }
    currentUser = "";
    delete sessions[sessionId];
    res.clearCookie('sessionId');
    res.redirect('/');

});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});