import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import Admin from './components/admin'

function App() {

  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/admin' element={<Admin/>}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
