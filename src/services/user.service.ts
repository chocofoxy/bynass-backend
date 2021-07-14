import { UserInput, User } from "../entities/user.entity"
import { Socket } from 'socket.io'
import * as bcrypt from 'bcrypt';

export class UserService {

    async createUser( data: UserInput )  {
        data.password = await bcrypt.hash(data.password,1);   
        const user = await User.create(data);
        return user
    }
    
    async findUserByEmail( email: String )  {
        return await User.findOne({ email }) ;
    }
    
    async findUserById( id: String )  {
        return await User.findOne({ _id: id }).populate(['familyMembers','notifications']) ;
    }
    
    async addFamilyToUser( id: string , email: string )  {
        const familyMember = await this.findUserByEmail(email)
        const user = await this.findUserById(id)
        if (familyMember && user) {
            user.familyMembers.push(familyMember._id)
            return await User.findByIdAndUpdate(user._id, user)
        }
    }
    
    async changeUserStatus ( id: string , io: Socket )  {
        const user = await this.findUserById(id)
        user.status = 'pending'
        io.emit('emergency_pending', { message: `we have a pending emergency for ${ user.name }`  } );
        return await User.findByIdAndUpdate(user._id, user)
    }
    
    async setInsurance ( id: string , email: string ) {
        const user = await this.findUserById(id)
        user.insurance = email
        return await User.findByIdAndUpdate(user._id, user)
    }
}

