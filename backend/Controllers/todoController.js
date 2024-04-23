import Todo from "../Models/Todo.js";

const getTodo = async(req,res)=>{
    try{
        const projectId = req.headers.owner;
        if(!projectId){
            return res.status(401).json({message:'Please create the project first '})
        }
        const todoList = await Todo.find({owner:projectId})
        console.log(todoList)
        res.status(200).json(todoList)
    }catch(err){
         return res.status(401).json({message:'You are not authorized or server error'})
    }  
}

const postTodo = async(req,res)=>{
    try{
        const {todo,todoDescription,owner} = req.body
        console.log(todo,todoDescription,owner)
        if(!todo || !todoDescription || !owner){
            return res.status(400).json({ message: 'Description and status are required.' });
        }
        const newTodo = new Todo({
                todo : todo,
                description : todoDescription,
                status:'pending',
                createdDate: new Date(),
                updatedDate: new Date(),
                owner: owner
            });
        const saveTodo = await newTodo.save();
        if(!saveTodo){
             return res.status(400).json({ message: 'An error occurred while storing Todo to DB.' });
        }
        return res.status(201).json({message:'Todo created successfully'})
    }catch(err){
        return res.status(401).json({message:'An error occurred while creating the todo.'})
    }
}

const putTodo = async(req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(401).json({message:'The todo you are trying update is not available'})
        }
        const {todo,description,status} = req.body;
        if(!todo || !description || !status){
            return res.status(401).json({message:'Please enter Tods and Todo Description for update'})
        }
        const updateTodo = await Todo.findByIdAndUpdate(id,
            { todo:todo, description:description, status:status },
            { new: true } )
        if(!updateTodo){
            return res.status(404).json({ message: 'Todo item not found' });
        }
        res.status(200).json({ message: 'Todo updated successfully', todo: updateTodo });
    }catch(error){
        console.log(error);
         res.status(500).json({ message: 'An error occurred while updating the todo item' });
    }
  
    
    
}  

const deleteTodo = async(req,res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(401).josn({message:'you are not allowed to Delete'})
        }
        const deleteFromDB = await Todo.findByIdAndDelete(id)
        if (!deleteFromDB) {
      // If the ID does not exist, return a 404 error
            return res.status(404).json({ message: 'Todo not found' });
        }   
        return res.status(200).json({message:'todo Deleted'})
    }catch(err){
        console.log(err)
        return res.status(500)
    }
   
}


export default {getTodo,postTodo,deleteTodo,putTodo}