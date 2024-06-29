import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BuscarPartida.css';
import Navbar from '../common/Navbar';
import buscar from '../assets/buscar.png';
import crear from '../assets/agregar.png';
import API_URL from "../common/config";

const BuscarPartidas = () => {
  const navigate = useNavigate();

  const handleCrearPartida = async () => {
    try {
      const token = localStorage.getItem('token'); 

      const response = await axios.post(`${API_URL}/crearpartida`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);

      navigate(`/partida/${response.data.partidaId}`); 
    } catch (error) {
      console.error("Error creando la partida", error);
    }
  };

  const handleUnirsePartida = (id) => {
    navigate(`/partida/${id}`); 
  };

  return (
    <>
      <Navbar />
      <div className="partidas-container">
        <h2 className='titulo'>Opciones de Partidas</h2>
        <div className="container-info">
          <div className="opcion-info">
            <img src={crear} alt="Crear Partida" className="icono" />
    
              <button className="boton" onClick={handleCrearPartida}>
                Crear Partida
              </button>
          </div>
          <div className="opcion-info">
            <img src={buscar} alt="Buscar Partida" className="icono" />
            <button className="boton" onClick={() => navigate("/encontrarpartida")}>     
              Encontrar Partida
            </button>     
        </div>
        </div>
      </div>
  
    </>
  );
}

export default BuscarPartidas;
