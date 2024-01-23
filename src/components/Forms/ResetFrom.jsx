import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ResetForm = () => {
  return (
    <div className='text-[#046cb3] flex flex-col items-center mt-64'>
        <Image
        src="/logo.svg"
        alt="logo"
        className="w-44"
        width={500}
        height={500}
      />
        <h2 className='font-bold text-4xl mb-12'>Mi Cuenta</h2>
        <p className='text-2xl mb-12 font-medium'>Resetear Contraseña</p>
    <form className='flex flex-col'>
      <label htmlFor="email">
        <input type="email" id="email" placeholder='Email' required className='rounded-md p-3 w-80 mb-6 focus:outline-none focus:border-[#3184e4] focus:ring-[#3184e4] focus:ring-4'/>
      </label>
      <button type="submit" className='bg-[#3184e4] text-white font-bold p-3 rounded-md w-80 mb-6' >RESETEAR</button>
    </form>
    <Link href="/login" className='text-[#00478a] font-bold text-end'>Ingresar</Link>
    </div>
  );
};

export default ResetForm;
