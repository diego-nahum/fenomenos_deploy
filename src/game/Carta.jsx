import './Carta.css'
import { useContext, useState } from 'react'
// import CardButton from './CardButton'
// import { GameContext } from './Board.jsx';

export default function Carta({id, valor, imgSrc, onClick, desafioActivo }){
    const [bocaAbajo, setbocaAbajo] = useState(true);

    const carta = valor
    const valorCarta = carta.split(' ')[0];

    const handleClick = () => {
        if (bocaAbajo && !desafioActivo) {
            setbocaAbajo(false);
            onClick(id, valorCarta);
        }
    }

    return(
        <div className="card" onClick={handleClick}>
            <div className="card-content">
            {bocaAbajo ? (
                <img src="https://cdn.pixabay.com/photo/2012/05/07/18/53/card-game-48983_1280.png" className="img" alt="card back" />
            ) : (
                <img src={imgSrc} className="img" alt={`card ${id}`} />
            )}
            </div>
        </div>
    )
}
