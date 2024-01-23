"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        // Login exitoso
        console.log("Login exitoso");
        // Puedes redirigir o realizar otras acciones después del login exitoso
      } else {
        // Manejar errores de login
        const data = await response.json();
        console.error("Error al realizar el login:", data.message);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de login:", error);
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
    </div>
  );
};

export default LoginForm;
