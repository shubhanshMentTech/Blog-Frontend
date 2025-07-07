import BlogListItem from './BlogListItem'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import axiosInstance from '../utils/axiosInstance.utils'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [myBlogs, setMyBlogs] = useState([])
  const [fromCount, setFromCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadRef = useRef(null)

  const isElementInViewport = (el) => {
    if (!el) return false
    const rect = el.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom >= 0
  }

  const fetchBlogs = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      if (window.location.pathname === "/") {
        const response = await axiosInstance.post("http://localhost:3000/api/v1/blog/getBlogs", {
          from: fromCount,
        })

        const newBlogs = response.data || []
        setBlogs((prev) => {
          const prevIds = new Set(prev.map((b) => b._id))
          const filtered = newBlogs.filter((b) => !prevIds.has(b._id))
          return [...prev, ...filtered]
        })

        if (newBlogs.length < 5) setHasMore(false) // assuming 5 per fetch
        setFromCount(blogs.length)
      }

      if (window.location.pathname === "/my-blogs") {
        const response = await axiosInstance.post("http://localhost:3000/api/v1/blog/getMyBlogs", {
          id: localStorage.getItem("userId"),
        })
        setMyBlogs(response.data)
      }
    } catch (error) {
      console.error("Fetch error:", error)
    }
    setLoading(false)
  }

  // Initial load
  useEffect(() => {
    fetchBlogs()
  }, [])

  // Scroll listener to check visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname !== "/") return
      if (isElementInViewport(loadRef.current)) {
        fetchBlogs()
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [blogs, loading, hasMore]) // re-run when blogs change

  return (
    <>
      <div className="max-w-[600px] flex flex-col gap-8 mx-auto">
        {(window.location.pathname === "/" ? blogs : myBlogs).map((item, idx) => (
          <div key={idx} ref={idx === blogs.length - 1 ? loadRef : null}>
            <BlogListItem {...item} />
          </div>
        ))}
        {loading && <p className="text-center">Loading more...</p>}
        {!hasMore && <p className="text-center text-gray-500">No more blogs</p>}
      </div>
    </>
  )
}
