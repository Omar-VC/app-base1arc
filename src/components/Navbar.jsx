
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
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-semibold tracking-wide">APP Base1 (ARC)</h1>

        <div className="flex gap-6">
          <Link to={homePath} className="hover:text-gray-200 transition">Home</Link>

          {usuario?.rol === "manager" && (
            <Link to="/aprobaciones" className="hover:text-gray-200 transition">
              Aprobaciones {pendientesCount > 0 && `(${pendientesCount})`}
            </Link>
          )}

          <Link to="/login" className="hover:text-gray-200 transition">Salir</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
