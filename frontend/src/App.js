
import { Route, Routes, useAsyncError, useNavigate } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Project from './Components/Project/Project';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import { useEffect } from 'react';
import ProtectedRoutes from './Components/Protected Routes/ProtectedRoutes';
import EditTodo from './Components/Todo/EditTodo';

function App() {
  

  
  return (
    <div className="App  ">
      <Routes>
        <Route path='/' element= {<Register/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/project' element= {<ProtectedRoutes><Project/></ProtectedRoutes>} />
        <Route path='/projectDetails' element= {<ProtectedRoutes><ProjectDetails/></ProtectedRoutes>} />
        <Route path='/editTodo' element= {<ProtectedRoutes><EditTodo/></ProtectedRoutes>} />
      </Routes>
    </div>
  );
}

export default App;
