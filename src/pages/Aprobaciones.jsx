// src/pages/Aprobaciones.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";

export default function Aprobaciones() {
  const [pendientes, setPendientes] = useState([]);

  // Traer jugadores pendientes
  const fetchPendientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "aprobaciones"));
      const jugadoresPendientes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendientes(jugadoresPendientes);
    } catch (error) {
      console.error("Error al cargar aprobaciones:", error);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  // Aprobar jugador
  const aprobarJugador = async (jugador) => {
    try {
      // 1) Agregar a "usuarios"
      await setDoc(doc(db, "usuarios", jugador.uid), {
        uid: jugador.uid,
        email: jugador.email,
        rol: "jugador",
        nombre: jugador.nombre,
        creadoEn: new Date(),
      });

      // 2) Agregar a "jugadores"
      await setDoc(doc(db, "jugadores", jugador.uid), {
        ...jugador,
        creadoEn: new Date(),
      });

      // 3) Borrar de "aprobaciones"
      await deleteDoc(doc(db, "aprobaciones", jugador.uid));

      // Actualizar lista local
      setPendientes(pendientes.filter(p => p.uid !== jugador.uid));

      alert(`Jugador ${jugador.nombre} aprobado correctamente`);
    } catch (error) {
      console.error("Error al aprobar jugador:", error);
      alert("No se pudo aprobar el jugador");
    }
  };

  // Rechazar jugador
  const rechazarJugador = async (jugador) => {
    try {
      await deleteDoc(doc(db, "aprobaciones", jugador.uid));
      setPendientes(pendientes.filter(p => p.uid !== jugador.uid));
      alert(`Jugador ${jugador.nombre} rechazado`);
    } catch (error) {
      console.error("Error al rechazar jugador:", error);
      alert("No se pudo rechazar el jugador");
    }
  };

  if (pendientes.length === 0) return <div className="p-5">No hay jugadores pendientes.</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Aprobaciones Pendientes</h1>

      <div className="flex flex-col gap-3">
        {pendientes.map(j => (
          <div key={j.uid} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{j.nombre} {j.apellido}</p>
              <p>DNI: {j.dni} - Email: {j.email}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => aprobarJugador(j)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Aprobar
              </button>
              <button 
                onClick={() => rechazarJugador(j)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
