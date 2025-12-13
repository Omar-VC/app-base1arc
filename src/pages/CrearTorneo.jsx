import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const jugadoresMock = [
  { id: "j1", nombre: "Jugador 1" },
  { id: "j2", nombre: "Jugador 2" },
  { id: "j3", nombre: "Jugador 3" },
  { id: "j4", nombre: "Jugador 4" },
];

export default function CrearTorneo() {
  const navigate = useNavigate();

  const [torneo, setTorneo] = useState({
    nombre: "",
    totalPartidos: 1,
    equipos: {
      equipo1: { nombre: "", jugadores: [] },
      equipo2: { nombre: "", jugadores: [] },
    },
  });

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

  const guardarTorneo = async () => {
    try {
      const partidos = Array.from(
        { length: torneo.totalPartidos },
        (_, i) => ({
          numero: i + 1,
          estado: "pendiente",
          ganador: null,
        })
      );

      const docRef = await addDoc(collection(db, "torneos"), {
        nombre: torneo.nombre || "Torneo sin nombre",
        totalPartidos: torneo.totalPartidos,
        equipos: torneo.equipos,
        partidos,
        estado: "en_curso",
        creadoEn: Timestamp.now(),
      });

      navigate(`/manager/torneo/${docRef.id}`);

    } catch (error) {
      console.error("Error al crear torneo:", error);
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#365486]">
        Crear Torneo
      </h1>

      {/* Datos generales */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Datos del torneo</h2>

        <input
          type="text"
          placeholder="Nombre del torneo"
          value={torneo.nombre}
          onChange={(e) =>
            setTorneo({ ...torneo, nombre: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 text-sm text-gray-600">
          Cantidad de partidos
        </label>

        <input
          type="number"
          min={1}
          value={torneo.totalPartidos}
          onChange={(e) =>
            setTorneo({
              ...torneo,
              totalPartidos: Number(e.target.value),
            })
          }
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
                equipo1: {
                  ...torneo.equipos.equipo1,
                  nombre: e.target.value,
                },
              },
            })
          }
          className="w-full mb-4 p-2 border rounded"
        />

        {jugadoresMock.map((jugador) => (
          <label key={jugador.id} className="flex gap-2 mb-2">
            <input
              type="checkbox"
              checked={torneo.equipos.equipo1.jugadores.includes(
                jugador.id
              )}
              onChange={() =>
                toggleJugador("equipo1", jugador.id)
              }
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
                equipo2: {
                  ...torneo.equipos.equipo2,
                  nombre: e.target.value,
                },
              },
            })
          }
          className="w-full mb-4 p-2 border rounded"
        />

        {jugadoresMock.map((jugador) => (
          <label key={jugador.id} className="flex gap-2 mb-2">
            <input
              type="checkbox"
              checked={torneo.equipos.equipo2.jugadores.includes(
                jugador.id
              )}
              onChange={() =>
                toggleJugador("equipo2", jugador.id)
              }
            />
            {jugador.nombre}
          </label>
        ))}
      </div>

      <button
        onClick={guardarTorneo}
        className="w-full bg-[#365486] text-white p-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Guardar Torneo
      </button>

      {/* Debug visual */}
      <pre className="bg-gray-100 p-4 rounded text-sm mt-6">
        {JSON.stringify(torneo, null, 2)}
      </pre>
    </div>
  );
}
