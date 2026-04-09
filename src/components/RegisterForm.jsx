import { useEffect, useState } from 'react';
import './RegisterForm.css';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);    

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isLoginMode, setIsLoginMode] = useState(false); // Toggles Register vs Login
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("target: ", e.target);
        console.log("target key: ", name);
        // Spread operator copies existing data, then overwrites the specific field
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const [message, setMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.password.length === 0) {
            setMessage(''); 
            } else if (formData.password.length < 5) {
                setMessage('Password is too short!');
            } else {
                setMessage('Password looks good!');
            }
        }, 500);

        return () => clearTimeout(timer);
        
    }, [formData.password]);    

    const handleSubmit = async (e) => {
        e.preventDefault(); // Stop the page from refreshing!
        
        // Determine which Express route to hit
        const endpoint = isLoginMode ? '/users/login' : '/users';
        
        try {
            setIsLoading(true);
            const response = await fetch(`https://workshopapp.onrender.com${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.username, // Map React state to Express req.body
                    email: formData.email,
                    password: formData.password
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.error);

            if (isLoginMode) {
                console.log("Here!!");
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setMessage('Registered! Please switch to Login.');
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    

    if (isLoading) return <p>Loading...</p>;

    
    
  return (
    <>
    <div className='register-container'>
        <h2>{isLoginMode ? 'Login Here' : 'Register Here'}</h2>
        <form onSubmit={handleSubmit} className='register-form'>
            <input 
                name="username" 
                value={formData.username}
                onChange={handleChange} 
                placeholder="Username"
                className="register-input"
            />
            <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="Email"
                className="register-input"
            />
            <input 
                name="password" 
                value={formData.password} 
                onChange={handleChange}
                placeholder="Password"
                className="register-input"
            />
            <button type="submit">Submit</button>
        </form>
        <p className="live-preview" style={{ color: 
            message === 'Password looks good!' ? 'lightgreen' : '#ff6b6b' }}>
            {message}
        </p>
        <p className="live-preview">Live Preview: {formData.username}</p>
        <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
            Switch to {isLoginMode ? 'Register' : 'Login'}
        </button>
    </div>
    </>
  );
}

export default RegisterForm;