 import axios from 'axios'
import React, { useState, useEffect } from 'react'
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [Warning,setWarning] = useState('');
    const [emailError,setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    
    const navigate = useNavigate()

  useEffect(()=>{
    setTimeout(()=>{
       if(localStorage.getItem('token')){
      navigate('/project')
  }
    },3000)
   
  },[])
    // function to validate the email and password
    const validateInputs = ()=>{
        let isValid = true;
        if(email && password){
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                setEmailError('Please enter a valid email address.');
                isValid = false;
            }else setEmailError('')
           

            // Validate Password
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if(!passwordRegex.test(password)){
                setPasswordError('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.');
                isValid = false;
            }else setPasswordError('');
        }
        return isValid
    }
    // ValidateInput function end

    const handleSubmit = async(e)=>{
         console.log('hi')
         e.preventDefault();
        try{
            const isValid =  validateInputs();
            if(isValid){
               const response = await axios.post('http://localhost:5000/register', {email,password})
               console.log(response)
               
               navigate('/login')
            }else {
                setWarning('Please Enter Valid Email & your');
                console.log('err')
            }
        }
        catch(err){
            console.log(err);
            setWarning('Server Error')
        }
        
 
    }
 
  return (
   <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-col">
        <h1 className='text-3xl font-bold mb-4'>Register</h1>
        
        {/* Register Form start */}
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
                {passwordError && password ? 
                    <span className='text-red-600'>{passwordError}</span>: ''}
                <button
                    className='bg-blue-700 px-2 py-2 rounded-md mt-3
                        text-white shadow-md'>
                    Register
                </button>
                <div className='flex mt-3'>
                    <p>Alreay have Account ?</p>
                    <Link to ='/login' className='text-blue-500 underline'>Login</Link>
                </div>
                {Warning && <span className='mt-3'></span> }
            </div>
        </form>
        {/* Register form End */}
           
    </div>
    
  )
}

export default Register