"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Redirect from "@/components/Redirect/Redirect";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [fecha] = useState(new Date());
  const { data: session } = useSession();

  // Verificar si session está definido y si tiene una propiedad user
  const user = session?.user;

  // Verificar si user está definido
  const name = user?.name;
  const email = user?.email;

  return (
    <div className="flex flex-col items-center">
      <div className="my-4 flex w-11/12 items-center justify-evenly rounded-md border-2 bg-white p-5 lg:w-3/5">
        <Image src="/saldo.svg" width={65} height={75} alt="saldo"></Image>
        <p className="text-sm font-medium text-gray-500">
          Tu saldo al{" "}
          {fecha.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p className="text-xl font-medium text-[#3184e4]"></p>{" "}
        <button className="flex justify-center rounded-sm bg-[#3184e4] px-2 py-2 text-xs font-semibold text-white hover:bg-[#00478a]">
          <Link href="/dashboard/pagar">PAGAR</Link>
        </button>
      </div>
      <div className="flex w-11/12 flex-col lg:w-3/5">
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
      <div className="flex w-11/12 flex-col lg:w-3/5 lg:flex-row lg:gap-8">
        <div className="flex flex-col justify-center lg:w-1/2">
          <Link
            href="/dashboard/pedido"
            className="my-4 flex justify-center rounded-sm bg-[#3184e4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00478a]"
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
            className="my-2 flex justify-center rounded-sm bg-[#00478a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3184e4]"
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
            className="my-4 h-[11rem] rounded-sm bg-[#00478a] px-4 py-2 font-semibold text-white hover:bg-[#3184e4] lg:max-h-40"
            zindex={0}
          >
            <Link href="/dashboard/pagar">
              <h4 className="m-2 text-xl">¡Recomendar!</h4>
              <p className="m-2 w-4/5 pt-2 text-sm lg:w-4/5">
                ¡Por cada amigo que recomiendes, recibirán cada uno un botellón
                de regalo! El regalo se efectuará cuando el recomendado realice
                su primer compra.
              </p>
              <div className="relative -right-3 bottom-[4.6rem] flex flex-row-reverse lg:-right-3 lg:bottom-[5.3rem]">
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
        <div className="mb-20 flex max-h-60 flex-col justify-between rounded-md border-2 bg-white px-4 py-2 font-medium lg:mt-3 lg:w-1/2">
          <h4 className="pt-3 text-xl text-[#3184e4]">Tu dia de visita: {}</h4>
          <div className="flex flex-row justify-between text-sm text-gray-500">
            <div className="flex items-center py-2">
              <Image
                src="/user-circle-regular.svg"
                width={27}
                height={27}
                alt="usuario"
              ></Image>
              <p className="ml-2">{name}</p>
            </div>
            <p>COD: {}</p>
          </div>
          <div className="py-2 text-sm text-gray-500">
            <p>VENDEDOR:</p>
          </div>
          <div className="flex flex-col justify-between gap-6 pb-3 lg:flex-row">
            <Link
              href="/dashboard/historial"
              className="mr-2 flex w-full flex-col justify-center rounded-sm bg-[#00478a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3184e4]"
            >
              <button>
                <p>VER MI HISTORIAL</p>
              </button>
            </Link>
            <Link
              href="/dashboard/pagar"
              className="flex w-full flex-row justify-center rounded-sm bg-[#00478a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3184e4]"
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
