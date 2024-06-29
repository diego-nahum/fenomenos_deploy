import React from "react";
import "./PanelLateral.css";


export default function PanelLateral({ players }) {
    if (players === null) {
        return null; // No se muestra nada si players es null o está vacío
    }

    return (
        <div className="panel-lateral">
            <div className="tabla-puntaje">
                <h3>Tabla Puntaje</h3>
                <ul>
                    {players.map((player, index) => (
                        <li key={index}>
                            {player.nombre} - Puntaje: {player.puntaje}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat">
                <h3>Chat</h3>
                <div className="mensaje">
                    <strong>joseifr:</strong> Les voy a ganaaar
                </div>
                <div className="casilla-texto">
                    caja texto
                </div>
            </div>
        </div>
    )
}