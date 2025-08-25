"use client";
import { AuthProvider } from "@/components/utils/authContext";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

