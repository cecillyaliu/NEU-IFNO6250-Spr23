import { useState } from "react";
import "./App.css";

function Login({ handleLogin, error}) {
  const [username, setUserName] = useState("");

  return (
    <div className="login-container">
        <h2 className="title">Login</h2>
        <form onSubmit={
            (e) => {
                e.preventDefault();
                handleLogin(username);
                setUserName("");
            }
        }>
        <label className="username-label">Username: </label>
        <input
            type="text"
            className="input-username"
            value={username}
            onInput={
            (e) => {
                setUserName(e.target.value);
                }
            }
        />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="message-panel">
            {error && 
            <span className="error-message">
                {error}
            </span>}
        </div>
       
    </div>
  );
}

export default Login;