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
        rol: data.rol,
        nombre: data.nombre || "",
        apellido: data.apellido || "",
      });

      navigate(data.rol === "manager" ? "/manager" : "/jugador");
    } catch (error) {
      console.error("ERROR LOGIN:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F1035] via-[#365486] to-[#7FC7D9] p-4">
      {/* ✅ TÍTULO CENTRADO ARRIBA */}
      <h1 className="font-[Oswald] text-4xl md:text-5xl text-white/80 tracking-wide mb-6">
        Añatuya Rugby Club
      </h1>

      {/* ✅ TARJETA DE LOGIN */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm border border-white/20">
        <h2 className="text-2xl font-bold text-center text-white mb-6 drop-shadow">
          Iniciar Sesión
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7FC7D9]"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7FC7D9]"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#7FC7D9] hover:bg-[#365486] text-[#0F1035] hover:text-white font-semibold py-2 rounded-lg transition-all shadow-md"
          >
            Entrar
          </button>
        </div>

        <p className="text-center text-white/80 mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-white font-semibold underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
