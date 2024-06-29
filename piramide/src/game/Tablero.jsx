import React, { createContext, useEffect, useState } from "react";
import "./Tablero.css"
import Navbar from "../common/Navbar";
import Mesa from "./Mesa";
import PanelLateral from "./PanelLateral";

export default function Tablero() {
  const [players, setPlayers] = useState(null);

  const updatePlayers = (updatedPlayers) => {
    setPlayers(updatedPlayers);
    console.log("Actualizados")
    console.log(players)
  };

  return (
    <>
    <div className="tablero">
      <Navbar />
      <div className="contenido">
        <Mesa players={players} updatePlayers={updatePlayers} />
        <PanelLateral players={players}/>
      </div>
    </div>
    </>
  );
}