
export const Footer = async () => {
  const empresa = await prisma.empresa.findMany({
    select: {
      nombre: true,
    },
  })

  const empresaInfo = empresa.map((item) => ({
    nombre: item.nombre,
  }))

  return (
    <nav className="hidden lg:block lg:relative lg:bottom-0 w-full bg-[#00478a] lg:mt-20 p-4" zindex={10}>
      {empresaInfo.map((item) => (
        <p
          className="flex justify-center text-[#2cace2] text-xs font-regular"
          key={item.id}
        >
          {item.nombre} empresa que elabora sus productos bajo normas IVESS. |
          Disclaimer
        </p>
      ))}
    </nav>
  );
};

export default Footer