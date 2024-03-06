"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FrioCalor = () => {
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    const valor = localStorage.getItem("friocalor");
    setTipo(valor);
  }, []);

  return (
    <div className="mt-2 flex flex-col items-center">
      <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Dispenser Frío - Calor
      </h2>
      <button className="my-2 w-4/5 rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a] lg:w-2/6">
        <Link href="/dashboard/friocalor/solicitar">{tipo === "0" ? "SOLICITAR EQUIPO" : "AGREGAR OTRO EQUIPO"}</Link>
      </button>
      <button className="my-2 w-4/5 rounded-sm bg-[#00478a] py-2 font-semibold text-white hover:bg-[#3184e4] lg:w-2/6">
        <Link href="/requisitos_fc.pdf" target="_blank">
          LEER REQUISITOS
        </Link>
      </button>
      <Image
        src="/disp-familia.png"
        alt="dispenser"
        width={350}
        height={550}
        className="mt-10"
      />
    </div>
  );
};

export default FrioCalor;
