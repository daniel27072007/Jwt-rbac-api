import { userModel } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'

export const registerUser = async (req, res) => {
    try {
        const registerData = req.body
        if(!registerData.name || !registerData.email || !registerData.password || !registerData.role){
            return res.status(400).json({ error: 'Bad Request', message: 'Name, Email and Password are required.'})
        }
        const bcryptPassword = await bcrypt.hash(registerData.password, 10)
        const userData = {
            name: registerData.name,
            email: registerData.email,
            role: registerData.role,
            password: bcryptPassword
        }
        const registeredUser = new userModel(userData)
        const savedUser = await registeredUser.save()
        const tokenAccess = jwt.sign(
            {userId: savedUser._id, userRole: savedUser.role},
            process.env.TOKEN_ACCESS_KEY,
            {expiresIn: process.env.TOKEN_ACCESS_EXPIRES}
        )
        return res.status(201).json({ message: 'User registered with success!', 'access-token': tokenAccess})
    } catch (error) {
        if(error.code === 11000){
            if(error.message.includes('name')){
                return res.status(400).json({ error: 'Bad Request', message: 'This name was already registered' })
            }
            if(error.message.includes('email')){
                return res.status(400).json({ error: 'Bad Request', message: 'This email was already registered' })
            }
        }
        res.status(500).json({ error: error, message: 'something wrong happend when registring the user'})
    }
}