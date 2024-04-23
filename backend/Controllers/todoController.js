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

const putTodo = (req,res)=>{
    console.log(req)
       res.json({message:'update todo'})
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