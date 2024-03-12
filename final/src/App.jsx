import './App.css';
import { useState, useEffect } from 'react';
import initialAvatar from './initialAvatar/avatar.jpg';

import {
  LOGIN_STATUS,
  WORD_STATUS,
  SERVER,
  CLIENT,
  MESSAGES
} from "./constants";

import {
  fetchLogin,
  fetchSession,
  fetchLogout,
  uploadPost,
  fetchPosts,
} from "./services";

import Login from "./Login";
import Loader from './Loader';
import Main from './Main';
import Creation from './Creation';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [wordStatus, setWordStatus] = useState(WORD_STATUS.PENDING);
  const [allPosts, setAllPosts] = useState([]);
  
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
        setError("");
      })
      .catch((err) => {
        setError(MESSAGES[err?.error] || "ERROR");
      });
  };


  function addPost(formData) {
    setWordStatus(WORD_STATUS.PENDING);
    uploadPost(formData)
      .then(() => {
        setWordStatus(WORD_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        setWordStatus(WORD_STATUS.NOT_AVAILABLE);
        setError(MESSAGES[err?.error] || "ERROR");
      })
  }

  function handleLogout() {
    setError("");
    setCurrentUser({});
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout().catch((err) => {
      setError(MESSAGES[err?.error] || "ERROR");
    });
  }

  function getPosts(){
    fetchPosts()
      .then((posts) => {
        setAllPosts(posts);
      })
      .catch((err) => {
        setWordStatus(WORD_STATUS.NOT_AVAILABLE);
        setError(MESSAGES[err?.error] || "ERROR");
      })
  }

  useEffect(() => {
    checkSession();
    getPosts();
    if (avatar === null) {
      setAvatar(initialAvatar);
    }
  },
  []
  );
  return (
    <div className="App">
        {loginStatus === LOGIN_STATUS.PENDING && <Loader/>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN 
          && 
          (<Login handleLogin={handleLogin} error={error}/>)}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN 
          &&
          (<div className='content-panel'>
            <Loader/>
            <div className='main-container'>
              <Main 
                avatar={avatar}
                allPosts={allPosts}
                getPosts={getPosts}
                error={error}/>

            </div>
            <div className="creation-container">
              <Creation 
                username={currentUser.username} 
                avatar={avatar}
                addPost={addPost}
                error={error}
                handleLogout={handleLogout}
                setError={setError}/>
            </div>            
          </div>
          )}
    </div>
  );
}

export default App;
