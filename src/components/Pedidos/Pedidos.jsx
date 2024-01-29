"use client";

import { useState, useEffect } from "react";
import { DatePicker, Button, Modal, ConfigProvider } from "antd";
import Redirect from "@/components/Redirect/Redirect";
import { useSession } from "next-auth/react";
import locale from "antd/es/locale/es_ES";
import dayjs from "dayjs";

const MarketComponent = () => {
  const [cantidad, setCantidad] = useState([]);
  const [fechaEntrega, setFechaEntrega] = useState(null);
  const [productos, setProductos] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onCantidadChange = (index, change) => {
    setCantidad((prevCantidad) => {
      const newCantidad = [...prevCantidad];
      newCantidad[index] = Math.max(
        0,
        newCantidad[index] + parseInt(change, 10),
      );
      return newCantidad;
    });
  };

  const handleDateChange = (date) => {
    setFechaEntrega(date);
  };

  const handleConfirmDate = () => {
    setShowDatePicker(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/productos");
        const data = await response.json();

        if (response.ok) {
          setProductos(data.sort((a, b) => a.orden - b.orden));
          setCantidad(Array(data.length).fill(0));
        } else {
          console.error("Error al obtener los productos:", data.error);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchProducts();
  }, []);

  const { data: session } = useSession();

  if (!session) {
    // Manejar el caso en el que el usuario no está autenticado
    return <Redirect />;
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Pedidos
      </h2>
      <div>
        <ConfigProvider
          locale={locale}
          theme={{
            components: {
              Modal: {
                titleFontSize: 20,
                titleColor: "#3184e4",
              },
              DatePicker: {
                activeBgColor: "#0000000a",
              },
            },
            token: {
              colorIcon: "#3184e4",
              colorIconHover: "#00478a",
            },
          }}
        >
          <Button onClick={() => setShowDatePicker(true)}>
            Seleccione la fecha
          </Button>
          <Modal
            title="Seleccione la fecha"
            contentBg="#3184e4"
            visible={showDatePicker}
            onOk={handleConfirmDate}
            onCancel={() => setShowDatePicker(false)}

          >
            <DatePicker
              value={fechaEntrega}
              disabledDate={disabledDate}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
            />
          </Modal>
        </ConfigProvider>
      </div>
      <div className="mb-24 grid grid-cols-2 justify-center lg:my-1 lg:w-3/4 lg:grid-cols-4">
        {productos.map((producto, index) => (
          <div
            className="grid-row m-2 mb-2 grid justify-center rounded-xl bg-white p-2 text-center shadow-xl lg:mb-2"
            key={producto.orden}
          >
            <div className="producto flex flex-col items-center">
              <img
                src={producto.imagenes.url}
                alt={producto.nombre}
                className="py-8"
              />
              <h3 className="text-sm font-semibold text-[#3184e4]">
                {producto.nombre} ({producto.presentacion.nombre})
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
                    onCantidadChange(index, event.target.value)
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
    </div>
  );
};

export default MarketComponent;