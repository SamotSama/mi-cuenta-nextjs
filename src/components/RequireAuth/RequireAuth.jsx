import { useSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // La sesión aún se está cargando, puedes mostrar un spinner o mensaje de carga
      return;
    }

    if (!session) {
      // No hay sesión, redirigir al inicio de sesión
      router.replace("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  // Si hay una sesión, renderizar el contenido
  return children;
}
