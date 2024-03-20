"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal, Select, ConfigProvider } from "antd";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require("dotenv").config();

const makeLoginRequest = async (email, password) => {
  try {
    const url = `https://${process.env.SERVER_IP}/micuenta/oauth/token`;

    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);
    body.append("grant_type", "password");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa("micuentaApp:mobeus"),
      },
      body: body,
    });

    if (response.ok) {
      const data = await response.json();
      // Almacena el token de acceso en localStorage
      return data;
    } else {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};

const processLoginResponse = (loginData) => {
  if (
    loginData &&
    loginData.nro_cuentas_hijas &&
    loginData.nro_cuentas_hijas.length > 0
  ) {
    const nroCta = loginData.nro_cuentas_hijas[0].nroCta;
    localStorage.setItem("access_token", loginData.access_token);
    localStorage.setItem("nroCta", nroCta.toString());
    return true;
  }
  return false;
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { Option } = Select;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const loginData = await makeLoginRequest(email, password);

      if (processLoginResponse(loginData)) {
        if (loginData.nro_cuentas_hijas.length > 1) {
          Modal.info({
            title: "Seleciona la cuenta",
            centered: true,
            closable: true,
            content: (
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionActiveBg: "#3184e4",
                      optionSelectedColor: "#FFFFFF",
                    },
                  },
                }}
              >
                <Select
                  centered
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    localStorage.setItem("nroCta", value.toString());
                    router.push("/dashboard");
                    Modal.destroyAll();
                    toast.success(`¡Bienvenido/a! Inicio de Sesión Exitoso`);
                  }}
                >
                  {loginData.nro_cuentas_hijas.map((account, index) => (
                    <Option key={index} value={account.nroCta}>
                      {account.direccion}
                    </Option>
                  ))}
                </Select>
              </ConfigProvider>
            ),
          });
        } else {
          localStorage.setItem(
            "nroCta",
            loginData.nro_cuentas_hijas[0].nroCta.toString(),
          );
          router.push("/dashboard");
          toast.success(`¡Bienvenido/a! Inicio de Sesión Exitoso`);
        }
      } else {
        toast.error(
          "Error al iniciar sesión, verifique usuario y/o contraseña",
        );
      }
    } catch (error) {
      console.error(
        "Error al realizar la solicitud de inicio de sesión:",
        error,
      );

      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        toast.error(
          "Error de red. Por favor, verifica tu conexión a Internet.",
        );
      } else {
        toast.error(
          "Error al iniciar sesión. Por favor, verifica usuario y/o contraseña.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-56 flex flex-col items-center text-[#046cb3]">
      <Image
        src="/logo.svg"
        alt="logo"
        className="w-44"
        width={500}
        height={500}
      />
      <h2 className="mb-12 text-4xl font-bold">Mi Cuenta</h2>
      <p className="mb-12 text-2xl font-medium">Bienvenido/a</p>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            className="mb-6 w-80 rounded-md p-3 focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            required
            className="mb-6 w-80 rounded-md p-3 focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="mb-6 w-80 rounded-md bg-[#3184e4] p-3 font-bold text-white"
        >
          INGRESAR
        </button>
      </form>
      <Link href="/reset" className="text-end font-bold text-[#00478a]">
        ¿Olvidó su contraseña?
      </Link>

      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={2000}
        transition={Flip}
      />
    </div>
  );
};

export default LoginForm;
