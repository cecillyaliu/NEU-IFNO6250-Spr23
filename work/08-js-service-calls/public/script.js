/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/


(function () {
  function fetchLogin(username) {
    return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })["catch"](function (err) {
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
  }
  ;
  function fetchLogin2(username) {
    return fetch('/api/session/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })["catch"](function (err) {
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
  }
  ;
  function fetchPutWord(word) {
    return fetch('/api/word/', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        word: word
      })
    })["catch"](function (err) {
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
  }
  ;
  function fetchGetWord() {
    return fetch('/api/word/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })["catch"](function (err) {
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
  }
  ;
  var buttonEl = document.getElementById('button-login');
  var changeEl = document.getElementById('button-change');
  var logoutEl = document.getElementById('button-logout');
  var login = document.getElementById('login');
  var shows = document.getElementById('shows');
  var username = document.getElementById('username');
  var currentUserEl = document.getElementById('currentUser');
  var word = document.getElementById('word');
  var showWord = document.getElementById('showWord');
  buttonEl.onclick = function () {
    if (username.value == '') {
      message.innerHTML = "Username couldn't be null. Please try again.";
    } else if (username.value === "dog") {
      message.innerHTML = "Dogs are not welcome.";
    } else if (!username.value.match(/^[A-Za-z]*$/)) {
      message.innerHTML = "Invalid characters, only letters. Please try again.";
    } else {
      fetchLogin(username.value).then(function (res) {
        currentUser.innerHTML = res.username;
        shows.style.display = 'block';
        login.style.display = 'none';
        fetchGetWord(word.value).then(function (res) {
          showWord.innerHTML = res.storedWord;
        });
      });
    }
  };
  changeEl.onclick = function () {
    fetchPutWord(word.value).then(function (res) {
      showWord.innerHTML = res.storedWord;
    });
  };
  logoutEl.onclick = function () {
    location.reload();
  };
})();
/******/ })()
;
//# sourceMappingURL=script.js.map