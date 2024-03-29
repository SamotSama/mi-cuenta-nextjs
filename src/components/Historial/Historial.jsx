"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

// FETCH PARA DESCARGAS DE FACTURAS Y RECIBOS

const downloadInvoice = async (tipo, codigo, numero) => {
  try {
    const response = await fetch(
      `https://${process.env.SERVER_IP}/micuenta/report/comprobante_get_${tipo}?codmov=${codigo}&nromov=${numero}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch invoice");
    }

    const blob = await response.blob();

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${codigo}-${numero}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading invoice:", error);
  }
};

// FETCH PARA OBTENCION DE ANALISIS DE CUENTA

const downloadAnalysis = async () => {
  try {
    const response = await fetch(
      `https://${process.env.SERVER_IP}/micuenta/report/comprobante_get_analisiscta?nrocta=${localStorage.getItem("nroCta")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch analysis");
    }

    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Analisis-Cuenta-${localStorage.getItem("nroCta")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading invoice:", error);
  }
};

const Historial = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facturaInfo, setFactura] = useState([]);
  const [tipo, setTipo] = useState([]); // Set your initial values here
  const [codigo, setCodigo] = useState("your-codigo");
  const [numero, setNumero] = useState("your-numero");

  const handleDownload = (codigo, numero) => {
    const tipo = "factura"; // Supongo que siempre estás descargando una factura aquí
    downloadInvoice(tipo, codigo, numero);
  };
  const handleDownload2 = (codigo, numero) => {
    const tipo = "recibo"; // Supongo que siempre estás descargando una factura aquí
    downloadInvoice(tipo, codigo, numero);
  };

  const handleAnalysis = (codigo, numero) => {
    downloadAnalysis();
  };

  // FETCH PARA OBTENCION DE DAT0S Y MOVIMIENTOS DEL USUARIO

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

        setTipo(info);

        // console.log("Data from API:", info.tipoCliente);

        if (Array.isArray(info.ultimasComprasDTOList)) {
          setUserInfo(info.ultimasComprasDTOList);
          setLoading(false);
          setFactura(info.facturaList);
          setRemito(info.comprobanteDeudaDTOS);
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
        <div className="mt-2 flex flex-col items-center mb-12 lg:pb-1">
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
                    <td className="py-4 pl-2 font-semibold text-[#3184e4] lg:lg:pr-32">
                      {visit.itemTotal > 0
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
          {tipo.tipoCliente === "2" && (
            <div className="mt-6 w-[95%]">
              <table className="mx-auto w-[95%] table-auto rounded-md border-2 bg-white p-4 text-left lg:max-w-6xl">
                <tbody>
                  <tr className="text-2xl font-medium text-[#3184e4]">
                    <td className="py-4 pl-2 lg:pr-60">Últimas facturas</td>
                  </tr>
                  {facturaInfo
                    .filter((factura) => factura.documento.startsWith("A"))
                    .map((factura, index) => {
                      const [codigo, numero] = factura.documento.split(" ");
                      return (
                        <tr className="border text-xs" key={index}>
                          <td className="flex py-4 pl-2 font-semibold text-[#00478a] lg:lg:pr-32">
                            <button
                              onClick={() => handleDownload(codigo, numero)}
                              className="flex"
                            >
                              <Image
                                src="/file-arrow-down-solid.svg"
                                width={12}
                                height={16}
                                alt="download-file"
                                className="mr-2"
                              />
                              Fact. {factura.documento}
                            </button>
                          </td>
                          <td className="text-grey-500 py-4 font-medium lg:pr-60">
                            {factura.fecha}
                          </td>
                          <td className="py-4 pl-2 font-bold text-[#3184e4] lg:lg:pr-32">
                            ${factura.importe}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
          {tipo.tipoCliente === "2" && (
            <div className="mt-6 w-[95%]">
              <table className="mx-auto w-[95%] table-auto rounded-md border-2 bg-white p-4 text-left lg:max-w-6xl">
                <tbody>
                  <tr className="text-2xl font-medium text-[#3184e4]">
                    <td className="py-4 pl-2 lg:pr-60">Últimos recibos</td>
                  </tr>
                  {facturaInfo
                    .filter(
                      (factura) =>
                        factura.documento.startsWith("R") ||
                        factura.documento.startsWith("N"),
                    )
                    .map((factura, index) => {
                      const [codigo, numero] = factura.documento.split(" ");
                      return (
                        <tr className="border text-xs" key={index}>
                          <td className="flex py-4 pl-2 font-semibold text-[#00478a] lg:lg:pr-32">
                            <Image
                              src="/file-arrow-down-solid.svg"
                              width={12}
                              height={16}
                              alt="download-file"
                              className="mr-2"
                            />
                            <button
                              onClick={() => handleDownload2(codigo, numero)}
                              className="flex"
                            >
                              {factura.documento}{" "}
                            </button>
                          </td>
                          <td className="text-grey-500 py-4 font-medium lg:pr-60">
                            {factura.fecha}
                          </td>
                          <td className="py-4 pl-2 font-bold text-[#3184e4] lg:lg:pr-32">
                            ${factura.importe}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
          {tipo.tipoCliente === "2" && (
            <button
              className="mt-4 flex w-11/12 items-center justify-center rounded-sm bg-[#3184e4] p-2 font-bold text-white hover:bg-[#00478a] lg:w-3/5"
              onClick={() => handleAnalysis()}
            >
              <Image
                src="/cloud-arrow-down-solid.svg"
                width={30}
                height={30}
                alt="download"
                className="mr-2"
              />
              Descargar Análisis de Cuenta
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Historial;
