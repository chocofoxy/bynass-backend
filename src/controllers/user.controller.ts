import { addFamilyToUser, createUser, findUserById } from "../services/user.service"
import { Request , Response, Router } from "express"
import passport from "../midlewares/auth.middleware"

var UserController = Router()

UserController.use(passport.authenticate('jwt', { session: false }))

UserController.get('/:id', async function (req: Request, res: Response) {
    res.json(await findUserById( req.params.id ))
})

UserController.post('/addFamily', async function (req: any, res: Response) {
    res.json(await addFamilyToUser( req.user.id , req.body.email ) )
})

export default UserController