import { BookHeart, CalendarDays, MessagesSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BlogListItem({ title, content, createdAt, likes, comments, mainImage, _id }) {

    const router = useRouter();
    const handleOpen= () =>{
        router.push(`/blog/${_id}`);
        localStorage.setItem("presentBlog", _id);
        console.log("presentBlog set:- ", _id);
    }
    return (
        <div onClick={handleOpen} className=" cursor-pointer hover:scale-[1.04] duration-200 min-w-sm sm:min-w-md md:min-w-xl lg:min-w-2xl  flex justify-between border-2 relative shadow-xl gap-8 rounded-2xl py-6 px-4 h-60">


            {/* content */}
            <div className=" flex flex-col justify-between">
                <h2 className="font-black text-2xl">{title}</h2>
                <div
                    className="opacity-60 text-justify over"
                    dangerouslySetInnerHTML={{
                        __html: content.length > 100 ? content.slice(0, 80) + '...' : content,
                    }}
                />
                <div className=" relative flex gap-6 font-medium text-gray-700">
                    <p className=" flex items-center gap-0.5 text-[12px]"><CalendarDays height={16} />{new Date(createdAt).toLocaleDateString("en-GB")}</p>
                    <p className=" flex items-center gap-0.5">{likes}<BookHeart height={16} /></p>
                    <p className=" flex items-center gap-0.5">{comments.length}<MessagesSquare height={16} /></p>
                </div>
            </div>

            {/* image */}
            {mainImage && <img className=" max-w-2/5 w-fit h-full border self-center object-cover rounded-lg" src={mainImage} />}

        </div>
    );
}
