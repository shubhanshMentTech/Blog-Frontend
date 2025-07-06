import BlogList from "../Blog Components/BlogList";



export default function Home(){
    

    return (
        <div className=" flex flex-col gap-8">
            <h1 className=" text-black text-6xl font-black">Feed</h1>

            <BlogList />
        </div>
    )
}