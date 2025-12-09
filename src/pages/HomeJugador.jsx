import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function HomeJugador() {
  const navigate = useNavigate();
  const [jugadorId, setJugadorId] = useState(null);

  // Aquí se obtiene el ID del jugador (por ejemplo, desde colección usuarios o auth)
  useEffect(() => {
    const fetchJugador = async () => {
      // Suponiendo que hay solo 1 jugador logueado y tenemos su ID
      // Ajusta según tu lógica de login
      const snapshot = await getDocs(collection(db, "jugadores"));
      if (!snapshot.empty) setJugadorId(snapshot.docs[0].id);
    };
    fetchJugador();
  }, []);

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Bienvenido al Home del Jugador</h1>

      <div
        onClick={() => navigate(`/jugador/${jugadorId}/mis-cuotas`)}
        className="cursor-pointer border p-5 rounded shadow text-center bg-blue-600 text-white hover:bg-blue-700"
      >
        Ver mis Cuotas
      </div>
    </div>
  );
}
