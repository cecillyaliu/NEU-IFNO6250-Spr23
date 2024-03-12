import { useState } from "react";
import checkUsername from "./CheckUsername";

function Login({onLogin}) {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (username) => {
        if (checkUsername(username, setErrorMessage)) {
            onLogin(username);
        } else {
          setUsername('');
        }

    };

    return (
      <form>
          <div className="title">
            <span>Username:</span>
          </div>
          <div className="login-input">
            <input 
              className="username-input"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
            />
            <button className="login-button" type="button" onClick={() => handleSubmit(username)}>
              Login
            </button>
          </div>
          <div className="message">
            {errorMessage && <p>{errorMessage}</p>}   
          </div>
      </form>
    );
}

export default Login;