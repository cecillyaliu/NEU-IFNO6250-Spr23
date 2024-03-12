
const checkUsername = (username, setErrorMessage) => {
    const validUsernameRegex = /^[a-zA-Z]+$/;
    if (username === '') {
        setErrorMessage("Username couldn't be null, please try again.");
        return false;
    }
    if (username === 'dog') {
        setErrorMessage("Invalid username, no dogs.");
        return false;
    }
    if (! validUsernameRegex.test(username)) {
        setErrorMessage("Letters only, please try again.");
        return false;
    }
    const validUsername = ["cat","Jorts", "Bao", "Chacha", "Leo"];
    if (!validUsername.includes(username)) {
        setErrorMessage("You don't have access. (For TA: allowlist:Jorts, Bao, Chacha, Leo)");
        return false;
    }

    setErrorMessage('');
    return true;
};

export default checkUsername;