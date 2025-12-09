import FichaJugador from "../components/FichaJugador";

export default function FichaJugadorWrapper({ usuario }) {
  if (!usuario) return <p>Cargando...</p>;
  return <FichaJugador jugadorId={usuario.uid} />;
}
