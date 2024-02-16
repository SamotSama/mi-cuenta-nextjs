"use client";

import { useState, useEffect, useRef } from "react";
import { DatePicker, Button, Modal, ConfigProvider, Drawer } from "antd";
import locale from "antd/es/locale/es_ES";
import dayjs from "dayjs";
import { BounceLoader } from "react-spinners";

const MarketComponent = () => {
  const [cantidad, setCantidad] = useState([]);
  const [fechaEntrega, setFechaEntrega] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [carritoCambiado, setCarritoCambiado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `https://${process.env.SERVER_IP}/micuenta/producto/productosPrecioCte?reparto=${localStorage.getItem("reparto")}&codCliente=${localStorage.getItem("nroCta")}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const info = await response.json();

        if (Array.isArray(info.data)) {
          setProductsInfo(info.data);
          setLoading(false);

          setFechaEntrega(info.fechaEntrega);
          // Inicializar fechaEntrega con la fecha existente

          setModalVisible(true);
          // Abrir el modal una vez que los datos estén disponibles
        } else {
          console.error("Data received is not an array:", info);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const datePickerRef = useRef();

  useEffect(() => {
    if (modalVisible) {
      Modal.info({
        title: "Seleccione la fecha",
        centered: true,
        footer: (
          <Button
            key="submit"
            type="primary"
            className="mx-auto mt-2 flex flex-col justify-center bg-[#3184e4] text-center font-semibold"
            onClick={handleConfirmDate}
          >
            ACEPTAR
          </Button>
        ),
        content: (
          <ConfigProvider
            theme={{
              components: {
                DatePicker: {
                  cellHoverBg: "#3184e4",
                },
              },
            }}
          >
            <DatePicker
              locale={locale}
              value={fechaEntrega}
              disabledDate={disabledDate}
              onChange={handleDateChange}
              className="flex flex-col justify-center"
              format="DD/MM/YYYY"
            />
          </ConfigProvider>
        ),
        onOk: handleConfirmDate,
        onCancel: () => {
          setModalVisible(false);
        },
        className: "text-[#3184e4]",
      });
    }
  }, [modalVisible, fechaEntrega]);

  useEffect(() => {
    if (productsInfo.length > 0) {
      setCantidad(productsInfo.map(() => 0));
      setCarrito(productsInfo.map(() => ({ cantidad: 0, total: 0 })));
    }
  }, [productsInfo]);

  const onCantidadChange = (index, change) => {
    setCantidad((prevCantidad) => {
      const newCantidad = [...prevCantidad];
      newCantidad[index] = Math.max(
        0,
        newCantidad[index] + parseInt(change, 10),
      );

      // Actualizar el carrito
      const updatedCarrito = [...carrito];
      updatedCarrito[index] = {
        ...productsInfo[index],
        cantidad: newCantidad[index],
        total: newCantidad[index] * productsInfo[index].precio,
      };

      setCarrito(updatedCarrito);

      // Verificar si se ha cambiado el carrito
      if (!carritoCambiado && newCantidad[index] > 0) {
        setCarritoCambiado(true);
      }

      return newCantidad;
    });
  };

  const showCarritoDrawer = () => {
    setCarritoVisible(true);
  };

  const onCloseCarritoDrawer = () => {
    setCarritoVisible(false);
  };

  const handleDateChange = (date) => {
    setFechaEntrega(date);
  };

  const handleConfirmDate = () => {
    // Seleccionar la fecha del DatePicker utilizando la referencia
    if (datePickerRef.current) {
      const selectedDate = datePickerRef.current.picker.getDate();
      setFechaEntrega(selectedDate);
    }
    setModalVisible(false);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
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
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
            Pedidos
          </h2>
          <div className="mb-24 grid grid-cols-2 justify-center lg:my-1 lg:w-3/4 lg:grid-cols-4">
            {productsInfo.map((producto, index) => (
              <div
                className="grid-row m-2 mb-2 grid justify-center rounded-xl bg-white p-2 text-center shadow-xl lg:mb-2"
                key={producto.orden}
              >
                <div className="producto flex flex-col items-center justify-end">
                  <img
                    src={producto.imagen.url}
                    alt="foto_producto"
                    className=""
                  />
                  <h3 className="py-5 text-sm font-semibold text-[#3184e4]">
                    {producto.nombre}
                  </h3>
                  <hr className="m-2 w-full border" />
                  <p className="text-xl font-medium text-[#3184e4]">
                    ${producto.precio}
                  </p>
                  <div className="flex">
                    <button
                      type="button"
                      className="mx-5 text-center text-4xl font-bold text-gray-500"
                      onClick={() => onCantidadChange(index, -1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={cantidad[index]}
                      onChange={(event) =>
                        onCantidadChange(
                          index,
                          parseInt(event.target.value, 10),
                        )
                      }
                      className="input mx-5 my-2 w-14 rounded-md py-2 text-center text-3xl font-bold text-gray-500 focus:border-[#3184e4] focus:outline-none focus:ring-1 focus:ring-[#3184e4]"
                    />
                    <button
                      type="button"
                      className="mx-2 text-center text-4xl font-bold text-gray-500"
                      onClick={() => onCantidadChange(index, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Botón para abrir el carrito */}
          {carritoCambiado && (
            <Button
              type="primary"
              onClick={showCarritoDrawer}
              className="text-bold fixed bottom-0 z-10 mb-4 bg-[#3184e4] font-semibold"
            >
              FINALIZAR PEDIDO
            </Button>
          )}

          {/* Drawer para mostrar el carrito */}
          <Drawer
            title="Carrito de Compras"
            placement="bottom"
            onClose={onCloseCarritoDrawer}
            open={carritoVisible}
            height={300}
          >
            {carrito.map((producto, index) => (
              <div key={index}>
                <p>
                  {producto.nombre} - Cantidad: {producto.cantidad} - Total: $
                  {producto.total}
                </p>
              </div>
            ))}
            <p>
              Total del carrito: $
              {carrito.reduce((total, producto) => total + producto.total, 0)}
            </p>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default MarketComponent;
