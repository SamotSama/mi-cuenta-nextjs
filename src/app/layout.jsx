"use client"

import "@/app/globals.css"
import { Montserrat } from "next/font/google"

const Mont = Montserrat({ subsets: ["latin"] })

export default function RootLayout ({ children }) {
  return (
    <html lang="es" className={Mont.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
