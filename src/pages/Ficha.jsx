
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // ajusta la ruta según tu proyecto

export default function Ficha() {
  const { id } = useParams();
  const [jugador, setJugador] = useState(null);
  const [editando, setEditando] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        const docRef = doc(db, "jugadores", id); // colección "jugadores"
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJugador(docSnap.data());
        } else {
          console.log("No existe el jugador con ese ID");
        }
      } catch (error) {
        console.error("Error al obtener jugador:", error);
      }
    };

    fetchJugador();
  }, [id]);

  const handleChange = (campo, valor) => {
    setJugador({ ...jugador, [campo]: valor });
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJugador({ ...jugador, foto: URL.createObjectURL(file) });
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const guardarCambios = () => {
    setEditando(false);
    console.log("Datos actualizados:", jugador);
    // luego se puede guardar en Firebase
  };

  if (!jugador) return <div className="p-5">Cargando jugador...</div>;

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Ficha del Jugador {jugador.nombre} {jugador.apellido}
      </h1>

      {jugador.foto && (
        <img
          src={fotoPreview || jugador.foto}
          alt="Foto del jugador"
          className="w-32 h-32 object-cover rounded mb-3"
        />
      )}

      <div className="flex flex-col gap-3">
        {Object.entries(jugador).map(([key, value]) => {
          if (key === "foto") return null;
          // Evitar mostrar campos timestamp directamente
          if (value && typeof value === "object" && "seconds" in value) {
            value = new Date(value.seconds * 1000).toLocaleDateString();
          }
          return (
            <div key={key} className="flex justify-between border p-2 rounded">
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              {editando ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          );
        })}

        {editando && (
          <div className="flex flex-col">
            <label className="mt-2 mb-1">Foto</label>
            <input type="file" onChange={handleFoto} />
          </div>
        )}

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => (editando ? guardarCambios() : setEditando(true))}
        >
          {editando ? "Guardar cambios" : "Editar datos"}
        </button>
      </div>
    </div>
  );
}
