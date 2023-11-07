import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { AuthProvider } from './hooks/authContext';
import { Header } from './components/Header/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Footer } from './components/Footer/Footer';
import { PrivateGuard } from './guards/PrivateGuard';
import { Cars } from './components/Cars/Cars';


function App() {
  return (
    <div className="App">
   
    <AuthProvider >

    <Header/>

    <Routes>

      <Route element={<PrivateGuard/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      

        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cars' element={<Cars/>}/>

    </Routes>  

    <Footer/>
      
    </AuthProvider>

    </div>
  );
}

export default App;
