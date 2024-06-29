import React, { createContext, useEffect, useState, useContext } from "react";
import "./Mesa.css";
import Carta from "./Carta";
import CartasJugadores from "./CartasJugadores";
import BotonesDesafio from "./BotonesDesafio";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../auth/AuthContext';


export const GameContext = createContext(null);

export default function Mesa({ players, updatePlayers}) {
  // Contexto de autenticación
  const { token } = useContext(AuthContext);

  // Contexto de usuarios seleccionados
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [userData, setUserData] = useState({ username: '', email: '', name: '' });

  // const [players, setPlayers] = useState(null);


  useEffect(() => {
      if (token) {
          decodeToken(token);
      }
    }, [token]);

  function decodeToken(token) {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    console.log(tokenPayload);

    const { username, email, name } = tokenPayload;
    setUserData({ username, email, name: name });
    
  }

  useEffect(() => {
    if (userData.email) {
      fetchUsers();
    }
  }, [userData.email]);

  async function fetchUsers() {
    axios({
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/users/`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    
    }).then(response => {
        const users = response.data;

        // Actual 
        const actual = users.find(user => user.mail === userData.email);
        if (currentUser === null) {
          setCurrentUser(actual);
        }

        // Resto de jugadores
        const chosenUsers = users.filter(user => user.mail !== userData.email).slice(0, 3);
        setSelectedUsers(chosenUsers);
        
    }).catch(error => {
        console.log(error);
    });
  }

  const jugadores = selectedUsers.length >= 3 ? [
    { nombre: selectedUsers[0].username, puntaje: 0, puntaje_acumulado: selectedUsers[0].puntaje_total, id: selectedUsers[0].id },
    { nombre: selectedUsers[1].username, puntaje: 0, puntaje_acumulado: selectedUsers[1].puntaje_total, id: selectedUsers[1].id },
    { nombre: selectedUsers[2].username, puntaje: 0, puntaje_acumulado: selectedUsers[2].puntaje_total, id: selectedUsers[2].id },
    { nombre: currentUser.username, puntaje: 0, puntaje_acumulado: currentUser.puntaje_total, id: currentUser.id}
  ] : [];

  if (players === null && jugadores.length > 0){
    updatePlayers(jugadores);
  }

  // Seteo cartas
  const [baraja, setBaraja] = useState({});
  const [cards, setCards] = useState({});

  // const [cardsplayers, setCardsPlayers] = useState({});
  const [jugadorArribaIzq, setJugadorArribaIzq] = useState({});
  const [jugadorAbajoIzq, setJugadorAbajoIzq] = useState({});
  const [jugadorArriba, setJugadorArriba] = useState({});
  const [jugadorActual, setJugadorActual] = useState({});

  // Logica juego
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [cartaDesafiada, setCartaDesafiada] = useState(null); //Id de carta
  const [mostrarDesafiar, setMostrarDesafiar] = useState(false);
  const [fase, setFase] = useState('seleccionarCarta');
  const [jugadorDesafiado, setJugadorDesafiado] = useState(null);
  const [jugadorDesafiadoNombre, setJugadorDesafiadoNombre] = useState(null);
  const [jugadorDesafianteNombre, setJugadorDesafianteNombre] = useState(null);
  const [cartasVolteadas, setCartasVolteadas] = useState({});
  const [cartasPiramideVolteadas, setCartasPiramideVolteadas] = useState({});

  // Fin de juego
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [jugadorGanador, setJugadorGanador] = useState(null);

  // Turnos
  const [turnoActual, setTurnoActual] = useState(3);
  const nombresJugadores = jugadores.map(jugador => jugador.nombre);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/obtenercartas`).then((response) => {
          const data = response.data;

          // Seteo baraja (Vienen revueltas)
          const allCards = data.reduce((acc, card, index) => {
            acc[index] = card;
            return acc;
          }, {});
          setBaraja(allCards);

          // Selecciona las primeras 15 cartas
          const selectedCards = data.slice(0,15).reduce((acc, card, index) => {
            acc[index] = card;
            return acc;
          }, {});
          setCards(selectedCards);

          // Selecciona cartas aleatorias para los jugadores
          const getRandomCards = (num) => {
            const selected = [];
            const usedIndices = new Set();
            while (selected.length < num) {
              const randomIndex = Math.floor(Math.random() * data.length);
              if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                selected.push(data[randomIndex]);
              }
            }
            return selected;
          };

          setJugadorAbajoIzq(getRandomCards(4));
          setJugadorArribaIzq(getRandomCards(4));
          setJugadorArriba(getRandomCards(4));
          setJugadorActual(getRandomCards(4));

        }).catch((error) => {
          console.log("Error al cargar desde BACK", error);
        });
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(players);
    if (Object.keys(cartasPiramideVolteadas).length === 15) {
      setJuegoTerminado(true);

      // Suponiendo que el ganador es el jugador actual, puedes ajustar esta lógica
      const jugadorConMasPuntaje = players.reduce((max, jugador) => {
        return jugador.puntaje > max.puntaje ? jugador : max;
      }, players[0])

      setJugadorGanador(jugadorConMasPuntaje.nombre);
    }
  }, [cartasPiramideVolteadas]);

  const handleDesafiar = (posicion, nombre, NombreActual) => {
    setJugadorDesafianteNombre(NombreActual);
    setJugadorDesafiado(posicion);
    setJugadorDesafiadoNombre(nombre);
    setFase('preguntaDesafio');
  };

  const handleClickCarta = (idCarta, valorCarta) => {
    if (fase === 'seleccionarCarta') {
      setCartaSeleccionada(valorCarta);
      setCartaDesafiada(idCarta);
      setFase('seleccionarDesafio');
      setCartasPiramideVolteadas(prevState => ({
        ...prevState,
        [idCarta]: true
      }));
      setMostrarDesafiar(true);
    }
  };

  const handleRespuestaDesafio = (respuesta) => {
    if (respuesta === 'no') {
      const cartasJugador = {
        'arr-izq': jugadorArribaIzq,
        'abj-izq': jugadorAbajoIzq,
        'arriba': jugadorArriba
      }[jugadorDesafiado] || [];

      console.log(baraja[cartaDesafiada]);
      console.log(players)

      const cartaEncontrada = cartasJugador.find(carta => carta.nombre.split(' ')[0] === cartaSeleccionada);

      if (cartaEncontrada) {
        setCartasVolteadas(prevState => ({
          ...prevState,
          [cartaEncontrada.id]: true
        }));
        alert('¡Has perdido!');

        // Sumar puntaje al jugador desafiado
        const jugadorQueSuma = players.find(jugador => jugador.nombre === jugadorDesafiadoNombre);
        const nuevoPuntajeDesafiado = jugadorQueSuma.puntaje + baraja[cartaDesafiada].puntaje;

        // Actualizar jugadores (respetando inmutabilidad)
        const jugadoresActualizados = players.map(jugador => {
          if (jugador.nombre === jugadorDesafiadoNombre) {
            return { ...jugador, puntaje: nuevoPuntajeDesafiado };
          }
          return jugador;
        });

        console.log(jugadoresActualizados);

        // Actualizar jugadores
        updatePlayers(jugadoresActualizados);

        // Cambiar la carta
        setTimeout(async () => {
          const nuevaCarta = Object.values(baraja)[Math.floor(Math.random() * Object.values(baraja).length)];

          const actualizarJugador = (jugador, setJugador) => {
            const JugadorActualizado = jugador.map(carta => 
              carta.id === cartaSeleccionada ? nuevaCarta : carta
            );
            setJugador(JugadorActualizado);
          };

          if (jugadorDesafiado === 'arr-izq') {
            actualizarJugador(jugadorArribaIzq, setJugadorArribaIzq);
          } else if (jugadorDesafiado === 'abj-izq') {
            actualizarJugador(jugadorAbajoIzq, setJugadorAbajoIzq);
          } else if (jugadorDesafiado === 'arriba') {
            actualizarJugador(jugadorArriba, setJugadorArriba);
          }
          setCartasVolteadas(prevState => {
            const updatedState = { ...prevState };
            delete updatedState[cartaEncontrada.id];
            return updatedState;
          });

          // Avanzar al siguiente turno después de 3 segundos
          await new Promise(resolve => setTimeout(resolve, 1000));
          setTurnoActual((prevTurno) => (prevTurno + 1) % jugadores.length);
          cambiarTurno();
        }, 3000);
      } else {
        alert('¡Has ganado! No tiene esa carta');

        // Sumar puntaje al jugador actual
        const jugadorQueSuma = players.find(jugador => jugador.nombre === jugadorDesafianteNombre);
        const nuevoPuntajeActual = jugadorQueSuma.puntaje + baraja[cartaDesafiada].puntaje;

        // Actualizar
        const jugadoresActualizados = players.map(jugador => {
          if (jugador.nombre === jugadorDesafianteNombre) {
            return { ...jugador, puntaje: nuevoPuntajeActual };
          }
          return jugador;
        });

        console.log(jugadoresActualizados);

        // Actualizar jugadores
        updatePlayers(jugadoresActualizados);

        // Avanzar al siguiente turno
        setTurnoActual((prevTurno) => (prevTurno + 1) % jugadores.length);
        cambiarTurno();
      }
    } else {
      // Avanzar al siguiente turno
      setTurnoActual((prevTurno) => (prevTurno + 1) % jugadores.length);
      cambiarTurno();
    }
    setFase('seleccionarCarta');
    setMostrarDesafiar(false);
    setCartaSeleccionada(null);
    setJugadorDesafiado(null);
    
  };

  const cambiarTurno = () => {
    const cartasActual = [...jugadorActual];
    const cartasArriba = [...jugadorArriba];
    const cartasArribaIzq = [...jugadorArribaIzq]; 
    const cartasAbajoIzq = [...jugadorAbajoIzq];

    // Actual -> Arriba
    setJugadorArriba(cartasActual);

    // Arriba -> Izquierda Arriba
    setJugadorArribaIzq(cartasArriba);

    // Izquierda Arriba -> Izquierda Abajo
    setJugadorAbajoIzq(cartasArribaIzq);

    // Izquierda Abajo -> Actual
    setJugadorActual(cartasAbajoIzq);

  }

  const actualizarPuntaje = async (playerId, puntaje) =>{
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${playerId}/puntaje`, {
        puntaje: puntaje
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Puntaje actualizado');
    } catch (error) {
      console.log('Error al actualizar puntaje', error);
    }
  }

  if (juegoTerminado && fase === 'seleccionarCarta') {
    // Actualizar aca el puntaje de cada jugador
    players.forEach(jugador => {
      console.log("Actualizando para: ", jugador.nombre);
      actualizarPuntaje(jugador.id, jugador.puntaje);
    });

    return (
      <div className="fin-juego">
        <h1>¡{jugadorGanador} gana el juego!</h1>
        <NavLink to="/profile-page">
          <button>Volver al Inicio</button>
        </NavLink>      
      </div>
    );
  }

  return (
    <div className="mesa">
        <div className="jugador-izquierda-arriba">
          <h2>{nombresJugadores[(turnoActual + 2) % jugadores.length]}</h2>
          {Object.values(jugadorArribaIzq).map((carta) => (
            <CartasJugadores key={carta.id} id={carta.id} imgSrc={carta.image} posicion={"arr-izq"} volteada={!!cartasVolteadas[carta.id]}/>
          ))} 
        </div>
        <div className="jugador-izquierda-abajo">
          <h2>{nombresJugadores[(turnoActual + 1) % jugadores.length]} </h2>
          {Object.values(jugadorAbajoIzq).map((carta) => (
            <CartasJugadores key={carta.id} id={carta.id} imgSrc={carta.image} posicion={"abj-izq"} volteada={!!cartasVolteadas[carta.id]}/>
          ))} 
        </div>
        <div className="jugador-arriba">
          <h2>{nombresJugadores[(turnoActual + 3) % jugadores.length]}</h2>
          {Object.values(jugadorArriba).map((carta) => (
            <CartasJugadores key={carta.id} id={carta.id} imgSrc={carta.image} posicion={"arriba"} volteada={!!cartasVolteadas[carta.id]}/>
          ))} 
        </div>
        <div className="jugador-actual">
          {/* <h3>{nombresJugadores[turnoActual]}</h3> */}
          {Object.values(jugadorActual).map((carta) => (
            <CartasJugadores key={carta.id} id={carta.id} imgSrc={carta.image} posicion={"actual"} />
          ))} 
        </div>

        <div className="piramide">
            <div className="row-1">
                {Object.values(cards).slice(0, 1).map(card => (
                  <Carta key={card.id} id={card.id} valor={card.nombre} imgSrc={card.image} onClick={handleClickCarta} desafioActivo={mostrarDesafiar}/>
                ))}
            </div>
            <div className="row-2">
                {Object.values(cards).slice(1, 3).map(card => (
                  <Carta key={card.id} id={card.id} valor={card.nombre} imgSrc={card.image} onClick={handleClickCarta} desafioActivo={mostrarDesafiar}/>
                ))}
            </div>
            <div className="row-3">
                {Object.values(cards).slice(3, 6).map(card => (
                  <Carta key={card.id} id={card.id} valor={card.nombre} imgSrc={card.image} onClick={handleClickCarta} desafioActivo={mostrarDesafiar}/>
                ))}
            </div>
            <div className="row-4">
                {Object.values(cards).slice(6, 10).map(card => (
                  <Carta key={card.id} id={card.id} valor={card.nombre} imgSrc={card.image} onClick={handleClickCarta} desafioActivo={mostrarDesafiar}/>
                ))}
            </div>
            <div className="row-5">
                {Object.values(cards).slice(10, 15).map(card => (
                  <Carta key={card.id} id={card.id} valor={card.nombre} imgSrc={card.image} onClick={handleClickCarta} desafioActivo={mostrarDesafiar}/>
                ))}
            </div>
        </div>
        <div className="botones-desafio">
          {fase === 'seleccionarCarta' && <h2>¡Selecciona una Carta!</h2>}
          {fase === 'seleccionarDesafio' && mostrarDesafiar && <BotonesDesafio onDesafiar={handleDesafiar} jugadores={nombresJugadores} actual={turnoActual}/>}
          {fase === 'preguntaDesafio' && (
            <div>
              <h2>¿Le crees a {jugadorDesafiadoNombre}?</h2>
              <button onClick={() => handleRespuestaDesafio('si')}>Sí</button>
              <button onClick={() => handleRespuestaDesafio('no')}>No</button>
            </div>
          )}
        </div>
    </div>
  );
}