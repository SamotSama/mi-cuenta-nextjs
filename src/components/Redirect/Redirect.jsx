"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectToLogin = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null; 
};

export default RedirectToLogin