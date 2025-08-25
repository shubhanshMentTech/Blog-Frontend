"use client";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("@/components/Home/Home"), { ssr: false });

export default function Page(){
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

