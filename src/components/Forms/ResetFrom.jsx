"use client"

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
require("dotenv").config();

const ResetToken = async (email) => {
  try {
    const url = `https://${process.env.SERVER_IP}/micuenta/usuarios/codigoresetpass`;

    const body = new URLSearchParams();
    body.append("usuario", email);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};

const ResetForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ResetToken(email);
      toast.success("¡Se ha enviado un correo de restablecimiento de contraseña!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="mt-64 flex flex-col items-center text-[#046cb3]">
      <Image
        src="/logo.svg"
        alt="logo"
        className="w-44"
        width={500}
        height={500}
      />
      <h2 className="mb-12 text-4xl font-bold">Mi Cuenta</h2>
      <p className="mb-12 text-2xl font-medium">Resetear Contraseña</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6 w-80 rounded-md p-3 focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4]"
          />
        </label>
        <button
          type="submit"
          className="mb-6 w-80 rounded-md bg-[#3184e4] p-3 font-bold text-white"
        >
          RESETEAR
        </button>
      </form>
      <Link href="/login" className="text-end font-bold text-[#00478a]">
        Ingresar
      </Link>
      <ToastContainer />
    </div>
  );
};

export default ResetForm;
