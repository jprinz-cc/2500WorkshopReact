import { useState, useEffect } from 'react';
import './RegisterForm.css';

function RegisterForm() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

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
            <h2>Register Here</h2>
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