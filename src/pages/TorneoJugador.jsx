import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import TorneoCard from "../components/TorneoCard";

export default function TorneoJugador() {
  const navigate = useNavigate();
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "torneos"));
        const listaTorneos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTorneos(listaTorneos);
      } catch (error) {
        console.error("Error al obtener torneos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTorneos();
  }, []);

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#365486] drop-shadow-md">
        Torneos
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando torneos...</p>
      ) : torneos.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No hay torneos disponibles
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {torneos.map((torneo) => (
            <TorneoCard
              key={torneo.id}
              ruta={`/jugador/torneo/${torneo.id}`}
              descripcion={torneo.nombre}
            />
          ))}
        </div>
      )}
    </div>
  );
}
