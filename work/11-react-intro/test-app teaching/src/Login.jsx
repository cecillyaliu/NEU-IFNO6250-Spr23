import { useState } from "react";

function Login({onLogin}) {
    const [username, setUsername] = useState('');
    return (
      <form>
        <label>
          <span>Username:</span>
          <input 
            value={username}
            onInput={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => onLogin(username)}>
          Login
        </button>
      </form>
    );
}

export default Login;