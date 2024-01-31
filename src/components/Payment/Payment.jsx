"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

const Payment = () => {
  const [fecha] = useState(new Date());
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `https://${process.env.SERVER_IP}/micuenta/usuarios/movimiento/164792/aaa`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const info = await response.json();

        console.log("Data from API:", info);

        setUserInfo(info);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <BounceLoader
          color={"#3184e4"}
          loading={loading}
          size={150}
          className="mx-auto mt-80 flex items-center justify-center py-56"
        />
      ) : (
        <div className="flex flex-col items-center pb-16 pt-4">
          <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
            Realizar un pago
          </h2>
          <div className="flex w-11/12 items-center justify-evenly rounded-md border-2 bg-white p-5 lg:w-3/5">
            <Image src="/saldo.svg" width={65} height={75} alt="saldo"></Image>
            <p className="text-sm font-medium text-gray-500">
              Tu saldo al{" "}
              {fecha.toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="text-xl font-medium text-[#3184e4]">
              ${userInfo.saldo}
            </p>
          </div>
          <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 lg:w-3/5">
            <h3 className="p-2 text-2xl font-medium text-[#3184e4]">
              ¿Qué deseas pagar?
            </h3>
            <hr className="m-2 border" />
            <div className="flex items-center justify-center p-2 text-2xl font-medium text-[#3184e4]">
              <p className="mr-2">$</p>
              <input
                type="number"
                name="monto"
                placeholder="Ingresá el monto"
                required
                className="my-2 flex w-1/4 justify-center rounded-md bg-gray-100 py-2 placeholder:px-2 focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4]"
              ></input>
            </div>
          </div>
          <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 lg:w-3/5">
            <h3 className="p-2 text-2xl font-medium text-[#3184e4]">
              Forma de pago
            </h3>
            <hr className="m-2 border" />
            <div className="flex justify-center font-medium text-[#3184e4]">
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
          <div className="my-4 w-11/12 rounded-md border-2 bg-white p-4 lg:w-3/5">
            <button className="my-2 flex w-full justify-center rounded-sm bg-[#79afed] p-2 font-semibold text-white hover:bg-[#00478a]">
              <Link href="/friocalor/solicitar">PAGAR</Link>
            </button>
          </div>
          <button className=" my-2 flex w-11/12 justify-center rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a] lg:w-3/5">
            <Image
              src="/credit-card.svg"
              width={33}
              height={25}
              className="mr-2"
              alt="tarjeta-de-credito"
            ></Image>
            <Link href="/friocalor/solicitar">
              Adherirse al Débito Automático
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
