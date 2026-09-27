import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
        <h2 className='sidebar-title'>AMS</h2>
        <ul className='sidebar-menu'>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/assets">Assets</NavLink>          
            </li>
            <li>
                <NavLink to="/inventory">Inventory</NavLink>                
            </li>
            <li>
                <NavLink to="/ticket">
                   Tickets
                </NavLink>                
            </li>
            <li>
                <NavLink to="/profile">
                    Profile
                </NavLink>               
            </li>
            <li>
                <NavLink to="/chat">
                    Chat
                </NavLink>               
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
