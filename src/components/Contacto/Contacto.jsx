"use client";

import { useState, useEffect } from "react";

const ContactInfo = () => {
  const [empresaInfo, setEmpresaInfo] = useState([]);

  useEffect(() => {
    // Realizar la solicitud al servidor al montar el componente
    const getEmpresa = async () => {
      try {
        const url = `https://micuenta.somoselagua.com.ar/micuenta/empresa/empresa`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + btoa("micuentaApp:mobeus"), // token es el valor que recibiste al hacer el login
          },
        });

        const data = await response.json(); // data es el objeto con la información de la empresa
        return data;
      } catch (error) {
        console.error(error); // maneja el error como quieras
      }
    };

    getEmpresa(); // Llama a la función para realizar la solicitud
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez al montar el componente

  return (
    <div className="flex flex-col items-center pb-96">
      <h2 className="mb-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Contacto
      </h2>
      {Object.entries(empresaInfo).map(([key, value]) => (
        <div className="w-11/12" key={item.nombre}>
          <table className="mx-auto table-auto rounded-md border-2 bg-white p-4 text-left">
            <tbody>
              <tr className="text-2xl font-medium text-[#3184e4]">
                <td className="py-4 pl-2 lg:pr-60" key={item.nombre}>
                  {item.nombre}
                </td>
              </tr>
              <tr className="border text-xs">
                <td className="py-4 pl-2 lg:lg:pr-32">CUIT</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
                  key={item.cuit}
                >
                  {item.cuit}
                </td>
              </tr>
              <tr className="border text-xs">
                <td className="py-4 pl-2 lg:pr-32">Dirección</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
                  key={item.localidad}
                >
                  {item.direccion}, {item.localidad}, {item.provincia}
                </td>
              </tr>
              <tr className="border text-xs">
                <td className="py-4 pl-2 lg:pr-32">Teléfono</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
                  key={item.telefono}
                >
                  {item.telefono}
                </td>
              </tr>
              <tr className="text-xs">
                <td className="py-4 pl-2 lg:pr-32">WhatsApp</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
                  key={item.whatsapp}
                >
                  {item.whatsapp}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
export default ContactInfo;
