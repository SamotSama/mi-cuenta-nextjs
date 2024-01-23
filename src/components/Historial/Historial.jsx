import React from "react";

const FrioCalor = () => {
  return (
    <div className="flex flex-col items-center mt-2 pb-96">
      <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mx-2 px-4 py-2">
        Historial
      </h2>
      <div className="w-[95%]">
        <table className="table-auto bg-white border-2 p-4 rounded-md mx-auto text-left w-[95%] lg:max-w-6xl">
          <tbody>
            <tr className="font-medium text-2xl text-[#3184e4]">
              <td className="pl-2 lg:pr-60 py-4">Visitas</td>
            </tr>
            <tr className="text-xs border">
              <td className="pl-2 lg:lg:pr-32 py-4">Fecha y hora</td>
              <td className="lg:pr-60 py-4 text-[#3184e4] font-bold">
                cantidad
              </td>
              <td className="pl-2 lg:lg:pr-32 py-4">precio precio</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrioCalor;
