
import jwt from 'jsonwebtoken'
import {User} from '../Models/User.js'
import { Project } from '../Models/Project.js'

 const verifyToken = async(req,res,next)=>{
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
            try{
                const token = req.headers.authorization.split(' ')[1]
                console.log(token)
                if(!token) {
                    return res.status(401).json({message:'unathourized,Token not Provided'});
                }
                const decoded = jwt.verify(token,process.env.SECRET_KEY)
                console.log(decoded)
                req.user = await User.findById(decoded.userId).select('-password');
                req.project = await Project.findById(decoded.userId).select('-password')
                console.log(req.user)
                next();
            }catch(error){
                console.log(error)
                return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' })
            }
        }
 }

  export default verifyToken

    // const token = req.headers["x-access-token"];
    // console.log(token)
    // if(!token)
    //     return res.status(401).json({message:'unathourized'});
    // jwt.verify(token,process.env.SECRET_KEY, (err,decoded)=>{
    //     if(err)
    //         return res.status(403).json({message:'Invalid Token'})
    //     req.user = decoded
    //     next();
    // })