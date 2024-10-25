const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password, retypePassword } = req.body;

     //Validation checks
     if(!username || !email || !password || !retypePassword){
        return res.status(400).json({
            message: "Please fill in all fields"
        })
    }

    if(password != retypePassword){
        return res.status(400).json({
            message: "Passwords do no match"
        })
    }

    try{
        //Checking is user exists
    
            const existingUser = await User.findOne({ email })
    
            if(existingUser){
                return res.status(400).json({
                    message: 'Email already in use'
                })
            }
    
            const newUser = new User({username, email, password});
    
            await newUser.save()
    
            res.status(201).json({message: "User registered successfully"});
        }
        catch (error){
            console.error(error)
            res.status(500)/json({message: "Server error, please try again later"})
        }

}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({ username });

        if(!user){
            return res.status(400).json({ message: "User does not exist"})
        }

        const isPasswordValid = await user.comparePassword(password)

        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid password."})
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.status(200).json({message: "Login successful!", token})
    }
    catch (error){
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error. Please try again later."})
    }
}

module.exports = {
    registerUser,
    loginUser
}