import { Ambulance } from "../entities/ambulance.entity";
import { Insurance } from "../entities/insurance";
import { User } from "../entities/user.entity";
import { sendEmail } from "../tools/mailer";


export class AdminService {

    async findInsurance( id: string ) {
        return await Insurance.findById(id)
    }

    async findAmbulance( id: string ) {
        return await Ambulance.findById(id)
    }

    async findAllInsurance() {
        return await Insurance.find()
    }

    async findAllAmbulance() {
        return await Ambulance.find()
    }

    async deleteInsurance( id: string ) {
        return await Insurance.findByIdAndDelete(id)
    }

    async deleteAmbulance( id: string ) {
        return await Ambulance.findByIdAndDelete(id)
    }

    async addInsurance( email: string ) {
        return await Insurance.create({ email })
    }

    async addAmbulance( email: string ) {
        return await Ambulance.create({ email })
    }

    async updateInsurance( id:string , email: string ) {
        return await Insurance.findByIdAndUpdate(id , { email })
    }

    async updateAmbulance( id:string , email: string ) {
        return await Ambulance.findByIdAndUpdate(id , { email })
    }

    async findAllusers() {
        return await User.find()
    }

    async findUser(id: string) {
        return await User.findById(id)
    }

    async changeUserStatus( id: string , ambulanceId: string , io: any ) {
        const user = await User.findById(id)
        user.status = 'confirmed'
        const ambulance = await this.findAmbulance(ambulanceId)
        sendEmail("We have an emergency", ambulance.email , `<h1> we have an emergency for ${ user.name } <h1>`)
        sendEmail("We have an emergency", ambulance.email , `<h1> we have an emergency for ${ user.name } <h1>`)
        return User.findByIdAndUpdate(user._id,user)
    }

    async normalizeUserStatus( id: string ) {
        const user = await User.findById(id)
        user.status = 'normal'
        return User.findByIdAndUpdate(user._id,user)
    }

}