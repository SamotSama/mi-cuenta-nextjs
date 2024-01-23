"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Payment = () => { 
  const [fecha] = useState(new Date());
  const [saldo, setSaldo] = useState(null);

  const getSaldo = async () => {
    const connection = UseDb();

    const { data } = await connection.query("SELECT saldo FROM cliente_deuda WHERE id = 1");
    setSaldo(data[0].saldo);
  };
  return (
    <div className="flex flex-col items-center pt-4 pb-16">
      <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mx-2 px-4 py-2">
        Realizar un pago
      </h2>
      <div className="flex p-5 bg-white border-2 rounded-md w-11/12 lg:w-3/5 items-center justify-evenly">
        <Image src="/saldo.svg" width={65} height={75} alt={saldo}></Image>
        <p className="text-sm text-gray-500 font-medium">
          Tu saldo al{" "}
          {fecha.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p className="text-[#3184e4] text-xl font-medium">{saldo}</p>
      </div>
      <div className="bg-white my-4 p-2 border-2 rounded-md w-11/12 lg:w-3/5">
        <h3 className="text-2xl p-2 text-[#3184e4] font-medium">
          ¿Qué deseas pagar?
        </h3>
        <hr className="m-2 border" />
      </div>
      <div className="bg-white my-4 p-2 border-2 rounded-md w-11/12 lg:w-3/5">
        <h3 className="text-2xl p-2 text-[#3184e4] font-medium">
          Forma de pago
        </h3>
        <hr className="m-2 border" />
        <div className="flex justify-center text-[#3184e4] font-medium">
          <div className="p-2">
            <input
              type="radio"
              id="huey"
              name="drone"
              value="huey"
              className="mr-2"
            />
            <label for="huey">PAGO TIC</label>
          </div>
          <div className="p-2">
            <input
              type="radio"
              id="huey"
              name="drone"
              value="huey"
              className="mr-2"
            />
            <label for="huey">MERCADO PAGO</label>
          </div>
        </div>
      </div>
      <div className="bg-white my-4 p-4 border-2 rounded-md w-11/12 lg:w-3/5">
        <button className="flex justify-center p-2 my-2 bg-[#79afed] text-white font-semibold hover:bg-[#00478a] rounded-sm w-full">
          <Link href="/friocalor/solicitar">PAGAR</Link>
        </button>
      </div>
      <button className=" flex justify-center py-2 my-2 bg-[#3184e4] text-white font-semibold hover:bg-[#00478a] rounded-sm w-11/12 lg:w-3/5">
        <Image
          src="/credit-card.svg"
          width={33}
          height={25}
          alt={tarjeta}
          className="mr-2"
        ></Image>
        <Link href="/friocalor/solicitar">Adherirse al Débito Automático</Link>
      </button>
    </div>
  );
};

export default Payment;
