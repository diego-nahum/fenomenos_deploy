import './Navbar.css';
import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import LogoutButton from '../profile/LogOut';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar() {
    const { token } = useContext(AuthContext);
    const [userData, setUserData] = useState({ username: '', email: '', name: '' });

    useEffect(() => {
        if (token && token !== "null") {
            decodeToken(token);
        }
    }, [token]);

    function decodeToken(token) {
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        console.log(tokenPayload);

        const { username, email, name } = tokenPayload;
        setUserData({ username, email, name });
    }

    return (
        <div className="Navbar">
            <div className="left-nav">
                <NavLink to={token && token !== "null" ? "/profile-page" : "/mainpage"} className="logo-link">
                    <img src={logo} alt="PIRÁMIDE Logo" />
                </NavLink>
                <NavLink to="/nosotros">Nosotros</NavLink>
            </div>
            <div className="right-nav">
                {token && token !== "null" ? (
                    <>
                        <span className='text'>¡Hola {userData.name}!</span>
                        <NavLink to="/profile-info">Ver Perfil</NavLink>
                        <LogoutButton className="logout-button" />
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Acceder</NavLink>
                        <NavLink to="/register">Registrarse</NavLink>
                    </>
                )}
            </div>
        </div>
    );
}
