const express = require('express');
const connect = require('./config/database');
const Tweet = require('./models/tweet');

const app = express();

const TweetRepository = require('./repository/tweet-repository');

app.listen(3000, async () => {
    console.log('server started');
    await connect();
    console.log('mongo db connected');
    // const tweet = await Tweet.create({
    //     content: 'Third tweet',
    //     // userEmail: 'santosh@gmail.com'
    // });
    // const tweets = await Tweet.find();
    // console.log(tweets);
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getAll(2, 4);
    console.log(tweet);
})