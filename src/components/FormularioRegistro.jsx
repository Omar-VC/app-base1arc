import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const FormularioRegistro = () => {
  const [tipo, setTipo] = useState(""); // "manager" o "jugador"
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
  const navigate = useNavigate();

  const handleRegistro = async () => {
    if (!tipo || !email || !password || !nombre) {
      alert("Completa los campos obligatorios");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      if (tipo === "manager") {
        await setDoc(doc(db, "managers", uid), {
          nombre,
          email,
          creadoEn: new Date(),
        });
      } else if (tipo === "jugador") {
        await setDoc(doc(db, "jugadores", uid), {
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
          creadoEn: new Date(),
        });
      }

      alert(`${tipo === "manager" ? "Manager" : "Jugador"} registrado con éxito`);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="font-medium">Tipo de usuario</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="border p-2 rounded mb-4">
        <option value="">Elegir tipo...</option>
        <option value="manager">Manager</option>
        <option value="jugador">Jugador</option>
      </select>

      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="border p-2 rounded" />
      {tipo === "jugador" && (
        <>
          <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="border p-2 rounded" />
          <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} className="border p-2 rounded" />
          <input type="number" placeholder="Altura (cm)" value={altura} onChange={(e) => setAltura(e.target.value)} className="border p-2 rounded" />
          <input type="number" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Posición" value={posicion} onChange={(e) => setPosicion(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Historial de lesiones" value={historialLesiones} onChange={(e) => setHistorialLesiones(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} className="border p-2 rounded" />
        </>
      )}

      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" />

      <button onClick={handleRegistro} className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Crear cuenta {tipo === "manager" ? "Manager" : "Jugador"}
      </button>
    </div>
  );
};

export default FormularioRegistro;
