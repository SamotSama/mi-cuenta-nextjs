"use client";

import { useState, useEffect } from "react";
import { DatePicker, Button, Modal, ConfigProvider } from "antd";
import Redirect from "@/components/Redirect/Redirect";
import { useSession } from "next-auth/react";
import locale from "antd/es/locale/es_ES";
import dayjs from "dayjs";
import { BounceLoader } from "react-spinners";

const MarketComponent = () => {
  const [cantidad, setCantidad] = useState([]);
  const [fechaEntrega, setFechaEntrega] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);

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
    Modal.info({
      title: "Seleccione la fecha",
      centered: true,
      content: (
        <DatePicker
          locale={locale}
          value={fechaEntrega}
          disabledDate={disabledDate}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
        />
      ),
      onOk: handleConfirmDate,
      onCancel: () => setShowDatePicker(false),
      className: "text-[#3184e4]", // You can add a custom class for additional styling
    });
  }, []);

  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `https://${process.env.SERVER_IP}/micuenta/producto/todos`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const info = await response.json();

        console.log("Data from API:", info);

        if (Array.isArray(info.data)) {
          setProductsInfo(info.data);
          setLoading(false);
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
                <div className="producto flex flex-col items-center">
                  <img
                    src={producto.imagen.url}
                    alt="foto_producto"
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
      )}
    </div>
  );
};

export default MarketComponent;
