"use client";
import Layout from "@/components/Layout";
import MyBlogs from "@/components/Blog Components/My blogs/MyBlog";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function MyBlogsPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <MyBlogs />
      </Layout>
    </ProtectedRoute>
  );
}

