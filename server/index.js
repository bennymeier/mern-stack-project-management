const express = require('express');
const cors = require('cors');
const passport = require('passport');
const db = require('./db');
const roomRouter = require('./routes/room-router');
const messageRouter = require('./routes/message-router');
const userRouter = require('./routes/user-router');
const projectRouter = require('./routes/project-router');
const issueRouter = require('./routes/issue-router');
const issueTypeRouter = require('./routes/issuetype-router');
const avatarFileUploadRouter = require('./routes/user-avatar-router');
const priorityRouter = require('./routes/priority-router');
const kanbanTypeRouter = require('./routes/kanbantype-router');
const app = express();
const apiPort = 1400;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./db/passport')(passport);

app.use('/api', [
  roomRouter,
  messageRouter,
  userRouter,
  projectRouter,
  issueRouter,
  issueTypeRouter,
  avatarFileUploadRouter,
  priorityRouter,
  kanbanTypeRouter,
]);

app.listen(apiPort, function (err) {
  if (err) console.log(err);
  console.log('Server listening on port: ', apiPort);
});
