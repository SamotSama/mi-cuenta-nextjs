"use client";

import React from "react";
import Image from "next/image";

class MarketComponent extends React.Component {
  constructor() {
    super();

    this.productos = [
      {
        nombre: "Sifon Plas. 1,5L (Unidad)",
        precio: 100,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Botellón de agua x 12L (Unidad)",
        precio: 200,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Botellón 12L V (Unidad)",
        precio: 300,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Botellon de agua x 20L (Unidad)",
        precio: 400,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Botellón de agua x 20L -sodio (Unidad)",
        precio: 500,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Pomelo (Unidad)",
        precio: 600,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Citrus (Unidad)",
        precio: 700,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Lemon (Unidad)",
        precio: 800,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Lima Limon (Unidad)",
        precio: 900,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Manzana Sin Gas (Unidad)",
        precio: 1000,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Naranja Sin Gas (Unidad)",
        precio: 1000,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Naranja Durazno (Unidad)",
        precio: 1000,
        imagen: "/saldo.svg",
      },
      {
        nombre: "Agua Saborizada Pomelo Sin Gas (Unidad)",
        precio: 1000,
        imagen: "/saldo.svg",
      },
    ];
    this.state = {
      cantidad: Array(this.productos.length).fill(0), 
    };
  }

  render() {
    const rows = [];
    for (let i = 0; i < this.productos.length; i += 1) {
      const row = this.productos.slice(i, i + 1);
      rows.push(
        <div
          className="grid grid-row text-center justify-center bg-white shadow-xl p-2 m-2 rounded-xl mb-2 lg:mb-2"
          key={i}
        >
          {row.map((producto, j) => (
            <div className="producto flex flex-col items-center" key={j}>
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                width={180}
                height={270}
                className="py-8"
              />  
              <h3 className="text-sm text-[#3184e4] font-semibold">
                {producto.nombre}
              </h3>
              <hr className="m-2 border w-full" />
              <p className="text-xl text-[#3184e4] font-medium">
                ${producto.precio}
              </p>
              <div className="flex">
                <button
                  type="button"
                  className="text-4xl font-bold text-center text-gray-500 mx-5"
                  onClick={() => this.onCantidadChange(i + j, -1)}
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={this.state.cantidad[i + j]}
                  onChange={(event) =>
                    this.onCantidadChange(i + j, event.target.value)
                  }
                  className="w-14 py-2 text-3xl font-bold text-center text-gray-500 mx-5 input my-2 rounded-md focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-1"
                />
                <button
                  type="button"
                  className="text-4xl font-bold text-center text-gray-500 mx-2"
                  onClick={() => this.onCantidadChange(i + j, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="container flex flex-col items-center mx-auto">
        <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mx-2 px-4 py-2">
          Pedidos
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:w-3/4 justify-center">
          {rows}
        </div>
      </div>
    );
  }

  onCantidadChange(index, change) {
    this.setState((prevState) => {
      const newCantidad = [...prevState.cantidad];
      newCantidad[index] = Math.max(
        0,
        newCantidad[index] + parseInt(change, 10)
      );
      return { cantidad: newCantidad };
    });
  }
}

export default MarketComponent;
