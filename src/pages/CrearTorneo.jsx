import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

export default function CrearTorneo() {
  const navigate = useNavigate();

  const [torneo, setTorneo] = useState({
    nombre: "",
    totalPartidos: 1,
    equipos: {
      equipo1: { nombre: "", jugadores: [] },
      equipo2: { nombre: "", jugadores: [] },
    },
    partidos: [],
  });

  const [jugadores, setJugadores] = useState([]);

  // Obtener jugadores reales de Firebase
  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jugadores"));
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJugadores(lista);
      } catch (error) {
        console.error("Error al obtener jugadores:", error);
      }
    };

    fetchJugadores();
  }, []);

  const toggleJugador = (equipo, jugadorId) => {
    const jugadoresActuales = torneo.equipos[equipo].jugadores;
    const actualizados = jugadoresActuales.includes(jugadorId)
      ? jugadoresActuales.filter((id) => id !== jugadorId)
      : [...jugadoresActuales, jugadorId];

    setTorneo({
      ...torneo,
      equipos: {
        ...torneo.equipos,
        [equipo]: {
          ...torneo.equipos[equipo],
          jugadores: actualizados,
        },
      },
    });
  };

  const handleNombreTorneo = (e) => setTorneo({ ...torneo, nombre: e.target.value });
  const handleTotalPartidos = (e) => setTorneo({ ...torneo, totalPartidos: Number(e.target.value) });

  const guardarTorneo = async () => {
    try {
      const partidos = Array.from({ length: torneo.totalPartidos }, (_, i) => ({
        numero: i + 1,
        estado: "pendiente",
        ganador: null,
        nombre: `Partido ${i + 1}`,
      }));

      const nuevoTorneo = {
        nombre: torneo.nombre || "Torneo sin nombre",
        totalPartidos: torneo.totalPartidos,
        equipos: torneo.equipos,
        partidos,
        estado: "en_curso",
        creadoEn: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, "torneos"), nuevoTorneo);
      alert("Torneo creado exitosamente");
      navigate(`/manager/torneo/${docRef.id}`);
    } catch (error) {
      console.error("Error al crear torneo:", error);
      alert("Hubo un error al crear el torneo");
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#365486]">Crear Torneo</h1>

      {/* Datos generales */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Datos del torneo</h2>

        <input
          type="text"
          placeholder="Nombre del torneo"
          value={torneo.nombre}
          onChange={handleNombreTorneo}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="number"
          min={1}
          placeholder="Cantidad de partidos"
          value={torneo.totalPartidos}
          onChange={handleTotalPartidos}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Equipo 1 */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Equipo 1</h2>

        <input
          type="text"
          placeholder="Nombre del equipo 1"
          value={torneo.equipos.equipo1.nombre}
          onChange={(e) =>
            setTorneo({
              ...torneo,
              equipos: {
                ...torneo.equipos,
                equipo1: { ...torneo.equipos.equipo1, nombre: e.target.value },
              },
            })
          }
          className="w-full mb-4 p-2 border rounded"
        />

        {jugadores.map((jugador) => (
          <label key={jugador.id} className="flex gap-2 mb-2">
            <input
              type="checkbox"
              checked={torneo.equipos.equipo1.jugadores.includes(jugador.id)}
              onChange={() => toggleJugador("equipo1", jugador.id)}
            />
            {jugador.nombre}
          </label>
        ))}
      </div>

      {/* Equipo 2 */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Equipo 2</h2>

        <input
          type="text"
          placeholder="Nombre del equipo 2"
          value={torneo.equipos.equipo2.nombre}
          onChange={(e) =>
            setTorneo({
              ...torneo,
              equipos: {
                ...torneo.equipos,
                equipo2: { ...torneo.equipos.equipo2, nombre: e.target.value },
              },
            })
          }
          className="w-full mb-4 p-2 border rounded"
        />

        {jugadores.map((jugador) => (
          <label key={jugador.id} className="flex gap-2 mb-2">
            <input
              type="checkbox"
              checked={torneo.equipos.equipo2.jugadores.includes(jugador.id)}
              onChange={() => toggleJugador("equipo2", jugador.id)}
            />
            {jugador.nombre}
          </label>
        ))}
      </div>

      <button
        onClick={guardarTorneo}
        className="w-full bg-[#365486] text-white p-2 rounded"
      >
        Guardar Torneo
      </button>
    </div>
  );
}
