import { useParams } from "react-router-dom";
import CuotasJugador from "../components/CuotasJugador";


export default function CuotasJugadorWrapper() {
  const { id } = useParams();
  return <CuotasJugador jugadorId={id} />;
}
