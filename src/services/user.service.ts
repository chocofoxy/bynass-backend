import { UserInput, User } from "../entities/user.entity"
import { Socket } from 'socket.io'
import * as bcrypt from 'bcrypt';

export const createUser = async ( data: UserInput ) => {
    data.password = await bcrypt.hash(data.password,1);   
    const user = await User.create(data);
    return user
}

export const findUserByEmail = async ( email: String ) => {
    return await User.findOne({ email }) ;
}

export const findUserById = async ( id: String ) => {
    return await User.findOne({ _id: id }).populate(['familyMembers','notifications']) ;
}

export const addFamilyToUser = async ( id: string , email: string ) => {
    const familyMember = await findUserByEmail(email)
    const user = await findUserById(id)
    if (familyMember && user) {
        user.familyMembers.push(familyMember._id)
        return await User.findByIdAndUpdate(user._id, user)
    }
}

export const changeUserStatus = async  ( id: string , io: Socket ) => {
    const user = await findUserById(id)
    user.status = 'pending'
    return await User.findByIdAndUpdate(user._id, user)
}