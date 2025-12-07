import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("HANDLE LOGIN EJECUTADO");

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "usuarios", cred.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("El usuario no existe en la base de datos.");
        return;
      }

      const data = docSnap.data();

      setUsuario({
        uid: cred.user.uid,
        email: data.email,
        rol: data.rol
      });

      navigate(data.rol === "manager" ? "/manager" : "/jugador");

    } catch (error) {
      console.error("ERROR LOGIN:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="p-5 max-w-sm mx-auto">

      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

      <input 
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <input 
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button 
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
      >
        Iniciar sesión
      </button>

      <p className="text-center mt-4">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-blue-600 underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
