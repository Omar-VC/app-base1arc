import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Cuotas() {
  console.log("Cuotas cargado"); // Esto nos ayuda a confirmar que se renderiza
  const { id } = useParams();

  // Datos de ejemplo
  const [cuotas, setCuotas] = useState([
    { id: 1, año: 2025, mes: "Enero", monto: 1000, estado: "Pagado" },
    { id: 2, año: 2025, mes: "Febrero", monto: 1000, estado: "Debe" },
  ]);

  const deudaTotal = cuotas
    .filter((c) => c.estado === "Debe")
    .reduce((sum, c) => sum + c.monto, 0);

  const asignarCuota = () => {
    const nuevaCuota = {
      id: cuotas.length + 1,
      año: 2025,
      mes: "Marzo",
      monto: 1000,
      estado: "Debe",
    };
    setCuotas([nuevaCuota, ...cuotas]);
  };

  const toggleEstado = (id) => {
    setCuotas(
      cuotas.map((c) =>
        c.id === id ? { ...c, estado: c.estado === "Debe" ? "Pagado" : "Debe" } : c
      )
    );
  };

  const eliminarCuota = (id) => {
    setCuotas(cuotas.filter((c) => c.id !== id));
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Cuotas del Jugador {id}</h1>

      {deudaTotal > 0 && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded font-medium">
          Deuda total: ${deudaTotal}
        </div>
      )}

      <button
        onClick={asignarCuota}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Asignar cuota
      </button>

      <div className="flex flex-col gap-3">
        {cuotas.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center border p-3 rounded shadow"
          >
            <div>
              {c.mes} {c.año} - ${c.monto} - {c.estado}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleEstado(c.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Marcar {c.estado === "Debe" ? "Pagado" : "Debe"}
              </button>
              <button
                onClick={() => eliminarCuota(c.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
