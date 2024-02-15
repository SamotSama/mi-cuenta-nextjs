"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState(null);

  // Al montar el componente, verificar si el token ha expirado y redirigir si es necesario
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.exp < Date.now() / 1000) {
          // Token expirado, redirigir a la página de inicio de sesión
          router.push('/login');
        } else {
          // Establecer la sesión si el token no ha expirado
          setSession(decodedToken);
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      // No hay token, redirigir a la página de inicio de sesión
      router.push('/login');
    }
  }, [router]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
