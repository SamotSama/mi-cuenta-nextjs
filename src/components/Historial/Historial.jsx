"use client";

import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

const FrioCalor = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `https://${process.env.SERVER_IP}/micuenta/usuarios/movimiento/${localStorage.getItem("nroCta")}/aaa`;

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
          setLoading(false);
        } else {
          console.error("Data received is not an array:", info);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        <div className="mt-2 flex flex-col items-center pb-28 lg:pb-1">
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
                      {visit.compro === "S"
                        ? visit.itemsDTOList.map((item, idx) => (
                            <div key={idx}>
                              {item.cantidad} {item.descripcion}
                            </div>
                          ))
                        : visit.motivo}
                    </td>
                    <td className="py-4 pl-2 font-medium text-gray-500 lg:lg:pr-32">
                      {visit.compro === "S"
                        ? `El total es de $${visit.itemTotal}`
                        : ""}
                      {visit.pago > 0 && (
                        <div className="text-gray-500">
                          Hiciste un pago de{" "}
                          <span className="font-bold text-gray-500">
                            ${visit.pago}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrioCalor;
