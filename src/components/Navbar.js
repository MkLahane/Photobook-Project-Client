import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const entirePathName = window.location.pathname;
    const path = entirePathName === '/' ? 'home' : entirePathName.substr(1);
    const [activeNav, setActiveNav] = useState(path);
    return (
        <div className='navbar'>
            <div className='logo'>
                <Link to='/' onClick={() => setActiveNav('home')}>
                    <div style={{ filter: activeNav === 'home' ? 'brightness(1.0)' : 'brightness(1.0)' }}>
                        Photobook
                    </div>
                    <span style={{ opacity: activeNav === 'home' ? '1.0' : '0.0' }}></span>
                </Link>
            </div>
            {user ? (<>
                <ul className='user'>
                    <li onClick={() => logout()} style={{ filter: 'brightness(1.0)', cursor: 'pointer' }}>
                        Log Out
                    </li>

                    <Link to='/addphotobook' onClick={() => setActiveNav('addphotobook')}>
                        <li style={{ filter: activeNav === 'addphotobook' ? 'brightness(1.0)' : 'brightness(0.5)' }}>
                            Add photobook
                            <span style={{ opacity: activeNav === 'addphotobook' ? '1.0' : '0.0' }}></span>
                        </li>
                    </Link>
                </ul>
            </>) : (
                    <>
                        <ul className='user'>
                            <Link to='/login' onClick={() => setActiveNav('login')}>
                                <li style={{ filter: activeNav === 'login' ? 'brightness(1.0)' : 'brightness(0.5)' }}>
                                    Log In
                            <span style={{ opacity: activeNav === 'login' ? '1.0' : '0.0' }}></span>
                                </li>
                            </Link>
                            <Link to='/register' onClick={() => setActiveNav('register')}>
                                <li style={{ filter: activeNav === 'register' ? 'brightness(1.0)' : 'brightness(0.5)' }}>
                                    Sign Up
                            <span style={{ opacity: activeNav === 'register' ? '1.0' : '0.0' }}></span>
                                </li>
                            </Link>
                        </ul>
                    </>
                )
            }

        </div >
    );
};

export default Navbar;