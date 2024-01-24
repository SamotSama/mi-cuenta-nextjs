import React from "react";
import Image from "next/image";
import Link from "next/link";

const FrioCalor = () => {
  return (
    <div className="flex flex-col items-center mt-2">
      <h2 className="flex font-medium justify-start text-3xl text-[#3184e4] mx-2 px-4 py-2">
        Dispenser Frío - Calor
      </h2>
      <button className="py-2 my-2 w-4/5 lg:w-2/6 bg-[#3184e4] text-white font-semibold hover:bg-[#00478a] rounded-sm">
        <Link href="/dashboard/friocalor/solicitar">SOLICITAR EQUIPO</Link>
      </button>
      <button className="py-2 my-2 w-4/5 lg:w-2/6 bg-[#00478a] text-white font-semibold hover:bg-[#3184e4] rounded-sm">
        <Link href="/requisitos_fc.pdf" target="_blank">
          LEER REQUISITOS
        </Link>
      </button>
      <Image src="/disp-familia.png" alt="dispenser" width={350} height={550} className="mt-10"/>
    </div>
  );
};

export default FrioCalor;
