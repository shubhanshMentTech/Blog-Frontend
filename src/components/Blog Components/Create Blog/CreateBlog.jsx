import axios from "axios"
import BlogEditor from "./BlogEditor"
import { useNavigate } from "react-router-dom"
import axiosInstance from "@/components/utils/axiosInstance.utils";

export default function CreateBlog() {
  
  const navigate = useNavigate();

  const handleBlogSubmit = async (data) => {
  try {
    const response = await axiosInstance.post("http://localhost:3000/api/v2/blog/create", {
      title:data.title,
      content:data.content,
    })

    console.log("Blog created:", response.data)
    navigate("/my-blogs");
  } catch (error) {
    console.error("Failed to create blog:", error.response?.data || error.message)
  }
}


  return(

    <div className=" relative flex flex-col gap-10">
        <h2 className=" text-5xl font-black">CREATE YOUR BLOG</h2>

        <BlogEditor onSubmit={handleBlogSubmit} />
    </div>
  )
}
