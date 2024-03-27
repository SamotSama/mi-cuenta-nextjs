"use client";

import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

const ContactInfo = () => {
  const [empresaInfo, setEmpresaInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmpresa = async () => {
      try {
        const url = `https://${process.env.SERVER_IP}/micuenta/empresa/empresa`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const data = await response.json();

        // console.log("Data from API:", data);

        setEmpresaInfo(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getEmpresa();
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
        <div className="flex flex-col items-center pb-36">
          <h2 className="mb-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
            Contacto
          </h2>
          <div className="w-11/12">
            <table className="mx-auto table-auto rounded-md border-2 bg-white p-4 text-left">
              <tbody>
                <tr className="text-2xl font-medium text-[#3184e4]">
                  <td className="py-4 pl-2 lg:pr-60">{empresaInfo.nombre}</td>
                </tr>
                <tr className="border text-xs">
                  <td className="py-4 pl-2 lg:pr-32">CUIT</td>
                  <td className="py-4 font-bold text-[#3184e4] lg:pr-60">
                    {empresaInfo.cuit}
                  </td>
                </tr>
                <tr className="border text-xs">
                  <td className="py-4 pl-2 lg:pr-32">Dirección</td>
                  <td className="py-4 font-bold text-[#3184e4] lg:pr-60">
                    {empresaInfo.direccion}, {empresaInfo.localidad},{" "}
                    {empresaInfo.provincia}
                  </td>
                </tr>
                <tr className="border text-xs">
                  <td className="py-4 pl-2 lg:pr-32">Teléfono</td>
                  <td className="py-4 font-bold text-[#3184e4] lg:pr-60">
                    {empresaInfo.telefono}
                  </td>
                </tr>
                <tr className="text-xs">
                  <td className="py-4 pl-2 lg:pr-32">WhatsApp</td>
                  <td className="py-4 font-bold text-[#3184e4] lg:pr-60">
                    {empresaInfo.whatsapp}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
