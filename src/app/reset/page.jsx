import "@/app/globals.css"
import ResetForm from "@/components/Forms/ResetForm"
import React from "react"

export const metadata = {
  title: "Ivess | Resetear Contraseña",
}

ResetForm.getLayout = function getLayout (page) {
  return (
    <html>
      <ResetForm />
    </html>
  )
}

export default ResetForm
