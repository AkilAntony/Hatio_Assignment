import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// Register
const register = async(req,res)=>{
    try{
        const user = req.body;
        const takenEmail = await User.findOne({email:user.email})
        if(takenEmail){
            return res.status(400).json({message:'Email has already been taken'})
        }else{
            user.password = await bcrypt.hash(req.body.password,10);
            const dbUser = new User({
                email:user.email.toLowerCase(),
                password: user.password
            })
            const saveUser = await dbUser.save();
            if(!saveUser){
                return res.status(201).json({ message: 'Regsitration Failed' });
            }
            return res.status(201).json({ message: 'User registered successfully' });
        } 
    }catch(err){
        console.error(err);
        res.status(500).json({message:'server error'});
    }
}

// Login
const login = async(req,res)=>{
    try{
        const {email,password} =req.body;
        if(!email || !password) res.status(400).json({message:'Please Enter all the fields'})
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ message: "User with this email does not exist" });
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch) return res.status(400).send({ message: "Incorrect password." });
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '30d' });
        res.status(200).json({token: token ,email:user.email});
    } catch(err){
        console.error(err);
        res.status(500).json({message:'server Error'})
    }
   
}


export default {register,login}