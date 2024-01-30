"use client";

import React, { useState, useEffect } from "react";

const FrioCalor = () => {
  const [userInfo, setUserInfo] = useState([]);

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

        if (Array.isArray(info.ultimasComprasDTOList)) {
          setUserInfo(info.ultimasComprasDTOList);
        } else {
          console.error("Data received is not an array:", info);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="mt-2 flex flex-col items-center pb-96">
      <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Historial
      </h2>
      <div className="w-[95%]">
        <table className="mx-auto w-[95%] table-auto rounded-md border-2 bg-white p-4 text-left lg:max-w-6xl">
          <tbody>
            <tr className="text-2xl font-medium text-[#3184e4]">
              <td className="py-4 pl-2 lg:pr-60">Visitas</td>
            </tr>
            {userInfo.map((visit, index) => (
              <tr className="border text-xs" key={index}>
                <td className="py-4 pl-2 font-medium lg:lg:pr-32">
                  {visit.fecha_horario}
                </td>
                <td className="py-4 font-bold text-[#3184e4] lg:pr-60">
                  cantidad
                </td>
                <td className="py-4 pl-2 lg:lg:pr-32">{visit.itemsDTOList.pu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrioCalor;
