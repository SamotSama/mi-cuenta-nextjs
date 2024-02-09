import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Elimina el token de acceso almacenado en localStorage
    localStorage.removeItem("access_token");

    // Muestra un toast de éxito al cerrar sesión
    toast.success("¡Hasta luego!", {
      onClose: () => {
        // Redirige a la página de login
        router.push("");
      },
    });
  };
  const [empresaInfo, setEmpresaInfo] = useState({});

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

        console.log("Data from API:", data);

        setEmpresaInfo(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmpresa();
  }, []);

  return (
    <nav className="relative bg-white shadow-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between p-2">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/logo.svg" alt="logo" width={120} height={45} />
          <span className="text-lg font-bold text-[#00478a] hover:text-gray-800">
            Mi Cuenta
          </span>
        </Link>
        <div className="hidden w-full lg:block lg:w-auto">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse  ">
            <li>
              <Link
                href="/dashboard/perfil"
                className="flex text-sm font-bold text-[#00478a] hover:text-gray-800"
                aria-current="page"
              >
                <Image
                  src="/user-group-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Perfil
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/historial"
                className="flex text-sm font-bold text-[#00478a] hover:text-gray-800"
              >
                <Image
                  src="/shopping-cart-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Historial
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/contacto"
                className="flex text-sm font-bold text-[#00478a] hover:text-gray-800"
              >
                <Image
                  src="/comments-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.SERVER_IP}${empresaInfo.termsConditions}`}
                target="_blank"
                className="flex text-sm font-bold text-[#00478a] hover:text-gray-800"
              >
                <Image
                  src="/file-contract-solid.svg"
                  alt="perfil"
                  width={10}
                  height={10}
                  className="mr-2"
                />
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <button
                className="flex items-center text-sm font-bold text-[#00478a] hover:text-gray-800"
                onClick={handleLogout}
              >
                <Image
                  src="/right-from-bracket-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Salir
              </button>
            </li>
          </ul>
        </div>
        <button
          className="menu-button inline-flex items-center justify-center p-2 text-5xl font-extrabold text-[#046cb3] md:hidden"
          onClick={ToggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
        {isMenuOpen && (
          <ul className="mx-1 my-2 text-[#046cb3]">
            <li>
              <Link
                href="/dashboard/perfil"
                className="flex p-2 text-sm font-bold"
                aria-current="page"
              >
                <Image
                  src="/user-group-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Perfil
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/historial"
                className="flex p-2 text-sm font-bold "
              >
                <Image
                  src="/shopping-cart-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Historial
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/contacto"
                className="flex p-2 text-sm font-bold"
              >
                <Image
                  src="/comments-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.SERVER_IP}${empresaInfo.termsConditions}`}
                target="_blank"
                className="flex p-2 text-sm font-bold"
              >
                <Image
                  src="/file-contract-solid.svg"
                  alt="perfil"
                  width={10}
                  height={10}
                  className="mr-2"
                />
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-2 text-sm font-bold"
                onClick={handleLogout}
              >
                <Image
                  src="/right-from-bracket-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Salir
              </button>
            </li>
          </ul>
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={2000}
        transition={Flip}
      />
    </nav>
  );
};

export default Navbar;
