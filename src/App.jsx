import './App.css'
import Navbar from './components/Navbar';
import Counter from './components/Counter';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
          } 
          />
          <Route path='*' element={<h2>404 Not Found</h2>} />
        </Routes>

        <footer className="app-footer">
          <Counter />  
        </footer>  
      </div>    
    </>
  )
}

export default App
