import Navbar from "../common/Navbar";
import './LogIn.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useState, useContext } from "react";



function LogIn() {
  const {token, setToken} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Enviar un post a la ruta login
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,
    { 
      email, 
      password
    }).then((response) => {
      console.log(response);
      // Guardar el token por si tenemos alguna vista protegida
      const access_token = response.data.access_token;
      setToken(access_token);

      // Redirigir al usuario a la vista /profile-page
      navigate('/profile-page');

    }).catch((error) => {
      console.log(error);
    });
  };

  // function handleChangeEmail(email) {
  //   setEmail(email);
  // }

  // function handleChangePassword(password) {
  //   setPassword(password);
  // }

  return (
    <>
      <Navbar />  
        <div className="LogIn">
            
            <header>
                <h1>Acceder a tu cuenta</h1>
            </header>
            <form onSubmit={handleSubmit} className="container">
              <div className="container-sub">
                <label>
                  Email :
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
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              <input type="submit" value="Log In" />
            </form>
        </div>
      </>
    );
}

export default LogIn;