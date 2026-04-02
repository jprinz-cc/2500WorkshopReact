import { useEffect, useState } from 'react';
import './RegisterForm.css';
import Card from './Card';

function RegisterForm() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isLoginMode, setIsLoginMode] = useState(false); // Toggles Register vs Login
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                setMessage('Login Successful! Fetching users...');
                fetchSecureUsers(data.token); // Pass the JWT to our next function!
            } else {
                setMessage('Registered! Please switch to Login.');
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSecureUsers = async (token) => {
        try {
            setIsLoading(true);
            const response = await fetch('https://workshopapp.onrender.com/users', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}` // Present the JWT Bouncer pass!
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUserList(data); // Save the users to state!
            }
        } catch {
            setMessage('Failed to load users.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    if (userList.length > 0) {
      return (
          <div className="register-container" style={{ maxWidth: '800px' }}>
              <h2>Secure User Dashboard</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {userList.map((user) => (
                      <Card key={user.id} title={user.name} description={user.email} />
                  ))}
              </div>
          </div>
      );
  }
    
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