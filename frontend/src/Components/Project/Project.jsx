import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import axios from 'axios';
import LogoutAlert from './LogoutAlert';


function Project() {
  const [projectDetails,setProjectDetails] = useState([])
  const [projectName,setProjectName] = useState('');
  const [error,setError] = useState(false);
  const [warning,setWarning] =  useState('')
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisible,setIsVisible] = useState(false);
  const location = useLocation();
  const loginedUser = location.state ||  {};
  console.log('user',loginedUser)
    // Callback function to get projectName from Modal component
  const getProjectName= (data)=>{
    console.log("recieved data",data)
    setProjectName(data)
  }

  // Getting List of Projects - start
  // This will trigger when the component mount for the first time and every time when the projectName changes
    useEffect(()=>{
      if(localStorage.getItem('token')){
        const getProjects = async()=>{
          try{
              const response = await axios.get('http://localhost:5000/project',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
              setProjectDetails(response.data.formattedProjects);
              if(response.data.formattedProjects){
                setWarning('')
              }
          }catch(err){
            console.log(err.response.status);
            setWarning('No projects Available')
          }
        }
      getProjects()
      }
  },[projectName])
// Getting List of Projects - End

 
  const handleOpenModal = () => {
    setModalOpen(true);
    
  };
  const handleCloseModal = () => {
    setModalOpen(false);

  };
  // Handle Modal End
 

  // Handling Logout Alert Box - START
  const openLogoutAlert = () =>{
     setIsVisible(true)
  }
  const closeLogoutAlert =()=>{
    setIsVisible(false)
  }

//   // Handling Logout Alert Box - END


const handleNavigation = (projectId,projectName)=>{
  console.log(projectId,projectName)
    navigate('/projectDetails',{state:{projectId,projectName}});
}


  return (

    <div className=''>
   
        <div className='m-5'>

          {/* Project name and Logout button */}
          <div className='flex   md:justify-between flex-col '>
            <h1 className='text-center text-2xl font-bold mb-5
             bg-lime-400 py-3 '>
              Welcome {loginedUser.email}
            </h1>
            <button className = 'bg-red-600 h-8 text-white shadow-md rounded-sm px-2 w-20'  
              onClick= {openLogoutAlert}>Log out</button>
          </div>

        {/* this ALERT BOX will be visible if the user clicks the logout button  */}
          {/* START */}
            <LogoutAlert 
              isOpen={isVisible}
              onClose={closeLogoutAlert}/> 
          {/* END */}

      <div className='flex items-center justify-between mt-14'>
        <button className='bg-blue-600 py-2 px-2 text-white 
                rounded-sm shadow-md'
              onClick={handleOpenModal}
            >Create New Project</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSendData = {getProjectName}
      />
      <div className='mt-4 flex flex-wrap 
              items-center justify-center' >
        { projectDetails.map((details)=>(
          <div key={details.id} 
              className='flex border border-gray-700 py-5
                m-3 w-full mt-2
                items-center md:w-1/4
                justify-center rounded-lg shadow-md  md:mt-5 '
              onClick={()=>handleNavigation(details.id,details.title)} >
            <h2 className='ml-3 text-xl font-bold'>{details.title}</h2>
          </div>
        ))}  
        {warning && <div>{warning}</div> }
        
      </div>
    </div>
    </div>
    
  )
}

export default Project