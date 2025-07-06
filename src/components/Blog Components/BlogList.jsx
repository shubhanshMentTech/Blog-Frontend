import BlogListItem from './BlogListItem';

import img1 from '../../assets/Screenshot 2025-04-17 191548.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [myBlogs, setMyBlogs] = useState([]);


    const [fromCount, setFromCount] = useState(0);
    
    

    const fetchBlogs = async () => {
        try {
            if (window.location.pathname === "/") {



                const response = await axios.post("http://localhost:3000/api/blog/getBlogs",{from:fromCount});
                setBlogs(prev => {
                    const prevIds = new Set(prev.map(b => b._id));
                    const newBlogs = response.data.filter(b => !prevIds.has(b._id));
                    return [...prev, ...newBlogs];
                });
                // console.log(blogs);
            }

            // fetch user blogs
            if (window.location.pathname === "/my-blogs") {
                const response = await axios.post("http://localhost:3000/api/blog/getMyBlogs",{id: localStorage.getItem("userId")});
                setMyBlogs(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        console.log("updated fromCount: ", fromCount);
        fetchBlogs();
    },[fromCount])

    useEffect(() => {
    if (window.location.pathname !== "/") return;

    const trigger = ScrollTrigger.create({
        trigger: ".loadTrigger",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
        onEnter: () => {
        setFromCount((prev) => {
            if (prev < blogs.length) {
            return blogs.length; // only update if new blogs exist
            }
            return prev;
        });
        },
    });

    return () => {
        trigger.kill(); // ✅ cleanup
    };
    }, [blogs]);


    return (
        <>
            {blogs ? (
                <div className=' max-w-[600px] flex flex-col gap-8'>
                    {(window.location.pathname === "/" ? blogs : myBlogs).map((item, idx) => (
                        <div key={idx} className={idx === blogs.length - 1 ? 'loadTrigger' : ''}>
                            <BlogListItem {...item} />
                        </div>
                    ))}
                </div>
            ) :
            <p className=' font-black text-5xl'>Loading...</p>}
        </>
    );
}