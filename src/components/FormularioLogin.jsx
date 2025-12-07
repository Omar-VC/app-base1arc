import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const FormularioLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Completa los campos de email y contraseña");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Revisar en qué colección está el usuario
      const docManager = await getDoc(doc(db, "managers", user.uid));
      if (docManager.exists()) {
        navigate("/manager");
        return;
      }

      const docJugador = await getDoc(doc(db, "jugadores", user.uid));
      if (docJugador.exists()) {
        navigate("/jugador");
        return;
      }

      alert("Usuario no encontrado en ninguna colección");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto">
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default FormularioLogin;
