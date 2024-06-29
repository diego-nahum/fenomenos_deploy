import './nosotros.css';
import Navbar from '../common/Navbar';


function Nosotros() {
  return (
    <>
      <Navbar />
      <div className="Nosotros">
        <header>
          <h1>Nuestro Equipo</h1>
        </header>
        <main className="team-container">
          <section className="team-member">
            <div className="team-photo-container">
              <img src="foto_josei.jpg" alt="Team Member 1" className="team-photo" />
            </div>
            <h3>José Ignacio Fernández</h3>
            <p>Josei se encarga de la implementación de las funcionalidades. Su principal responsabilidad es asegurar que todas las características del juego funcionen correctamente, manejando la lógica del servidor y la integración de las diferentes partes del software.</p>
          </section>
          <section className="team-member">
            <div className="team-photo-container">
              <img src="foto_diego.jpg" alt="Team Member 2" className="team-photo" />
            </div>
            <h3>Diego Nahum</h3>
            <p>Diego es un experto en diseño y funcionalidad. Se encarga de crear interfaces intuitivas y eficientes para Pirámide y de asegurar que la experiencia de juego sea fluida y agradable. Es el encargado de hacer que el juego sea no solo atractivo, sino funcional.</p>
          </section>
          <section className="team-member">
            <div className="team-photo-container">
              <img src="foto_javi.png" alt="Team Member 3" className="team-photo" />
            </div>
            <h3>Javiera Gebhardt</h3>
            <p>Javi se centra principalmente en el diseño y la atracción visual de la páginas web. Su trabajo se enfoca en crear diseños de páginas que sean no solo visualmente atractivos, sino también altamente funcionales. Se asegura que las páginas sean intuitivas y fáciles de navegar.</p>
          </section>
        </main>
      </div>
    </>
  );
}

export default Nosotros;
