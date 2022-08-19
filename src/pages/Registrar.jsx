import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });

      setTimeout(() => setAlerta({}), 3000);
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los Password no son iguales",
        error: true
      });

      setTimeout(() => setAlerta({}), 3000);
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe tener al menos 6 caracteres",
        error: true
      });

      setTimeout(() => setAlerta({}), 3000);
      return;
    }

    setAlerta({});

    //crear usuario en la pai
    try {
     
      const { data } = await clienteAxios.post(
        `/usuarios`, 
        {
          nombre,
          email,
          password
        }
      );

      setAlerta({ msg: data.msg, error: false });
      setTimeout(() => setAlerta({}), 3000);

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
      setTimeout(() => setAlerta({}), 3000);
    }
  };

  const { msg } = alerta;

  return (
    <Fragment>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Crea tu Cuenta y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form className="my-10 bg-white shadow-md p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-semibold"
          >
            Nombre
          </label>
          <input
            name="nombre"
            id="nombre"
            type="text"
            placeholder="Nombre"
            className="w-full mt-3 p-3 border border-gray-300 rounded-xl bg-gray-100"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-semibold"
          >
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password "
            className="w-full mt-3 p-3 border border-gray-300 rounded-xl bg-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-semibold"
          >
            Repetir Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Vuelve a Escribir tu Password "
            className="w-full mt-3 p-3 border border-gray-300 rounded-xl bg-gray-100"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value={"Crear Cuenta"}
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
          to={"/olvide-password"}
        >
          Olvide mi Password
        </Link>
      </nav>
    </Fragment>
  );
};

export default Registrar;
