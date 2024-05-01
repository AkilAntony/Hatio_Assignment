import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ProjectSummary from '../ProjectSummary';
import Warning from '../Warning/Warning';

function ProjectDetails() {
    const [isVisible,setIsVisible] = useState(false);
    const [todo,setTodo] = useState('');
    const [description,setDescription] = useState('');
    const [warning,setWarning] = useState('')
    const [flag,setFlag] = useState(false);
    const [projectSummary,setProjectSummary] = useState('')
    const location = useLocation();
    const navigate = useNavigate()
    // const [isEditable, setIsEditable] = useState(false);
    const { projectId, projectName } = location.state || {}; // Fallback in case of undefine
//   console.log('Project ID:', projectId, 'Project Name:', projectName);
    // const projectId = location.state.prjectId;
     
    const [todoList,setTodoList] = useState([]);
    console.log(todoList.length)
    useEffect(()=>{
        const getProjectDetails = async()=>{
            try{
                const response = await axios.get('http://localhost:5000/todos',
                    {headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    owner:projectId
                    }
                })
                setFlag(false)
                console.log('response',response.data);
                setTodoList(response.data);
                
                console.log('1p',projectId)
            }catch(err){
                console.log(err)
            }
        }
        getProjectDetails();
    },[projectId,flag])

    // function to create todo
    const handleCreate = async()=>{
        if(!todo || !description) {
            return setWarning("Please Enter Todo and Description")
        } else setWarning('');
        try{
            const response = await axios.post('http://localhost:5000/todos',
                {todo:todo,
                todoDescription: description,
                owner:projectId},
                {headers:
                    {Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
          if(response){
            setTodo('')
            setFlag(true)
            setDescription('');
          }
        }catch(error){
            console.log(error)
        }
    }

    // functio to delete todo
    const handleDelete = async(id)=>{
        try{
            const response = await axios.delete(`http://localhost:5000/todos/${id}`,
                {headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
        const updatedTodos = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodos);
        setFlag(true)
        } catch(err){
            console.log(err)
        }
    }

    // function to handle edit todo
    const handleEdit = (data)=>{
        const todoId = data._id
        const todo = data.todo
        const description = data.description
       const status = data.status
        navigate('/editTodo',{state:
            {todoId,todo,description,
            status,projectName,projectId}})
    }

    // function to clear input fields in the todo creation screen 
    const handleClear = ()=>{
        setTodo('')
        setDescription('');
        setWarning(''); 
    }

    // function to  set the creteTodo screen visible
    const handleVisible =()=>{
        setIsVisible(!isVisible)
    }

    // function to get Project summary
    const getProjectSummary = async()=>{
        if(projectId){
            try{
                const response = await axios.get(`http://localhost:5000/todos/summary/${projectId}`);
                console.log(response.data.gistUrl);
                setProjectSummary(response.data.gistUrl)
            }catch(error){
                console.log(error)
            }
        }
    }


  return (
    <div className='p-5'>
        <p className='text-2xl text-center text-white'>{projectName}</p>
        <div className='flex items-center justify-between m-5'>
            <button 
                className='bg-pink-600 py-2 px-2    
                 text-white rounded-sm shadow-md'
                onClick={handleVisible}>
                Add New Todo
            </button>
             <button 
                className='bg-green-400 py-2 px-2 '
                onClick = {getProjectSummary}>
                Project Summary
            </button>
        </div>

        {/* PROJECT SUMMARY */}
        {projectSummary && 
            <div>
                <ProjectSummary gistUrl = {projectSummary} />
            </div>
        }
        
        
        <div className='mt-6 flex flex-col m-5'>
            {/* Crete todo section - start */}
            {isVisible && 
                <div className=' p-5 mt-4'>
                    <div className='flex md:items-center md:justify-center 
                            md:gap-3 flex-wrap' >
                        <div className='flex flex-wrap items-center gap-4'>
                            <input type="text" value={todo} 
                                className='border bg-white py-2' 
                                placeholder='Enter Todo Name'
                                onChange={(e)=>{setTodo(e.target.value)}}
                               />
                            <textarea name="description"  cols="40" rows=""
                                className='border' 
                                value={description}
                                onChange={(e)=>{setDescription(e.target.value)}}
                                placeholder='Enter todo Description'>
                            </textarea>
                        </div>
                        <div className='flex text-white mt-3 md:mt-0 gap-3'>
                            <button className='bg-green-700 
                                py-1 px-2 md:px-3 rounded-sm shadow-md'
                                onClick={handleCreate}>Create
                            </button>
                            <button className='bg-red-700  
                                py-1 px-2  md:px-3 rounded-sm shadow-md'
                                onClick={handleClear}>Clear
                            </button>
                        </div>
                    </div>
                    {warning && !todo || !description ? 
                        <span className='text-red-600 mt-5'>
                            {warning}</span> : ''}
                </div>
            }
         {/* Create todo section - End */}

        {/* Project Details - start */}
        {todoList && todoList.length>0 ? 
            todoList.map((data)=>(
                <div className="mt-4 border 
                            rounded-lg shadow p-4" key={data._id}>
                    {/* Project Name and Status */}
                        <div className="flex justify-between 
                                items-center mb-2">
                            <div>
                                <h3 className="text-lg md:text-xl
                                        font-semibold"
                                >{data.todo}</h3>
                                
                                <p className="text-sm
                                    text-gray-600">Status: {data.status}</p> {/* Completion Status */}
                            </div>
                            <div className="flex gap-2">
                                {/* Edit Button */}
                                <button className="bg-blue-500
                                    text-white px-3 py-1 rounded 
                                        hover:bg-blue-600 transition"
                                    onClick={()=>handleEdit(data)}>
                                    Edit
                                </button>
                                {/* Delete Button */}
                                <button className="bg-red-500 text-white 
                                            px-3 py-1 rounded hover:bg-red-7 00 transition"
                                        onClick={()=>handleDelete(data._id,data.todo)}>
                                    Delete
                                </button>
                            </div>
                        </div>

                    {/* Description */}
                    <div className="descriptionContainer mb-2">
                        <p className="text-gray-700">{data.description}</p>
                    </div>

                    {/* Dates: Creation and Update */}
                    <div className="flex flex-col
                            text-sm text-gray-500">
                        <p>Created:{data.createdDate}</p> {/* Creation Date */}
                        <p>Updated:  {data.updatedDate}</p> {/* Update Date */}
                    </div>
                    <div></div>
                </div>

        )): <Warning error="No todo's available" />}
           
  
            
        </div>
    </div>
  )
}

export default ProjectDetails