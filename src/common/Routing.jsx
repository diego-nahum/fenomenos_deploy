import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import MainPage from './MainPage'
import Nosotros from '../nosotros/nosotros'
import Instructions from '../game/instructions'
import UserWelcome from '../profile/UserWelcome'
import LogIn from '../profile/LogIn'
import SignUp from '../profile/SignUp'
import ProfileInfo from '../profile/ProfileInfo'
import ProfilePage from '../profile/ProfilePage'
import Historial from '../profile/Historial'
import BuscarPartidas from '../unirseJuego/BuscarPartida'
import Tablero from '../game/Tablero'
import UserCheck from '../protected/UserCheck'
import LogoutButton from '../profile/LogOut'
import UnirseJuego from '../unirseJuego/unirseJuego'
import CrearJuego from '../unirseJuego/crearJuego'

function Routing(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MainPage />}/>
                <Route path={"/mainpage"} element={<MainPage />}/>
                <Route path={"/nosotros"} element={<Nosotros />}/>
                <Route path={"/instructions"} element={<Instructions />}/>
                <Route path={"/welcome"} element={<UserWelcome />}/>
                <Route path={"/login"} element={<LogIn/>}/>
                <Route path={"/register"} element={<SignUp/>}/>
                <Route path={"/profile-page"} element={<MainPage/>}/>
                <Route path={"/profile-info"} element={<ProfileInfo/>}/>
                <Route path={"/historial"} element={<Historial />}/>
                <Route path={"/buscarpartida"} element={<BuscarPartidas />}/>
                <Route path={"/tablero"} element={<Tablero />}/>
                <Route path={"/usercheck"} element={<UserCheck />}/>
                <Route path={"/encontrarpartida"} element={<UnirseJuego/>}/>
                <Route path={"/partida/:id"} element={<CrearJuego/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default Routing;