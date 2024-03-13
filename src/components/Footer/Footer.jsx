import { useEffect, useState } from "react";

const Footer = () => {
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

  useEffect(() => {
    if (empresaInfo && empresaInfo.urlRecomendar) {
      localStorage.setItem("url", empresaInfo.urlRecomendar);
    }
  }, [empresaInfo]);

  return (
    <footer
      className="hidden w-full bg-[#00478a] p-4 lg:relative lg:bottom-0 lg:mt-20 lg:block"
      zindex={10}
    >
      <p className="font-regular flex justify-center text-xs text-[#2cace2]">
        {empresaInfo.nombre} empresa que elabora sus productos bajo normas
        IVESS. | Disclaimer
      </p>
    </footer>
  );
};

export default Footer;
