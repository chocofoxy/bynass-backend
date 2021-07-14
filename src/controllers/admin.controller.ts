import { Request , Response, Router } from "express"
import { AdminService } from "../services/admin.service"

const AdminController = Router()
const adminService = new AdminService()

AdminController.get('/insurance/:id', async function (req: Request, res: Response) {
    res.json(await adminService.findInsurance( req.params.id ))
})

AdminController.post('/insurance', async function (req: Request, res: Response) {
    res.json(await adminService.addInsurance( req.body.email ))
})

AdminController.get('/insurance/all', async function (req: Request, res: Response) {
    res.json(await adminService.findAllInsurance())
})

AdminController.delete('/insurance/:id', async function (req: Request, res: Response) {
    res.json(await adminService.deleteInsurance( req.params.id ))
})

AdminController.put('/insurance/:id', async function (req: Request, res: Response) {
    res.json(await adminService.updateInsurance( req.params.id , req.body.email ))
})

AdminController.get('/ambulance/:id', async function (req: Request, res: Response) {
    res.json(await adminService.findAmbulance( req.params.id ))
})

AdminController.post('/ambulance', async function (req: Request, res: Response) {
    res.json(await adminService.addAmbulance( req.params.id ))
})

AdminController.get('/ambulance/all', async function (req: Request, res: Response) {
    res.json(await adminService.findAllAmbulance())
})

AdminController.delete('/ambulance/:id', async function (req: Request, res: Response) {
    res.json(await adminService.deleteAmbulance( req.params.id ))
})

AdminController.put('/ambulance/:id', async function (req: Request, res: Response) {
    res.json(await adminService.updateAmbulance( req.params.id , req.body.email))
})

AdminController.post('/confirmeStatus', async function (req: any, res: Response) {
    // @ts-ignore:
    //res.json(await changeUserStatus( req.user.id , req.app.io ) )
})

export default AdminController