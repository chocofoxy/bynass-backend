import { Schema, model, models } from 'mongoose';
require('./notification.entity')

export interface UserInput {
    name: string;
    email: string;
  //  image: string;
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


export const User = models.User || model('User', UserSchema);
