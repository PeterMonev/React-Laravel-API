import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';



function App() {
  return (
    <div className="App">
   

    <Routes>
      
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>


    </Routes>  

    <Register />
      

    </div>
  );
}

export default App;
