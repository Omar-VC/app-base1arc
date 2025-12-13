import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function Torneo() {
  const { id } = useParams();
  const [torneo, setTorneo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jugadores, setJugadores] = useState([]);

  // Obtener los datos completos de los jugadores
  useEffect(() => {
    const fetchJugadores = async () => {
      const jugadoresSnapshot = await getDocs(collection(db, "jugadores"));
      const jugadoresList = jugadoresSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJugadores(jugadoresList);
    };

    const fetchTorneo = async () => {
      const ref = doc(db, "torneos", id);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setTorneo(snapshot.data());
      }

      setLoading(false);
    };

    fetchJugadores();
    fetchTorneo();
  }, [id]);

  if (loading) return <p className="p-5">Cargando torneo...</p>;
  if (!torneo) return <p className="p-5">Torneo no encontrado</p>;

  // Función para obtener nombre de jugador por ID
  const getNombreJugador = (jugadorId) => {
    const jugador = jugadores.find((j) => j.id === jugadorId);
    return jugador ? jugador.nombre : "Jugador no encontrado";
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#365486] mb-6">
        {torneo.nombre}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mostrar Equipo 1 */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">
            {torneo.equipos.equipo1.nombre}
          </h2>
          <ul className="list-disc pl-5">
            {torneo.equipos.equipo1.jugadores.map((jugadorId) => (
              <li key={jugadorId}>{getNombreJugador(jugadorId)}</li>
            ))}
          </ul>
        </div>

        {/* Mostrar Equipo 2 */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">
            {torneo.equipos.equipo2.nombre}
          </h2>
          <ul className="list-disc pl-5">
            {torneo.equipos.equipo2.jugadores.map((jugadorId) => (
              <li key={jugadorId}>{getNombreJugador(jugadorId)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mostrar los partidos */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Partidos</h3>
        <ul className="mt-3 space-y-2">
          {Array.isArray(torneo.partidos) &&
            torneo.partidos.map((partido, index) => (
              <li key={index} className="bg-white p-3 rounded shadow">
                Partido {partido.numero} –{" "}
                {partido.ganador
                  ? `Ganador: ${partido.ganador}`
                  : "Esperando resultado"}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
