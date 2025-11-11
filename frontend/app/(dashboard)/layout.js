"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) router.push("/login");
  }, [router]);

  return <div className="flex h-screen w-full bg-[#2B2E4D] lg:pt-12 lg:pl-5">{children}</div>;
}
