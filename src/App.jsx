import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar';
import Card from './components/Card';
import Counter from './components/Counter';

function App() {

  return (
    <>
      <div>
        <Navbar />
        <h1>Hello React</h1>
        <div className='container'>
          <Card title="Product 1" description="This is cool" />
          <Card title="Product 2" description="This is better" />
          <Card title="Product 3" description="This is the Best!" />
        </div>
      </div> 
      <footer className="app-footer">
        <Counter />  
      </footer>     
    </>
  )
}

export default App
