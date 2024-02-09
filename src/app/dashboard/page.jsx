// import Dashboard from "@/components/Dashboard/Dashboard"
// import React from "react"

// export const metadata = {
//   title: "Ivess | Mi cuenta",
// }

// const App = () => {
//   return (
//     <Dashboard />
//   )
// }

// export default App

import React from "react"
import Dashboard from "@/components/Dashboard/Dashboard"
import { SessionProvider } from "../../../context/sessionContext"
import authMiddleware from "../../../middleware/authMiddleware"

export const metadata = {
  title: "Ivess | Mi cuenta",
}

const App = () => {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  )
}

App.getInitialProps = async ({ req, res }) => {
  // Aplicar el middleware de autenticación en la solicitud inicial
  if (typeof window === 'undefined') {
    authMiddleware(req, res, () => {});
  }

  return {};
};

export default App