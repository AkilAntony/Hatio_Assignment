import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose,onSendData}) => {
    const [warning,setWarning]  = useState(null)
    const [projectName, setProjectName] = useState('');
    const [projectData, setProjectData]= useState('');

    const sendProjectDetails =(data)=>{
        onSendData(data)
    }

    

// Creating new Project - start
  const handleCreateProject =async() => {
    if(!projectName && projectName == ''){
        setWarning('Please Enter Project Name')
    }else{
        try{
          const response = await axios.post('http://localhost:5000/project',
          {title:projectName},
          {headers:
            {Authorization:`Bearer ${localStorage.getItem('token')}`}
          })
        //   console.log('response',response.data)
        //    console.log('Project created:', response.data);
           setProjectData(response.data)
           onClose(); // Close the modal after saving
           setProjectName('')    
           sendProjectDetails(projectName)
        }catch(err){
          console.log("Error", err)
        }
    } 
  };
 // Creating new Project - End

  if (!isOpen) {
    return null; // If the modal is not open, don't render it
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg md:w-1/3 md:h-1/3">
        <h2 className="text-2xl mb-4">Create New Project</h2>
        <input
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e)=>{setProjectName(e.target.value)}}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />
        {!projectName && warning ? <span className='text-red-500'>{warning}</span> : ''}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={handleCreateProject}
          >
            Create
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal