import logo from '../assets/logo.png'
import './Header.css';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import LogoutButton from '../profile/LogOut';

export default function Header() {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: '', email: '', name: '' });

  useEffect(() => {
    
    if (token) {
        decodeToken(token);
    }
  }, [token]);

  function decodeToken(token) {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    console.log(tokenPayload);

    const { username, email, name } = tokenPayload;
    setUserData({ username, email, name: name });
  }
  
  return (
    <>
    <div className="Header">
      <div className="left-header">
        <NavLink to={token ? "/profile-page" : "/mainpage"}>
            <img src={logo} alt="PIRÁMIDE Logo" />
        </NavLink>

      </div>
      <div className="right-header">
        <span className='text'>¡Hola {userData.name}!</span>
        <NavLink to="/profile-info">Ver Perfil</NavLink>
        <LogoutButton className="logout-button" />
      </div>
    </div>
    </>
  );
};