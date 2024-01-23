import React from "react";

const empresa = await prisma.empresa.findMany({
  select: {
    nombre: true,
    cuit: true,
    direccion: true,
    localidad: true,
    provincia: true,
    telefono: true,
    whatsapp: true,
  },
});

const empresaInfo = empresa.map((item) => ({
  nombre: item.nombre,
  cuit: item.cuit,
  direccion: item.direccion,
  localidad: item.localidad,
  provincia: item.provincia,
  telefono: item.telefono,
  whatsapp: item.whatsapp,
}));

const ContactInfo = () => {
  return (
    <div className="flex flex-col items-center pb-96">
      <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mb-2 px-4 py-2">
        Contacto
      </h2>
      {empresaInfo.map((item) => (
        <div className="w-11/12" key={item.nombre}>
          <table className="table-auto bg-white border-2 p-4 rounded-md mx-auto text-left">
            <tbody>
              <tr className="font-medium text-2xl text-[#3184e4]">
                <td className="pl-2 lg:pr-60 py-4" key={item.nombre}>
                  {item.nombre}
                </td>
              </tr>
              <tr className="text-xs border">
                <td className="pl-2 lg:lg:pr-32 py-4">CUIT</td>
                <td
                  className="lg:pr-60 py-4 text-[#3184e4] font-bold"
                  key={item.cuit}
                >
                  {item.cuit}
                </td>
              </tr>
              <tr className="text-xs border">
                <td className="pl-2 lg:pr-32 py-4">Dirección</td>
                <td
                  className="lg:pr-60 py-4 text-[#3184e4] font-bold"
                  key={item.localidad}
                >
                  {item.direccion}, {item.localidad}, {item.provincia}
                </td>
              </tr>
              <tr className="text-xs border">
                <td className="pl-2 lg:pr-32 py-4">Teléfono</td>
                <td
                  className="lg:pr-60 py-4 text-[#3184e4] font-bold"
                  key={item.telefono}
                >
                  {item.telefono}
                </td>
              </tr>
              <tr className="text-xs">
                <td className="pl-2 lg:pr-32 py-4">WhatsApp</td>
                <td
                  className="lg:pr-60 py-4 text-[#3184e4] font-bold"
                  key={item.whatsapp}
                >
                  {item.whatsapp}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
export default ContactInfo;
