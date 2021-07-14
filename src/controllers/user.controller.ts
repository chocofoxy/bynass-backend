import { createUser } from "../services/user.service"
import { Request , Response, Router } from "express"

var UserController = Router()

UserController.get('/register', async function (req: Request, res: Response) {
    await createUser({
        name: req.params.name,
        email: req.params.email,
        phone: req.params.phone,
        password: req.params.password
    })
})

UserController.get('/about', function (req: Request, res: Response) {
    res.json({ message: 'ok' })
})


export default UserController