import './MainPage.css';
import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

function MainPage() {
    const { token } = useContext(AuthContext);
    const [userData, setUserData] = useState({ username: '', email: '', name: '' });
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        if (userData.email) {
          fetchUsers();
        }
    }, [userData.email]);
    
    async function fetchUsers() {
    axios({
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/users/`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    
    }).then(response => {
        const users = response.data;
        setUsers(users);

    }).catch(error => {
        console.log(error);
    });
    }

    const sortedUsers = users.length > 0 ? users.sort((a, b) => b.puntaje_total - a.puntaje_total) : [];

    return (
        <>
            <Navbar />
            {token && token !== "null" ? (
                <div className="MainPage">
                    <div className="container-button">
                        <NavLink to="/buscarpartida">¡Comenzar a jugar!</NavLink>
                    </div>
                    <main className="container-mainpage">
                        <NavLink to="/instructions" className="left-panel">
                            <h2>¿CÓMO JUGAR?</h2>
                            <ul>
                                <li>1. Participan <strong>cuatro jugadores</strong> en cada partida.
                                    Cada uno tendrá en su mano <strong>cuatro cartas</strong> en todo momento 🃏.
                                </li>
                                <li>2. Seleccionar una carta de la pirámide 🏛️.</li>
                                <li>3. Desafiar a uno de los otros jugadores a un juego de verdad o mentira 🤔💬.</li>
                                <li><strong>¡Ver más!</strong></li>
                            </ul>
                        </NavLink>
                        <section className="right-panel">
                            <h2>LEADERBOARD 🏆</h2>
                            <ol>
                                {sortedUsers.slice(0, 5).map((user) => (
                                    <li key={user.id}>{user.username} - {user.puntaje_total}</li>
                                ))}
                            </ol>
                        </section>
                    </main>
                </div>
            ) : (
                <div className="MainPage">
                    <header>
                        <h1>¡Inicia sesión o regístrate para comenzar a jugar!</h1>
                    </header>
                    <main className="container-mainpage">
                        <NavLink to="/instructions" className="left-panel">
                            <h2>¿CÓMO JUGAR?</h2>
                            <ul>
                                <li>1. Participan <strong>cuatro jugadores</strong> en cada partida.
                                    Cada uno tendrá en su mano <strong>cuatro cartas</strong> en todo momento 🃏.
                                </li>
                                <li>2. Seleccionar una carta de la pirámide 🏛️.</li>
                                <li>3. Desafiar a uno de los otros jugadores a un juego de verdad o mentira 🤔💬.</li>
                                <li><strong>¡Ver más!</strong></li>
                            </ul>
                        </NavLink>
                        <section className="right-panel">
                            <h2>LEADERBOARD 🏆</h2>
                            <h4>Accede para ver la real! 🤩</h4>
                            <ol>
                                <li>diego_nahum</li>
                                <li>joseifr</li>
                                <li>cabrera_h</li>
                                <li>fenomeno4534</li>
                                <li>javieragr</li>
                            </ol>
                        </section>
                    </main>
                </div>
            )}
        </>
    );
}

export default MainPage;
