import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const { setAuth} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      setTimeout(() => setAlerta({}), 3000);
    }

    try {
      const {data } = await clienteAxios.post('/usuarios/login', {email, password});
      setAlerta({})
      localStorage.setItem('token', data.token);
      setAuth(data);
      
      navigate('/proyectos')
    } catch (error) {
      console.log(error)
      setAlerta({msg:error.response.data.msg, error:true})
    }
  };

  const { msg } = alerta;

  return (
    <Fragment>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Inicia sesión y administra tus{" "}
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
        <input
          type="submit"
          value={"Iniciar Sesión"}
          className="w-full bg-sky-600 py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to={"/registrar"}
        >
          ¿No tienes Cuenta? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to={"olvide-password"}
        >
          Olvide mi Password
        </Link>
      </nav>
    </Fragment>
  );
};

export default Login;
