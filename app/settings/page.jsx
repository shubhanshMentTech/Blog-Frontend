"use client";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div>Settings Page</div>
      </Layout>
    </ProtectedRoute>
  );
}

