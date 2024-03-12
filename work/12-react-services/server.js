const express = require("express");
const information = require("./information");
const sessions = require("./sessions");
const users = require("./users");


const app = express();

app.use(express.static("./build"));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.checkSession(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { username } = information.sessions[sid] || {};
  const userData = users.findUser(username);
  res.json({ userData });
});

app.post("/api/v1/session", (req, res) => {
  const { username } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    if (formattedUname === "dog") {
        res.status(403).json({ error: "auth-denied" });
        return;
    }

    const validUser = users.checkUsername(formattedUname);

    if (!validUser) {
      res.status(401).json({ error: "auth-insufficient" });
      return;
    }

    const sessionId = sessions.addSession(username);
    const userData = users.addUser(username);
    res.cookie("sid", sessionId);
    res.json({ userData });
  } else {
    res.status(400).json({ error: "required-username" });
    return;
  }
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const { username } = sessions.checkSession(sid);
  if (sid || sessions.checkSession(sid)) {
    delete information.sessions[sid];
    res.clearCookie("sid");
  }

  res.json({ username });
});

app.post("/api/v1/word", (req, res) => {
  const { word } = req.body;
  const formattedWord = word.trim().toLowerCase();
  const validWord = users.checkWord(formattedWord);

  console.log("word",word,"!validWord",!validWord);
  if (word) {
    if (!validWord) {
        res.status(401).json({ error: "word-denied" });
      return;
    }else {
        const sid = req.cookies.sid;
        const { username } = information.sessions[sid];
        const userData = users.changeWord(username, word);
        res.status(200).json({userData});
        return;
    }
  }
  
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));