import { useNavigate } from "react-router-dom";

export default function HomeManager() {
  const navigate = useNavigate();

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Home del Manager</h1>

      <div 
        className="border p-5 rounded shadow cursor-pointer bg-blue-100 hover:bg-blue-200"
        onClick={() => navigate("/jugadores")}
      >
        <h2 className="text-lg font-semibold">Jugadores</h2>
        <p>Ir a la lista de jugadores</p>
      </div>
    </div>
  );
}
