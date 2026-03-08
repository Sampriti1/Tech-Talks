import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token");
const apiUrl ="http://localhost:5000/api";
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

const handleDeletePost = async () => {
  try {
    await fetch(`${apiUrl}/blogs/${blog._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    window.location.href = "/app/home";

  } catch (err) {
    console.error("Delete post error:", err);
  }
};
const handleDeleteComment = async (commentId) => {
  try {
    await fetch(`${apiUrl}/blogs/${blog._id}/comment/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setBlog(prev => ({
      ...prev,
      comments: prev.comments.filter(c => c._id !== commentId),
    }));

  } catch (err) {
    console.error("Delete comment error:", err);
  }
};
  if (!blog) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-surface shadow-md rounded-xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto text-white">
      
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
    <div key={c._id} className="flex justify-between">
      <p className="text-xs sm:text-sm md:text-base break-words text-gray-200">
        <span className="font-semibold">{c.user.email}:</span> {c.text}
      </p>

      {currentUser && c.user._id === currentUser._id && (
        <button
          onClick={() => handleDeleteComment(c._id)}
          className="text-red-500 text-xs ml-2"
        >
          Delete
        </button>
      )}
    </div>
  ))
) : (
  <p className="text-gray-500 text-sm">No comments yet.</p>
)}
        </div>
        {currentUser && blog.author._id === currentUser._id && (
  <button
    onClick={handleDeletePost}
    className="bg-red-500 text-white px-3 py-1 rounded mb-4"
  >
    Delete Post
  </button>
)}
      </div>
    </div>
  );
}
