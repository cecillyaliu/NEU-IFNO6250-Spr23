"use strict";
const {fetchLogin, getLogin, sendMessage, getMessage, deleteSession} = require('./services');

(function() {
    let loggedInUser = '';
    
    function getMessageList(messages) {
        return `  <span class="messages-title">Chatting Room:</span>
        <ul class="messages">` + 
        Object.values(messages).map( message => `
        <li>
          <div class="messages-user">
          <span class="message-sender">${message.username}:</span><br>
          <span class="message-text">${message.message}</span>
          </div>
        </li>    
        `).join('') +
          `</ul>`;
    };

    function getUserList(users) {
        return `  <span class="user-title">Online User:</span>
        <ul class="users">` +
        Object.values(users).map( user => `
          <li>
            <div class="user">
              <span class="username">${user}</span>
            </div>
          </li>
        `).join('') + 
        `</ul>`;
    };

    function renderLogin() {
        const loginPanelEl = document.querySelector('.login-panel');
        const logoutPanelEl = document.querySelector('.logout-panel');
        const errorPanelEl = document.querySelector('.error-panel');
        const messagePanelEl = document.querySelector('.message-panel');
        const spinnerLogin = document.querySelector('.spinner-login');


        loginPanelEl.style.display = "block";
        messagePanelEl.style.display = "none";
        logoutPanelEl.style.display = "none";
        errorPanelEl.style.display = "none";    
        spinnerLogin.style.display = 'none';

    };

    function renderMessage() {
        getMessage()
        .catch((error) => {console.log(error)})
        .then((data) => {
            const htmlMessage =getMessageList(data.messages);
            const htmlUser = getUserList(data.users);
        
            const loginPanelEl = document.querySelector('.login-panel');
            const logoutPanelEl = document.querySelector('.logout-panel');
            const errorPanelEl = document.querySelector('.error-panel');
            const messageShowPanelEl = document.querySelector('.show-panel');
            const messagePanelEl = document.querySelector('.message-panel');
    
            const currentUserEl = document.querySelector('.currentUser');
            currentUserEl.innerHTML = `${loggedInUser}`;
            messageShowPanelEl.innerHTML = `
                ${htmlMessage}
                ${htmlUser}
            `;

            const usersContainer = document.querySelector('.users');
            usersContainer.scrollTop = usersContainer.scrollHeight - usersContainer.offsetHeight;

            const messagesContainer = document.querySelector('.messages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight;

            errorPanelEl.innerHTML = '';
            
            loginPanelEl.style.display = 'none';
            logoutPanelEl.style.display = 'block';
            errorPanelEl.style.display = 'none';
            messagePanelEl.style.display = 'block';

            const spinnerSend = document.querySelector('.spinner-send');
            spinnerSend.style.display = 'none';

        })
    };

    setInterval(render, 5000);

    function render() {
        fetch('/api/session/', {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          }).then(function(response) {
            if (response.status === 200) {
                response.json()
                .then(function(data) {
                    loggedInUser = data.username;
                })
                .then(renderMessage());
            } else {
              renderLogin();
            }
          }).catch(() => renderLogin());
    };
    render();

    const loginPanelEl = document.querySelector('.login-panel');
    const messageSendPanelEl = document.querySelector('.send-panel');
    const errorPanelEl = document.querySelector('.error-panel');
    const logoutPanelEl = document.querySelector('.logout-panel');

    function isValidUsername(username) {
        let isValid = true;
        isValid = isValid && username.trim();
        isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
        return isValid;
      };

      function hasHtml(inputString) {
        const pattern = /<.*?>/s;
        return pattern.test(inputString);
      }

    loginPanelEl.addEventListener('click', e => {
        if (e.target.classList.contains('button-login')) {
            const spinnerLogin = document.querySelector('.spinner-login');
            spinnerLogin.style.display = 'block';
            const usernameEl = document.querySelector('.username');
            if (usernameEl.value === '') {
                errorPanelEl.style.display = "block";
                errorPanelEl.innerHTML = "Username couldn't be null. Please try again.";
                spinnerLogin.style.display = 'none';
                usernameEl.value = '';
            } else if (!isValidUsername(usernameEl.value)) {
                errorPanelEl.style.display = "block";
                errorPanelEl.innerHTML = "Username invalid. Please try again.";
                spinnerLogin.style.display = 'none';
                usernameEl.value = '';
            } else if (usernameEl.value === "dog") {
                errorPanelEl.style.display = "block";
                errorPanelEl.innerHTML = "Dogs are not welcome.";
                spinnerLogin.style.display = 'none';
                usernameEl.value = '';
            } else {
                errorPanelEl.style.display = "none";
                fetchLogin(usernameEl.value).then(res=>{
                loggedInUser = usernameEl.value;
                spinnerLogin.style.display = 'none';
                renderMessage();
                })
            }          
        }
    });

    messageSendPanelEl.addEventListener('click', e => {
        if (e.target.classList.contains('button-change')) {
            const spinnerSend = document.querySelector('.spinner-send');
            spinnerSend.style.display = 'block';
            const message = document.querySelector('.message');
            if (message.value === '') {
                errorPanelEl.style.display = 'block';
                errorPanelEl.innerHTML = "Couldn't be empty. Please enter something.";
                spinnerSend.style.display = 'none';

            } else if (hasHtml(message.value)){
                errorPanelEl.style.display = 'block';
                errorPanelEl.innerHTML = "Invalid input, no related content about html.";
                message.value = '';
                spinnerSend.style.display = 'none';

            } else {
                sendMessage(message.value).then(res => {
                }).then(message.value = '')
                .then(spinnerSend.style.display = 'block'
                )
                .then (
                    renderMessage()
                );
            }
        }
    });

    logoutPanelEl.addEventListener('click', e => {
        if (e.target.classList.contains('button-logout')) {
            // location.reload()
            deleteSession();
            renderLogin();
            errorPanelEl.innerHTML = '';
        }
    });



})();