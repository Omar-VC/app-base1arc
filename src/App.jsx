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
import Aprobaciones from "./pages/Aprobaciones";
import CuotasJugadorWrapper from "./pages/CuotasJugadorWrapper";
import FichaJugadorWrapper from "./pages/FichaJugadorWrapper";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  const hideNavbarRoutes = ["/", "/login", "/registro"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar usuario={usuario} /> }

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login setUsuario={setUsuario} />} />
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/registro" element={<Registro />} />

        {/* Home */}
        <Route path="/jugador" element={<HomeJugador />} />
        <Route path="/manager" element={<HomeManager />} />

        {/* Manager */}
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugador/:id/cuotas" element={<Cuotas />} />
        <Route path="/jugador/:id/ficha" element={<Ficha usuario={usuario} />} />
        <Route path="/aprobaciones" element={<Aprobaciones />} />

        {/* Jugador */}
        <Route path="/jugador/:id/mis-cuotas" element={<CuotasJugadorWrapper usuario={usuario} />} />
        <Route path="/jugador/:id/mi-ficha" element={<FichaJugadorWrapper usuario={usuario} />} />
      </Routes>
    </>
  );
}

export default App;
