import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

// Públicas
import Login from "./pages/Login";
import Registro from "./pages/Registro";

// Home
import HomeJugador from "./pages/HomeJugador";
import HomeManager from "./pages/HomeManager";

// Manager
import Jugadores from "./pages/Jugadores";
import Cuotas from "./pages/Cuotas";
import Ficha from "./pages/Ficha";
import Aprobaciones from "./pages/Aprobaciones";
import RegistroManager from "./pages/RegistroManager";
import GenerarInvitacion from "./components/GenerarInvitacion";

// Torneos
import TorneoManager from "./pages/TorneoManager";
import CrearTorneo from "./pages/CrearTorneo";
import Torneo from "./pages/Torneo";
import TorneoJugador from "./pages/TorneoJugador";

// Jugador wrappers
import CuotasJugadorWrapper from "./pages/CuotasJugadorWrapper";
import FichaJugadorWrapper from "./pages/FichaJugadorWrapper";

function App() {
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  const hideNavbarRoutes = ["/", "/login", "/registro"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar usuario={usuario} />}

      <Routes>
        {/* Públicas */}
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
        <Route path="/registro-manager" element={<RegistroManager />} />
        <Route path="/generar-invitacion" element={<GenerarInvitacion />} />

        {/* Torneos Manager */}
        <Route path="/manager/torneo" element={<TorneoManager />} />
        <Route path="/manager/torneo/crear" element={<CrearTorneo />} />
        <Route path="/manager/torneo/:id" element={<Torneo />} />

        {/* Torneos Jugador */}
        <Route path="/jugador/torneo" element={<TorneoJugador />} />
        <Route path="/jugador/torneo/:id" element={<Torneo />} />

        {/* Jugador */}
        <Route
          path="/jugador/:id/mis-cuotas"
          element={<CuotasJugadorWrapper usuario={usuario} />}
        />
        <Route
          path="/jugador/:id/mi-ficha"
          element={<FichaJugadorWrapper usuario={usuario} />}
        />
      </Routes>
    </>
  );
}

export default App;
