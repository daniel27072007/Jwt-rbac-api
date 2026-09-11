import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['Admin', 'Employee', 'Customer'], default: 'Customer'}
},{
    timestamps: true
})

export const userModel = mongoose.model('userModel', userSchema)