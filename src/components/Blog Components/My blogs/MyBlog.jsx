import BlogList from "../BlogList";



export default function MyBlogs(){
    

    return (
        <div className=" flex flex-col gap-8">
            <h1 className=" text-black text-6xl font-black">My Blogs</h1>

            <BlogList />
        </div>
    )
}