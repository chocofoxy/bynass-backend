import { addFamilyToUser, changeUserStatus, createUser, findUserById } from "../services/user.service"
import { Request , Response, Router } from "express"
import { UserInput, User } from "../entities/user.entity"

import passport from "../midlewares/auth.middleware"

const UserController = Router()

UserController.use(passport.authenticate('jwt', { session: false }))

UserController.get('/:id', async function (req: Request, res: Response) {
    res.json(await findUserById( req.params.id ))
})

UserController.post('/addFamily', async function (req: any, res: Response) {
    res.json(await addFamilyToUser( req.user.id , req.body.email ) )
})

UserController.post('/changeStatus', async function (req: any, res: Response) {
    // @ts-ignore:
    res.json(await changeUserStatus( req.user.id , req.app.io ) )
})

export default UserController