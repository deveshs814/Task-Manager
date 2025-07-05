import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/Login';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
    </Routes>
    </>
  )
}

export default App
