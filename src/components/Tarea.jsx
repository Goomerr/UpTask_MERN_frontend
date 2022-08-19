import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const admin = useAdmin();

  const { descripcion, nombre, fechaEntrega, prioridad, estado, _id } = tarea;

  return (
    <div className="border-b border-gray-300 p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">
          Prioridad:
          {prioridad === "Alta" ? (
            <span className="bg-red-700 text-white text-xs text-center p-1 ml-2  rounded-lg">
              {" "}
              {prioridad}
            </span>
          ) : prioridad === "Media" ? (
            <span className="bg-orange-600 text-white text-xs text-center p-1 ml-2  rounded-lg">
              {" "}
              {prioridad}
            </span>
          ) : (
            <span className="bg-green-600 text-white text-xs text-center p-1 ml-2  rounded-lg">
              {" "}
              {prioridad}
            </span>
          )}
        </p>
        {estado && <p className="text-xs bg-green-600 p-1 rounded-md text-white">Completada por: {tarea.completado.nombre} </p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            onClick={() => handleModalEditarTarea(tarea)}
            className="bg-indigo-600 hover:bg-indigo-800 px-4 py-3 text-white uppercase rounded-lg text-sm font-bold"
          >
            Editar
          </button>
        )}

        <button
          onClick={() => completarTarea(_id)}
          className={ `${estado ? 'bg-sky-600 hover:bg-sky-800' : 'bg-gray-600 hover:bg-gray-800'}  px-4 py-3 text-white uppercase rounded-lg text-sm font-bold`}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>
        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            className="bg-red-600 hover:bg-red-800 px-4 py-3 text-white uppercase rounded-lg text-sm font-bold"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
