import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token");
const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`${apiUrl}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 break-words">
          {blog.title}
        </h2>

     
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4">
          By <span className="font-semibold">{blog.author.email}</span> •{" "}
          {new Date(blog.createdAt).toLocaleString()}
        </p>

      
        <p className="mb-6 text-sm sm:text-base leading-relaxed break-words">
          {blog.content}
        </p>

        
        <h3 className="font-semibold text-lg sm:text-xl mb-2">Comments</h3>
        <div className="space-y-2">
          {blog.comments.length > 0 ? (
            blog.comments.map((c) => (
              <p
                key={c._id}
                className="text-xs sm:text-sm md:text-base break-words"
              >
                <span className="font-semibold">{c.user.email}:</span> {c.text}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
