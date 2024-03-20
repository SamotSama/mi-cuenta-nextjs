"use client";

import React, { useState, useEffect } from "react";
import { Modal, Radio, Space, Input, ConfigProvider, Form, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import locale from "antd/es/locale/es_ES";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
const { TextArea } = Input;
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState("");

  // FETCH PARA OBTENCION DE DAT0S DEL USUARIO

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

        localStorage.setItem("reparto", info.ruta);
        localStorage.setItem("direccion", info.direccion);
        localStorage.setItem("friocalor", info.servicioFrioCalor);

        setUserInfo(info);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleModalClick = () => {
    setModalVisible(true);
  };

  const handleModalFormClick = () => {
    setModalFormVisible(true);
  };

  const handleModalOk = () => {
    if (selectedDay) {
      enviarDiaReparto(selectedDay, comentario).then(() => {
        setModalVisible(false);
      });
    } else {
      setModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Formulario enviado:", values);

    setModalFormVisible(false);
  };

  const [comentario, setComentario] = useState("");

  // POSTEO PARA INSERTAR LLAMADA => CAMBIO DE DIA DE REPARTO

  const enviarDiaReparto = async (nombreDia, comentario) => {
    try {
      const url = `https://${process.env.SERVER_IP}/micuenta/pedido/insertar_llamada`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          codigoCliente: `${localStorage.getItem("nroCta")}`,
          idReparto: `${localStorage.getItem("reparto")}`,
          descripcion: [{ nombreSemana: nombreDia, comentario }],
          accion: "cambio_visita",
        }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      toast.success(
        "Solicitud de cambio de día de reparto enviada correctamente",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        },
      );
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);

      toast.error("Error al enviar la solicitud", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  };

  // POSTEO DE RECOMENDACION DE CLIENTE

  const handleSubmit = async () => {
    const datos = {
      nroCta: `${localStorage.getItem("nroCta")}`,
      nombre,
      email,
      direccion,
      localidad,
      movil: celular,
      urlRecomendar: `${localStorage.getItem("url")}`,
    };

    const cuerpoCorreo = `Si entras aca ${datos.urlRecomendar + datos.nroCta}, tendrás tus primeros 12 Litros de regalo. ¡Aprovéchalo!`;

    datos.subject = "Hacete cliente de IVESS. ¡Te lo recomiendo! 😍💧";
    datos.content = cuerpoCorreo;
    datos.to = email;
    datos.masInfo = `Nombre:${nombre} Mail:${email} Cel:${celular} Direccion: ${direccion} Localidad: ${localidad}`;

    try {
      const response = await fetch(
        `https://${process.env.SERVER_IP}/micuenta/email/sendEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(datos),
        },
      );

      if (response.status === 200) {
        toast.success("Correo enviado exitosamente");
        setModalFormVisible(false);
        setNombre("");
        setEmail("");
        setCelular("");
        setDireccion("");
        setLocalidad("");
      } else {
        toast.error("Error al enviar el correo");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast.error("Error al enviar el correo");
    }
  };

  // LOGICA PARA REPETIR ULTIMO PEDIDO

  const handleRepetirUltimoPedido = () => {
    const ultimaCompraString = JSON.stringify(userInfo.ultimaCompra);
    router.push(
      `/dashboard/pedido?ultimaCompra=${encodeURIComponent(ultimaCompraString)}`,
    );
  };

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
        <div className="flex flex-col items-center">
          <div className="my-4 flex w-11/12 items-center justify-between rounded-md border-2 bg-white p-5 lg:w-3/5">
            <Image
              src="/saldo.svg"
              width={65}
              height={75}
              alt="saldo"
              className="lg:ml-32"
            />
            <p className="text-center text-sm font-medium text-gray-500">
              Tu saldo al{" "}
              {new Date().toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="mr-5 text-center font-medium text-[#3184e4] lg:text-xl">
              ${userInfo.saldo}
            </p>
            {userInfo.saldo > 0 && (
              <button className="flex justify-center rounded-sm bg-[#3184e4] px-2 py-2 text-xs font-semibold text-white hover:bg-[#00478a] lg:mr-32">
                <Link href="/dashboard/pagar">PAGAR</Link>
              </button>
            )}
          </div>
          <div className="flex w-11/12 flex-col lg:w-3/5">
            <Image
              src="/banner-home.jpg"
              width={1280}
              height={230}
              alt="banner-home"
              className="hidden rounded-md lg:block"
            ></Image>
            <Image
              src="/banner-home-sm.jpg"
              width={1280}
              height={230}
              alt="banner-home-sm"
              className="rounded-md lg:hidden"
            ></Image>
          </div>
          <div className="flex w-11/12 flex-col lg:w-3/5 lg:flex-row lg:gap-8">
            <div className="flex flex-col justify-center lg:w-1/2">
              <Link
                href="/dashboard/pedido"
                className="my-4 flex justify-center rounded-sm bg-[#3184e4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00478a]"
              >
                <button className="flex items-center">
                  <Image
                    src="/camion.svg"
                    width={35}
                    height={23}
                    alt="camion"
                  ></Image>
                  <p className="ml-3">HACER PEDIDO</p>
                </button>
              </Link>
              <button
                className="my-2 flex justify-center rounded-sm bg-[#00478a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3184e4]"
                onClick={handleRepetirUltimoPedido}
              >
                <Image
                  src="/camion.svg"
                  width={35}
                  height={23}
                  alt="camion"
                ></Image>
                <p className="ml-3">REPETIR ÚLTIMO PEDIDO</p>
              </button>
              <div
                className="my-4 h-[11rem] rounded-sm bg-[#00478a] px-4 py-2 font-semibold text-white hover:bg-[#3184e4] lg:max-h-40"
                zindex={0}
              >
                <button onClick={handleModalFormClick}>
                  <h4 className="m-2 text-xl">¡Recomendar!</h4>
                  <p className="m-2 w-4/5 pt-2 text-sm lg:w-4/5">
                    ¡Por cada amigo que recomiendes, recibirán cada uno un
                    botellón de regalo! El regalo se efectuará cuando el
                    recomendado realice su primer compra.
                  </p>
                  <div className="relative -right-3 bottom-[4.6rem] flex flex-row-reverse lg:-right-3 lg:bottom-[5.3rem]">
                    <Image
                      src="/regalo.png"
                      width={105}
                      height={114}
                      alt="regalo"
                      className="hidden lg:flex"
                    ></Image>
                    <Image
                      src="/regalo.png"
                      width={73}
                      height={79}
                      alt="regalo-sm"
                      className="lg:hidden"
                    ></Image>
                  </div>
                </button>
              </div>
            </div>
            <div className="mb-20 flex max-h-60 flex-col justify-between rounded-md border-2 bg-white px-4 py-2 font-medium lg:mt-3 lg:w-1/2">
              <h4 className="pt-3 text-xl text-[#3184e4]">
                Tu dia de visita: {userInfo.diaSemana}
              </h4>
              <div className="flex flex-row items-center justify-between text-sm text-gray-500">
                <div className="flex items-center py-2">
                  <Image
                    src="/user-circle-regular.svg"
                    width={27}
                    height={27}
                    alt="usuario"
                  ></Image>
                  <p className="ml-2">{userInfo.nombre}</p>
                </div>
                <p>COD: {userInfo.idCliente}</p>
              </div>
              <div className="py-2 text-sm text-gray-500">
                <p>VENDEDOR: {userInfo.titularReparto}</p>
              </div>
              <div className="flex flex-col justify-between gap-6 pb-3 lg:flex-row">
                <Link
                  href="/dashboard/historial"
                  className="mr-2 flex w-full flex-col justify-center rounded-sm bg-[#00478a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3184e4]"
                >
                  <button>
                    <p>VER MI HISTORIAL</p>
                  </button>
                </Link>
                <div className="flex w-full flex-row justify-center rounded-sm bg-[#00478a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3184e4]">
                  <button onClick={handleModalClick}>
                    <p>CAMBIAR DÍA</p>
                  </button>
                </div>

                <ConfigProvider
                  locale={locale}
                  theme={{
                    components: {
                      Modal: {
                        titleFontSize: 20,
                        titleColor: "#3184e4",
                      },
                    },
                    token: {
                      colorIcon: "#3184e4",
                      colorIconHover: "#00478a",
                    },
                  }}
                >
                  <Modal
                    title="Indicanos el día que deseas la visita"
                    open={modalVisible}
                    onCancel={handleModalCancel}
                    centered
                    footer={null}
                  >
                    <Radio.Group
                      onChange={(e) => setSelectedDay(e.target.value)}
                      defaultValue={userInfo.diaSemana}
                    >
                      <Space direction="vertical">
                        <Radio value="Lunes">Lunes</Radio>
                        <Radio value="Martes">Martes</Radio>
                        <Radio value="Miercoles">Miércoles</Radio>
                        <Radio value="Jueves">Jueves</Radio>
                        <Radio value="Viernes">Viernes</Radio>
                        <Radio value="Sabado">Sábado</Radio>
                      </Space>
                    </Radio.Group>
                    <TextArea
                      rows={4}
                      placeholder="Comentarios adicionales"
                      className="mt-4"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                    <Button
                      type="primary"
                      className="mt-4 w-[25vw] bg-[#3184e4] font-semibold text-white"
                      onClick={handleModalOk}
                    >
                      ENVIAR
                    </Button>
                  </Modal>

                  <Modal
                    title="Indicanos algunos datos de tu referido"
                    open={modalFormVisible}
                    onCancel={() => setModalFormVisible(false)}
                    centered
                    footer={null}
                  >
                    <Space
                      direction="vertical"
                      size="large"
                      align="center"
                      className="w-[85vw] lg:w-[25vw]"
                    >
                      <Space.Compact>
                        <Input
                          className="w-[85vw] lg:w-[25vw]"
                          addonBefore="Nombre"
                          allowClear
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          className="w-[85vw] lg:w-[25vw]"
                          addonBefore="Email"
                          allowClear
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          className="w-[85vw] lg:w-[25vw]"
                          addonBefore="Celular"
                          allowClear
                          onChange={(e) => setCelular(e.target.value)}
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          className="w-[85vw] lg:w-[25vw]"
                          addonBefore="Dirección"
                          allowClear
                          onChange={(e) => setDireccion(e.target.value)}
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          className="w-[85vw] lg:w-[25vw]"
                          addonBefore="Localidad"
                          allowClear
                          onChange={(e) => setLocalidad(e.target.value)}
                        />
                      </Space.Compact>
                      <Button
                        type="primary"
                        className="mx-auto flex w-[85vw] justify-center bg-[#3184e4] font-semibold text-white lg:w-[25vw]"
                        onClick={handleSubmit}
                      >
                        ENVIAR
                      </Button>
                    </Space>
                  </Modal>
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
