import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export default function GenerarInvitacion() {
  const [emailManager, setEmailManager] = useState("");
  const [tokenGenerado, setTokenGenerado] = useState("");
  const [cargando, setCargando] = useState(true);
  const [accesoPermitido, setAccesoPermitido] = useState(false);

  // ---- PROTECCIÓN: SOLO ADMIN ENTRA ----
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAccesoPermitido(false);
        setCargando(false);
        return;
      }

      // Traer datos desde la coleccion "usuarios"
      const userRef = doc(db, "usuarios", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();

        // COMPROBACIÓN
        if (
          user.email === "omarvegaclosas@hotmail.com" &&
          data.rol === "manager"
        ) {
          setAccesoPermitido(true);
        } else {
          setAccesoPermitido(false);
        }
      }

      setCargando(false);
    });

    return () => unsub();
  }, []);

  // ---- GENERAR INVITACIÓN ----
  const generarInvitacion = async () => {
    if (!emailManager.trim()) {
      alert("Ingresá un email válido");
      return;
    }

    const token = "mngr_" + uuidv4().slice(0, 12);

    await setDoc(doc(db, "managerInvitations", token), {
      email: emailManager,
      completado: false,
      creadoEn: new Date(),
    });

    setTokenGenerado(token);
  };

  if (cargando) return <p>Cargando...</p>;

  if (!accesoPermitido) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Acceso denegado</h1>
        <p>No tenés permisos para ver esta sección.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generar invitación 👤</h1>

      <input
        type="email"
        placeholder="Email del manager..."
        value={emailManager}
        onChange={(e) => setEmailManager(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={generarInvitacion}
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        Generar token
      </button>

      {tokenGenerado && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p>
            <strong>Token generado:</strong> {tokenGenerado}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            URL completa:
            <br />
            <span className="text-blue-700 font-mono break-all">
              https://app-base1arc.web.app/registro-manager?token=
              {tokenGenerado}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
