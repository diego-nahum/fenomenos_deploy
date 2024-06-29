import './ProfileInfo.css';
import { NavLink } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';


function ProfileInfo() {
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
            <Navbar />
            <h2 className='titulo'>Perfil de Usuario</h2>
            <div className="container-info">
                <img src="../foto_diego.jpg" alt="Profile" className="foto" />
                <div className="info">
                    <p><strong>Nombre:</strong> {userData.name}</p>
                    <p><strong>Mail:</strong> {userData.email}</p>
                    <p><strong>Usuario:</strong> {userData.username}</p>
                    <p><strong>Teléfono:</strong> +56911223344</p>
                    <NavLink to="/historial" className="boton">
                        Ver Mi Historial de Partidas
                    </NavLink>
                    <NavLink to="/profile-page" className="boton">
                        Volver
                    </NavLink>
                </div>
            </div>

        </>
    );

}


export default ProfileInfo;
