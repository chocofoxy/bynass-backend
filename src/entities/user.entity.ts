import { Schema, model } from 'mongoose';

export interface UserInput {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phone: Number,
    password: String,
    status: {
        type: String,
        enum : ['normal','pending', 'confirmed'],
        default: 'normal'
    },
    familyMembers: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }] , default: [] },
    insurance: String,
    notifications: { type: [{ type: Schema.Types.ObjectId, ref: 'Notification' }] , default: [] },
});


export const User = model('User', UserSchema);
