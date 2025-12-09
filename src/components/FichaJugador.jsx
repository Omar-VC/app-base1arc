import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function FichaJugador({ jugadorId }) {
  const [ficha, setFicha] = useState(null);

  useEffect(() => {
    const fetchFicha = async () => {
      if (!jugadorId) return;
      const ref = doc(db, "jugadores", jugadorId);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) setFicha(snapshot.data().ficha || {});
    };
    fetchFicha();
  }, [jugadorId]);

  if (!ficha) return <p>Cargando ficha...</p>;

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Mi Ficha</h1>

      {Object.keys(ficha).length === 0 ? (
        <p className="text-gray-600">Tu ficha aún no ha sido completada.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {Object.entries(ficha).map(([key, value]) => (
            <div
              key={key}
              className="border p-3 rounded shadow flex justify-between"
            >
              <strong className="capitalize">{key}:</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
