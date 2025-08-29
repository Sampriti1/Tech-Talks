
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-3">{blog.title}</h2>
        <p className="text-gray-500 mb-4">
          By {blog.author.email} • {new Date(blog.createdAt).toLocaleString()}
        </p>
        <p className="mb-6">{blog.content}</p>

        <h3 className="font-semibold text-lg mb-2">Comments</h3>
        {blog.comments.map((c) => (
          <p key={c._id} className="mb-1">
            <span className="font-semibold">{c.user.email}:</span> {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}
