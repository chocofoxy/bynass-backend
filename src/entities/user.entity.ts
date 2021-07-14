import { Document, Schema, model } from 'mongoose';

export interface UserInput {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export const UserSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    familyMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    insurance: String,
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
});


export const User = model('User', UserSchema);
