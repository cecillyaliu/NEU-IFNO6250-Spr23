import { useState } from "react";
import './css/Creation.css';
import Logout from "./Logout";

function Creation({username, avatar, addPost, error, handleLogout, setError }) {
    const [inputText, setInputText] = useState("");
    const [inputTitle, setInputTitle] = useState("");
    const [showContent, setShowContent] = useState(false);

    function handleAddPost(){
        const postData = {
            author: username,
            text: inputText,
            title: inputTitle,
            timestamp:  new Date(),
            comments: []
            };
        addPost(postData);
        setInputText("");
        setInputTitle("");
        setError("");
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() === "" || inputTitle.trim() === "") {
            setError("Title and content couldn't be null.");
        } else {
            handleAddPost();
        }
    }; 

    const handleShowContent = () => {
        setShowContent(true);
      };
    
      const handleHideContent = () => {
        setShowContent(false);
      };

    return (
        <div className="creation-container">
            <div className="user-information">
                <img className="user-avatar" src={avatar}/>
                <p className="user-username">{username}</p>
            </div>
            {showContent ? (
                <form onSubmit={handleSubmit}>
                    
                    <div className="word-panel"> 
                        <div className="creation-title">
                            Write Something
                        </div>
                        <div className="title-field">
                            <p className="title-small">Title:</p>
                            <input
                                type="text"
                                className="input-title"
                                value={inputTitle}
                                onInput={(e) => {
                                    setInputTitle(e.target.value);
                            }}/>
                        </div>
                        <div className="text-small">
                            <p className="text-small">Text:</p>
                            <input
                                type="text"
                                className="input-text"
                                value={inputText}
                                onInput={(e) => {
                                    setInputText(e.target.value);
                            }}/>
                        </div>
                        <br/>
                        <button className="change-button" type="submit">Post</button>
                        <button className="hide-button" onClick={handleHideContent}>Hide</button>
                    </div>
                </form>
            ) : (
                <button className="create-button" onClick={handleShowContent}>Create</button>
            )}

            <div className="message-panel">
                {error && 
                <span className="error-message">
                    {error}
                </span>}
            </div>
            <Logout 
              username={username}
              handleLogout={handleLogout}/> 
        </div>
      );
}

export default Creation;

