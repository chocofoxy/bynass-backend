import { createUser } from "../services/user.service"
import { Request , Response, Router } from "express"

const AuthController = Router()

AuthController.post('/register', async function (req: Request, res: Response) {
    const user = await createUser({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
    res.json(user)
})

AuthController.get('/login', function (req: Request, res: Response) {
    res.json({ message: 'ok' })
})


export default AuthController