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
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/" element={  <Layout>  <Home />  </Layout> } />

            {/* Protected Routes */}
              <Route path="/my-blogs" element={<ProtectedRoute><Layout><MyBlogs /></Layout></ProtectedRoute>} />
              <Route path="/create" element={<ProtectedRoute><Layout><CreateBlog /></Layout></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Layout><div>Profile Page</div></Layout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Layout><div>Settings Page</div></Layout></ProtectedRoute>} />
              <Route path="/blog/:id" element={<ProtectedRoute><Layout><BlogPage /></Layout></ProtectedRoute>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
