import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const EditTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    todoId, todo, 
    description,status,
    projectName,projectId} = location.state || {};
  console.log(todoId,todo,description,status,projectName,projectId);
  const [isChecked,setIsChecked] = useState(false)
  const [todoValue, setTodoValue] = useState(todo);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [statusValue, setStatusValue] = useState(status);

  const handleCheckBox = ()=>{
    setIsChecked(!isChecked);
    if(isChecked){
      setStatusValue('Completed')
    }
    
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
     <div className="mt-4 bg-zinc-400 
                            rounded-lg shadow m-2">
        <div>
            <h1 className='text-2xl text-center font-bold'>{projectName}</h1>
        </div>
        
            {/* Todo Name ,and Status and  */}
            <div className='flex items-center justify-center 
                    flex-col gap-4 md:flex-row 
                    md:justify-evenly mt-5'>

                {/* Todo input field */}
                <div className='gap-2 flex md:flex-row 
                        md:items-center flex-col'>
                    <label className='font-bold'>Enter todo:</label>
                    <input
                        type="text"
                        value={todoValue}
                        className='border py-1 rounded-sm'
                        onChange={(e)=>setTodoValue(e.target.value)}
                    />
                </div>

                {/* description field */}
                <div className='gap-2 flex md:flex-row 
                        md:items-center flex-col'>
                    <label className='font-bold'>Enter Description</label>
                    <textarea cols="30"
                        className='border rounded-sm '
                        onChange={(e)=>{setDescriptionValue(e.target.value)}}
                        value={descriptionValue}>
                    </textarea>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type="checkbox"
                        value={status}
                        checked={isChecked}
                        onChange={handleCheckBox}/>
                    <span>{statusValue}</span>
                </div>
                {/* <button
                    className="bg-green-500 text-white 
                        px-3 py-1 rounded hover:bg-green-600 transition">
                    Mark as Completed
                </button> */}
                
                          
            </div>
                    {/* Edit and Delete Button */}
            <div className="flex gap-2">
                <button className="bg-blue-500
                            text-white px-3 py-1 rounded 
                            hover:bg-blue-600 transition"
                        onClick={handleSave}>
                    Save
                </button>
            
            </div>
                    <div></div>
                </div>

  );
};

export default EditTodo;
