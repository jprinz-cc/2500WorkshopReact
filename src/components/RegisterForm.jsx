import { useState, useEffect } from 'react';
import './RegisterForm.css';
import Card from './Card';

function RegisterForm() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const [isLoginMode, setIsLoginMode] = useState(false);
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(formData.password.length === 0){
                setMessage('');
            } else if(formData.password.length < 5){
                setMessage('Password is too short!');
            } else {
                setMessage('Password looks good!');
            }
        }, 500);

        return () => clearTimeout(timer);

    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value} = e.target;
        console.log("Target: ", e.target);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const fetchSecureUsers = async (token) => {
        try {
            setIsLoading(true);
            const response = await fetch('https://workshopapp.onrender.com/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if(response.ok){
                setUserList(data);
            }

        } catch (err) {
            setMessage('Failed to load users.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.PreventDefault();

        const endpoint = isLoginMode ? '/users/login' : '/users'; 
        
        try {
            setIsLoading(true);
            const response = await fetch(`https://workshopapp.onrender.com${endpoint}`, {
                method: 'POST',
                header: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name: formData.userName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if(!response.ok) throw new Error(data.error);

            if(isLoginMode) {
                setMessage('Login Successful! Fetching users...');
                fetchSecureUsers(data.token);
            } else {
                setMessage('Registered! Please switch to Login');
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    if(userList.length > 0) {
        return (
            <div className='register-container' style={{maxWidth: '800px'}}>
                <h2>Secure User Dashboard</h2>
                <div style={{display: flex, gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
                   {userList.map((user) =>(
                    <Card key={user.id} title={user.name} description={user.email} />
                   ))} 
                </div>
            </div>
        );
    }



    return (
        <>
        <div className="register-container">
            <h2>{isLoginMode ? 'Login Here' : 'Register Here'}</h2>
            <form onSubmit={handleSubmit} className='register-form'>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Username'
                    className='register-input'
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email'
                    className='register-input'
                />
                <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    className='register-input'
                />
                <button type='submit'>Submit</button>
            </form>
            <p className='live-preview' style={{color: message === 'Password looks good!' ? 
                'lightgreen' : '#ff6b6b'}}>
                {message}
            </p>
            <p className='live-preview'>Live Preview: {formData.username}</p>
            <button type='button' onClick={() => setIsLoginMode(!isLoginMode)}>
                Switch to {isLoginMode ? 'Register' : 'Login'}
            </button>
        </div>
        </>
    );

}

export default RegisterForm;