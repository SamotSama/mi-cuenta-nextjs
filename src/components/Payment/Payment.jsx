"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { Checkbox, Modal, Radio, ConfigProvider } from "antd";

const Payment = () => {
  const [fecha] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formUrl, setFormUrl] = useState("");
  const [monto, setMonto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [cantPagar, setCantPagar] = useState("");
  const [facturas, setSelectedFacturas] = useState([]);
  const [montoParcial, setMontoParcial] = useState({});
  const [gatewayPago, setGatewayPago] = useState("");
  const [resultado, setResultado] = useState("");
  const [showAutoDebitModal, setShowAutoDebitModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const openAutoDebitModal = () => {
    setShowAutoDebitModal(true);
  };

  // Función para cerrar el modal
  const closeAutoDebitModal = () => {
    setShowAutoDebitModal(false);
  };

  // LOGICA PARA TIPO DE PAGO EN PPT

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "PAGO TIC") {
      setShowPaymentOptions(true);
      setGatewayPago("1");
    } else if (e.target.value === "MERCADO PAGO") {
      setShowPaymentOptions(false);
      setGatewayPago("2");
    } else {
      setGatewayPago("");
    }
  };
  // LOGICA PARA ELEGIR LAS FACTURAS A PAGAR

  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [paymentType, setPaymentType] = useState({});
  const [showPartialPayment, setShowPartialPayment] = useState(false);
  const [partialAmounts, setPartialAmounts] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const handlePaymentTypeChange = (e) => {
    const value = e.target.value;
    setShowPartialPayment(value === "pagoparcial");
  };

  const handlePartialAmountChange = (e, facturaId) => {
    const value = parseFloat(e.target.value);
    setPartialAmounts({ ...partialAmounts, [facturaId]: value });
  };

  const handleInvoiceSelection = (documento, saldo, checked) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, { documento, saldo }]);
      setPaymentType({ ...paymentType, [documento]: "total" });
    } else {
      setSelectedInvoices(
        selectedInvoices.filter((invoice) => invoice.documento !== documento),
      );
      const { [documento]: removed, ...rest } = paymentType;
      setPaymentType(rest);
    }
  };

  const totalToPay = selectedInvoices.reduce((total, invoice) => {
    if (paymentType[invoice.documento] === "total") {
      return total + invoice.saldo;
    } else {
      return total + parseFloat(paymentType[invoice.documento]);
    }
  }, 0);

  const totalToPayFormatted = totalToPay.toFixed(2);

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
      const response = await fetch(
        `https://${process.env.SERVER_IP}/micuenta/ppt/suscripcion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            codigoCliente: userInfo.idCliente,
            codigoTipoCliente: userInfo.tipoCliente,
            condicionPago: 1,
            idReparto: userInfo.ruta,
            type: "adhesion",
            currency_id: "ARS",
            detail: {
              external_reference: userInfo.idCliente,
              concept_id: "debitoautomatico",
              concept_description: "Debito Automatico",
              amount: 0,
            },
            payer: {
              name: userInfo.nombre,
              email: userInfo.mail,
              identification: {
                type: "DNI_ARG",
                number: userInfo.idCliente,
                country: "ARG",
              },
            },
          }),
        },
      );

      const data = await response.json();
      if (data.form_url) {
        setFormUrl(data.form_url);
        setModalVisible(true);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleAdhesion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setFormUrl("");
  };

  // POSTEO PARA ANULACIÓN DE DÉBITO AUTOMÁTICO PPT

  const handleCancel = async () => {
    try {
      const response = await fetch(
        `https://${process.env.SERVER_IP}/micuenta/ppt/suscripcion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            codigoCliente: userInfo.idCliente,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 200) {
        if (data.success) {
          toast.success(data.mensaje);
        } else {
          toast.error(data.mensaje);
        }
      } else if (response.status === 401) {
        toast.error("Error de autenticación: " + data.error_description);
      } else {
        toast.error("Ocurrió un error al procesar la solicitud.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al procesar la solicitud.");
    }
  };

  // POSTEO PARA REALIZAR PAGO

  const handleChange = (e) => {
    setMonto(e.target.value);
  };

  const constructPaymentDataForType1 = () => {
    return {
      codigoCliente: userInfo.idCliente,
      boton: formaPago,
      idReparto: userInfo.ruta,
      codigoTipoCliente: userInfo.tipoCliente,
      codRecibo: localStorage.getItem("codigoRecibo"),
      due_date: new Date().toISOString(),
      last_due_date: new Date().toISOString(),
      currency_id: "ARS",
      idPaymentProvider: gatewayPago,
      idOrigenPlatForm: 3,
      payer: {
        name: userInfo.nombre,
        email: userInfo.mail,
        identification: {
          type: "DNI_ARG",
          number: userInfo.idCliente,
          country: "ARG",
        },
      },
      detailsResponseList: [
        {
          amount: monto,
          concept_description: "FACTURA",
          concept_id: "CANCELACION",
          external_reference: "CANCELACION"
        },
      ],
    };
  };

  const constructPaymentDataForType2 = () => {
    if (cantPagar === "pagototal") {
      return {
        codigoCliente: userInfo.idCliente,
        boton: formaPago,
        idReparto: userInfo.ruta,
        codigoTipoCliente: userInfo.tipoCliente,
        codRecibo: localStorage.getItem("codigoRecibo"),
        due_date: new Date().toISOString(),
        last_due_date: new Date().toISOString(),
        currency_id: "ARS",
        idPaymentProvider: gatewayPago,
        idOrigenPlatForm: 3,
        payer: {
          name: userInfo.nombre,
          email: userInfo.mail,
          identification: {
            type: "DNI_ARG",
            number: userInfo.idCliente,
            country: "ARG",
          },
        },
        detailsResponseList: selectedInvoices.map((invoice) => ({
          amount: invoice.saldo,
          concept_description: "",
          concept_id: "",
          external_reference: userInfo.idCliente,
        })),
      };
    } else if (cantPagar === "pagoparcial") {
      return {
        codigoCliente: userInfo.idCliente,
        boton: formaPago,
        idReparto: userInfo.ruta,
        codigoTipoCliente: userInfo.tipoCliente,
        codRecibo: localStorage.getItem("codigoRecibo"),
        due_date: new Date().toISOString(),
        last_due_date: new Date().toISOString(),
        currency_id: "ARS",
        idPaymentProvider: gatewayPago,
        idOrigenPlatForm: 3,
        payer: {
          name: userInfo.nombre,
          email: userInfo.mail,
          identification: {
            type: "DNI_ARG",
            number: userInfo.idCliente,
            country: "ARG",
          },
        },
        detailsResponseList: facturas.map((index) => ({
          amount: partialAmounts[index],
          concept_description: userInfo.comprobanteDeudaDTOS[index].documento,
          concept_id:
            userInfo.comprobanteDeudaDTOS[index].documento.split(" ")[0],
          external_reference:
            userInfo.comprobanteDeudaDTOS[index].documento.split(" ")[1],
        })),
      };
    }
  };

  const handlePayment = async () => {
    if (userInfo.adheridoDebito == true) {
      // Mostrar el modal de débito automático
      openAutoDebitModal();
      return; // Salir de la función para evitar que se continúe con el proceso de pago
    }
    let paymentData;
    if (userInfo.tipoCliente === "1") {
      paymentData = constructPaymentDataForType1();
    } else {
      paymentData = constructPaymentDataForType2();
    }

    try {
      const response = await fetch(
        `https://${process.env.SERVER_IP}/micuenta/pago`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          body: JSON.stringify(paymentData),
        },
      );

      if (response.status === 201) {
        const data = await response.json();
        if (data.body.form_url) {
          setFormUrl(data.body.form_url);
          setModalVisible(true);
        } else {
          throw new Error("Error al procesar el pago");
        }
      } else {
        throw new Error("Error al procesar el pago");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(gatewayPago)

  // const handlePayment = async () => {
  //   const datos = {
  //     codigoCliente: userInfo.idCliente,
  //     boton: formaPago,
  //     idReparto: userInfo.ruta,
  // codigoTipoCliente: userInfo.tipoCliente,
  // codRecibo: localStorage.getItem("codigoRecibo"),
  // due_date: new Date().toISOString(),
  // last_due_date: new Date().toISOString(),
  //     currency_id: "ARS",
  //     idPaymentProvider: gatewayPago,
  //     idOrigenPlatForm: 3,
  //     payer: {
  //       name: userInfo.nombre,
  //       email: userInfo.mail,
  //       identification: {
  //         type: "DNI_ARG",
  //         number: userInfo.idCliente,
  //         country: "ARG",
  //       },
  //     },
  //   };

  //   if (cantPagar === "pagoparcial") {
  //     datos.detailsResponseList = [];
  //     montoParcial.forEach((value, key) => {
  //       const documento =
  //         userInfo.comprobanteDeudaDTOS[key].documento.split(" ");
  //       datos.detailsResponseList.push({
  //         amount: value,
  //         concept_description: userInfo.comprobanteDeudaDTOS[key].documento,
  //         concept_id: documento[0],
  //         external_reference: documento[1],
  //       });
  //     });
  //   } else if (facturas.length > 0) {
  //     datos.detailsResponseList = [];
  //     facturas.forEach((value) => {
  //       const documento =
  //         userInfo.comprobanteDeudaDTOS[value].documento.split(" ");
  //       datos.detailsResponseList.push({
  //         amount: userInfo.comprobanteDeudaDTOS[value].saldo,
  //         concept_description: userInfo.comprobanteDeudaDTOS[value].documento,
  //         concept_id: documento[0],
  //         external_reference: documento[1],
  //       });
  //     });
  //   } else {
  //     datos.detailsResponseList = [
  //       {
  //         amount: monto,
  //         concept_description: "FACTURA",
  //         concept_id: "CANCELACION",
  //         external_reference: userInfo.idCliente,
  //       },
  //     ];
  //   }

  //   const response = await fetch(
  //     `https://${process.env.SERVER_IP}/micuenta/pago`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("access_token"),
  //       },
  //       body: JSON.stringify(datos),
  //     },
  //   );

  //   if (response.status === 201) {
  //     const data = await response.json();
  //     if (data.body.form_url) {
  //       setFormUrl(data.body.form_url);
  //       setModalVisible(true);
  //     } else {
  //       throw new Error("Error al procesar el pago");
  //     }
  //   } else {
  //     throw new Error("Error al procesar el pago");
  //   }
  // };

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
          {userInfo.saldo <= 0 ? (
            <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 lg:w-3/5">
              <h3 className="p-2 text-2xl font-medium text-[#3184e4]">
                No tenés saldo pendiente.
              </h3>
            </div>
          ) : (
            <>
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
                      value={monto}
                      onChange={handleChange}
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
                      ${totalToPayFormatted}
                    </td>
                  </tr>
                  <div id="montocontainer" className="mb-3">
                    <hr className="m-2 my-0 border" />
                    <div className="mt-3 text-center">
                      <Radio.Group
                        onChange={(e) =>
                          setShowPartialPayment(
                            e.target.value === "pagoparcial",
                          )
                        }
                        value={showPartialPayment ? "pagoparcial" : "pagototal"}
                        className={selectedInvoices.length > 0 ? "" : "hidden"}
                      >
                        <Radio
                          value="pagototal"
                          className="mr-3 font-semibold text-[#3184e4]"
                        >
                          PAGO TOTAL
                        </Radio>
                        <Radio
                          value="pagoparcial"
                          className="font-semibold text-[#3184e4]"
                        >
                          PAGO PARCIAL
                        </Radio>
                      </Radio.Group>
                    </div>
                    {showPartialPayment && (
                      <div className="row">
                        <h3 className="p-2 text-center font-medium text-[#3184e4]">
                          ¿Cuánto querés pagar de cada factura?
                        </h3>
                        <div className="col-lg-6 offset-lg-3">
                          {selectedInvoices.map((invoice, index) => (
                            <div
                              key={index}
                              className="flex justify-center px-3 pt-3"
                            >
                              <div className="mb-3 flex w-full items-center  p-3 lg:w-2/6">
                                <label
                                  htmlFor={`montoparcial[${index}]`}
                                  className="text- mr-3 w-full rounded-md bg-gray-100 p-3 text-xs font-medium"
                                >
                                  Factura {invoice.documento}
                                </label>
                                $
                                <input
                                  type="number"
                                  step="0.01"
                                  className="form-input w-full rounded-md p-2 text-[#3184e4] focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4]"
                                  name={`montoparcial[${index}]`}
                                  data-facturaid={index}
                                  id={`montoparcial[${index}]`}
                                  min="10"
                                  max={invoice.saldo}
                                  form="formulario"
                                  required  
                                  placeholder="Ingresá el monto"
                                  onChange={(e) =>
                                    handlePartialAmountChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                          <div className="px-3 py-3">
                            <div className="flex items-center justify-end">
                              <label className="mr-3 font-medium ">Total</label>
                              $
                              <input
                                type="number"
                                step="0.01"
                                className="form-input py-4 pl-2 font-bold text-[#3184e4] lg:mr-12"
                                name="montoTotalParcial"
                                id="montoTotalParcial"
                                value={Object.values(partialAmounts).reduce(
                                  (acc, curr) => acc + curr,
                                  0,
                                )}
                                form="formulario"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="my-4 w-11/12 rounded-md border-2 bg-white p-2 lg:w-3/5">
                <h3 className="p-2 text-2xl font-medium text-[#3184e4]">
                  Forma de pago
                </h3>
                <hr className="m-2 border" />
                <div className="flex justify-center font-medium text-[#3184e4]">
                  <div className="p-2">
                    <Radio
                      id="pago-tic"
                      name="payment"
                      value="PAGO TIC"
                      className="mr-2 font-semibold text-[#3184e4]"
                      onChange={handleOptionChange}
                      checked={selectedOption === "PAGO TIC"}
                    >
                      PAGO TIC
                    </Radio>
                  </div>
                  <div className="p-2">
                    <Radio
                      id="mercado-pago"
                      name="paymentOption"
                      value="MERCADO PAGO"
                      className="mr-2 font-semibold text-[#3184e4]"
                      onChange={handleOptionChange}
                      checked={selectedOption === "MERCADO PAGO"}
                    >
                      MERCADO PAGO
                    </Radio>
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
                          <Radio
                            className="font-semibold text-[#3184e4]"
                            id={option}
                            name="paymentOption"
                            value={option.toUpperCase()}
                            checked={
                              selectedPaymentOption === option.toUpperCase()
                            }
                            onChange={(e) =>
                              setSelectedPaymentOption(e.target.value)
                            }
                          >
                            {option.toUpperCase()}
                          </Radio>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  className="my-2 flex w-full justify-center rounded-sm bg-[#3184e4] p-2 font-semibold text-white hover:bg-[#00478a]"
                  onClick={handlePayment}
                >
                  PAGAR
                </button>
                <ConfigProvider
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
                  title="¡Ya estás adherido al débito automático!"
                  open={showAutoDebitModal}
                  onCancel={closeAutoDebitModal}
                  centered={true}
                  footer={null}
                  className="text-center"
                >
                  <p className="text-center">
                    Como estás adherido al débito automático, el pago se
                    realizará automáticamente. No es necesario que realices
                    ninguna acción en este momento.
                  </p>
                </Modal>
                </ConfigProvider>
              </div>
            </>
          )}
          {userInfo.adheridoDebito === false ? (
            <button
              onClick={handleAdhesion}
              className=" my-2 mb-14 flex w-11/12 justify-center rounded-sm bg-[#3184e4] py-2 font-semibold text-white  hover:bg-[#00478a] lg:w-3/5"
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
            <button
              className=" my-2 mb-12 flex w-11/12 justify-center rounded-sm bg-[#3184e4] py-2 font-semibold text-white hover:bg-[#00478a] lg:w-3/5"
              onClick={handleCancel}
            >
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
      <Modal
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={2000}
        height={2000}
      >
        <iframe src={formUrl} className="h-[1000px] w-full" />
      </Modal>
    </div>
  );
};

export default Payment;
