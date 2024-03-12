import { useState } from "react";
import "./App.css";

function Word ({username, changeWord, word, error }) {
  const [currentWord, setCurrentWord] = useState("");

  return (
    <div className="word-container">
        <div className="stored-panel">
            <span className="word-label">Hello, {username}! your stored word is:     </span>
            <span className="word-stored">
                {!word ? "(Nothing here)" : word}
            </span>
        </div>
        <h1 className="title">One Word One Snack!</h1>
        <h2 className="sub-title">Set a new word or Change your word.</h2>
        <form onSubmit={
            (e) => {
                e.preventDefault();
                if (currentWord) {
                changeWord(currentWord);
                setCurrentWord('');
                }
            }
        }>
          <div className="word-panel">
            <input
              type="text"
              className="input-word"
              value={currentWord}
              onInput={
                (e) => {
                    setCurrentWord(e.target.value);
                }
              }
            />
          </div>
          <button className="change-button">Change</button>
        </form>
        <div className="message-panel">
            {error && 
            <span className="error-message">
                {error}
            </span>}
        </div>
    </div>
  );
};

export default Word;
