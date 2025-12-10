import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function RegistroManager() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [tokenValido, setTokenValido] = useState(false);
  const [emailInvitado, setEmailInvitado] = useState("");
  const [token, setToken] = useState("");

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenURL = params.get("token");

    if (!tokenURL) {
      setLoading(false);
      return;
    }

    setToken(tokenURL);
    validarToken(tokenURL);
  }, []);

  const validarToken = async (tk) => {
    try {
      // Colección correcta
      const ref = doc(db, "managerInvitations", tk);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const data = snap.data();

      // Si ya fue usado → inválido
      if (data.used === true) {
        setLoading(false);
        return;
      }

      // Token válido
      setEmailInvitado(data.email);
      setTokenValido(true);
      setLoading(false);

    } catch (err) {
      console.error("Error validando token:", err);
      setLoading(false);
    }
  };

  const handleRegistro = async () => {
    if (!nombre.trim() || !password.trim()) {
      alert("Completá todos los campos");
      return;
    }

    try {
      // Crear usuario en Auth
      const cred = await createUserWithEmailAndPassword(
        auth,
        emailInvitado,
        password
      );

      const uid = cred.user.uid;

      // Registrar en usuarios
      await setDoc(doc(db, "usuarios", uid), {
        uid,
        email: emailInvitado,
        rol: "manager",
        nombre,
        creadoEn: new Date(),
      });

      // Registrar en managers
      await setDoc(doc(db, "managers", uid), {
        uid,
        email: emailInvitado,
        nombre,
        creadoEn: new Date(),
      });

      // Marcar invitación como usada
      await updateDoc(doc(db, "managerInvitations", token), {
        used: true,
        usedAt: new Date(),
      });

      alert("Registro completado. Ya podés iniciar sesión.");
      navigate("/login");

    } catch (error) {
      console.error("Error registro manager:", error.message);
      alert("Ocurrió un error: " + error.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Verificando invitación...</p>;
  }

  if (!tokenValido) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-3">Invitación inválida</h1>
        <p className="text-gray-600">
          El enlace no es válido o ya fue utilizado.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Registro de Manager
      </h1>

      <div className="flex flex-col gap-4">

        <div className="flex flex-col">
          <label className="font-medium mb-1">Correo asignado</label>
          <input
            type="email"
            value={emailInvitado}
            disabled
            className="border p-2 rounded bg-gray-100 text-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="Crear contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleRegistro}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded font-semibold"
        >
          Completar Registro
        </button>
      </div>
    </div>
  );
}
