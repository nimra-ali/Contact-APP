// import SignUpForm from './Component/Signup';
import './App.css';
import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './Component/Home'
import SignUpForm from './Component/SignupForm';
import LoginForm from './Component/LoginForm'
// import Protected from './Component/Protected';

function App() {
  return (
  <div>
    {/* <SignUpForm/> */}
    <Router>
      <Routes>
        <Route path='/Login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignUpForm/>}/>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/Home' element={<Protected Component={Home}/>}/> */}
    </Routes>
    </Router>
  </div>
  )
}

export default App;
