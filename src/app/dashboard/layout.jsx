"use client"

import { SessionProvider } from "../../../context/sessionContext";
import Head from 'next/head';
import { Montserrat } from 'next/font/google';
import "@/app/globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import NavbarBlue from "@/components/Navbar/NavbarBlue";
import Button from "@/components/WppButton/Button";
import ScrollUp from "@/components/ScrollUp/ScrollUp";

const Mont = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
  return (
    <SessionProvider session={session}>
        <Head>
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap`}
          />
        </Head>
        <html lang="es" className={Mont.className}>
          <body>
            <Navbar />
            <NavbarBlue />
            <Button />
            {children}
            <Footer />
          </body>
          <ScrollUp />
        </html>
    </SessionProvider>
  );
}