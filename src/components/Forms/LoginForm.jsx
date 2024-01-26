"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        console.error("Error al iniciar sesión:", result.error);
        // Mostrar un toast de error
        toast.error(
          "Error al iniciar sesión, verifique usuario y/o contraseña",
        );
      } else {
        // El inicio de sesión fue exitoso
        // Mostrar un toast de éxito
        toast.success(`¡Bienvenido/a! Inicio de Sesión Exitoso `, {
          onClose: () => {
            // Redirigir al usuario a la página /dashboard después de cerrar el toast
            router.push("/dashboard");
          },
        });
      }
    } catch (error) {
      console.error(
        "Error al realizar la solicitud de inicio de sesión:",
        error,
      );
      // Mostrar un toast de error en caso de fallo
      toast.error("Error al realizar la solicitud de inicio de sesión");
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
