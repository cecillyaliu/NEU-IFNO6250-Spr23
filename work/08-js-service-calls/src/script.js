"use strict";
(function() {
    function fetchLogin(username) {
        return fetch('/api/session/', {
          method: 'POST',
          headers: {
            'content-type': 'application/json' 
          },
      
          body: JSON.stringify({
            username: username
          })
        })
        ["catch"](function (err) {
          return Promise.reject({
            error: 'network-error'
          });
        }).then(function (response) {
          if (!response.ok) {
            return response.json().then(function (err) {
              return Promise.reject(err);
            });
          }
          return response.json();
        });
      };

      function fetchLogin2(username) {
        return fetch('/api/session/', {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
        ["catch"](function (err) {
          return Promise.reject({
            error: 'network-error'
          });
        }).then(function (response) {
          if (!response.ok) {
            return response.json().then(function (err) {
              return Promise.reject(err);
            });
          }
          return response.json();
        });
      };
    
    function fetchPutWord(word) {
        return fetch('/api/word/', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            word: word
          })
        })
        ["catch"](function (err) {
          return Promise.reject({
            error: 'network-error'
          });
        }).then(function (response) {
          if (!response.ok) {
            return response.json().then(function (err) {
              return Promise.reject(err);
            });
          }
          return response.json(); 
        });
      };
    
      function fetchGetWord() {
        return fetch('/api/word/', {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
    
        ["catch"](function (err) {
          return Promise.reject({
            error: 'network-error'
          });
        }).then(function (response) {
          if (!response.ok) {
            return response.json().then(function (err) {
              return Promise.reject(err);
            });
          }
          return response.json(); 
        });
      };
      
      let buttonEl = document.getElementById('button-login')
      let changeEl = document.getElementById('button-change')
      let logoutEl = document.getElementById('button-logout')
      let login = document.getElementById('login')
      let shows = document.getElementById('shows')
      let username = document.getElementById('username')
      let currentUserEl = document.getElementById('currentUser')
      let word = document.getElementById('word')
      let showWord = document.getElementById('showWord')
    
      buttonEl.onclick = ()=>{
      if (username.value=='' ) {
          message.innerHTML = "Username couldn't be null. Please try again.";
        }else if (username.value === "dog") {
          message.innerHTML = "Dogs are not welcome.";
        }else if (!username.value.match(/^[A-Za-z]*$/)) {
          message.innerHTML = "Invalid characters, only letters. Please try again.";
        } else {
          fetchLogin(username.value).then(res=>{
          currentUser.innerHTML = res.username
          shows.style.display = 'block'
          login.style.display = 'none'
          fetchGetWord(word.value).then(res=>{
              showWord.innerHTML = res.storedWord
            })
          })
        }
    
      }
      changeEl.onclick = ()=>{
          fetchPutWord(word.value).then(res=>{
              showWord.innerHTML = res.storedWord
          })
      };
    
    
      logoutEl.onclick = ()=>{
          location.reload()
      };
})();
