import { UserService } from "../services/user.service"
import { Request, Response, Router } from "express"
import passport, { opts } from "../midlewares/auth.middleware"
const jwt = require('jsonwebtoken');

const AuthController = Router()
const userService = new UserService()

AuthController.post('/register', async function (req: Request, res: Response) {
    const user = await userService.createUser({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
    res.json(user)
})

AuthController.post('/login', passport.authenticate('local',{ session: false }), function (req: any, res: Response) {
    const user = req.user
    // @ts-ignore:
    res.json({ token: jwt.sign( { id: user._id , email: user.email } , opts.secretOrKey ) })
})


export default AuthController