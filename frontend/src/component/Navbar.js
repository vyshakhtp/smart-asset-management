import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Navbar() {
     const navigate = useNavigate();

    const handleLogout = async () => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');

        try {

            await axios.post(
                // 'http://127.0.0.1:8000/api/logout/',
                '/api/logout/',
                {
                    refresh: refreshToken
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            console.log('Logout successful');
        } catch (error) {
            console.error(
                'Logout error:',
                error.response?.data
            );
        } finally {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            navigate('/login');
        }
    };
  return (
       <nav className="navbar">
            <h2 className='navbar-title'>Asset Management</h2>
            <div className="navbar-right">
                <span>Admin</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
       </nav>
  )
}

export default Navbar
