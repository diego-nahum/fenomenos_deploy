import React, {useContext, useState} from 'react';
import './LogOut.css';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from "react-router-dom";


const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Has hecho logout con éxito!");

    // Redirigir al usuario a la vista /profile-page
    navigate('/mainpage');
  }

  return (
    <>
        <button className="logout-button" onClick={handleLogout}>
            Log Out
        </button>
    </>
  );
}

export default LogoutButton;