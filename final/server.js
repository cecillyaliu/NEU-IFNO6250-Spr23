const express = require("express");
const data = require("./data");
const sessions = require("./sessions");
const checkFunctions = require("./checkFunctions");
const bodyParser = require('body-parser');

const app = express();

app.use(express.static("./build"));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !sessions.checkSession(sid)) {
      res.clearCookie("sid");
      res.status(401).json({ error: "auth-missing" });
      return;
    }
  
    const { username } = data.sessions[sid] || {};
    const userData = checkFunctions.findUser(username);
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
  
      const validUser = checkFunctions.checkUsername(formattedUname);
  
      if (!validUser) {
        res.status(401).json({ error: "auth-insufficient" });
        return;
      }
  
      const sessionId = sessions.addSession(username);
      const userData = checkFunctions.addUser(username);
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
      delete data.sessions[sid];
      res.clearCookie("sid");
    }
  
    res.json({ username });
});


app.post("/api/v1/posts", (req, res) => {
  const postData  = req.body;
  if (postData) {
    const newPost = checkFunctions.addPost(postData);
    res.status(200).json({newPost});
    return;
  }
  res.status(401).json({ error: "word-denied" });
  return;
  
});


app.get("/api/v1/posts", (req, res) => {
  res.json(data.posts);
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


  