import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import "@/app/globals.css";

export const metadata = {
  title: "Ivess | Iniciar Sesión",
};

LoginForm.getLayout = function getLayout(page) {
  return (
    <html>
      <LoginForm />
    </html>
  );
};

export default LoginForm;
