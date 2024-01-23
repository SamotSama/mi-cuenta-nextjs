"use client"

import "@/app/globals.css"
import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"
import NavbarBlue from "@/components/Navbar/NavbarBlue"
import Button from "@/components/WppButton/Button"
import { Montserrat } from "next/font/google"

const Mont = Montserrat({ subsets: ["latin"] })

export default function RootLayout ({ children }) {
  return (
    <html lang="es" className={Mont.className}>
      {/* <RequireAuth> */}
      <body>
        <Navbar />
        <NavbarBlue />
        <Button />
        {children}
        <Footer />
      </body>
      {/* </RequireAuth> */}
    </html>
  )
}
