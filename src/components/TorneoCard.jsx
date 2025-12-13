import { useNavigate } from "react-router-dom";

export default function TorneoCard({ ruta, descripcion = "Ver torneos" }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#365486] via-[#7FC7D9] to-[#365486] text-white text-center font-semibold text-lg hover:scale-105 transform transition-all duration-300 drop-shadow-md"
      onClick={() => navigate(ruta)}
    >
      <h2 className="text-xl font-bold mb-2">Torneo</h2>
      <p className="text-white/90">{descripcion}</p>
    </div>
  );
}
