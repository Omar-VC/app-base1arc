import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJugadores = async () => {
      const querySnapshot = await getDocs(collection(db, "jugadores"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJugadores(lista);
    };
    fetchJugadores();
  }, []);

  // Contar jugadores por categoría
  const categorias = jugadores.reduce((acc, jugador) => {
    const cat = jugador.categoria || "Sin categoría";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const totalJugadores = jugadores.length;

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center text-[#365486] drop-shadow-md">
        Lista de Jugadores
      </h1>

      {/* Subtítulo con conteo total y por categoría */}
      <div className="mb-4 text-center text-gray-700 font-medium">
        <p>Jugadores registrados: {totalJugadores}</p>
        <p>
          {Object.entries(categorias).map(([cat, count]) => (
            <span key={cat} className="mr-2">
              {cat} ({count})
            </span>
          ))}
        </p>
      </div>

      {jugadores.length === 0 ? (
        <p className="text-gray-600 text-center">
          No hay jugadores registrados.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {jugadores.map((jugador) => (
            <div
              key={jugador.id}
              className="flex justify-between items-center p-4 rounded-xl shadow-md bg-gradient-to-r from-[#7FC7D9] via-[#365486] to-[#0F1035] text-white"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-lg">
                  {jugador.nombre} {jugador.apellido}
                </span>
                {jugador.categoria && (
                  <span className="text-sm opacity-80">
                    {jugador.categoria}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/jugador/${jugador.id}/cuotas`)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Ver cuotas
                </button>
                <button
                  onClick={() => navigate(`/jugador/${jugador.id}/ficha`)}
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Ver ficha
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
