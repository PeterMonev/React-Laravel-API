import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { AuthProvider } from './hooks/authContext';

function App() {
  return (
    <div className="App">
   
    <AuthProvider >

    <Routes>
      
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>


    </Routes>  

    <Register />
      
    </AuthProvider>

    </div>
  );
}

export default App;
