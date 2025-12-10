import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const FormularioRegistro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [categoria, setCategoria] = useState("");
  const [posicion, setPosicion] = useState("");
  const [historialLesiones, setHistorialLesiones] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // MODO OSCURO
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleRegistro = async () => {
    if (!email || !password || !nombre) {
      alert("Completa los campos obligatorios");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(db, "aprobaciones", uid), {
        uid,
        nombre,
        apellido,
        edad,
        altura,
        peso,
        categoria,
        posicion,
        historialLesiones,
        telefono,
        dni,
        email,
        estado: "pendiente",
        creadoEn: new Date(),
      });

      alert("Registro completado. Espera aprobación del manager.");
      navigate("/login");

    } catch (error) {
      console.error("ERROR REGISTRO:", error.message);
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-lg shadow-md transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >

      {/* BOTÓN DE MODO OSCURO */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`mb-2 px-4 py-2 rounded font-semibold transition ${
          darkMode
            ? "bg-gray-200 text-black hover:bg-gray-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>

      {/* INPUTS */}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="number"
        placeholder="Altura (cm)"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="number"
        placeholder="Peso (kg)"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="text"
        placeholder="Posición"
        value={posicion}
        onChange={(e) => setPosicion(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="text"
        placeholder="Historial de lesiones"
        value={historialLesiones}
        onChange={(e) => setHistorialLesiones(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`border p-2 rounded transition ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-black"
        }`}
      />

      <button
        onClick={handleRegistro}
        className={`p-2 rounded font-semibold transition ${
          darkMode
            ? "bg-green-700 text-white hover:bg-green-800"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Crear cuenta
      </button>

    </div>
  );
};

export default FormularioRegistro;
