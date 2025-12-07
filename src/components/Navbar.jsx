import { Link } from "react-router-dom";

const Navbar = ({ usuario }) => {
  const homePath = usuario?.rol === "manager" 
    ? "/manager" 
    : usuario?.rol === "jugador" 
      ? "/jugador" 
      : "/";

  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        
        <h1 className="text-xl font-semibold tracking-wide">
          APP Base1 (ARC)
        </h1>

        <div className="flex gap-6">

          {/* HOME según el usuario */}
          <Link 
            to={homePath}
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

          {/* SALIR = vuelve al login */}
          <Link 
            to="/login"
            className="hover:text-gray-200 transition"
          >
            Salir
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
