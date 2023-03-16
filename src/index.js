const express = require('express');
const connect = require('./config/database');
const Tweet = require('./models/tweet');

const app = express();

const TweetRepository = require('./repository/tweet-repository');

app.listen(3000, async () => {
    console.log('server started');
    await connect();
    console.log('mongo db connected');
})