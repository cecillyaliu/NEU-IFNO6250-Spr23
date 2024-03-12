/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteSession": () => (/* binding */ deleteSession),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "getLogin": () => (/* binding */ getLogin),
/* harmony export */   "getMessage": () => (/* binding */ getMessage),
/* harmony export */   "loginStatusCheck": () => (/* binding */ loginStatusCheck),
/* harmony export */   "sendMessage": () => (/* binding */ sendMessage)
/* harmony export */ });
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
function getLogin(username) {
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
function sendMessage(message) {
  return fetch('/api/message/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message: message
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
function getMessage() {
  return fetch('/api/message/', {
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/


var _require = __webpack_require__(/*! ./services */ "./src/services.js"),
  fetchLogin = _require.fetchLogin,
  getLogin = _require.getLogin,
  sendMessage = _require.sendMessage,
  getMessage = _require.getMessage,
  deleteSession = _require.deleteSession;
(function () {
  var loggedInUser = '';
  function getMessageList(messages) {
    return "  <span class=\"messages-title\">Chatting Room:</span>\n        <ul class=\"messages\">" + Object.values(messages).map(function (message) {
      return "\n        <li>\n          <div class=\"messages-user\">\n          <span class=\"message-sender\">".concat(message.username, ":</span><br>\n          <span class=\"message-text\">").concat(message.message, "</span>\n          </div>\n        </li>    \n        ");
    }).join('') + "</ul>";
  }
  ;
  function getUserList(users) {
    return "  <span class=\"user-title\">Online User:</span>\n        <ul class=\"users\">" + Object.values(users).map(function (user) {
      return "\n          <li>\n            <div class=\"user\">\n              <span class=\"username\">".concat(user, "</span>\n            </div>\n          </li>\n        ");
    }).join('') + "</ul>";
  }
  ;
  function renderLogin() {
    var loginPanelEl = document.querySelector('.login-panel');
    var logoutPanelEl = document.querySelector('.logout-panel');
    var errorPanelEl = document.querySelector('.error-panel');
    var messagePanelEl = document.querySelector('.message-panel');
    var spinnerLogin = document.querySelector('.spinner-login');
    loginPanelEl.style.display = "block";
    messagePanelEl.style.display = "none";
    logoutPanelEl.style.display = "none";
    errorPanelEl.style.display = "none";
    spinnerLogin.style.display = 'none';
  }
  ;
  function renderMessage() {
    getMessage()["catch"](function (error) {
      console.log(error);
    }).then(function (data) {
      var htmlMessage = getMessageList(data.messages);
      var htmlUser = getUserList(data.users);
      var loginPanelEl = document.querySelector('.login-panel');
      var logoutPanelEl = document.querySelector('.logout-panel');
      var errorPanelEl = document.querySelector('.error-panel');
      var messageShowPanelEl = document.querySelector('.show-panel');
      var messagePanelEl = document.querySelector('.message-panel');
      var currentUserEl = document.querySelector('.currentUser');
      currentUserEl.innerHTML = "".concat(loggedInUser);
      messageShowPanelEl.innerHTML = "\n                ".concat(htmlMessage, "\n                ").concat(htmlUser, "\n            ");
      var usersContainer = document.querySelector('.users');
      usersContainer.scrollTop = usersContainer.scrollHeight - usersContainer.offsetHeight;
      var messagesContainer = document.querySelector('.messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      errorPanelEl.innerHTML = '';
      loginPanelEl.style.display = 'none';
      logoutPanelEl.style.display = 'block';
      errorPanelEl.style.display = 'none';
      messagePanelEl.style.display = 'block';
      var spinnerSend = document.querySelector('.spinner-send');
      spinnerSend.style.display = 'none';
    });
  }
  ;
  setInterval(render, 5000);
  function render() {
    fetch('/api/session/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then(function (data) {
          loggedInUser = data.username;
        }).then(renderMessage());
      } else {
        renderLogin();
      }
    })["catch"](function () {
      return renderLogin();
    });
  }
  ;
  render();
  var loginPanelEl = document.querySelector('.login-panel');
  var messageSendPanelEl = document.querySelector('.send-panel');
  var errorPanelEl = document.querySelector('.error-panel');
  var logoutPanelEl = document.querySelector('.logout-panel');
  function isValidUsername(username) {
    var isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
  }
  ;
  function hasHtml(inputString) {
    var pattern = /<[\s\S]*?>/;
    return pattern.test(inputString);
  }
  loginPanelEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-login')) {
      var spinnerLogin = document.querySelector('.spinner-login');
      spinnerLogin.style.display = 'block';
      var usernameEl = document.querySelector('.username');
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
        fetchLogin(usernameEl.value).then(function (res) {
          loggedInUser = usernameEl.value;
          spinnerLogin.style.display = 'none';
          renderMessage();
        });
      }
    }
  });
  messageSendPanelEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-change')) {
      var spinnerSend = document.querySelector('.spinner-send');
      spinnerSend.style.display = 'block';
      var message = document.querySelector('.message');
      if (message.value === '') {
        errorPanelEl.style.display = 'block';
        errorPanelEl.innerHTML = "Couldn't be empty. Please enter something.";
        spinnerSend.style.display = 'none';
      } else if (hasHtml(message.value)) {
        errorPanelEl.style.display = 'block';
        errorPanelEl.innerHTML = "Invalid input, no related content about html.";
        message.value = '';
        spinnerSend.style.display = 'none';
      } else {
        sendMessage(message.value).then(function (res) {}).then(message.value = '').then(spinnerSend.style.display = 'block').then(renderMessage());
      }
    }
  });
  logoutPanelEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-logout')) {
      // location.reload()
      deleteSession();
      renderLogin();
      errorPanelEl.innerHTML = '';
    }
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map