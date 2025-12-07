import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* LOGO */}
        <h1 className="text-xl font-semibold tracking-wide">
          APP Base1 (ARC)
        </h1>

        {/* LINKS */}
        <div className="flex gap-6">
          <Link 
            to="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

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
