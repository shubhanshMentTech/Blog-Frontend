"use client";
import Layout from "@/components/Layout";
import CreateBlog from "@/components/Blog Components/Create Blog/CreateBlog";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function CreatePage() {
  return (
    <ProtectedRoute>
      <Layout>
        <CreateBlog />
      </Layout>
    </ProtectedRoute>
  );
}

