"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { Checkbox, Modal } from "antd";

const Payment = () => {
  const [fecha] = useState(new Date());
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // LOGICA PARA TIPO DE PAGO EN PPT

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "PAGO TIC") {
      setShowPaymentOptions(true);
    } else {
      setShowPaymentOptions(false);
    }
  };

  // LOGICA PARA ELEGIR LAS FACTURAS A PAGAR

  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [paymentType, setPaymentType] = useState({});

  const handleInvoiceSelection = (documento, saldo, checked) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, { documento, saldo }]);
      setPaymentType({ ...paymentType, [documento]: "total" });
      setSelectedInvoices(
        selectedInvoices.filter((invoice) => invoice.documento !== documento),
      );
      const { [documento]: removed, ...rest } = paymentType;
      setPaymentType(rest);
    }
  };

  const handlePaymentTypeChange = (documento, value) => {
    setPaymentType({ ...paymentType, [documento]: value });
  };

  const totalToPay = selectedInvoices.reduce((total, invoice) => {
    if (paymentType[invoice.documento] === "total") {
      return total + invoice.saldo;
    } else {
      return total + parseFloat(paymentType[invoice.documento]);
    }
  }, 0);

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

        // console.log("Data from API:", info);

        setUserInfo(info);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  // POSTEO PARA ADHERIRSE A DEBITO AUTOMATICO PPT

  const handleAdhesion = async () => {
    try {
      const response = await fetch(`http://${process.env.SERVER_IP}/micuenta/ppt/suscripcion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        },
        body: JSON.stringify({
          "codigoCliente": userInfo.idCliente,
            "codigoTipoCliente": userInfo.tipoCliente,
            "condicionPago": 1,
            "idReparto": userInfo.ruta,
            "type": "adhesion",
            "currency_id": "ARS",
            "detail": {
                "external_reference": userInfo.idCliente,
                "concept_id": "debitoautomatico",
                "concept_description": "Debito Automatico",
                "amount": 0
            },
            "payer": {
                "name": userInfo.nombre,
                "email": userInfo.mail,
                "identification": {             
                    "type": "DNI_ARG",
                    "number": userInfo.idCliente,
                    "country": "ARG"
                }
            }
        })
      });

      const data = await response.json();
      if (data.form_url) {
        // Abre el modal con la URL obtenida
        setModalVisible(true);
      } else {
        // Manejar caso de error si es necesario
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar caso de error si es necesario
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
        <div className="flex flex-col items-center pb-16 pt-4">
          <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
            Realizar un pago
          </h2>
          <div className="flex w-11/12 items-center justify-evenly rounded-md border-2 bg-white p-5 lg:w-3/5">
            <Image src="/saldo.svg" width={65} height={75} alt="saldo"></Image>
            <p className="p-8 text-center text-sm font-medium text-gray-500">
              Tu saldo al{" "}
              {fecha.toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="text-xl font-medium text-[#3184e4]">
              ${userInfo.saldo}
            </p>
          </div>
          {userInfo.tipoCliente === "1" ? (
            <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 lg:w-3/5">
              <h3 className="p-2 text-2xl font-medium text-[#3184e4]">
                ¿Cuánto deseas pagar?
              </h3>
              <hr className="m-2 border" />
              <div className="flex items-center justify-center p-2 text-2xl font-medium text-[#3184e4]">
                <p className="mr-2">$</p>
                <input
                  type="number"
                  name="monto"
                  placeholder="Ingresá el monto"
                  required
                  className="my-2 flex justify-center rounded-md bg-gray-100 py-2 placeholder:px-2 focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4] lg:w-1/4"
                />
              </div>
            </div>
          ) : (
            <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 lg:w-3/5">
              <h3 className="p-2 text-2xl font-medium text-[#3184e4]">
                ¿Qué deseas pagar?
              </h3>
              <hr className="m-2 border" />
              {userInfo.comprobanteDeudaDTOS.map((comprobante, index) => (
                <tr
                  className="flex items-center justify-between text-xs"
                  key={index}
                >
                  <td className="py-4 pl-2 font-medium lg:pr-60">
                    <Checkbox
                      onChange={(e) =>
                        handleInvoiceSelection(
                          comprobante.documento,
                          comprobante.saldo,
                          e.target.checked,
                        )
                      }
                      className="mr-2"
                    />
                    {comprobante.documento}
                  </td>
                  <td className="text-grey-500 py-4 font-medium lg:pr-60">
                    {comprobante.fecha}
                  </td>
                  <td className="py-4 pl-2 font-bold text-[#3184e4] lg:mr-12">
                    ${comprobante.saldo}
                  </td>
                </tr>
              ))}
              <hr className="m-2 border" />
              <tr className="flex items-center justify-end">
                <td className="text-grey-500 py-4 font-medium ">
                  Total a pagar
                </td>
                <td className="py-4 pl-2 font-bold text-[#3184e4] lg:mr-12">
                  ${totalToPay}
                </td>
              </tr>
            </div>
          )}
          <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 lg:w-3/5">
            <h3 className="p-2 text-2xl font-medium text-[#3184e4]">
              Forma de pago
            </h3>
            <hr className="m-2 border" />
            <div className="flex justify-center font-medium text-[#3184e4]">
              <div className="p-2">
                <input
                  type="radio"
                  id="pago-tic"
                  name="payment"
                  value="PAGO TIC"
                  className="mr-2"
                  onChange={handleOptionChange}
                  checked={selectedOption === "PAGO TIC"}
                />
                <label htmlFor="pago-tic">PAGO TIC</label>
              </div>
              <div className="p-2">
                <input
                  type="radio"
                  id="mercado-pago"
                  name="paymentOption"
                  value="MERCADO PAGO"
                  className="mr-2"
                  onChange={handleOptionChange}
                  checked={selectedOption === "MERCADO PAGO"}
                />
                <label htmlFor="mercado-pago">MERCADO PAGO</label>
              </div>
            </div>
          </div>
          <div className="my-4 flex w-11/12 flex-col items-center rounded-md border-2 bg-white p-4 lg:w-3/5">
            {showPaymentOptions && (
              <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 ">
                <h3 className="flex justify-center p-2 text-2xl font-medium text-[#3184e4]">
                  Método de pago
                </h3>
                <hr className="m-2 border" />
                <div className="flex justify-center font-medium text-[#3184e4]">
                  {userInfo.formaPagos.map((option) => (
                    <div className="p-2" key={option}>
                      <input
                        type="radio"
                        id={option}
                        name="paymentOption"
                        value={option.toUpperCase()}
                        className="mr-2"
                        onChange={(e) => console.log(e.target.value)}
                      />
                      <label htmlFor={option}>{option.toUpperCase()}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button className="my-2 flex w-full justify-center rounded-sm bg-[#3184e4] p-2 font-semibold text-white hover:bg-[#00478a]">
              <Link href="/friocalor/solicitar">PAGAR</Link>
            </button>
          </div>
          {userInfo.adheridoDebito === false ? (
            <button
              onClick={handleAdhesion}
              className=" my-2 flex w-11/12 justify-center rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a] lg:w-3/5"
            >
              <Image
                src="/credit-card.svg"
                width={33}
                height={25}
                className="mr-2"
                alt="tarjeta-de-credito"
              ></Image>
              <p>Adherirse al Débito Automático</p>
            </button>
          ) : (
            <button className=" my-2 flex w-11/12 justify-center rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a] lg:w-3/5">
              <Image
                src="/credit-card.svg"
                width={33}
                height={25}
                className="mr-2"
                alt="tarjeta-de-credito"
              ></Image>
              <p>Desadherirse al Débito Automático</p>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
