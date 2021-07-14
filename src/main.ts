import { json, urlencoded } from 'body-parser';
import express from 'express';
import { connect } from 'mongoose';
const app = express();
const http = require('http');
const server = http.createServer(app);
import { Server } from "socket.io";
import AdminController from './controllers/admin.controller';
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';

(async () => {

    await connect('mongodb+srv://root:root@cluster0.y4ni3.mongodb.net/bynass', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const io = new Server(server);
   
    app.use(json())
    app.use(urlencoded({ extended: true }))

    app.use('/user', UserController)
    app.use('/auth', AuthController)
    app.use('/admin',AdminController)

    // @ts-ignore:
    app.io = io

    io.on('connection', (socket: any) => {
        
    });

    app.listen(3000, () => {
        console.log('Server strated running on port 3000')
    })

})()



