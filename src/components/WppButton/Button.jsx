import Image from "next/image";
import Link from "next/link";

const Button = () => {
  return (
    <div className="fixed bottom-1 right-0 lg:bottom-24 lg:left-12 w-[70px]" style={{ zIndex: "10" }}>
      <Link href="https://wa.me/5491122753000" target="_blank" >
        <Image
          src="/whatsapp.svg"
          alt="Wp-button"
          width={60}
          height={60}
          className="top-60"
        />
      </Link>
    </div>
  );
};

export default Button;
