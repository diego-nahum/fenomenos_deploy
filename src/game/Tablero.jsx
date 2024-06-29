import React, { createContext, useEffect, useState } from "react";
import "./Tablero.css"
import { useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Mesa from "./Mesa";
import PanelLateral from "./PanelLateral";

export default function Tablero() {
  const { id } = useParams(); 
  const [players, setPlayers] = useState(null);

  const updatePlayers = (updatedPlayers) => {
    setPlayers(updatedPlayers);
    console.log("Actualizados")
    console.log(players)
  };

  console.log(players)

  return (
    <>
    <div className="tablero">
      <Navbar />
      <div className="contenido">
        <Mesa players={players} updatePlayers={updatePlayers} id_partida={id} />
        <PanelLateral players={players}/>
      </div>
    </div>
    </>
  );
}