import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Ficha({ usuario }) {
  const { id } = useParams();
  const [jugador, setJugador] = useState(null);
  const [editando, setEditando] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);

  const esManager = usuario?.rol === "manager";

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        const docRef = doc(db, "jugadores", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJugador(docSnap.data());
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

  const guardarCambios = async () => {
    try {
      const docRef = doc(db, "jugadores", id);
      await updateDoc(docRef, jugador);
      setEditando(false);
      alert("Cambios guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  if (!jugador)
    return (
      <div className="p-5 text-center text-gray-500">Cargando jugador...</div>
    );

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#365486] drop-shadow-md">
        Ficha del Jugador {jugador.nombre} {jugador.apellido}
      </h1>

      {jugador.foto && (
        <div className="flex justify-center mb-5">
          <img
            src={fotoPreview || jugador.foto}
            alt="Foto del jugador"
            className="w-36 h-36 object-cover rounded-full shadow-lg"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {Object.entries(jugador).map(([key, value]) => {
          const camposOcultos = ["uid", "id", "estado", "creadoEn"];
          if (camposOcultos.includes(key) || key === "foto") return null;

          if (value && typeof value === "object" && "seconds" in value) {
            value = new Date(value.seconds * 1000).toLocaleDateString();
          }

          return (
            <div
              key={key}
              className="flex justify-between items-center p-3 rounded-xl shadow-md bg-gradient-to-r from-[#0F1035] via-[#7FC7D9] to-[#0F1035] text-white"
            >
              <span className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              {esManager && editando ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="px-2 py-1 rounded-md text-black"
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          );
        })}

        {esManager && editando && (
          <div className="flex flex-col mt-3">
            <label className="mb-1 font-medium text-white">Foto</label>
            <input type="file" onChange={handleFoto} />
          </div>
        )}

        {esManager && (
          <button
            className="mt-5 bg-[#365486] hover:bg-[#0F1035] text-white font-semibold px-5 py-2 rounded-lg transition drop-shadow-md"
            onClick={() => (editando ? guardarCambios() : setEditando(true))}
          >
            {editando ? "Guardar cambios" : "Editar datos"}
          </button>
        )}
      </div>
    </div>
  );
}
