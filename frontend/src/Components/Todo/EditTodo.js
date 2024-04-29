import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    todoId, todo, 
    description,status,
    projectName,projectId} = location.state || {};
  console.log(todoId,todo,description,status,projectName,projectId);
   
  const [todoValue, setTodoValue] = useState(todo);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [statusValue, setStatusValue] = useState(status);
  const [isChecked,setIsChecked] = useState(false)


  const handleCheckBox = ()=>{
   
  }
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/todos/${todoId}`, {
        todo: todoValue,
        description: descriptionValue,
        status: statusValue,
      });

    //   navigate('/projectDetails'); // Navigate back to the project details page after saving
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
     <div className="mt-4 border m-auto md:w-3/4 mt-10 ">
        <div>
            <h1 className='text-2xl text-center font-bold'>{projectName}</h1>
        </div>
        
            {/* Todo Name ,and Status and  */}
            <div className='flex items-center justify-center 
                    flex-col gap-4  
                    mt-5'>

                {/* Todo input field */}
                <div className='md:w-2/4 '>
                  <div className='gap-2 flex flex-col'>
                      <label className=''>Enter todo:</label>
                      <input
                          type="text"
                          value={todoValue}
                          className='border py-1 rounded-md'
                          onChange={(e)=>setTodoValue(e.target.value)}
                      />
                  </div>

                  {/* description field */}
                  <div className='gap-2 flex flex-col mt-7 mb-5'>
                      <label className=''>Enter Description</label>
                      <textarea cols="30"
                          className='border rounded-sm '
                          onChange={(e)=>{setDescriptionValue(e.target.value)}}
                          value={descriptionValue}>
                      </textarea>
                  </div>
                  <div className='flex gap-3 items-center mt-7 mb-5'>
                    <label htmlFor=""> Mark as Completed:</label>
                      <input type="checkbox"
                          value={status}
                         
                          onChange={handleCheckBox}/>
                      <span>{statusValue}</span>
                  </div>
                  <div className="flex items-center justify-center mb-10">
                    <button className="bg-green-600
                                text-white px-3 py-1 rounded w-full
                                hover:bg-green-800 transition"
                            onClick={handleSave}>
                        Save
                    </button>
                  </div>
                </div>
                {/* <button
                    className="bg-green-500 text-white 
                        px-3 py-1 rounded hover:bg-green-600 transition">
                    Mark as Completed
                </button> */}
                
                          
            </div>
                    {/* Edit and Delete Button */}
           
                    <div></div>
                </div>

  );
};

export default EditTodo;
