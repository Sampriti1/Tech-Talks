import { useState, useEffect } from "react";
import BlogPostCard from "../components/BlogPostCard";

export default function BlogFeed() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const apiUrl = "http://localhost:5000/api";

  console.log("Current user", currentUser);
  const fetchBlogs = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${apiUrl}/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setBlogs(data);

    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  
  const handlePostBlog = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await fetch(`${apiUrl}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  
  const handleLike = async (id) => {
    try {
      await fetch(`${apiUrl}/blogs/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchBlogs();
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

 
  const handleComment = async (postId, text) => {
    try {
      await fetch(`${apiUrl}/blogs/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      fetchBlogs();
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  
  const handleDeletePost = async (postId) => {
    try {
      await fetch(`${apiUrl}/blogs/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(prev => prev.filter(blog => blog._id !== postId));

    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await fetch(`${apiUrl}/blogs/${postId}/comment/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(prev =>
        prev.map(blog =>
          blog._id === postId
            ? {
                ...blog,
                comments: blog.comments.filter(c => c._id !== commentId),
              }
            : blog
        )
      );

    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      
      <div className="bg-surface rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-white">Share Your Knowledge</h2>

        <form onSubmit={handlePostBlog} className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <textarea
  placeholder="What's on your mind?"
  value={content}
  onChange={(e) => setContent(e.target.value)}
  className="w-full bg-white text-black border border-border px-4 py-2 rounded-lg h-32 placeholder-gray-400"
/>

          <button className="bg-primary text-white px-6 py-2 rounded-lg">
            Post Blog
          </button>
        </form>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogPostCard
            key={blog._id}
            blog={blog}
            onLike={handleLike}
            onComment={handleComment}
            onDeletePost={handleDeletePost}
            onDeleteComment={handleDeleteComment}
            currentUser={currentUser}
          />
        ))}
      </div>

    </div>
  );
}