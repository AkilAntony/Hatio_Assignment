import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import EditTodo from '../Todo/EditTodo';

function ProjectDetails() {
    const [isVisible,setIsVisible] = useState(false);
    const [todo,setTodo] = useState('');
    const [description,setDescription] = useState('');
    const [warning,setWarning] = useState('')
    const [flag,setFlag] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    // const [isEditable, setIsEditable] = useState(false);
    const { projectId, projectName } = location.state || {}; // Fallback in case of undefine
//   console.log('Project ID:', projectId, 'Project Name:', projectName);
    // const projectId = location.state.prjectId;
     
    const [todoList,setTodoList] = useState([]);

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
        console.log({todo,description});
        if(!todo || !description) {
            return setWarning("Please Enter Todo and Description")
        } else {setWarning('');
        }   
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
           console.log(response)
        }catch(error){
            console.log(error)
        }
    }
    // functio to delete todo
    const handleDelete = async(id)=>{
    console.log('delete btn clicked')
        try{
            const response = await axios.delete(`http://localhost:5000/todos/${id}`,
        {headers:{
             Authorization:`Bearer ${localStorage.getItem('token')}`
        }})
        console.log(response.data)
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

    // this sets the creteTodo screen visible
    const handleVisible =()=>{
        setIsVisible(!isVisible)
    }

  return (
    <div className='m-2 md:m-10'>
        <p className='text-2xl text-center'>{projectName}</p>
        <div className='mt-6'>
            <button className='bg-green-700 py-2 px-2
             text-white rounded-sm shadow-md'
             onClick={handleVisible}>Add New Todo</button>

            {/* Crete todo section - start */}
            {isVisible && 
                <div className='bg-slate-100 p-5 mt-4'>
                    <div className='flex md:items-center md:justify-center 
                            md:gap-3 flex-wrap' >
                        <div className='flex flex-wrap items-center gap-4'>
                            <input type="text" value={todo} 
                                className='border bg-white py-2' 
                                onChange={(e)=>{setTodo(e.target.value)}}
                               />
                            <textarea name="description"  cols="40" rows=""
                                className='' value={description}
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
        {todoList ? 
            todoList.map((data)=>(
                <div className="mt-4 bg-slate-100 
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
                        <p>Created:</p> {/* Creation Date */}
                        <p>Updated:  </p> {/* Update Date */}
                    </div>
                    <div></div>
                </div>

        )): <p>No todos to show</p>}
           
  
            
        </div>
    </div>
  )
}

export default ProjectDetails