"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BounceLoader } from "react-spinners";

const Perfil = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [disableUpdate, setDisableUpdate] = useState(false);

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

        setUserInfo(info);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (userInfo.nro_cuentas_hijas && userInfo.nro_cuentas_hijas.length > 1) {
      userInfo.nro_cuentas_hijas.forEach((cuenta) => {
        if (
          localStorage.getItem("nroCta") === cuenta.nroCta &&
          !cuenta.esCtaMadre
        ) {
          setDisableUpdate(true);
        }
      });
    }
  }, [userInfo]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      formData.set("codigoCliente", userInfo.codigoCliente);
      formData.set("idReparto", userInfo.idReparto);
      formData.set(
        "descripcion",
        JSON.stringify({
          nombre: formData.get("nombre"),
          email: formData.get("email"),
          direccion: formData.get("direccion"),
          dni: formData.get("dni"),
          fechaNacimiento: formData.get("fechNac"),
          telefono: formData.get("telefono"),
          movil: formData.get("celular"),
        }),
      );
      formData.set("accion", "actualizar_perfil");

      const response = await fetch(
        `https://${process.env.SERVER_IP}/micuenta/pedido/insertar_llamada/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      toast.success("Perfil actualizado correctamente");
      console.log("Solicitud POST exitosa");
    } catch (error) {
      toast.error(error.message);
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const formatDate = (inputDate) => {
    // Convierte la fecha al formato YYYY-MM-DD
    const [day, month, year] = inputDate.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <BounceLoader
          color={"#3184e4"}
          loading={loading}
          size={150}
          className="mx-auto mt-80 flex items-center justify-center py-56"
        />
      ) : (
        <div className="my-2 flex flex-col items-center py-2 pb-20 text-start lg:pb-1">
          <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
            Perfil
          </h2>
          <div className="flex w-full flex-col items-center">
            <div className="my-2 mt-2 flex w-11/12 flex-col justify-center rounded-md border-2 bg-white p-4 py-2 sm:w-4/12">
              <h3 className="mb-2 pb-2 text-2xl font-medium text-[#3184e4]">
                Mis Datos
              </h3>
              <hr className="border" />
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">Nombre</p>
                <input
                  type="text"
                  name="nombre"
                  placeholder={""}
                  defaultValue={userInfo.nombre}
                  required
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">Email</p>
                <input
                  type="email"
                  name="email"
                  defaultValue={userInfo.mail}
                  placeholder={""}
                  required
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">Dirección</p>
                <input
                  type="text"
                  name="direccion"
                  defaultValue={userInfo.direccion}
                  placeholder={""}
                  required
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">DNI / CUIT</p>
                <input
                  type="text"
                  name="dni"
                  defaultValue={userInfo.dniCuit}
                  placeholder={""}
                  required
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">
                  Fecha de Nacimiento
                </p>
                <input
                  type="date"
                  name="fechNac"
                  defaultValue={formatDate(userInfo.fechanNacimiento)}
                  placeholder={""}
                  required
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100 py-2 text-gray-500 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">Teléfono Fijo</p>
                <input
                  type="number"
                  name="telefono"
                  defaultValue={userInfo.telefono}
                  placeholder={""}
                  required
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100 py-2 text-gray-500 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">Celular</p>
                <input
                  type="text"
                  name="celular"
                  defaultValue={userInfo.movil}
                  placeholder={""}
                  required
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <button
                type="submit"
                className="my-2 w-full rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a]"
                onClick={handleFormSubmit}
              >
                GUARDAR
              </button>
            </div>
            <div className="m-4 flex flex-col justify-center rounded-md border-2 bg-white p-4 sm:w-4/12 lg:mb-16">
              <h3 className="mb-2 pb-2 text-2xl font-medium text-[#3184e4]">
                Seguridad
              </h3>
              <hr className="border" />
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">Contraseña</p>
                <input
                  type="password"
                  name="password"
                  defaultValue={userInfo.idCliente}
                  placeholder={
                    disableUpdate ? "*********" : "Ingrese su contraseña"
                  }
                  required
                  disabled={disableUpdate}
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="my-1 font-medium text-[#3184e4]">
                  Confirme Contraseña
                </p>
                <input
                  type="password"
                  name="confirmPassword"
                  defaultValue={userInfo.idCliente}
                  placeholder={
                    disableUpdate ? "*********" : "Confirme su contraseña"
                  }
                  required
                  disabled={disableUpdate}
                  className="input my-2 w-3/5 rounded-md border-2 bg-gray-100  py-2 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                />
              </div>
              <button
                type="submit"
                className="my-2 w-full rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a]"
                onClick={handleFormSubmit}
              >
                GUARDAR 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
