import { Document, Schema, model } from 'mongoose';

export const NotificationSchema = new Schema({
    events: []
});


export const Notification = model('Notification', NotificationSchema);
