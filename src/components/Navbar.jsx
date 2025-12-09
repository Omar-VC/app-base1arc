import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { GiAmericanFootballBall } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ usuario }) => {
  const [pendientesCount, setPendientesCount] = useState(0);
  const [open, setOpen] = useState(false);

  const homePath =
    usuario?.rol === "manager"
      ? "/manager"
      : usuario?.rol === "jugador"
      ? "/jugador"
      : "/";

  useEffect(() => {
    const fetchPendientes = async () => {
      if (usuario?.rol !== "manager") return;
      const querySnapshot = await getDocs(collection(db, "aprobaciones"));
      setPendientesCount(querySnapshot.size);
    };
    fetchPendientes();
  }, [usuario]);

  return (
    <nav className="w-full bg-gradient-to-r from-[#365486] via-[#7FC7D9] to-[#365486] text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <GiAmericanFootballBall className="text-white w-8 h-8 drop-shadow-md" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-md">
            Añatuya Rugby Club
          </h1>
        </div>

        {/* BOTÓN HAMBURGUESA (solo mobile) */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex gap-6 items-center">

          <Link
            to={homePath}
            className="px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium"
          >
            Home
          </Link>

          {usuario?.rol === "manager" && (
            <Link
              to="/aprobaciones"
              className="relative px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium flex items-center"
            >
              Aprobaciones
              {pendientesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-[#0F1035] rounded-full">
                  {pendientesCount}
                </span>
              )}
            </Link>
          )}

          {/* AVATAR */}
          {usuario && (
            <div className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg">
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${usuario.uid}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-white shadow"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-semibold">
                  {usuario.nombre} {usuario.apellido}
                </span>
                <span className="text-xs opacity-80 capitalize">
                  {usuario.rol}
                </span>
              </div>
            </div>
          )}

          <Link
            to="/login"
            className="px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium"
          >
            Salir
          </Link>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-[#365486]/90">

          <Link
            to={homePath}
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium"
          >
            Home
          </Link>

          {usuario?.rol === "manager" && (
            <Link
              to="/aprobaciones"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium flex items-center"
            >
              Aprobaciones
              {pendientesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-[#0F1035] rounded-full">
                  {pendientesCount}
                </span>
              )}
            </Link>
          )}

          {/* AVATAR MOBILE */}
          {usuario && (
            <div className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg">
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${usuario.uid}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-white shadow"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-semibold">
                  {usuario.nombre} {usuario.apellido}
                </span>
                <span className="text-xs opacity-80 capitalize">
                  {usuario.rol}
                </span>
              </div>
            </div>
          )}

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium"
          >
            Salir
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
