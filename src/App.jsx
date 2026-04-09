import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar';
import Card from './components/Card';
import Counter from './components/Counter';
import RegisterForm from './components/RegisterForm';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<h2>404 Not Found</h2>} />
        </Routes>

        {/* <h1>Hello React</h1>
        <div className='container'>
          <Card title="Product 1" description="This is cool" />
          <Card title="Product 2" description="This is better" />
          <Card title="Product 3" description="This is the Best!" />
        </div> */}
        {/* <div className='container'>
          <RegisterForm />
        </div> */}

        <footer className="app-footer">
          <Counter />  
        </footer>  
      </div>    
    </>
  )
}

export default App
