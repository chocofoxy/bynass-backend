import { UserInput, User } from "../entities/user.entity"
import * as bcrypt from 'bcrypt';

export const createUser = async ( data: UserInput ) => {
    data.password = await bcrypt.hash(data.password, 50);   
    const user = await User.create(data) ;
}

export const findUserByEmail = async ( email: String ) => {

    return await User.find({ email }) ;

}
