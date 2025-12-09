import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

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
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Bienvenido al Home del Jugador
      </h1>

      {/* Tarjeta Ver mis Cuotas */}
      <div
        onClick={() => navigate(`/jugador/${jugadorId}/mis-cuotas`)}
        className="cursor-pointer border p-5 rounded shadow text-center bg-blue-600 text-white hover:bg-blue-700"
      >
        Ver mis Cuotas
      </div>

      {/* Tarjeta Mi Ficha */}
      <div
        onClick={() => navigate(`/jugador/${jugadorId}/ficha`)}
        className="cursor-pointer border p-5 rounded shadow text-center bg-green-600 text-white hover:bg-green-700 mt-4"
      >
        Mi Ficha
      </div>
    </div>
  );
}
