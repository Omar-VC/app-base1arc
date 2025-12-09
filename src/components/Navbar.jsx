import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Navbar = ({ usuario }) => {
  const [pendientesCount, setPendientesCount] = useState(0);

  const homePath = usuario?.rol === "manager" 
    ? "/manager" 
    : usuario?.rol === "jugador" 
      ? "/jugador" 
      : "/";

  // Contar jugadores pendientes
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
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
          APP Base1 (ARC)
        </h1>

        <div className="flex gap-6 items-center">
          <Link 
            to={homePath} 
            className="relative px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium drop-shadow-sm"
          >
            Home
          </Link>

          {usuario?.rol === "manager" && (
            <Link 
              to="/aprobaciones" 
              className="relative px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium flex items-center drop-shadow-sm"
            >
              Aprobaciones
              {pendientesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#0F1035] rounded-full">
                  {pendientesCount}
                </span>
              )}
            </Link>
          )}

          <Link 
            to="/login" 
            className="px-3 py-2 rounded-lg hover:bg-white/20 transition font-medium drop-shadow-sm"
          >
            Salir
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
