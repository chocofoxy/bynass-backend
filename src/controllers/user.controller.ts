import { UserService } from "../services/user.service"
import { Request , Response, Router } from "express"
import { UserInput, User } from "../entities/user.entity"

import passport from "../midlewares/auth.middleware"

const UserController = Router()
const userService = new UserService()

UserController.use(passport.authenticate('jwt', { session: false }))

UserController.get('/current', async function (req: Request, res: Response) {
    // @ts-ignore:
    res.json(await userService.findUserById( req.user.id ))
})

UserController.post('/addFamily', async function (req: any, res: Response) {
    res.json(await userService.addFamilyToUser( req.user.id , req.body.email ) )
})

UserController.post('/changeStatus', async function (req: any, res: Response) {
    // @ts-ignore:
    res.json(await userService.changeUserStatus( req.user.id , req.app.io ) )
})

UserController.post('/setInsurance', async function (req: any, res: Response) {
    res.json(await userService.setInsurance( req.user.id , req.body.email ) )
})

export default UserController