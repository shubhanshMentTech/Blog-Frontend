import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'
import { BookHeart, CalendarDays, Loader2, MessagesSquare } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import EmailFormDialog from '../AddParticipantBox'
import AddParticipantBox from '../AddParticipantBox'
/**
 * @typedef {Object} Blog
 * @property {{ $oid: string }} _id
 * @property {string} title
 * @property {string} content
 * @property {number} likes
 * @property {any[]} comments
 * @property {{ $date: string }} createdAt
 * @property {{ $date: string }} updatedAt
 */

export default function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // to check if user is the owner of blog
    let isMyBlog =false;
    if(blog?.owners?.includes(localStorage.getItem("userId"))) isMyBlog = true;

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/blog/getBlog', { id });
                setBlog(response.data);
                localStorage.setItem('presentBlog', response.data._id.$oid);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive">{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Blog Not Found</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        );
    }


    return (
        <div className="container  md:w-2xl">
            <Card className="shadow-none rounded-none  ">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className=" font-black text-xl md:text-3xl lg:text-5xl">{blog.title}</CardTitle>
                        <div className="flex gap-2">
                            <Badge variant="secondary">
                                <CalendarDays height={16} />
                                {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
                            </Badge>
                            {isMyBlog && <AddParticipantBox blogId={id}/>}
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <Badge className="border-0" variant="outline">
                            {blog.likes} {blog.likes === 1 ? <BookHeart fill='red' height={16} /> : <BookHeart height={16} />}
                        </Badge>
                        <Badge className="border-0" variant="outline">
                            {blog.comments.length} <MessagesSquare height={20} />
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <article
                        className="prose max-w-none dark:prose-invert text-xl  text-gray-500"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
