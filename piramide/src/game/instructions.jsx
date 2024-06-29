import './instructions.css'
import Navbar from '../common/Navbar'

export default function Instructions() {
    return (
        <>
            <Navbar />
            <div className="Instructions">
                <header>
                    <h2>Instrucciones📝</h2>
                </header>
                <p>¡Bienvenidos Pirámide! 🏛️ En este juego, participan <strong>cuatro jugadores</strong> en cada partida. 
                    Cada uno tendrá en su mano <strong>cuatro cartas</strong> en todo momento. Recuerden, si utilizan 
                    una carta, deberán descartarla y sacar una nueva al inicio del próximo turno. Las  
                    cartas de los demás jugadores permanecerán ocultas, ya que la intriga forma parte de la diversión 🔍🤫. 
                    Para cada turno del jugador, deberán:
                </p>
                <ol>
                    <li>Seleccionar una carta de la pirámide🃏</li>
                    <li>Desafirar a uno de los otros jugadores a un juego de verdad o mentira sobre la posesión de una carta específica. </li>
                    <li>El jugador desafiado responderá con un sí o un no, pudiendo mentir si lo desea 🤔💬. </li>
                    <li>El desafiante deberá decidir si cree o no en la respuesta del otro jugador 😈.</li>
                    <li>Si el desafiante acierta, recibirá puntos. En caso contrario, el desafiado recibirá los puntos 🤨.</li>
                </ol>
                <p> ¡Pero espera, hay más 🎉 ! Algunas cartas sorpresa pueden cambiar el curso del juego. Si aparece una K,
                    se revelan las cartas de todos los jugadores, otorgando puntos adicionales al que tenga la combinación
                    numérica más grande. 👑 Una Q permite al jugador cambiar cartas con otro jugador, mientras que una J obliga
                    al jugador desafiado a decir la verdad. Y si aparece un Joker, ¡se produce un intercambio masivo de cartas
                    entre todos los jugadores! 🤹‍♂️
                </p>
                <p>El juego continúa hasta que <strong>todas las cartas de la mesa hayan sido reveladas.</strong> El jugador con más 
                    puntos acumulados al final de la partida será el ganador 🏆 . ¡Que comience la diversión! 🎊 
                </p>
            </div>
        </>
    )
}