const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const roomRouter = require('./routes/room-router');
const messageRouter = require('./routes/message-router');

const app = express();
const apiPort = 1337;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', [roomRouter, messageRouter]);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));