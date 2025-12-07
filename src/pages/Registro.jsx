import FormularioRegistro from "../components/FormularioRegistro";

const Registro = () => {
  return (
    <div className="p-5 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Registro</h1>
      <FormularioRegistro />
      <p className="text-center mt-4 text-sm text-gray-600">
        ¿Ya tenés cuenta? <a href="/login" className="text-blue-600 hover:underline">Iniciá sesión</a>
      </p>
    </div>
  );
};

export default Registro;
