import { useNavigate } from "react-router-dom";

export default function TorneoManager() {
  const navigate = useNavigate();

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#365486] drop-shadow-md">
          Torneos
        </h1>

        <button
          onClick={() => navigate("/manager/torneo/crear")}
          className="px-5 py-2 rounded-lg bg-[#365486] text-white font-semibold hover:bg-[#2b3f66] transition"
        >
          + Crear Torneo
        </button>
      </div>

      <div className="text-center text-gray-500 mt-20">
        No hay torneos creados
      </div>
    </div>
  );
}
