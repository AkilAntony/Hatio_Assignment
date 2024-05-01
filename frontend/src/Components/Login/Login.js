import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [warning,setWarning] = useState(null)
    const navigate = useNavigate();

    const handleSubmit =  async(e)=>{
        e.preventDefault();
        try{
            if(email && password){
                console.log(email,password)
                const response =  await axios.post('http://localhost:5000/login',{email,password});
                console.log('response',response.data)
                if(response.data.token)  localStorage.setItem('token',response.data.token);
                localStorage.getItem('token') ? navigate('/project',{state:{email}}) : console.log('no token')
               
            }
        }catch(error){
            console.log(error)
        }
        
       
            // if(response.status ==200){
            //     setWarning('Login sucessfull, Redirecting to your workspace')
            //     setTimeout(()=>{
            //         navigate('/project')
            //     },2000)     
 
    }
  return (
    <div>
        <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-col">
        <h1 className='text-3xl font-bold mb-4'>Login</h1>
        <span>Login with your registered Email and Password</span>
        {/* Login  Form start */}
        <form onSubmit={handleSubmit} className='mt-4'>
            <div className = 'flex flex-col'>
                <label htmlFor="" className='mt-3 font-bold'>Email</label>
                <input type="text" name="" placeholder='Email address'
                        className='border border-black rounded-md py-1 px-12 mb-2'
                        onChange={(e)=>setEmail(e.target.value)} />
                <label className='mt-3 font-bold'>Password</label>
                <span> </span>
                <input type="text" name="" id="" placeholder='Password'
                        className='border border-black rounded-md py-1 px-12 mb-3'
                        onChange={(e)=>setPassword(e.target.value)} />
                {/* {passwordError && password ? 
                    <span className='text-red-600'>{passwordError}</span>: ''} */}
                <button type = 'submit'
                    className='bg-blue-700 px-2 py-2 rounded-md mt-3
                        text-white shadow-md'>
                    Login
                </button>
                {/* {Warning && <span className='mt-3'></span> } */}
            </div>
        </form>
        {/* Login form End */}

        {/* Alert Box */}
        {warning ? <div className='md:w-1/2 m-auto mt-20'>
            <div className='flex p-4 items-center justify-between bg-green-200 rounded-md'>
            <p className='text-xl'>{warning}</p>
           
            </div>
        </div>: '' }
    </div>
    
    </div>
  )
}

export default Login