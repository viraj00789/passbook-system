"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    router.replace(isAuthenticated ? "/" : "/sign-in");
  }, [router]);

  return null;
}
