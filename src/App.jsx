import { Button } from "@/components/ui/button";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginForm } from "./components/Login/Login";
import { SignUpForm } from "./components/signup/signup";
import { AuthProvider } from "./components/utils/authContext";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "./components/sidebar/Sidebar"
import Home from "./components/Home/Home";
import Layout from "./components/Layout";
import CreateBlog from "./components/Blog Components/Create Blog/CreateBlog";
import BlogPage from "./components/Blog Components/ReadBlog/ReadBlog";
import MyBlogs from "./components/Blog Components/My blogs/MyBlog";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/" element={  <Layout>  <Home />  </Layout> } />

            {/* Sidebar Layout for all others */}
            <Route path="/my-blogs" element={<Layout><MyBlogs /></Layout>} />
            <Route path="/create" element={<Layout><CreateBlog /></Layout>} />
            <Route path="/profile" element={<Layout><div>Profile Page</div></Layout>} />
            <Route path="/settings" element={<Layout><div>Settings Page</div></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogPage /></Layout>} />
          </Routes>
        </Router>
        {/* </SidebarProvider> */}
      </AuthProvider>
    </div>
  );
}

export default App;
