import express from 'express';
import { connect } from './config/database.js';

const app = express();

import service from './servies/tweet-service.js';

app.listen(3000, async () => {
    console.log('server started');
    await connect();
    console.log('mongo db connected');
    let ser = new service();
    await ser.create({ content: 'Done with #refactor ?' });
});