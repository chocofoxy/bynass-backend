import { json, urlencoded } from 'body-parser';
import express from 'express';
import { connect } from 'mongoose';
const app = express();
const http = require('http');
const server = http.createServer(app);
import { Server } from "socket.io";
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';

(async () => {

    await connect('mongodb+srv://root:root@cluster0.y4ni3.mongodb.net/Database', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const io = new Server(server);
   
    app.use(json())
    app.use(urlencoded({ extended: true }))

    app.use('/user', UserController)
    app.use('/auth', AuthController)
    
    io.on('connection', (socket: any) => {
        console.log('a user connected');
    });

    app.listen(3000, () => {
        console.log('Server strated running on port 3000')
    })

})()



