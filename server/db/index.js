const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://benny:J4se6s8GBIyanNu2@cluster0.2wsfo.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true, })
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;