import './App.css';
import {useState} from 'react';

import Content from './Content';
import Login from './Login';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const onLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  }

  const onLogout = () => setIsLoggedIn(false);
  
  return (
    <div className="App">
      { isLoggedIn 
      ? <Content
        username={username}
        onLogout={onLogout}
      />
      : <Login
        onLogin={onLogin}
      />
      }
    </div>
  );
}

export default App;
