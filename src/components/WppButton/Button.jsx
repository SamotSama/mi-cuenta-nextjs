import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

const Button = () => {
  const [empresaInfo, setEmpresaInfo] = useState([]);

  useEffect(() => {
    const getEmpresa = async () => {
      try {
        const url = `https://${process.env.SERVER_IP}/micuenta/empresa/empresa`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const data = await response.json();
        setEmpresaInfo(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmpresa();
  }, []);

  return (
    <div
      className="fixed bottom-1 right-0 w-[70px] lg:bottom-24 lg:left-12"
      style={{ zIndex: "10" }}
    >
      <Link
        href={`https://wa.me/${empresaInfo.whatsapp}`}
        target="_blank"
      >
        <Image
          src="/whatsapp.svg"
          alt="Wp-button"
          width={60}
          height={60}
          className="top-60"
        />
      </Link>
    </div>
  );
};

export default Button;
