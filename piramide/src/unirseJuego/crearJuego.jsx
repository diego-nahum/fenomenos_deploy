import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../common/Navbar";
import axios from "axios";
import './crearJuego.css';
import API_URL from "../common/config";

export default function CrearJuego() {
  const { id } = useParams(); 
  const [partida, setPartida] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartida = async () => {
      try {
        const response = await axios.get(`${API_URL}/partida/${id}`);
        setPartida(response.data);
      } catch (error) {
        console.error("Error fetching the partida details", error);
      }
    };

    fetchPartida();
  }, [id]);

  return (
    <div>
      <Navbar />
      {partida ? (
        <div className="partida-details">
          <p><strong>ID de la Partida:</strong> {partida.id}</p>
          <p><strong>Cantidad de Jugadores:</strong> {partida.jugadores.length}</p>
          <p><strong>Estado:</strong> {partida.partida_iniciada ? 'Iniciada' : 'Esperando jugadores'}</p>
          <div className="jugadores-list">
            <p><strong>Jugadores:</strong></p>
            <ul>
              {partida.jugadores && partida.jugadores.map(jugador => (
                <li key={jugador.id}>{jugador.username}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Cargando detalles de la partida...</p>
      )}
    </div>
  );
}
