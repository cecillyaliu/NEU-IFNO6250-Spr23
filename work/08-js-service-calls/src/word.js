"use strict";
const { wordFor, isValidUsername, isValidWord } = require('../users');
const {fetchLogin, getLogin, putWord, getWord, deleteSession} = require('./services');

(function() {
    let loggedInUser = '';


    function renderLogin() {
        const htmlLogin =  `
            <h1>Welcome~</h1>
            <h2>Login first<h2>
            <h3>Input your username:</h3><br>
            <input class="username" type="text" placeholder="username">
            <button class="button-login">Login</button><br>
            <p>Note: Only letters, dogs are not welcome.</p>
        `;

        const htmlWord = `
            <h1>Hello, <span class="currentUser"></span></h1> <br>
            <h2>Your word is:<span class="showWord"></span></h2> <br><br>
            <h3>Want to change? 
            <span>Input your new word:</span> <br>
                <input class="word" type="text" placeholder="word">
            <button class="button-change">change</button>
        `;

        const htmlLogout = `
            Getting tired!<button class="button-logout">logout</button>
        `;

        const loginPanelEl = document.querySelector('.login-panel');
        const logoutPanelEl = document.querySelector('.logout-panel');
        const wordPanelEl = document.querySelector('.word-panel');
        const messagePanelEl = document.querySelector('.message-panel');
        loginPanelEl.innerHTML = htmlLogin;
        logoutPanelEl.innerHTML = htmlLogout;
        wordPanelEl.innerHTML = htmlWord;

        loginPanelEl.style.display = "block";
        messagePanelEl.style.display = "none";
        logoutPanelEl.style.display = "none";
        wordPanelEl.style.display = "none";
        let loginButtonEl = document.getElementsByClassName('button-login');
        let username = document.getElementsByClassName('username');


    
    };

    function renderWord() {
        const htmlWord = `
        <h1>Hello, <span class="currentUser">${loggedInUser}</span></h1>
        <h2>Your word is:<span class="showWord">${getWordByWordFor()} </span></h2>
        <h3>Want to change? </h3>
        <span>Input your new word:</span> <br>
            <input class="word" type="text" placeholder="word">
        <button class="button-change">change</button>
        `;

        const htmlLogout = `
            Getting tired!<button class="button-logout">logout</button>
        `;
        const loginPanelEl = document.querySelector('.login-panel');
        const logoutPanelEl = document.querySelector('.logout-panel');
        const wordPanelEl = document.querySelector('.word-panel');
        const messagePanelEl = document.querySelector('.message-panel');
        logoutPanelEl.innerHTML = htmlLogout;
        wordPanelEl.innerHTML = htmlWord;


        let word = document.getElementsByClassName('word');
        let showWord = document.getElementsByClassName('showWord');
        
        wordPanelEl.innerHTML = htmlWord;
        logoutPanelEl.innerHTML = htmlLogout;


        messagePanelEl.innerHTML = '';
        
        loginPanelEl.style.display = 'none';
        logoutPanelEl.style.display = 'block';
        wordPanelEl.style.display = 'block';
        messagePanelEl.style.display = 'block';

        // showWord.innerHTML = getWordByWordFor();
        // getWord(word.value).then(res=>{
        //     if (res.storedWord === '') {
        //         showWord.innerHTML = "None";
        //     } else {
        //         showWord.innerHTML = res.storedWord
        //     }
        // });

        
    };

    function render() {
        fetch('/api/session/', {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          }).then(function(response) {
            if (response.status === 200) {
              // User is logged in, show message panel
                renderWord();
            } else {
              // User is not logged in, show login panel
              renderLogin();
            }
          }).catch((err) => renderLogin());
    };
    render();

    function getWordByWordFor() {
        const word = wordFor[loggedInUser];
        const storedWord = word ? word : "None (Not set yet)";
        return storedWord;
    };

    const loginPanelEl = document.querySelector('.login-panel');
    const messagePanelEl = document.querySelector('.message-panel');
    const wordPanelEl = document.querySelector('.word-panel');
    const logoutPanelEl = document.querySelector('.logout-panel');

    loginPanelEl.addEventListener('click', e => {
        if (e.target.classList.contains('button-login')) {
            const usernameEl = document.querySelector('.username');
            if (usernameEl.value === '') {
                messagePanelEl.style.display = "block";
                messagePanelEl.innerHTML = "Username couldn't be null. Please try again.";
                usernameEl.value = '';
            } else if (!isValidUsername(usernameEl.value)) {
                messagePanelEl.style.display = "block";
                messagePanelEl.innerHTML = "Username invalid. Please try again.";
                usernameEl.value = '';
            } else if (usernameEl.value === "dog") {
                messagePanelEl.style.display = "block";
                messagePanelEl.innerHTML = "Dogs are not welcome.";
                usernameEl.value = '';
            } else {
                messagePanelEl.style.display = "none";
                fetchLogin(usernameEl.value).then(res=>{
                loggedInUser = usernameEl.value;
                renderWord();
                })
            }          
        }
    });

    wordPanelEl.addEventListener('click', e => {
        if (e.target.classList.contains('button-change')) {
            const word = document.querySelector('.word');
            const showWord = document.querySelector('.showWord');
            if (word.value === '') {
                messagePanelEl.innerHTML = "Couldn't be empty. Please enter something.";
            } else if(!isValidWord(word.value)) {
                messagePanelEl.innerHTML = "Invalid word. Try again.";
            } else {
                putWord(word.value).then(res => {
                    wordFor[loggedInUser] = word.value;
                    showWord.innerHTML = res.storedWord;
                });
            }
        }
    });

    logoutPanelEl.addEventListener('click', e => {
        if (e.target.classList.contains('button-logout')) {
            // location.reload()
            deleteSession();
            renderLogin();
            messagePanelEl.innerHTML = '';
        }
    });



})();