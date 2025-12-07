import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import HomeJugador from "./pages/HomeJugador";
import HomeManager from "./pages/HomeManager";
import Jugadores from "./pages/Jugadores";
import Cuotas from "./pages/Cuotas";
import Ficha from "./pages/Ficha";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Estado global de sesión
  const [usuario, setUsuario] = useState(null); // { rol: 'manager' o 'jugador', uid, email }

  // Rutas donde NO debe mostrarse el navbar
  const hideNavbarRoutes = ["/", "/login", "/registro"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar usuario={usuario} /> }

      <Routes>
        <Route path="/" element={<Login setUsuario={setUsuario}  />} />
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/jugador" element={<HomeJugador />} />
        <Route path="/manager" element={<HomeManager />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugador/:id/cuotas" element={<Cuotas />} />
        <Route path="/jugador/:id/ficha" element={<Ficha />} />
      </Routes>
    </>
  );
}

export default App;
