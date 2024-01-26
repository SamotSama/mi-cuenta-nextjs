"use client";

import Image from "next/image";
import Link from "next/link";

const NavbarBlue = () => {
  return (
    <nav
      className="fixed bottom-0 mx-auto flex w-full justify-start bg-[#00478a] p-2 text-sm lg:static lg:top-[5em] lg:table lg:min-w-full lg:justify-center"
      style={{ zIndex: "10" }}
    >
      <ul
        className="flex justify-center gap-10 space-x-4 font-bold text-white lg:gap-40"
        style={{ textAlign: "-webkit-center" }}
      >
        <li className="align-items-center hidden items-center justify-center hover:animate-pulse lg:flex lg:flex-col">
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
