"use client";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoutes";
import BlogPage from "@/components/Blog Components/ReadBlog/ReadBlog";

export default function BlogByIdPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <BlogPage />
      </Layout>
    </ProtectedRoute>
  );
}

