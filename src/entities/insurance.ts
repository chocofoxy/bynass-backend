import { Document, Schema, model, models } from 'mongoose';

export const InsuranceSchema = new Schema({
    email: String
});


export const Insurance = models.Insurance || model('Insurance', InsuranceSchema);
