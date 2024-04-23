import express from 'express';
import bcrypt from 'bcryptjs';
import userController from '../Controllers/userController.js'
const router = express.Router();

// Register
router.post('/',userController.register)

// Login
router.post('/',userController.login)
// router.post('/login',async(req,res)=>{
//     const {email,password} = req.body
//     const checkEmail = await User.findOne({email:req.body.email})
//     console.log(checkEmail)
//     if(!checkEmail){
//         res.json({message:"Invalid Username or Password"})
//     }else{

//     }
//     console.log(req.body);
//     res.json({message:'sucess'})
//     console.log(email,password)
//     res.json({status:'ok'})
// })

export default router;