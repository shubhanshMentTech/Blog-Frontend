import axios from "axios"
import React, { useState, useRef, useMemo } from "react"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export default function BlogEditor({ onSubmit }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const quillRef = useRef(null)

  // const CLOUD_NAME = "dkyvtqujp"          // ⬅️ Replace
  // const UPLOAD_PRESET = "BlogMentTech"    // ⬅️ Replace



  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1,2,3,4,5, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "image"],
        ["clean"],
      ],
    },
  }), []) 


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !content) {
      alert("Please fill in all fields.")
      return
    }

    onSubmit({ title, content }) // Pass data to parent
  }

  return (
    <div className=" max-w-2xl lg:w-2xl mx-auto p-6 bg-white  rounded-lg">

      <form onSubmit={handleSubmit} className=" w-full space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2 text-lg"
        />

        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your blog content here..."
          className="bg-white w-full"
          modules={modules}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </form>
    </div>
  )
}
