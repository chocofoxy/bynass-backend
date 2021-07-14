import { Document, Schema, model, models } from 'mongoose';

export const AmbulanceSchema = new Schema({
    email: String
});


export const Ambulance = models.Ambulance || model('Ambulance', AmbulanceSchema);
