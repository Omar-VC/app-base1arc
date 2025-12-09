import { useParams } from "react-router-dom";
import FichaJugador from "../components/FichaJugador";

export default function FichaJugadorWrapper() {
  const { id } = useParams();
  return <FichaJugador jugadorId={id} />;
}
