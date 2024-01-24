"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

const FrioCalor = () => {
  const [dni, setDni] = useState("");
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear un objeto FormData para enviar archivos
      const formData = new FormData();
      formData.append("id", dni);
      formData.append("dnia", archivo1);
      formData.append("dnib", archivo2);

      // Realizar la solicitud POST al endpoint
      const response = await axios.post("/api/friocalor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div className="flex flex-col items-center text-start py-2 my-2 pb-80">
      <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mx-2 px-4 py-2">
        Dispenser Frío - Calor
      </h2>
      <p className="text-[#707070] font-medium text-xl">
        Envío de documentación
      </p>
      <div className="flex flex-col bg-white border-2 p-4 m-2 w-11/12 lg:w-2/6 rounded-md">
        <input
          type="number"
          name="dni"
          placeholder="Número de DNI"
          minLength="6"
          maxLength="8"
          required
          className="py-2 my-2 bg-gray-100 rounded-md placeholder:px-2 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-4"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <div className="flex items-center justify-between py-2 my-2 font-medium text-sm text-[#707070]">
          <p>FRENTE DEL DNI</p>
          <label htmlFor="archivo1" className="custom-file-upload">
            Adjuntar foto{" "}
            <input
              type="file"
              id="archivo1"
              name="archivo1"
              accept=".jpg, .jpeg, .png, .pdf"
              className="py-2 my-2 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#3184e4] file:text-white
              hover:file:bg-[#00478a]"
              onChange={(e) => setArchivo1(e.target.files[0])}
            />
          </label>
        </div>
        <div className="flex items-center justify-between py-2 my-2 font-medium text-sm text-[#707070]">
          <p>DORSO DEL DNI</p>
          <label htmlFor="archivo2" className="custom-file-upload">
            Adjuntar foto
            <input
              type="file"
              id="archivo2"
              name="archivo2"
              accept=".jpg, .jpeg, .png, .pdf"
              className="py-2 my-2 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#3184e4] file:text-white
              hover:file:bg-[#00478a]"
              onChange={(e) => setArchivo2(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="py-2 my-2 lg:w-2/6 w-11/12 bg-[#3184e4] text-white font-semibold hover:bg-[#00478a] rounded-sm"
        onClick={handleFormSubmit}
      >
        ENVIAR
      </button>
    </div>
  );
};

export default FrioCalor;
