import CuotasJugador from "../components/CuotasJugador";

export default function CuotasJugadorWrapper({ usuario }) {
  if (!usuario) return <p>Cargando...</p>;
  return <CuotasJugador jugadorId={usuario.uid} />;
}
