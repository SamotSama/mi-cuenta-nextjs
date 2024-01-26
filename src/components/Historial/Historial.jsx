import React from "react";

const FrioCalor = () => {
  return (
    <div className="mt-2 flex flex-col items-center pb-96">
      <h2 className="mx-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Historial
      </h2>
      <div className="w-[95%]">
        <table className="mx-auto w-[95%] table-auto rounded-md border-2 bg-white p-4 text-left lg:max-w-6xl">
          <tbody>
            <tr className="text-2xl font-medium text-[#3184e4]">
              <td className="py-4 pl-2 lg:pr-60">Visitas</td>
            </tr>
            <tr className="border text-xs">
              <td className="py-4 pl-2 lg:lg:pr-32">Fecha y hora</td>
              <td className="py-4 font-bold text-[#3184e4] lg:pr-60">
                cantidad
              </td>
              <td className="py-4 pl-2 lg:lg:pr-32">precio precio</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrioCalor;
