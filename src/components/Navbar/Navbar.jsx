import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-white shadow-xl relative">
      <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/logo.svg" alt="logo" width={120} height={45} />
          <span className="text-lg text-[#00478a] font-bold hover:text-gray-800">
            Mi Cuenta
          </span>
        </Link>
        <div className="hidden w-full lg:block lg:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white  ">
            <li>
              <Link
                href="/dashboard/perfil"
                className="flex text-sm text-[#00478a] font-bold hover:text-gray-800"
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
                className="flex text-sm text-[#00478a] font-bold hover:text-gray-800"
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
                className="flex text-sm text-[#00478a] font-bold hover:text-gray-800"
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
                href="/terms_cond.pdf"
                target="_blank"
                className="flex text-sm text-[#00478a] font-bold hover:text-gray-800"
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
              <Link
                href="/dashboard/salir"
                className="flex text-sm text-[#00478a] font-bold hover:text-gray-800"
              >
                <Image
                  src="/right-from-bracket-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Salir
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="menu-button inline-flex items-center p-2 justify-center text-5xl font-extrabold text-[#046cb3] md:hidden"
          onClick={ToggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
        {isMenuOpen && (
          <ul className="my-2 mx-1 text-[#046cb3]">
            <li>
              <Link
                href="/dashboard/perfil"
                className="flex text-sm font-bold p-2"
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
                className="flex text-sm font-bold p-2 "
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
                className="flex text-sm font-bold p-2"
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
                href="/terms_cond.pdf"
                target="_blank"
                className="flex text-sm font-bold p-2"
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
              <Link
                href="/dashboard/salir"
                className="flex text-sm font-bold p-2"
              >
                <Image
                  src="/right-from-bracket-solid.svg"
                  alt="perfil"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                Salir
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;