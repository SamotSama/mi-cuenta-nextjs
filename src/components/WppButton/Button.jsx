import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Button = async () => {
  const empresa = await prisma.empresa.findMany({
    select: {
      whatsapp: true,
    },
  });

  const empresaInfo = empresa.map((item) => ({
    whatsapp: item.whatsapp,
  }));

  return (
    <div className="fixed bottom-1 right-0 lg:bottom-24 lg:left-12 w-[70px]" style={{ zIndex: "10" }} >
      {empresaInfo.map((item) => (
      <Link href={`https://wa.me/${item.whatsapp}`} target="_blank" key={item.id}>
        <Image
          src="/whatsapp.svg"
          alt="Wp-button"
          width={60}
          height={60}
          className="top-60"
        />
      </Link>
      ))}
    </div>
  );
};

export default Button;
