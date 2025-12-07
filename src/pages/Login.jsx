import { Link } from "react-router-dom";
import FormularioLogin from "../components/FormularioLogin";

const Login = () => {
  return (
    <div className="p-5 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
      <FormularioLogin />

      <p className="text-center mt-4 text-sm text-gray-600">
        ¿No tenés cuenta?{" "}
        <Link to="/registro" className="text-blue-600 hover:underline">
          Registrate aquí
        </Link>
      </p>
    </div>
  );
};

export default Login;
