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

    return (
        <>
        <div className="register-container">
            <h2>{isLoginMode ? 'Login Here' : 'Register Here'}</h2>
            <form className='register-form'>
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
            </form>
            <p className='live-preview' style={{color: message === 'Password looks good!' ? 
                'lightgreen' : '#ff6b6b'}}>
                {message}
            </p>
            <p className='live-preview'>Live Preview: {formData.username}</p>
        </div>
        </>
    );

}

export default RegisterForm;