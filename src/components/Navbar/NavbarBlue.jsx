"use client";

import Image from "next/image";
import Link from "next/link";

const NavbarBlue = () => {
  return (
    <nav className="flex fixed justify-start bottom-0 w-full lg:top-[5em] lg:table lg:static lg:min-w-full lg:justify-center bg-[#00478a] p-2 mx-auto text-sm" style={{ zIndex: "10" }}>
      <ul className="flex justify-center space-x-4 font-bold text-white gap-10 lg:gap-40" style={{ textAlign: "-webkit-center" }}>
        <li className="hidden lg:flex lg:flex-col items-center justify-center align-items-center hover:animate-pulse">
          <Link href="/dashboard">
            <Image
              src="/menu-secundario-home.svg"
              alt="home-icon"
              width={35}
              height={28}
            />
            <p>Inicio</p>
          </Link>
        </li>
        <li className="flex flex-col items-center justify-center hover:animate-pulse">
          <Link href="/dashboard/pedido">
            <Image
              src="/menu-secundario-pedido.svg"
              alt="pedido-icon"
              width={35}
              height={28}
            />
            <p href="/dashboard/pedido">Pedido</p>
          </Link>
        </li>
        <li className="flex flex-col items-center justify-center hover:animate-pulse">
          <Link href="/dashboard/friocalor">
            <Image
              src="/menu-secundario-frio-calor.svg"
              alt="friocalor-icon"
              width={35}
              height={28}
            />
            <p>Frío-Calor</p>
          </Link>
        </li>
        <li className="flex flex-col items-center justify-center hover:animate-pulse">
          <Link href="/dashboard/pagar">
            <Image
              src="/menu-secundario-pagos.svg"
              alt="pagar-icon"
              width={35}
              height={28}
            />
            <p>Pagar</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarBlue;
