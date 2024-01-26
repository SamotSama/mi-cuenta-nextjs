"use client";

import { useRouter } from "next/navigation";

const RedirectToLogin = () => {
  const router = useRouter();
  router.push("/login");
};

export default RedirectToLogin;
