import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();
  const { data: session } = useSession();

  // Verificar si session está definido y si tiene una propiedad user
  const user = session?.user;

  // Verificar si user está definido
  const name = user?.name;
  const email = user?.email;

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });

      // Muestra un toast de éxito al cerrar sesión
      toast.success(`¡Hasta luego! ${name}`, {
        onClose: () => {
          // Redirige a la página de inicio u otra página después del cierre de sesión
          router.push("/");
        },
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Muestra un toast de error en caso de fallo
      toast.error("Error al cerrar sesión");
    }
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
                href="/dashboard"
                className="flex text-sm text-[#00478a] font-bold hover:text-gray-800"
                onClick={handleSignOut}
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
                href="/"
                className="flex text-sm font-bold p-2"
                onClick={handleSignOut}
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
      <ToastContainer 
      position="bottom-center"
      theme="colored"
      autoClose={2000}
      />
    </nav>
  );
};

export default Navbar;
