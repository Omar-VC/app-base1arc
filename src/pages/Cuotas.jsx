import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Cuotas() {
  const { id } = useParams();
  const [jugador, setJugador] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const [monto, setMonto] = useState("");
  const [mes, setMes] = useState("");
  const [estado, setEstado] = useState("Debe");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const ref = doc(db, "jugadores", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists())
        setJugador({ id: snapshot.id, ...snapshot.data() });
    };
    fetchPlayer();
  }, [id]);

  useEffect(() => {
    const fetchCuotas = async () => {
      const ref = collection(db, "jugadores", id, "cuotas");
      const snapshot = await getDocs(ref);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCuotas(lista);
    };
    fetchCuotas();
  }, [id]);

  const handleGuardar = async () => {
    const ref = collection(db, "jugadores", id, "cuotas");

    if (!monto || !mes) {
      alert("Completa todos los campos");
      return;
    }

    if (editandoId) {
      await updateDoc(doc(ref, editandoId), { monto, mes, estado });
      setEditandoId(null);
    } else {
      await addDoc(ref, { monto, mes, estado, fechaAsignada: new Date() });
    }

    setMonto("");
    setMes("");
    setEstado("Debe");

    const snapshot = await getDocs(ref);
    setCuotas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleEliminar = async (cuotaId) => {
    const ref = doc(db, "jugadores", id, "cuotas", cuotaId);
    await deleteDoc(ref);
    setCuotas(cuotas.filter((c) => c.id !== cuotaId));
  };

  const handleEditar = (cuota) => {
    setMonto(cuota.monto);
    setMes(cuota.mes);
    setEstado(cuota.estado || "Debe");
    setEditandoId(cuota.id);
  };

  const toggleEstado = async (cuotaId, estadoActual) => {
    const ref = doc(db, "jugadores", id, "cuotas", cuotaId);
    const nuevoEstado = estadoActual === "Debe" ? "Pagado" : "Debe";
    await updateDoc(ref, { estado: nuevoEstado });
    setCuotas(
      cuotas.map((c) => (c.id === cuotaId ? { ...c, estado: nuevoEstado } : c))
    );
  };

  const deudaTotal = cuotas
    .filter((c) => c.estado === "Debe")
    .reduce((sum, c) => sum + Number(c.monto), 0);

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#365486] drop-shadow-md">
        Cuotas de {jugador?.nombre} {jugador?.apellido}
      </h1>

      {deudaTotal > 0 && (
        <div className="mb-5 p-4 rounded-xl bg-red-200 text-red-900 font-semibold shadow-md text-center drop-shadow-sm">
          Monto total de deuda: ${deudaTotal}
        </div>
      )}

      {/* Formulario */}
      <div className="p-5 rounded-xl shadow-lg bg-gradient-to-r from-[#0F1035] via-[#7FC7D9] to-[#0F1035] text-white mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editandoId ? "Editar cuota" : "Asignar nueva cuota"}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Mes (Ej: Enero)"
            className="p-2 rounded-md text-black"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monto"
            className="p-2 rounded-md text-black"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />

          <select
            className="p-2 rounded-md text-black"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Debe">Debe</option>
            <option value="Pagado">Pagado</option>
          </select>

          <button
            onClick={handleGuardar}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg font-semibold transition"
          >
            {editandoId ? "Guardar cambios" : "Asignar cuota"}
          </button>
        </div>
      </div>

      {/* Lista de cuotas */}
      <h2 className="text-2xl font-semibold mb-4 text-[#365486] drop-shadow-sm">
        Historial de cuotas
      </h2>

      {cuotas.length === 0 ? (
        <p className="text-center text-gray-500">
          Este jugador aún no tiene cuotas asignadas.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {cuotas.map((cuota) => (
            <div
              key={cuota.id}
              className={`p-4 rounded-xl shadow-md flex justify-between items-center transition-transform transform hover:scale-105 ${
                cuota.estado === "Debe"
                  ? "bg-red-100 text-red-900"
                  : "bg-green-100 text-green-900"
              }`}
            >
              <div>
                <p>
                  <strong>Mes:</strong> {cuota.mes}
                </p>
                <p>
                  <strong>Monto:</strong> ${cuota.monto}
                </p>
                <p>
                  <strong>Estado:</strong> {cuota.estado}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleEstado(cuota.id, cuota.estado)}
                  className={`px-3 py-1 rounded font-semibold text-white ${
                    cuota.estado === "Debe"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Marcar {cuota.estado === "Debe" ? "Pagado" : "Debe"}
                </button>

                <button
                  onClick={() => handleEditar(cuota)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded font-semibold text-white"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleEliminar(cuota.id)}
                  className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded font-semibold text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
