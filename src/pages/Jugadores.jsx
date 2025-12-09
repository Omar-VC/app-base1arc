import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GiAmericanFootballHelmet } from "react-icons/gi";


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
      <h1 className="text-3xl font-bold mb-8 text-center text-[#365486] drop-shadow-md">
        Lista de Jugadores
      </h1>

      {jugadores.length === 0 ? (
        <p className="text-center text-gray-500">No hay jugadores registrados.</p>
      ) : (
        <div className="grid gap-6">
          {jugadores.map((jugador) => (
            <div
              key={jugador.id}
              className="flex justify-between items-center p-5 rounded-xl shadow-lg bg-gradient-to-r from-[#365486] via-[#7FC7D9] to-[#365486] text-white hover:scale-105 transform transition-all duration-300 drop-shadow-md"
            >
              <div className="flex items-center gap-3">
                <GiAmericanFootballHelmet className="w-8 h-8 drop-shadow-sm" />

                <span className="font-semibold text-lg">{jugador.nombre} {jugador.apellido}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/jugador/${jugador.id}/cuotas`)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
                >
                  Ver cuotas
                </button>
                <button
                  onClick={() => navigate(`/jugador/${jugador.id}/ficha`)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
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
