"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    router.replace(isAuthenticated ? "/dashboard" : "/sign-in");
  }, [router]);

  return null;
}
