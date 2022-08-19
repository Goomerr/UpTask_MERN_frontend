import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();

  const { nombre, _id, cliente, creador } = proyecto;

  return (
    <div className="border-b border-gray-300 p-3 text-center flex flex-col md:flex-row  justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1 mb-1">
          {nombre}
          <span className="ml-3 text-sm text-gray-500 uppercase">
            {cliente}{" "}
          </span>
        </p>

        {auth._id !== creador && <p className="p-1 rounded-md bg-green-500 text-sm text-white font-bold">Colaborador</p>}
      </div>
      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${_id}`}
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
