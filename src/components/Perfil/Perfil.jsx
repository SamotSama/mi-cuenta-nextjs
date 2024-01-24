"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Redirect from "@/components/Redirect/Redirect";

const Perfil = () => {
  const { data: session } = useSession();

  if (!session) {
    // Manejar el caso en el que el usuario no está autenticado
    return <Redirect />
  }

  return (
    <div className="flex flex-col items-center text-start py-2 my-2 pb-20">
      <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mx-2 px-4 py-2">
        Perfil
      </h2>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col w-11/12 justify-center py-2 my-2 bg-white border-2 p-4 mt-2 sm:w-4/12 rounded-md">
          <h3 className="text-[#3184e4] text-2xl font-medium pb-2 mb-2">
            Mis Datos
          </h3>
          <hr className="border" />
          <div className="flex justify-between items-center">
            <p className="text-[#3184e4] font-medium my-1">Nombre</p>
            <input
              type="name"
              name="nombre"
              placeholder={session.user.name}
              required
              className="input py-2 my-2 border-2 bg-gray-100 rounded-md  w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#3184e4] font-medium my-1">Email</p>
            <input
              type="email"
              name="email"
              placeholder={""}
              required
              className="input py-2 my-2 border-2 bg-gray-100 rounded-md  w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#3184e4] font-medium my-1">Dirección</p>
            <input
              type="text"
              name="direccion"
              placeholder={""}
              required
              className="input py-2 my-2 border-2 bg-gray-100 rounded-md  w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#3184e4] font-medium my-1">DNI / CUIT</p>
            <input
              type="number"
              name="dni"
              placeholder={""}
              required
              className="input py-2 my-2 border-2 bg-gray-100 rounded-md  w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#3184e4] font-medium my-1">Teléfono Fijo</p>
            <input
              type="number"
              name="telefono"
              placeholder={""}
              required
              className="input text-gray-500 py-2 my-2 border-2 bg-gray-100 rounded-md w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#3184e4] font-medium my-1">Celular</p>
            <input
              type="number"
              name="celular"
              placeholder={""}
              required
              className="input py-2 my-2 border-2 bg-gray-100 rounded-md  w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <Link
            href="/dashboard/friocalor/solicitar"
            className="flex justify-center py-2 my-2 bg-[#3184e4] text-white font-semibold hover:bg-[#00478a] rounded-sm"
          >
            <button>
              <p>GUARDAR</p>
            </button>
          </Link>
        </div>
        <div class="flex flex-col justify-center bg-white border-2 p-4 m-4 lg:mb-16 sm:w-4/12 rounded-md">
          <h3 className="text-[#3184e4] text-2xl font-medium pb-2 mb-2">
            Seguridad
          </h3>
          <hr className="border" />
          <div className="flex justify-between items-center ">
            <p className="text-[#3184e4] font-medium my-1">Contraseña</p>
            <input
              type="password"
              name="password"
              placeholder={""}
              required
              className="input py-2 my-2 border-2 bg-gray-100 rounded-md  w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#3184e4] font-medium my-1">
              Confirme Contraseña
            </p>
            <input
              type="password"
              name="password"
              placeholder={""}
              required
              className="input py-2 my-2 border-2 bg-gray-100 rounded-md  w-3/5 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
            />
          </div>
          <Link
            href="/dashboard/friocalor/solicitar"
            className="flex justify-center py-2 my-2 bg-[#3184e4] text-white font-semibold hover:bg-[#00478a] rounded-sm"
          >
            <button>
              <p>GUARDAR</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
