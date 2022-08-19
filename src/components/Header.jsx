import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();
  const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionProyectos();
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b shadow-md">
      <div className=" md:flex md:justify-between ">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:nb-0">
          UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={handleBuscador}
            className=" uppercase font-bold hover:scale-110 transition-all  "
            type="button"
          >
            <div className="flex gap-1 items-center">
              Buscar{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>{" "}
            </div>
          </button>
          <span className=" md:border-r md:border-gray-400 text-white">.</span>
          <Link
            to="/proyectos"
            className="font-bold uppercase hover:scale-110 transition-all"
          >
            Proyectos
          </Link>
          <button
            onClick={handleCerrarSesion}
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >
            Cerrar Sesión
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
