"use client";

import React, { useState, useEffect } from "react";
import { Modal, Radio, Space, Input, ConfigProvider, Form, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import locale from "antd/es/locale/es_ES";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
const { TextArea } = Input;

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalFormVisible, setModalFormVisible] = useState(false);

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
      enviarDiaReparto(selectedDay, comentarioInput).then(() => {
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
    // Aquí puedes agregar lógica adicional para enviar los datos del formulario al servidor
    setModalFormVisible(false);
  };

  const [comentarioInput, setComentario] = useState("");


  const enviarDiaReparto = async (nombreDia, comentarioInput) => {
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
          descripcion: [{
            nombreSemana: nombreDia,
            comentario: comentarioInput,
          }],
          accion: "cambio_visita",
        }),
      });
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
  
      // Mostrar un toast de éxito
      toast.success("Solicitud de cambio de día de reparto enviada correctamente", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
      });
  
      // Aquí puedes manejar la respuesta del servidor según sea necesario
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
  
      // Mostrar un toast de error
      toast.error("Error al enviar la solicitud", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
      });
    }
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
            <p className="mr-5 text-center text-xl font-medium text-[#3184e4]">
              ${userInfo.saldo}
            </p>
            <button className="flex justify-center rounded-sm bg-[#3184e4] px-2 py-2 text-xs font-semibold text-white hover:bg-[#00478a] lg:mr-32">
              <Link href="/dashboard/pagar">PAGAR</Link>
            </button>
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
              <Link
                href="/dashboard/pagar"
                className="my-2 flex justify-center rounded-sm bg-[#00478a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3184e4]"
              >
                <button className="flex items-center">
                  <Image
                    src="/camion.svg"
                    width={35}
                    height={23}
                    alt="camion"
                  ></Image>
                  <p className="ml-3">REPETIR ÚLTIMO PEDIDO</p>
                </button>
              </Link>
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
                    visible={modalVisible}
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
                      value={comentarioInput}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                    <Button
                      type="primary"
                      className="mt-4 w-[25vw] bg-[#3184e4] font-semibold text-white"
                      onClick={handleModalOk} // Cambiar el evento para llamar a handleModalOk
                    >
                      ENVIAR
                    </Button>
                  </Modal>

                  <Modal
                    title="Indicanos algunos datos de tu referido"
                    visible={modalFormVisible}
                    onCancel={() => setModalFormVisible(false)}
                    centered
                    footer={null}
                  >
                    <Space
                      direction="vertical"
                      size="large"
                      align="center"
                      className="w-[25vw]"
                    >
                      <Space.Compact>
                        <Input
                          style={{ width: "25vw" }}
                          addonBefore="Nombre"
                          allowClear
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          style={{ width: "25vw" }}
                          addonBefore="Email"
                          allowClear
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          style={{ width: "25vw" }}
                          addonBefore="Celular"
                          allowClear
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          style={{ width: "25vw" }}
                          addonBefore="Dirección"
                          allowClear
                        />
                      </Space.Compact>
                      <Space.Compact>
                        <Input
                          style={{ width: "25vw" }}
                          addonBefore="Localidad"
                          allowClear
                        />
                      </Space.Compact>
                      <Button
                        type="primary"
                        className="w-[25vw] bg-[#3184e4] font-semibold text-white"
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
