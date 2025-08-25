"use client";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div>Profile Page</div>
      </Layout>
    </ProtectedRoute>
  );
}

