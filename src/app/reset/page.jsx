import React from "react";
import ResetForm from "@/components/Forms/ResetFrom";
import "@/app/globals.css";

export const metadata = {
  title: "Ivess | Resetear Contraseña",
};

ResetForm.getLayout = function getLayout(page) {
  return (
    <html>
      <ResetForm />
    </html>
  );
};

export default ResetForm;
