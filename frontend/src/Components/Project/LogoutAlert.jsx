import React from 'react'
import {  useNavigate } from 'react-router-dom';

function LogoutAlert({onClose,isOpen}) {
  const navigate  = useNavigate();
  const handleLogout = ()=>{
  localStorage.removeItem('token');
  const token = localStorage.getItem('token')
  if(!token){
      navigate('/')
  }
}
  if (!isOpen) {
    return null; // If the modal is not open, don't render it
  }

  return (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
     <div className='bg-white w-3/4 
            rounded-md py-20 md:w-1/3 flex flex-col
            items-center justify-center '> 
        <div className=''>
            <p>Are sure you want to logout?</p>
        </div>
        <div className='text-white flex items-center
            justify-items-start gap-4  mt-3'>
            <button onClick={onClose}
              className='bg-green-500 py-1 px-5 rounded-sm'>No</button>
            <button onClick={handleLogout}
              className='bg-red-500 px-5 rounded-sm py-1'>
              Yes
            </button>
        </div>
    </div>
  </div>
  )
}

export default LogoutAlert