import clienteAxios from "../config/clienteAxios";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El Email es Obligatorio", error: true });
      setTimeout(() => setAlerta({}), 3000);
      return;
    }

    try {

      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password`,
        { email }
      );
      setAlerta({ msg: data.msg, error: false });
      setTimeout(() => setAlerta({}), 3000);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
      setTimeout(() => setAlerta({}), 3000);
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

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow-md p-10">
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-semibold"
          >
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="E-Mail de registro"
            className="w-full mt-3 p-3 border border-gray-300 rounded-xl bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={"Enviar Instrucciones"}
          className="w-full bg-sky-600 py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to={"/"}
        >
          ¿Ya tienes Cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to={"/registrar"}
        >
          ¿No tienes Cuenta? Regístrate
        </Link>
      </nav>
    </Fragment>
  );
};

export default OlvidePassword;
