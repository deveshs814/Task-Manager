import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Cookies from "js-cookie";
import Dashboard from './pages/Dashboard';
import axios from 'axios'

axios.defaults.withCredentials = true;
const App = () => {
  const navigate = useNavigate();

useEffect(() => {
  const token = Cookies.get("taskifyUserToken");
  if (token) {
    navigate("/dashboard");
  } else {
    navigate("/login");
  }
}, []);

  return (
    <>
    <Routes>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
