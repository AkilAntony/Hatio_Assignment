import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import axios from 'axios';
function Project() {
  const [projectDetails,setProjectDetails] = useState([])
  const [projectName,setProjectName] = useState('');
  const [error,setError] = useState(false)
  const navigate = useNavigate();
  
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
              
          }catch(err){
            console.log(err)
          }
        }
      getProjects()
      }
  },[projectName])
// Getting List of Projects - End

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // Handle Modal End
 
const handleLogout = ()=>{
  localStorage.removeItem('token');
  const token = localStorage.getItem('token')
  if(!token){
      navigate('/')
  }
}
 
const handleNavigation = (projectId,projectName)=>{
  console.log(projectId,projectName)
    navigate('/projectDetails',{state:{projectId,projectName}});
}


  return (

    <div>
      {error ? <div>you are not authorized</div> :
        <div className='m-5'>

          {/* Project name and Logout button */}
          <div className='flex items center justify-between  '>
            <h1 className='text-center text-2xl font-bold mb-5'>
              Hi Email Your Projects
            </h1>
            <button className = 'bg-red-600 h-8 text-white shadow-md rounded-sm px-2'  
              onClick= {handleLogout}>Log out</button>
          </div>
      
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
      {projectDetails.map((details)=>(
        <div key={details.id} 
        className='flex bg-zinc-300 py-5
            m-3 w-full mt-2
            items-center md:w-1/4
            justify-center rounded-lg shadow-md  md:mt-5 '
             onClick={()=>handleNavigation(details.id,details.title)} >
        <h2 className='ml-3 text-xl font-bold'>{details.title}</h2>
      </div>
      ))}  
      
      </div>
    </div>}
    </div>
    
  )
}

export default Project