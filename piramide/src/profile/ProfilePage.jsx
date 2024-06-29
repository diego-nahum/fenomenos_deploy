import './ProfilePage.css'
import { NavLink } from 'react-router-dom'
import Navbar from '../common/Navbar'


function ProfilePage() {
    return (
        <>
            <Navbar />
            <div className="ProfilePage">
                <div className="container-button">
                    <NavLink to="/tablero">¡Comenzar a jugar!</NavLink>
                </div>
                <main className="container-mainpage">
                <NavLink to="/instructions" className="left-panel">  
                        <h2>¿CÓMO JUGAR?</h2>
                        <ul>
                            <li>1. Participan <strong>cuatro jugadores</strong> en cada partida. 
                Cada uno tendrá en su mano <strong>cuatro cartas</strong> en todo momento 🃏.</li>
                            <li>2. Seleccionar una carta de la pirámide 🏛️.</li>
                            <li>3. Desafiar a uno de los otros jugadores a un juego de verdad o mentira 🤔💬.</li>
                            <li> <strong>¡Ver más!</strong></li>
                        </ul>
                    </NavLink>
                    <section className="right-panel">
                        <h2>LEADERBOARD 🏆</h2>
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
        </>
    )
}

export default ProfilePage
