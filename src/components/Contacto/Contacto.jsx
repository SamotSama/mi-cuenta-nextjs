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
      <h2 className="mb-2 flex justify-start px-4 py-2 text-3xl font-medium text-[#3184e4]">
        Contacto
      </h2>
      {empresaInfo.map((item) => (
        <div className="w-11/12" key={item.nombre}>
          <table className="mx-auto table-auto rounded-md border-2 bg-white p-4 text-left">
            <tbody>
              <tr className="text-2xl font-medium text-[#3184e4]">
                <td className="py-4 pl-2 lg:pr-60" key={item.nombre}>
                  {item.nombre}
                </td>
              </tr>
              <tr className="border text-xs">
                <td className="py-4 pl-2 lg:lg:pr-32">CUIT</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
                  key={item.cuit}
                >
                  {item.cuit}
                </td>
              </tr>
              <tr className="border text-xs">
                <td className="py-4 pl-2 lg:pr-32">Dirección</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
                  key={item.localidad}
                >
                  {item.direccion}, {item.localidad}, {item.provincia}
                </td>
              </tr>
              <tr className="border text-xs">
                <td className="py-4 pl-2 lg:pr-32">Teléfono</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
                  key={item.telefono}
                >
                  {item.telefono}
                </td>
              </tr>
              <tr className="text-xs">
                <td className="py-4 pl-2 lg:pr-32">WhatsApp</td>
                <td
                  className="py-4 font-bold text-[#3184e4] lg:pr-60"
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
