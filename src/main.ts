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
import { User } from './entities/user.entity';
import { opts } from './midlewares/auth.middleware';
const jwt = require('jsonwebtoken');

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
    app.use('/admin', AdminController)

    // @ts-ignore:
    app.io = io

    io.use((socket, next) => {
        //console.log('dfdf')
        /*const token = socket.handshake.auth.token;
        const jwt_payload = jwt.verify(token, opts.secretOrKey);
        User.findOne({ _id: jwt_payload.id }, function (err: any, user: any) {
            if (!err && user)
                // @ts-ignore:
                socket.user = user

        });*/
        next()
    })

    io.on('connection', (socket: any) => {
        console.log('a user connected');
        //socket.join(socket.user._id)
    });

    server.listen(3000, () => {
        console.log('Server strated running on port 3000')
    })

})()



