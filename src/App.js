import React, { useContext, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home';
import Create from './Pages/Create'
import  {AuthContext, FirebaseContext}  from './store/FirebaseContext';
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';
import { auth } from './firebase/config';

function App() {

  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const userEnrty = onAuthStateChanged(auth, (user)=>{
      setUser(user);
    });
  });
  return (
    <>
    <div>
      <Router>
        <Routes>
        <Route  path='/' element={<Home />} />
        <Route  path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='create' element={<Create />} />
        </Routes>
        
      </Router>
      
    </div>
    </>
  );
}

export default App;