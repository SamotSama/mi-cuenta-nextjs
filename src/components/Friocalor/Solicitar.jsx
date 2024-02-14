"use client"

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FrioCalor = () => {
  const [dni, setDni] = useState("");
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("codigoCliente", `${localStorage.getItem("nroCta")}`);
      formData.append("idReparto", `${localStorage.getItem("ruta")}`);
      formData.append("descripcion", JSON.stringify([
        {
          descripcion: "solicitud_fc",
          domicilio: `${localStorage.getItem("direccion")}`
        }
      ]));
      formData.append("dniFrente", archivo1);
      formData.append("dniDorso", archivo2);
      formData.append("accion", "solicitud_fc");
  
      const response = await fetch(`https://${process.env.SERVER_IP}/micuenta/pedido/insertar_llamada/`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }});
  
      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      toast.success("Solicitud enviada correctamente");
      console.log("Solicitud POST exitosa");
    } catch (error) {
      toast.error("Error al enviar la solicitud");
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div className="my-2 flex flex-col items-center py-2 pb-80 text-start">
      <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Dispenser Frío - Calor
      </h2>
      <p className="text-xl font-medium text-[#707070]">
        Envío de documentación
      </p>
      <div className="m-2 flex w-11/12 flex-col rounded-md border-2 bg-white p-4 lg:w-2/6">
        <input
          type="number"
          name="dni"
          placeholder="Número de DNI"
          minLength="6"
          maxLength="8"
          required
          className="my-2 flex justify-center rounded-md bg-gray-100 py-2 placeholder:px-2 focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4]"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <div className="my-2 flex items-center justify-between py-2 text-sm font-medium text-[#707070]">
          <p>FRENTE DEL DNI</p>
          <label htmlFor="archivo1" className="custom-file-upload">
            Adjuntar foto{" "}
            <input
              type="file"
              id="archivo1"
              name="archivo1"
              accept=".jpg, .jpeg, .png"
              className="my-2 py-2 file:mr-4 file:rounded-md file:border-0
              file:bg-[#3184e4] file:px-4
              file:py-2 file:text-sm
              file:font-semibold file:text-white
              hover:file:bg-[#00478a]"
              onChange={(e) => setArchivo1(e.target.files[0])}
            />
          </label>
        </div>
        <div className="my-2 flex items-center justify-between py-2 text-sm font-medium text-[#707070]">
          <p>DORSO DEL DNI</p>
          <label htmlFor="archivo2" className="custom-file-upload">
            Adjuntar foto
            <input
              type="file"
              id="archivo2"
              name="archivo2"
              accept=".jpg, .jpeg, .png"
              className="my-2 py-2 file:mr-4 file:rounded-md file:border-0
              file:bg-[#3184e4] file:px-4
              file:py-2 file:text-sm
              file:font-semibold file:text-white
              hover:file:bg-[#00478a]"
              onChange={(e) => setArchivo2(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="my-2 w-11/12 rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a] lg:w-2/6"
        onClick={handleFormSubmit}
      >
        ENVIAR
      </button>
    </div>
  );
};

export default FrioCalor;
