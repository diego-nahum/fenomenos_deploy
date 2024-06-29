import React, { useEffect, useState } from "react";
import './CartasJugadores.css'; // Importa el archivo CSS


export default function CartasJugadores({id, imgSrc, posicion, volteada}){
    const [current, setCurrent] = useState(false);

    useEffect(() => {
        if (posicion === "actual" || volteada) {
            setCurrent(true);
        }
    }, [posicion, volteada]);

    return(
        <div className={`card ${posicion}`}>
            <div className="card-content">
                {!current ? (
                    <img src="https://cdn.pixabay.com/photo/2012/05/07/18/53/card-game-48983_1280.png" className="img" alt="card back" />
                ) : (
                    <img src={imgSrc} className="img" alt={`card ${id}`} />
                )}
            </div>
        </div>
    )
}