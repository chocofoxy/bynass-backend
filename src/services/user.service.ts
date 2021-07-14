import { UserInput, User } from "../entities/user.entity"
import { Socket } from 'socket.io'
import * as bcrypt from 'bcrypt';
import { sendEmail } from "../tools/mailer";

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
            await sendEmail("You have been added as a family member", ` ${user.name} added you as a family member `, familyMember.email)
            user.familyMembers.push(familyMember._id)
            return await User.findByIdAndUpdate(user._id, user)
        }
        await sendEmail("You are invited to be family member", ` ${user.name} invited you to be a family member on our website `, email)
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

