import Navbar from "../common/Navbar";
import './LogIn.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


function SignUp() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  // function handleChangeEmail(email) {
  //   setEmail(email);
  // }

  // function handleChangePassword(password) {
  //   setPassword(password);
  // }

  // function handleChangeName(name) {
  //   setName(name);
  // }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        email: email,
        username: username,
        password: password,
        nombre: nombre
      }).then((response) => {
        console.log(response);
        alert('Registro exitoso! Ahora puedes volver y loguearte');
        // Redirigir al usuario a la vista /profile-page
        navigate('/login');

      }).catch((error) => {      
        console.error('Ocurrió un error:', error);
      });
  };

  return (
    <>
        <div className="LogIn">
            <Navbar />
            <header>
                <h1>Ingresa tus datos</h1>
            </header>
            <form onSubmit={handleSubmit} className="container">
              <div className="container-sub">
                <label>
                  Your Name:
                  <input
                    type="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    />
                </label>
              </div>
              <div className="container-sub">
                <label>
                  Mail :
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                   />
                </label>
              </div>
              <div className="container-sub">
                <label>
                  Username :
                  <input
                    type="username"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                   />
                </label>
              </div>
              <div className="container-sub">
                <label>
                  Password :
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                   />
                </label>
              </div>
              <input type="submit" value="Sign Up" />
            </form>
        </div>
      </>
    );
}

export default SignUp;