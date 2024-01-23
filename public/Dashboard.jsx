import React from "react";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center">
      <div className=" flex my-4 p-5 bg-white border-2 rounded-md w-3/5 items-center justify-evenly">
        <Image src="/saldo.svg" width={65} height={75}></Image>
        <p>Tu saldo al</p>
        <p></p>
      </div>
      <div className="bg-white my-4 p-2 border-2 rounded-md w-3/5">
        <Image src="/saldo.svg" width={65} height={75}></Image>
      </div>
      <div className="bg-white my-4 p-2 border-2 rounded-md w-3/5">
        <h3 className="text-2xl p-2 text-[#3184e4] font-medium">
          Forma de pago
        </h3>
        <hr className="m-2" />
        <div className="flex justify-center text-[#3184e4] font-medium">
          <div className="p-2">
            <input
              type="radio"
              id="huey"
              name="drone"
              value="huey"
              className="mr-2"
            />
            <label for="huey">PAGO TIC</label>
          </div>
          <div className="p-2">
            <input
              type="radio"
              id="huey"
              name="drone"
              value="huey"
              className="mr-2"
            />
            <label for="huey">MERCADO PAGO</label>
          </div>
        </div>
      </div>
      <div className="bg-white my-4 p-4 border-2 rounded-md w-3/5">
        <button className="flex justify-center p-2 my-2 bg-[#79afed] text-white font-semibold hover:bg-[#00478a] rounded-sm w-full">
          <Link href="/friocalor/solicitar">PAGAR</Link>
        </button>
      </div>
      <button className=" flex justify-center py-2 my-2 bg-[#3184e4] text-white font-semibold hover:bg-[#00478a] rounded-sm w-3/5">
        <Image
          src="/credit-card.svg"
          width={33}
          height={25}
          className="mr-2"
        ></Image>
        <Link href="/friocalor/solicitar">Adherirse al Débito Automático</Link>
      </button>
    </div>
  );
};

export default Dashboard;
