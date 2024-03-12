import { useState } from "react";
import compare from './compare';
import exactMatch from "./exactly-match";

function Content ({username, onLogout}) {
    const [word, setWord] = useState('');
    const [inProgress, setInProgress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const secretWord = 'REACT';
    let matchedNum = 0;

    const checkWord = (inProgress, setWord, setErrorMessage) => {
        setWord(inProgress);

        
        if (exactMatch(inProgress, secretWord)) {
            setErrorMessage(`${inProgress} is the secret word!`);
            setInProgress('');
            return true;
        }
        const validWord = /^[a-zA-Z]+$/;
        if (inProgress === '') {
            setInProgress('');

            setErrorMessage("Enter something.");
            return false;
        }
        if (! validWord.test(inProgress)) {
            setErrorMessage("Only allow letters, please try again");
            setInProgress('');

            return false;
        }
        if (inProgress.length !== 5) {
            setErrorMessage(`${inProgress} was not a valid word. Try again.`);
            setInProgress('');

            return false;
        }
        matchedNum = compare(inProgress, secretWord);
        if (matchedNum )
        setErrorMessage(`${inProgress} has ${matchedNum} letters in common. `);
        setInProgress('');

        return false;
    
    };

    return (
       <div>
        <span className="content-title">Hello {username}!</span><br/>        
        <p className="enter-word">Guess Now</p>
        <label>
            <input 
            className={inProgress ? 'in-progress' : ''}
            value={inProgress}
            onInput={ (e) => setInProgress(e.target.value)}
            />
            <button
            className="guess-button"
            type="button"
            onClick={ () => checkWord(inProgress, setWord, setErrorMessage)}
            >Save
            </button>
        </label>
        <br/>
        <div className="message">
            {errorMessage && <p>{errorMessage}</p>}
        </div>
        <button className="logout-button" onClick={onLogout}>
            Logout
        </button> 
      </div>
    );
}

export default Content;