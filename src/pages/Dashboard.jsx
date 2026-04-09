import '../App.css';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

function Dashboard() {
    const [error, setError] = useState('');
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        const fetchSecureUsers = async () => {
            
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://workshopapp.onrender.com/users', {
                    method: 'GET',
                    headers: { 
                        'Authorization': `Bearer ${token}` // Present the JWT Bouncer pass!
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setUserList(data); // Save the users to state!
                } else {
                    setError('Failed to load users.');
                }
            } catch {
                setError('Failed to load users.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSecureUsers();

    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <div className='container'><h2 style={{color: 'red'}}>{error}</h2></div>;

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

export default Dashboard;