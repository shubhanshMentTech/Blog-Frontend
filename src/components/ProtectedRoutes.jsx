// components/ProtectedRoute.jsx
"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./utils/authContext"; // ✅ check this path

export default function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, token, router]);

  if (loading || !token) return <div>Loading...</div>;
  return children;
}
