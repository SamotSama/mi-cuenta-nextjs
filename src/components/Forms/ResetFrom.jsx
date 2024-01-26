import React from "react";
import Image from "next/image";
import Link from "next/link";

const ResetForm = () => {
  return (
    <div className="mt-64 flex flex-col items-center text-[#046cb3]">
      <Image
        src="/logo.svg"
        alt="logo"
        className="w-44"
        width={500}
        height={500}
      />
      <h2 className="mb-12 text-4xl font-bold">Mi Cuenta</h2>
      <p className="mb-12 text-2xl font-medium">Resetear Contraseña</p>
      <form className="flex flex-col">
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            className="mb-6 w-80 rounded-md p-3 focus:border-[#3184e4] focus:outline-none focus:ring-4 focus:ring-[#3184e4]"
          />
        </label>
        <button
          type="submit"
          className="mb-6 w-80 rounded-md bg-[#3184e4] p-3 font-bold text-white"
        >
          RESETEAR
        </button>
      </form>
      <Link href="/login" className="text-end font-bold text-[#00478a]">
        Ingresar
      </Link>
    </div>
  );
};

export default ResetForm;
