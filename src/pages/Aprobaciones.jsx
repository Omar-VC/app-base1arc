import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Aprobaciones() {
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    const fetchPendientes = async () => {
      const querySnap = await getDocs(collection(db, "usuariosPendientes"));
      const lista = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendientes(lista);
    };

    fetchPendientes();
  }, []);

  const aprobarUsuario = async (id) => {
    try {
      const ref = doc(db, "usuariosPendientes", id);
      await updateDoc(ref, { estado: "aprobado" });

      setPendientes(prev => prev.filter(u => u.id !== id));
      alert("Usuario aprobado");
    } catch (e) {
      console.error("Error aprobando usuario:", e);
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-5 text-center">Aprobaciones</h1>

      {pendientes.length === 0 ? (
        <p className="text-gray-600 text-center">No hay usuarios para aprobar.</p>
      ) : (
        pendientes.map((usr) => (
          <div key={usr.id} className="border p-4 rounded mb-3 flex justify-between">
            <div>
              <p><strong>Nombre:</strong> {usr.nombre} {usr.apellido}</p>
              <p><strong>DNI:</strong> {usr.dni}</p>
              <p><strong>Email:</strong> {usr.email}</p>
            </div>

            <button
              onClick={() => aprobarUsuario(usr.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Aprobar
            </button>
          </div>
        ))
      )}
    </div>
  );
}
