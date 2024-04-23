import express from 'express'
import cors from 'cors'
import ConnectDatabase from './db.js';
import  dotenv  from 'dotenv';
import TodoRoutes from './Routes/TodoRoutes.js'
import userController from './Controllers/userController.js';
import ProjectRoutes from './Routes/ProjectRoutes.js'
import verifyToken from './Middleware/VerifyToken.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))


dotenv.config()
 
const port = process.env.PORT || 5000;

// Connecting to Database
ConnectDatabase();

// home
app.get('/',(req,res)=>{
    res.send('hi');
    console.log('ji')
})
app.post('/register',userController.register)
app.post('/login',userController.login)

// Project
app.use('/project',ProjectRoutes)
app.use('/todos', TodoRoutes)


app.listen(port,()=>{
    console.log('server running')
})

