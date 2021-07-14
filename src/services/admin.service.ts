import { Ambulance } from "../entities/ambulance.entity";
import { Insurance } from "../entities/insurance";
import { User } from "../entities/user.entity";


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

    async changeUserStatus( id: string , io: any ) {
        
    }

}