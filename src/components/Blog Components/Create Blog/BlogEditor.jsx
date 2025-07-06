import axios from "axios"
import React, { useState, useRef, useMemo } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function BlogEditor({ onSubmit }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const quillRef = useRef(null)

  const CLOUD_NAME = "dkyvtqujp"          // ⬅️ Replace
  const UPLOAD_PRESET = "BlogMentTech"    // ⬅️ Replace

  const imageHandler = () => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.setAttribute("multiple", true)
    input.click()

    input.onchange = () => {
      setTimeout(async () => {
        if (!quillRef.current) {
          alert("Editor not ready.")
          return
        }

        const editor = quillRef.current.getEditor()
        const range = editor.getSelection(true)
        const files = Array.from(input.files)

        for (const file of files) {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("upload_preset", UPLOAD_PRESET)
          formData.append("cloud_name", CLOUD_NAME)

          try {
            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
              formData
            )

            const imageURL = res.data.secure_url
            // Insert image with custom style
            editor.insertEmbed(
              range.index,
              "image",
              imageURL,
              "user"
            )
            // Find the inserted image and set style
            setTimeout(() => {
              const editorElem = quillRef.current && quillRef.current.getEditor().root
              if (editorElem) {
                const imgs = editorElem.querySelectorAll(`img[src="${imageURL}"]`)
                imgs.forEach(img => {
                  img.style.height = "300px"
                  img.style.objectFit = "contain"
                  img.style.width = "100%"
                  img.style.display = "block"
                  img.style.margin = "0 auto"
                })
              }
            }, 0)
          } catch (error) {
            console.error("Cloudinary upload failed:", error)
            alert("Image upload failed")
          }
        }
      }, 0)
    }
  }


  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1,2,3,4,5, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
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
