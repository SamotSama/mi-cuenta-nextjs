"use client"

import { useEffect, useState } from 'react';
import axios from 'axios'; // Instala axios si aún no lo has hecho
import DatePicker from 'react-datepicker'; // Instala react-datepicker si aún no lo has hecho
import 'react-datepicker/dist/react-datepicker.css';
import NumberSpinner from 'react-spinners'; // Instala react-number-spinner si aún no lo has hecho
import { useRouter } from 'next/navigation';

const Pedido = () => {
  const [fotos, setFotos] = useState({});
  const [cantidades, setCantidades] = useState({});
  const [habilitarDiaHoy, setHabilitarDiaHoy] = useState(false);
  const [ocultarCalendario, setOcultarCalendario] = useState(false);
  const [disableDays, setDisableDays] = useState([]);
  const [feriados, setFeriados] = useState([]);
  const [fecha, setFecha] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [horario, setHorario] = useState('');
  const [response, setResponse] = useState({});
  const [cantidadTotal, setCantidadTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud para obtener datos desde el servidor
        const serverIp = process.env.NEXT_PUBLIC_SERVER_IP; // Asigna la dirección del servidor
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN; // Asigna el token de acceso
        const { data } = await axios.get(
          `https://${serverIp}/micuenta/producto/imagen/${producto.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const imagen = `data:image/png;base64,${Buffer.from(
          data,
          'binary'
        ).toString('base64')}`;

        setFotos((prevFotos) => ({ ...prevFotos, [producto.id]: imagen }));
      } catch (error) {
        console.error('Error al obtener la imagen del producto', error);
      }
    };

    // Iterar sobre los productos para obtener las imágenes
    productos.forEach((producto) => fetchData());
  }, [productos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud para obtener datos desde el servidor
        const serverIp = process.env.NEXT_PUBLIC_SERVER_IP; // Asigna la dirección del servidor
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN; // Asigna el token de acceso
        const { data } = await axios.get(
          `https://${serverIp}/micuenta/pedido/opcionespedido/${ruta}/${diaSemana}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setResponse(data);
      } catch (error) {
        console.error('Error al obtener opciones de pedido', error);
      }
    };

    fetchData();
  }, [ruta, diaSemana]);

  const handleFechaChange = (date) => {
    setFecha(date);
    // Resto del código relacionado con la fecha
  };

  const handleNumberSpinnerChange = (value, id) => {
    // Manejar cambios en el NumberSpinner y actualizar la cantidad
    setCantidades((prevCantidades) => ({ ...prevCantidades, [id]: value }));

    // Calcular la cantidad total
    let total = 0;
    Object.values(cantidades).forEach((cantidad) => (total += parseInt(cantidad) || 0));
    setCantidadTotal(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar acciones necesarias al enviar el formulario
    // ...

    // Redirigir a la página de resumen de pedidos
    router.push(`/pedidos-resumen?nc=${rand}`);
  };

  return (
    <div className="container pb-4">
      {/* Resto del código JSX */}
      <form onSubmit={handleSubmit} id="formulario" method="post">
        {/* Resto del código JSX */}
      </form>
    </div>
  );
};

export default Pedido;