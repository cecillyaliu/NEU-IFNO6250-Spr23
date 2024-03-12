import { useState, useEffect } from "react";
import "./App.css";

import {
  LOGIN_STATUS,
  WORD_STATUS,
  SERVER,
  CLIENT,
  MESSAGES,
} from "./constants";
import {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchWord,
} from "./services";


import Login from "./Login";
import Loader from "./Loader";
import Word from "./Word";
import Logout from "./Logout";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [wordStatus, setWordStatus] = useState(WORD_STATUS.PENDING);

  function checkSession() {
    fetchSession()
      .then((session) => {
        const { userData } = session;
        setCurrentUser({
          username: userData.username,
          word: userData.word,
        });
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setWordStatus(WORD_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      });
  }

  function handleLogin(username) {
    fetchLogin(username)
      .then((user) => {
        const { userData } = user;
        setCurrentUser(userData);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setWordStatus(WORD_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        setError(MESSAGES[err?.error] || "ERROR");
      });
  }

  function changeWord(word) {
    setWordStatus(WORD_STATUS.PENDING);
    fetchWord(word)
      .then((user) => {
        const { userData } = user;
        setCurrentUser({
          username: userData.username,
          word: userData.word,
        });
        setWordStatus(WORD_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        setCurrentUser({
          username: currentUser.username,
          word: "",
        });
        setWordStatus(WORD_STATUS.NOT_AVAILABLE);
        setError(MESSAGES[err?.error] || "ERROR");
      });
  }

  function handleLogout() {
    setError("");
    setCurrentUser({});
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout().catch((err) => {
      setError(MESSAGES[err?.error] || "ERROR");
    });
  }

  useEffect(() => {
    checkSession();
    }, 
    []
  );

  return (
    <div className="App">
      <main>
        {loginStatus === LOGIN_STATUS.PENDING && <Loader/>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <Login handleLogin={handleLogin} error={error}/>
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content-panel">
            {wordStatus === WORD_STATUS.PENDING && <Loader/>}
            <Word 
            username={currentUser.username} 
            changeWord={changeWord} 
            word={currentUser.word} 
            error={error}/>
            <Logout 
            username={currentUser.username} 
            handleLogout={handleLogout} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

