import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true
      });
      return;
    }
    submitColaborador(email)
  };

  const { msg } = alerta;
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow-md"
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label htmlFor="email">Email Colaborador</label>
        <input
          type="email"
          id="email"
          placeholder="Email Colaborador"
          className="border w-full p-2 mt-2 rounded-md border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-800 text-sm text-white w-full p-3 uppercase font-bold transition-colors rounded-lg"
        value={"Buscar"}
      />
    </form>
  );
};

export default FormularioColaborador;
