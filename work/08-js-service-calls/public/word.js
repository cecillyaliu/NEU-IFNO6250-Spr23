/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteSession": () => (/* binding */ deleteSession),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "getLogin": () => (/* binding */ getLogin),
/* harmony export */   "getWord": () => (/* binding */ getWord),
/* harmony export */   "getWordByWordFor": () => (/* binding */ getWordByWordFor),
/* harmony export */   "loginStatusCheck": () => (/* binding */ loginStatusCheck),
/* harmony export */   "putWord": () => (/* binding */ putWord)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function getLogin(username) {
  return fetch('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    }
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

;
function deleteSession() {
  return fetch('/api/session/', {
    method: 'DELETE',
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
function putWord(word) {
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
function getWord() {
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
function getWordByWordFor() {
  var word = wordFor[loggedInUser];
  var storedWord = word ? word : "None";
  return Promise.resolve({
    storedWord: storedWord
  });
}
function loginStatusCheck() {
  return getLogin().then(function (data) {
    // user is logged in if data.username exists
    if (data.username) {
      return true;
    } else {
      return false;
    }
  })["catch"](function (error) {
    // handle network error or any other error
    return false;
  });
}

/***/ }),

/***/ "./users.js":
/*!******************!*\
  !*** ./users.js ***!
  \******************/
/***/ ((module) => {

// Odd naming on "wordFor"?
// This is chosen to make the use of it read more naturally:
// `wordFor[username] = word;`
//
// Some teams will embrace that, others will want a more rigidly consistent style

var wordFor = {};

// We could have some functions to abstract the storage of words
// Similar to how sessions.js never exports the sessions object

// I've exported the wordFor object instead because our use is so simple
// - different people in the industry have different views on when is the
// best time to put a layer of abstraction around data

function isValidUsername(username) {
  var isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}
function isValidWord(word) {
  var isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}
module.exports = {
  isValidUsername: isValidUsername,
  isValidWord: isValidWord,
  wordFor: wordFor
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/word.js ***!
  \*********************/


var _require = __webpack_require__(/*! ../users */ "./users.js"),
  wordFor = _require.wordFor,
  isValidUsername = _require.isValidUsername,
  isValidWord = _require.isValidWord;
var _require2 = __webpack_require__(/*! ./services */ "./src/services.js"),
  fetchLogin = _require2.fetchLogin,
  getLogin = _require2.getLogin,
  putWord = _require2.putWord,
  getWord = _require2.getWord,
  deleteSession = _require2.deleteSession;
(function () {
  var loggedInUser = '';
  function renderLogin() {
    var htmlLogin = "\n            <h1>Welcome~</h1>\n            <h2>Login first<h2>\n            <h3>Input your username:</h3><br>\n            <input class=\"username\" type=\"text\" placeholder=\"username\">\n            <button class=\"button-login\">Login</button><br>\n            <p>Note: Only letters, dogs are not welcome.</p>\n        ";
    var htmlWord = "\n            <h1>Hello, <span class=\"currentUser\"></span></h1> <br>\n            <h2>Your word is:<span class=\"showWord\"></span></h2> <br><br>\n            <h3>Want to change? \n            <span>Input your new word:</span> <br>\n                <input class=\"word\" type=\"text\" placeholder=\"word\">\n            <button class=\"button-change\">change</button>\n        ";
    var htmlLogout = "\n            Getting tired!<button class=\"button-logout\">logout</button>\n        ";
    var loginPanelEl = document.querySelector('.login-panel');
    var logoutPanelEl = document.querySelector('.logout-panel');
    var wordPanelEl = document.querySelector('.word-panel');
    var messagePanelEl = document.querySelector('.message-panel');
    loginPanelEl.innerHTML = htmlLogin;
    logoutPanelEl.innerHTML = htmlLogout;
    wordPanelEl.innerHTML = htmlWord;
    loginPanelEl.style.display = "block";
    messagePanelEl.style.display = "none";
    logoutPanelEl.style.display = "none";
    wordPanelEl.style.display = "none";
    var loginButtonEl = document.getElementsByClassName('button-login');
    var username = document.getElementsByClassName('username');
  }
  ;
  function renderWord() {
    var htmlWord = "\n        <h1>Hello, <span class=\"currentUser\">".concat(loggedInUser, "</span></h1>\n        <h2>Your word is:<span class=\"showWord\">").concat(getWordByWordFor(), " </span></h2>\n        <h3>Want to change? </h3>\n        <span>Input your new word:</span> <br>\n            <input class=\"word\" type=\"text\" placeholder=\"word\">\n        <button class=\"button-change\">change</button>\n        ");
    var htmlLogout = "\n            Getting tired!<button class=\"button-logout\">logout</button>\n        ";
    var loginPanelEl = document.querySelector('.login-panel');
    var logoutPanelEl = document.querySelector('.logout-panel');
    var wordPanelEl = document.querySelector('.word-panel');
    var messagePanelEl = document.querySelector('.message-panel');
    logoutPanelEl.innerHTML = htmlLogout;
    wordPanelEl.innerHTML = htmlWord;
    var word = document.getElementsByClassName('word');
    var showWord = document.getElementsByClassName('showWord');
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
  }

  ;
  function render() {
    fetch('/api/session/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        // User is logged in, show message panel
        renderWord();
      } else {
        // User is not logged in, show login panel
        renderLogin();
      }
    })["catch"](function (err) {
      return renderLogin();
    });
  }
  ;
  render();
  function getWordByWordFor() {
    var word = wordFor[loggedInUser];
    var storedWord = word ? word : "None (Not set yet)";
    return storedWord;
  }
  ;
  var loginPanelEl = document.querySelector('.login-panel');
  var messagePanelEl = document.querySelector('.message-panel');
  var wordPanelEl = document.querySelector('.word-panel');
  var logoutPanelEl = document.querySelector('.logout-panel');
  loginPanelEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-login')) {
      var usernameEl = document.querySelector('.username');
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
        fetchLogin(usernameEl.value).then(function (res) {
          loggedInUser = usernameEl.value;
          renderWord();
        });
      }
    }
  });
  wordPanelEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-change')) {
      var word = document.querySelector('.word');
      var showWord = document.querySelector('.showWord');
      if (word.value === '') {
        messagePanelEl.innerHTML = "Couldn't be empty. Please enter something.";
      } else if (!isValidWord(word.value)) {
        messagePanelEl.innerHTML = "Invalid word. Try again.";
      } else {
        putWord(word.value).then(function (res) {
          wordFor[loggedInUser] = word.value;
          showWord.innerHTML = res.storedWord;
        });
      }
    }
  });
  logoutPanelEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-logout')) {
      // location.reload()
      deleteSession();
      renderLogin();
      messagePanelEl.innerHTML = '';
    }
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=word.js.map