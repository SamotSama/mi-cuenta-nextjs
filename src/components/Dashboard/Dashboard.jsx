"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Redirect from "@/components/Redirect/Redirect"
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [fecha] = useState(new Date());

  return (
    <div className="flex flex-col items-center">
      <div className="flex my-4 p-5 bg-white border-2 rounded-md lg:w-3/5 items-center justify-evenly w-11/12">
        <Image src="/saldo.svg" width={65} height={75} alt="saldo"></Image>
        <p className="text-sm text-gray-500 font-medium">
          Tu saldo al{" "}
          {fecha.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p className="text-[#3184e4] text-xl font-medium"></p>{" "}
        <button className="flex justify-center px-2 py-2 bg-[#3184e4] text-white text-xs font-semibold hover:bg-[#00478a] rounded-sm">
          <Link href="/dashboard/pagar">PAGAR</Link>
        </button>
      </div>
      <div className="flex flex-col w-11/12 lg:w-3/5">
        <Image
          src="/banner-home.jpg"
          width={1280}
          height={230}
          alt="banner-home"
          className="hidden rounded-md lg:block"
        ></Image>
        <Image
          src="/banner-home-sm.jpg"
          width={1280}
          height={230}
          alt="banner-home-sm"
          className="rounded-md lg:hidden"
        ></Image>
      </div>
      <div className="flex flex-col lg:flex-row w-11/12 lg:w-3/5 lg:gap-8">
        <div className="flex flex-col lg:w-1/2 justify-center">
          <Link
            href="/dashboard/pedido"
            className="flex justify-center px-4 py-2 my-4 bg-[#3184e4] text-sm text-white font-semibold hover:bg-[#00478a] rounded-sm"
          >
            <button className="flex items-center">
              <Image
                src="/camion.svg"
                width={35}
                height={23}
                alt="camion"
              ></Image>
              <p className="ml-3">HACER PEDIDO</p>
            </button>
          </Link>
          <Link
            href="/dashboard/pagar"
            className="flex justify-center px-4 py-2 my-2 bg-[#00478a] text-sm text-white font-semibold hover:bg-[#3184e4] rounded-sm"
          >
            <button className="flex items-center">
              <Image
                src="/camion.svg"
                width={35}
                height={23}
                alt="camion"
              ></Image>
              <p className="ml-3">REPETIR ÚLTIMO PEDIDO</p>
            </button>
          </Link>
          <div
            className="bg-[#00478a] px-4 py-2 my-4 text-white font-semibold rounded-sm hover:bg-[#3184e4] h-[11rem] lg:max-h-40"
            zindex={0}
          >
            <Link href="/dashboard/pagar">
              <h4 className="text-xl m-2">¡Recomendar!</h4>
              <p className="text-sm m-2 pt-2 w-4/5 lg:w-4/5">
                ¡Por cada amigo que recomiendes, recibirán cada uno un botellón
                de regalo! El regalo se efectuará cuando el recomendado realice
                su primer compra.
              </p>
              <div className="relative flex flex-row-reverse bottom-[4.6rem] -right-3 lg:bottom-[5.3rem] lg:-right-3">
                <Image
                  src="/regalo.png"
                  width={105}
                  height={114}
                  alt="regalo"
                  className="hidden lg:flex"
                ></Image>
                <Image
                  src="/regalo.png"
                  width={73}
                  height={79}
                  alt="regalo-sm"
                  className="lg:hidden"
                ></Image>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-white lg:w-1/2 font-medium px-4 py-2 lg:mt-3 mb-20 border-2 rounded-md max-h-60">
          <h4 className="text-[#3184e4] text-xl pt-3">Tu dia de visita:</h4>
          <div className="flex flex-row justify-between text-gray-500 text-sm">
            <div className="flex items-center py-2">
              <Image
                src="/user-circle-regular.svg"
                width={27}
                height={27}
                alt="usuario"
              ></Image>
              <p className="ml-2"></p>
            </div>
            <p>COD:</p>
          </div>
          <div className="text-gray-500 text-sm py-2">
            <p>VENDEDOR:</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between pb-3 gap-6">
            <Link
              href="/dashboard/historial"
              className="flex flex-col justify-center px-4 py-2 mr-2 w-full bg-[#00478a] text-sm text-white font-semibold hover:bg-[#3184e4] rounded-sm"
            >
              <button>
                <p>VER MI HISTORIAL</p>
              </button>
            </Link>
            <Link
              href="/dashboard/pagar"
              className="flex flex-row justify-center px-4 py-2 w-full bg-[#00478a] text-sm text-white font-semibold hover:bg-[#3184e4] rounded-sm"
            >
              <button>
                <p>CAMBIAR DÍA</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
