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
  console.log("ID LLEGANDO A CUOTAS:", id);
  const [jugador, setJugador] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const [monto, setMonto] = useState("");
  const [mes, setMes] = useState("");
  const [estado, setEstado] = useState("Debe");
  const [editandoId, setEditandoId] = useState(null);

  // Cargar datos del jugador
  useEffect(() => {
    const fetchPlayer = async () => {
      const ref = doc(db, "jugadores", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists())
        setJugador({ id: snapshot.id, ...snapshot.data() });
    };
    fetchPlayer();
  }, [id]);

  // Cargar cuotas
  useEffect(() => {
    const fetchCuotas = async () => {
      const ref = collection(db, "jugadores", id, "cuotas");
      const snapshot = await getDocs(ref);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCuotas(lista);
    };
    fetchCuotas();
  }, [id]);

  // Crear o editar cuota
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
      await addDoc(ref, {
        monto,
        mes,
        estado,
        fechaAsignada: new Date(),
      });
    }

    setMonto("");
    setMes("");
    setEstado("Debe");

    // Recargar
    const snapshot = await getDocs(ref);
    const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCuotas(lista);
  };

  // Eliminar
  const handleEliminar = async (cuotaId) => {
    const ref = doc(db, "jugadores", id, "cuotas", cuotaId);
    await deleteDoc(ref);

    setCuotas(cuotas.filter((c) => c.id !== cuotaId));
  };

  // Preparar edición
  const handleEditar = (cuota) => {
    setMonto(cuota.monto);
    setMes(cuota.mes);
    setEstado(cuota.estado || "Debe");
    setEditandoId(cuota.id);
  };

  // Cambiar estado de la cuota
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
      <h1 className="text-2xl font-bold text-center mb-4">
        Cuotas de {jugador?.nombre} {jugador?.apellido}
      </h1>

      {deudaTotal > 0 && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded font-medium">
          Monto total de deuda: ${deudaTotal}
        </div>
      )}

      {/* Formulario */}
      <div className="border p-4 rounded shadow mb-5">
        <h2 className="text-xl font-semibold mb-3">
          {editandoId ? "Editar cuota" : "Asignar nueva cuota"}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Mes (Ej: Enero)"
            className="border p-2 rounded"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monto"
            className="border p-2 rounded"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Debe">Debe</option>
            <option value="Pagado">Pagado</option>
          </select>

          <button
            onClick={handleGuardar}
            className="bg-blue-600 text-white p-2 rounded"
          >
            {editandoId ? "Guardar cambios" : "Asignar cuota"}
          </button>
        </div>
      </div>

      {/* Lista de cuotas */}
      <h2 className="text-xl font-semibold mb-2">Historial de cuotas</h2>

      {cuotas.length === 0 ? (
        <p className="text-gray-600">
          Este jugador aún no tiene cuotas asignadas.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {cuotas.map((cuota) => (
            <div
              key={cuota.id}
              className={`border p-3 rounded shadow flex justify-between items-center ${
                cuota.estado === "Debe" ? "bg-red-100" : "bg-green-100"
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

              <div className="flex gap-2">
                <button
                  onClick={() => toggleEstado(cuota.id, cuota.estado)}
                  className={`px-3 py-1 rounded text-white ${
                    cuota.estado === "Debe" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  Marcar {cuota.estado === "Debe" ? "Pagado" : "Debe"}
                </button>

                <button
                  onClick={() => handleEditar(cuota)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleEliminar(cuota.id)}
                  className="bg-gray-700 text-white px-3 py-1 rounded"
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
