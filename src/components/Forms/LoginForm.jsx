"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.error("Error al iniciar sesión");
      } else {
        // El inicio de sesión fue exitoso
        // Mostrar un toast de éxito
        toast.success(`Inicio de Sesión Exitoso ¡Bienvenido/a!`, {
          onClose: () => {
            // Redirigir al usuario a la página /dashboard después de cerrar el toast
            router.push("/dashboard");
          },
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de inicio de sesión:", error);
      // Mostrar un toast de error en caso de fallo
      toast.error("Error al realizar la solicitud de inicio de sesión");
    }
  };

  return (
    <div className="text-[#046cb3] flex flex-col items-center mt-56">
      <Image src="/logo.svg" alt="logo" className="w-44" width={500} height={500} />
      <h2 className="font-bold text-4xl mb-12">Mi Cuenta</h2>
      <p className="text-2xl font-medium mb-12">Bienvenido/a</p>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            className="rounded-md p-3 w-80 mb-6"
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
            className="rounded-md p-3 w-80 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-[#3184e4] text-white font-bold p-3 rounded-md w-80 mb-6"
        >
          INGRESAR
        </button>
      </form>
      <Link href="/reset" className="text-[#00478a] font-bold text-end">
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

