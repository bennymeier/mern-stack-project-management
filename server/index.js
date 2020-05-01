const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const db = require("./db");
const roomRouter = require("./routes/room-router");
const messageRouter = require("./routes/message-router");
const userRouter = require("./routes/user-router");
const projectRouter = require("./routes/project-router");
const issueRouter = require("./routes/issue-router");
const issueTypeRouter = require("./routes/issuetype-router");
const avatarFileUploadRouter = require("./routes/user-avatar-router");
const app = express();
const apiPort = 1337;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./db/passport")(passport);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", [
  roomRouter,
  messageRouter,
  userRouter,
  projectRouter,
  issueRouter,
  issueTypeRouter,
  avatarFileUploadRouter,
]);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
