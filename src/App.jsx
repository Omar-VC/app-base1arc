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
import Aprobaciones from "./pages/Aprobaciones"; // ← IMPORTANTE
import CuotasJugadorWrapper from "./pages/CuotasJugadorWrapper"; // <- IMPORTAR EL WRAPPER
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
        <Route path="/" element={<Login setUsuario={setUsuario} />} />
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/jugador" element={<HomeJugador />} />
        <Route path="/manager" element={<HomeManager />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugador/:id/cuotas" element={<Cuotas />} />
        <Route path="/jugador/:id/ficha" element={<Ficha />} />
        <Route path="/jugador/:id/mis-cuotas" element={<CuotasJugadorWrapper />} />
        <Route path="/jugador/:id/ficha" element={<FichaJugadorWrapper />} />


        {/* NUEVA RUTA */}
        <Route path="/aprobaciones" element={<Aprobaciones />} />
      </Routes>
    </>
  );
}

export default App;
