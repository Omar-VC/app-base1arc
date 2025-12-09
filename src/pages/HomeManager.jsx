import { useNavigate } from "react-router-dom";

export default function HomeManager() {
  const navigate = useNavigate();

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#365486] drop-shadow-md">
        Bienvenido a tu Home, Manager
      </h1>

      <div className="grid gap-6">
        {/* Tarjeta Jugadores */}
        <div
          className="cursor-pointer p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#365486] via-[#7FC7D9] to-[#365486] text-white text-center font-semibold text-lg hover:scale-105 transform transition-all duration-300 drop-shadow-md"
          onClick={() => navigate("/jugadores")}
        >
          <h2 className="text-xl font-bold mb-2">Jugadores</h2>
          <p className="text-white/90">Ir a la lista de jugadores</p>
        </div>
      </div>
    </div>
  );
}

