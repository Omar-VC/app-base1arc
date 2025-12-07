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
      const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJugadores(lista);
    };
    fetchJugadores();
  }, []);

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Jugadores</h1>

      {jugadores.length === 0 ? (
        <p>No hay jugadores registrados.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {jugadores.map((jugador) => (
            <div
              key={jugador.id}
              className="flex justify-between items-center border p-3 rounded shadow"
            >
              <span className="font-medium">{jugador.nombre} {jugador.apellido}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/jugador/${jugador.id}/cuotas`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Ver cuotas
                </button>
                <button
                  onClick={() => navigate(`/jugador/${jugador.id}/ficha`)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
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
