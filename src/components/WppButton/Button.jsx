import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react"

const Button = () => {
  const [empresaInfo, setEmpresaInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/empresa`, {
          method: 'GET',
        })

        if (!response.ok) {
          throw new Error('Respuesta de servidor no exitosa')
        }

        const data = await response.json()
        setEmpresaInfo(data)
      } catch (error) {
        console.error('Error fetching empresa data:', error.message)
        setError('Error al cargar los datos de la empresa.')
      }
    }

    fetchData()
  }, [])

  return (
    <div className="fixed bottom-1 right-0 lg:bottom-24 lg:left-12 w-[70px]" style={{ zIndex: "10" }}>
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
