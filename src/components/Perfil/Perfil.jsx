"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Redirect from "@/components/Redirect/Redirect";

const Perfil = () => {
  const [empresaInfo, setEmpresaInfo] = useState({});

  useEffect(() => {
    const getEmpresa = async () => {
      try {
        const url = `https://${process.env.SERVER_IP}/micuenta/usuarios/movimiento/164792/aaa`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const data = await response.json();
        
        console.log("Data from API:", data);

        setEmpresaInfo(data.data);
      } catch (error) {
        console.error(error);
      }
    };


    getEmpresa();
  }, []);

  return (
    <div className="my-2 flex flex-col items-center py-2 pb-20 text-start lg:pb-1">
      <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Perfil
      </h2>
      <div className="flex w-full flex-col items-center">
        <div className="my-2 mt-2 flex w-11/12 flex-col justify-center rounded-md border-2 bg-white p-4 py-2 sm:w-4/12">
          <h3 className="mb-2 pb-2 text-2xl font-medium text-[#3184e4]">
            Mis Datos
          </h3>
          <hr className="border" />
          <div className="flex items-center justify-between">
            <p className="my-1 font-medium text-[#3184e4]">Nombre</p>
            <input
              type="text"
              name="nombre"
              placeholder={""}
              defaultValue={empresaInfo.empresaId}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-1 font-medium text-[#3184e4]">Email</p>
            <input
              type="email"
              name="email"
              defaultValue={empresaInfo?.mail || ""}
              placeholder={""}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-1 font-medium text-[#3184e4]">Dirección</p>
            <input
              type="text"
              name="direccion"
              defaultValue={empresaInfo?.direccion || ""}
              placeholder={""}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-1 font-medium text-[#3184e4]">DNI / CUIT</p>
            <input
              type="number"
              name="dni"
              defaultValue={empresaInfo?.dniCuit || ""}
              placeholder={""}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-1 font-medium text-[#3184e4]">Teléfono Fijo</p>
            <input
              type="number"
              name="telefono"
              defaultValue={empresaInfo?.telefono || ""}
              placeholder={""}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100 py-2 text-gray-500 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-1 font-medium text-[#3184e4]">Celular</p>
            <input
              type="number"
              name="celular"
              defaultValue={empresaInfo?.movil || ""}
              placeholder={""}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <Link
            href="/dashboard/friocalor/solicitar"
            className="my-2 flex justify-center rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a]"
          >
            <button>
              <p>GUARDAR</p>
            </button>
          </Link>
        </div>
        <div className="m-4 flex flex-col justify-center rounded-md border-2 bg-white p-4 sm:w-4/12 lg:mb-16">
          <h3 className="mb-2 pb-2 text-2xl font-medium text-[#3184e4]">
            Seguridad
          </h3>
          <hr className="border" />
          <div className="flex items-center justify-between ">
            <p className="my-1 font-medium text-[#3184e4]">Contraseña</p>
            <input
              type="number"
              name="password"
              defaultValue={empresaInfo?.idCliente || ""}
              placeholder={""}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-1 font-medium text-[#3184e4]">
              Confirme Contraseña
            </p>
            <input
              type="number"
              name="password"
              defaultValue={empresaInfo?.idCliente || ""}
              placeholder={""}
              required
              className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
            />
          </div>
          <Link
            href="/dashboard/friocalor/solicitar"
            className="my-2 flex justify-center rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a]"
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
