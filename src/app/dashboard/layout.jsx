"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import NavbarBlue from "@/components/Navbar/NavbarBlue";
import Button from "@/components/WppButton/Button";
import Footer from "@/components/Footer/Footer";
import RequireAuth from "@/components/RequireAuth/RequireAuth";

const Mont = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={Mont.className}>
      {/* <RequireAuth> */}
        <Navbar />
        <NavbarBlue />
        <Button />
        {children}
        <Footer />
      {/* </RequireAuth> */}
    </html>
  );
}
