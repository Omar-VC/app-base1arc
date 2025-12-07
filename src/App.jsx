import { Routes, Route, useLocation } from "react-router-dom";
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

  // Rutas donde NO debe mostrarse el navbar
  const hideNavbarRoutes = ["/login", "/registro"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
