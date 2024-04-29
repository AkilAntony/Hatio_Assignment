import {Project} from '../Models/Project.js'


const setProject = async (req,res)=>{
    const projectTitle = req.body.title
    if(!projectTitle) return res.status(401).json({message:'Enter Project Title'})
    try{
        const createProject = new Project({
            title: projectTitle,
            owner: req.user.id
        })
        const savedProject= await createProject.save();
        res.status(201).json({message: 'Project created successfully',project: savedProject});
    }catch(err){
        // res.status(500).json({ message: 'Error creating project' });
        console.log(err)
    } 
}


const getProjects = async(req,res) =>{
     
    try{
        const userId = req.user.id
        if(!userId) {
            return res.status(401).json({message:'Please register first to use the application'})
        }
        const projects = await Project.find({owner:userId})
        if (projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for this user' });
        }
        const formattedProjects = projects.map(project=>({
            id:project.id,
            title:project.title
        }))
    //    const titles = projects.map(data=>data.title)
    //    const id = projects.map(data=>data.id)
    //    console.log(formattedProjects)
       return res.status(200).json({formattedProjects})
        
    }catch(err){
        return res.status(401).json({message:'You are not authorized'})
    }
   
}

export default {setProject,getProjects}