"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require('dotenv').config()

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
        "Authorization": "Basic " + btoa("micuentaApp:mobeus"),
      },
      body: body,
    });

    if (response.ok) {
      const data = await response.json();
      // Almacena el token de acceso en localStorage
      localStorage.setItem("access_token", data.access_token);
      return data;
    } else {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = await makeLoginRequest(email, password);

      if (loginData.access_token) {
        // Almacenar el token de acceso en el almacenamiento local
        localStorage.setItem("access_token", loginData.access_token);

        // El inicio de sesión fue exitoso
        toast.success(`¡Bienvenido/a! Inicio de Sesión Exitoso `, {
          onClose: () => {
            router.push("/dashboard");
          },
        });
      } else {
        // Mostrar un toast de error en caso de fallo en la autenticación
        toast.error(
          "Error al iniciar sesión, verifique usuario y/o contraseña",
        );
      }
    } catch (error) {
      console.error(
        "Error al realizar la solicitud de inicio de sesión:",
        error,
      );
      toast.error("Error al iniciar sesión, verifique usuario y/o contraseña");
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
            className="mb-6 w-80 rounded-md p-3"
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
            className="mb-6 w-80 rounded-md p-3"
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
      />
    </div>
  );
};

export default LoginForm;


