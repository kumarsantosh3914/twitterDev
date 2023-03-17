import express from 'express';
import bodyParser from 'body-parser';

import { connect } from './config/database.js';

import apiRoutes from './routes/index.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { UserRepository } from './repository/index.js';
import LikeService from './servies/like-service.js';

app.use('/api', apiRoutes);

app.listen(3000, async () => {
    console.log('server started');
    await connect();
    console.log('mongo db connected');

    const userRepo = new UserRepository();
    const user = await this.userRepo.create({
        email: 'santosh@gmail.com',
        password: '12345',
        name: 'Santosh'
    });
    const likeService = new LikeService();
});