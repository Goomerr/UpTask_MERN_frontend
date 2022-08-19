import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const comporobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);

        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };

    comporobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe tener al menos 6 caracteres",
        error: true
      });
      setTimeout(() => setAlerta({}), 3000);
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false
      });
      setTimeout(() => setAlerta({}), 3000);
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;

  return (
    <Fragment>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recupera tu cuenta y no pierdas tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form onSubmit={handleSubmit} className="my-10 bg-white shadow-md p-10">
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-semibold"
            >
              Nuevo Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Nuevo Password "
              className="w-full mt-3 p-3 border border-gray-300 rounded-xl bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value={"Cambiar Password"}
            className="w-full bg-sky-600 py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to={"/"}
        >
          Inicia Sesión
        </Link>
      )}
    </Fragment>
  );
};

export default NuevoPassword;
