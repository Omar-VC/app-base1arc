import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import TorneoCard from "../components/TorneoCard";

export default function HomeJugador() {
  const navigate = useNavigate();
  const [jugadorId, setJugadorId] = useState(null);

  // Obtener el ID del jugador (ajustar según lógica de login)
  useEffect(() => {
    const fetchJugador = async () => {
      const snapshot = await getDocs(collection(db, "jugadores"));
      if (!snapshot.empty) setJugadorId(snapshot.docs[0].id);
    };
    fetchJugador();
  }, []);

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#365486] drop-shadow-md">
        Bienvenido a tu Home, jugador
      </h1>

      <div className="grid gap-6">
        {/* Tarjeta Ver mis Cuotas */}
        <div
          onClick={() => navigate(`/jugador/${jugadorId}/mis-cuotas`)}
          className="cursor-pointer p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#365486] via-[#7FC7D9] to-[#365486] text-white text-center font-semibold text-lg hover:scale-105 transform transition-all duration-300 drop-shadow-md"
        >
          Ver mis Cuotas
        </div>

        {/* Tarjeta Mi Ficha */}
        <div
          onClick={() => navigate(`/jugador/${jugadorId}/ficha`)}
          className="cursor-pointer p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#0F1035] via-[#7FC7D9] to-[#0F1035] text-white text-center font-semibold text-lg hover:scale-105 transform transition-all duration-300 drop-shadow-md"
        >
          Mi Ficha
        </div>

        {/* Torneo */}
        <TorneoCard ruta="/jugador/torneo" descripcion="Ver torneos" />

      </div>
    </div>
  );
}
