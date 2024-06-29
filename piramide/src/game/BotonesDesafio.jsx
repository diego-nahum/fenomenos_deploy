import React from 'react';

export default function BotonesDesafio({ onDesafiar, jugadores, actual }) {
//   Faltaria que reciba los jugadores
// jugadores = ['cabrera_h', 'javieragr', 'joseifr','JugadorActual']
// actual = turnoActual

  const jugadorActual = jugadores[actual]

  const restoJugadores = {
    'arr-izq': jugadores[(actual + 2) % jugadores.length],
    'abj-izq': jugadores[(actual + 1) % jugadores.length],
    'arriba': jugadores[(actual + 3) % jugadores.length]
  };

  
  const handleDesafiar = (posicion, nombre, NombreActual) => {
    onDesafiar(posicion, nombre, NombreActual);
  };

  return (
    <div className='botones'>
      <h2>Elige a quién desafiar:</h2>
      <button className="boton-desafio" onClick={() => handleDesafiar("arr-izq", restoJugadores['arr-izq'], jugadorActual)}>{restoJugadores['arr-izq']}</button>
      <button className="boton-desafio" onClick={() => handleDesafiar("abj-izq", restoJugadores['abj-izq'], jugadorActual)}>{restoJugadores['abj-izq']}</button>
      <button className="boton-desafio" onClick={() => handleDesafiar("arriba", restoJugadores['arriba'], jugadorActual)}>{restoJugadores['arriba']}</button>
    </div>
  );
}