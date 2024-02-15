import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectToLogin = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return null; 
};

export default RedirectToLogin