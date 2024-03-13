"use client";

import { useState, useEffect, useRef } from "react";
import { DatePicker, Button, Modal, ConfigProvider, Drawer } from "antd";
import locale from "antd/es/locale/es_ES";
import dayjs from "dayjs";
import { BounceLoader } from "react-spinners";

const ResumenPedido = ({ productos, cantidades }) => {
  // Función para calcular el total del pedido
  const calcularTotal = () => {
    let total = 0;
    productos.forEach((producto, index) => {
      const precio = parseFloat(producto.precio);
      const cantidad = parseInt(cantidades[index]);
      if (!isNaN(precio) && !isNaN(cantidad)) {
        total += precio * cantidad;
      }
    });
    return total;
  };

  return (
    <div>
      {productos.map((producto, index) => (
        <div key={producto.id}>
          {cantidades[index] > 0 && (
            <div>
              <p className="py-4 pl-2 font-semibold lg:lg:pr-32">
                {producto.nombre} - Cantidad: {cantidades[index]} - Total: $
                {producto.precio * cantidades[index]}
              </p>
            </div>
          )}
        </div>
      ))}
      <p className="py-4 pl-2 font-semibold text-[#3184e4] lg:lg:pr-32">Total del pedido: ${calcularTotal()}</p>
    </div>
  );
};

const MarketComponent = () => {
  const [cantidad, setCantidad] = useState([]);
  const [fechaEntrega, setFechaEntrega] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [carritoCambiado, setCarritoCambiado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [productsInfo, setProductsInfo] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState([]);

  // FETCH PARA OBTENER LOS PRODUCTOS DISPONIBLES POR REPARTO Y NROCTA

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

          setProductos(info.data);
          setCantidades(info.data.map(() => 0));

          setFechaEntrega(info.fechaEntrega);

          setModalVisible(true);
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

  const handleConfirmDate = () => {
    setModalVisible(false);
  };

  // LOGICA DEL DATEPICKER

  const datePickerRef = useRef();

  useEffect(() => {
    if (modalVisible) {
      Modal.info({
        title: "Seleccione la fecha",
        centered: true,
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
              onOk={handleConfirmDate}
              className="flex flex-col justify-center"
              format="DD/MM/YYYY"
            />
          </ConfigProvider>
        ),
        onCancel: () => {
          setModalVisible(false);
        },
        className: "text-[#3184e4]",
      });
    }
  }, [modalVisible, fechaEntrega]);

  // LOGICA DE LA TIENDA DE PRODUCTOS

  useEffect(() => {
    if (productsInfo.length > 0) {
      setCantidad(productsInfo.map(() => 0));
      setCarrito(productsInfo.map(() => ({ cantidad: 0, total: 0 })));
    }
  }, [productsInfo]);

  const onCantidadChange = (index, change) => {
    setCantidad((prevCantidad) => {
      const newCantidad = [...prevCantidad];
      newCantidad[index] = Math.max(0, newCantidad[index] + parseInt(change, 10));
  
      const updatedCarrito = [...carrito];
      updatedCarrito[index] = {
        ...productsInfo[index],
        cantidad: newCantidad[index],
        total: newCantidad[index] * productsInfo[index].precio,
      };
  
      setCarrito(updatedCarrito);
  
      if (!carritoCambiado && newCantidad[index] > 0) {
        setCarritoCambiado(true);
      }
  
      const updatedProductos = updatedCarrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
      }));
      const updatedCantidades = updatedCarrito.map((item) => item.cantidad);
  
      setProductos(updatedProductos);
      setCantidades(updatedCantidades);
  
      return newCantidad;
    });
  };

  const borrarCarrito = () => {
    setCantidades(Array(productsInfo.length).fill(0));
    setCarritoCambiado(false);
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

  // LOGICA DE DÍAS DISPONIBLES PARA EL REPARTO

  const disabledDate = (current) => {
    return current && (current < dayjs().startOf("day") || current.day() === 0);
  }; 

  // LOGICA PARA INSERTAR LLAMADA =>  REALIZAR PEDIDO

  const confirmarPedido = async () => {
    if (carritoCambiado && carrito.filter(item => item.cantidad > 0).length > 0) {
      try {
        const datosPedido = {
          codigoCliente: localStorage.getItem("movimientosIdCliente"),
          fechaPedido: fechaEntrega,
          idReparto: localStorage.getItem("movimientosRuta"),
          descripcion: carrito.filter(item => item.cantidad > 0).map(item => ({
            codigo: item.id,
            cantidad: item.cantidad,
            precio: item.precio
          })),
          accion: 'pedido'
        };
  
        const response = await fetch(`https://${process.env.SERVER_IP}/micuenta/pedido/insertar_llamada`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          },
          body: JSON.stringify(datosPedido)
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          toast.success('Pedido realizado con éxito', { autoClose: 3000 });
          borrarCarrito();
        } else {
          toast.error('Error al realizar el pedido');
          console.error('Error al realizar el pedido:', responseData);
        }
      } catch (error) {
        toast.error('Error al realizar el pedido');
        console.error('Error al realizar el pedido:', error);
      }
    } else {
      toast.warning('No hay productos en el carrito');
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
              className="fixed bottom-0 z-10 mb-20 h-10 bg-[#3184e4] text-lg font-bold"
            >
              FINALIZAR PEDIDO
            </Button>
          )}

          <Drawer
            title="Resumen del Pedido"
            placement="right"
            onClose={onCloseCarritoDrawer}
            open={carritoVisible}
            width={400}
            footer={
              <div style={{ textAlign: 'right' }}>
                <Button onClick={borrarCarrito} style={{ marginRight: 8 }}>Cancelar</Button>
                <Button onClick={confirmarPedido} type="primary" className="bg-[#3184e4] font-semibold text-white">Confirmar</Button>
              </div>
            }
          >
            <ResumenPedido productos={productos} cantidades={cantidades} />
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default MarketComponent;
