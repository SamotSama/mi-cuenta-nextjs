"use client"

import { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";


const MarketComponent = () => {
  const [cantidad, setCantidad] = useState([]);
  const [fechaEntrega, setFechaEntrega] = useState(null);
  const [productos, setProductos] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onCantidadChange = (index, change) => {
    setCantidad((prevCantidad) => {
      const newCantidad = [...prevCantidad];
      newCantidad[index] = Math.max(0, newCantidad[index] + parseInt(change, 10));
      return newCantidad;
    });
  };

  const handleDateChange = (date) => {
    setFechaEntrega(date);
  };

  const handleConfirmDate = () => {
    setShowDatePicker(false);
    // Aquí podrías hacer la carga de productos con la fecha seleccionada
    // Puedes usar la fecha en el estado fechaEntrega para hacer la solicitud a la API
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/productos"); // Reemplaza 'tu_ruta' con la ruta correcta
        const data = await response.json();

        if (response.ok) {
          setProductos(data);
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
  

  return (
    <div className="container flex flex-col items-center mx-auto">
      <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mx-2 px-4 py-2">
        Pedidos
      </h2>
      {!showDatePicker && (
        <Button onClick={() => setShowDatePicker(true)}>Elegir Fecha</Button>
      )}
      {showDatePicker && (
        <div>
          <DatePicker
            value={fechaEntrega}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
          />
          <Button onClick={handleConfirmDate}>Confirmar Fecha</Button>
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:w-3/4 justify-center mb-24">
        {productos.map((producto, index) => (
          <div
            className="grid grid-row text-center justify-center bg-white shadow-xl p-2 m-2 rounded-xl mb-2 lg:mb-2"
            key={index}
          >
            <div className="producto flex flex-col items-center">
              <img
                src={producto.imagenes.url}
                alt={producto.nombre}
                className="py-8"
              />
              <h3 className="text-sm text-[#3184e4] font-semibold">
                {producto.nombre} ({producto.presentacion.nombre})
              </h3>
              <hr className="m-2 border w-full" />
              <p className="text-xl text-[#3184e4] font-medium">
                ${producto.precio}
              </p>
              <div className="flex">
                <button
                  type="button"
                  className="text-4xl font-bold text-center text-gray-500 mx-5"
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
                  className="w-14 py-2 text-3xl font-bold text-center text-gray-500 mx-5 input my-2 rounded-md focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
                />
                <button
                  type="button"
                  className="text-4xl font-bold text-center text-gray-500 mx-2"
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
