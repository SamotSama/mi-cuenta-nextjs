// import { useSession } from "next-auth/react";

const LogoutButton = () => {
  const { user, signOut } = useSession();

  const handleLogout = () => {
    signOut();
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;