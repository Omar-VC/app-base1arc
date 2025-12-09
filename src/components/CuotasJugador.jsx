import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function CuotasJugador({ jugadorId }) {
  const [cuotas, setCuotas] = useState([]);

  useEffect(() => {
    const fetchCuotas = async () => {
      if (!jugadorId) return;
      const ref = collection(db, "jugadores", jugadorId, "cuotas");
      const snapshot = await getDocs(ref);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCuotas(lista);
    };
    fetchCuotas();
  }, [jugadorId]);

  const deudaTotal = cuotas
    .filter(c => c.estado === "Debe")
    .reduce((sum, c) => sum + Number(c.monto), 0);

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#365486] drop-shadow-md">
        Mis Cuotas
      </h1>

      {deudaTotal > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-800 font-medium shadow">
          Deuda total: ${deudaTotal}
        </div>
      )}

      {cuotas.length === 0 ? (
        <p className="text-gray-600 text-center">
          Aún no tienes cuotas asignadas.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {cuotas.map(c => (
            <div
              key={c.id}
              className={`p-4 rounded-xl shadow-md flex justify-between items-center text-white ${
                c.estado === "Debe"
                  ? "bg-gradient-to-r from-red-500 via-red-400 to-red-500"
                  : "bg-gradient-to-r from-green-500 via-green-400 to-green-500"
              }`}
            >
              <div className="flex flex-col gap-1">
                <p><strong>Mes:</strong> {c.mes}</p>
                <p><strong>Monto:</strong> ${c.monto}</p>
                <p><strong>Estado:</strong> {c.estado}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
