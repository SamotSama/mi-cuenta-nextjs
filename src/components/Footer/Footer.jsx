import { useEffect, useState } from "react"

const Footer = () => {
  const [empresaInfo, setEmpresaInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/empresa`, {
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
    <footer className="hidden lg:block lg:relative lg:bottom-0 w-full bg-[#00478a] lg:mt-20 p-4" zindex={10}>
      {empresaInfo.map((item) => (
        <p className="flex justify-center text-[#2cace2] text-xs font-regular" key={item.id}>
          {item.nombre} empresa que elabora sus productos bajo normas IVESS. | Disclaimer
        </p>
      ))}
    </footer>
  )
}

export default Footer