"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";

const Mont = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={Mont.className}>

      {children}

    </html>
  );
}
