import React from 'react';
import { NavLink } from 'react-router-dom';
import './Historial.css';
import Navbar from '../common/Navbar';

const partidas = [
    { id: 1, fecha: '8/04 10:59', puntos: 2, resultado: 'Derrota' },
    { id: 2, fecha: '8/04 09:59', puntos: 30, resultado: 'Victoria' },
    { id: 3, fecha: '8/04 08:59', puntos: 40, resultado: 'Victoria' },
];

function Historial() {
    return (
        <>
        <Navbar />
        <div className="historial-container">
            <h2>Mi Historial de Partidas</h2>
            <table className="historial-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Puntos</th>
                        <th>Pierde/Gana</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas.map((partida) => (
                        <tr key={partida.id}>
                            <td>{partida.fecha}</td>
                            <td>{partida.puntos}</td>
                            <td>{partida.resultado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <NavLink to="/profile-info" className="back-button">
                Volver a Perfil
            </NavLink>
        </div>
        </>
    );
}

export default Historial;