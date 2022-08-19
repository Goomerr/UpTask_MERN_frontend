import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "./Alerta";
import useProyectos from "../hooks/useProyectos";

const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams();

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setCliente(proyecto.cliente);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los Campos son obligatorios",
        error: true
      });
      return;
    }

    //Pasar los datos hacia el Provider
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

    setId(null);
    setNombre("");
    setCliente("");
    setDescripcion("");
    setFechaEntrega("");
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre Proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="border border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha de Entrega
        </label>
        <input
          type="date"
          id="fecha-entrega"
          className="border border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="border border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={id ? "Guardar Cambios" : "Crear Proyecto"}
        className="w-full bg-sky-600 p-3 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-sky-800 transition-colors"
      />
      {id ? (
        <Link
          to={`/proyectos/${params.id}`}
          className="w-full block text-center mt-3 bg-green-600 p-3 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-green-800 transition-colors"
        >
          Volver
        </Link>
      ) : (
        ""
      )}
    </form>
  );
};

export default FormularioProyecto;
