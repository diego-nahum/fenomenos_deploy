import React, { useEffect, useState } from 'react';
import Navbar from "../common/Navbar";
import axios from "axios";
import './unirseJuego.css';
import API_URL from "../common/config";

export default function UnirseJuego() {
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await axios.get(`${API_URL}/partidas-disponibles`);
        setPartidas(response.data);
      } catch (error) {
        console.error("Error fetching partidas", error);
      }
    };

    fetchPartidas();
  }, []);

  const handleUnirsePartida = async (id) => {
    try {
      const token = localStorage.getItem('token'); 

      await axios.post(`${API_URL}/unirseapartida/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.href = `/partida/${id}`;
    } catch (error) {
      console.error("Error uniéndose a la partida", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="partidas-containers">
        <h1>Unirse a una Partida</h1>
        {partidas.length > 0 ? (
          <div className="container-infos">
            {partidas.map(partida => (
              <div key={partida.id} className="opcion-infos">
                <p>ID de la Partida: {partida.id}</p>
                <p>Cantidad de Jugadores: {partida.jugadores}</p>
                <button className="boton" onClick={() => handleUnirsePartida(partida.id)}>
                  Unirse a Partida
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay partidas disponibles</p>
        )}
      </div>
    </>
  );
}
