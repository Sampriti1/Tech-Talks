import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

export default function BlogFeed() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [commentTexts, setCommentTexts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handlePostBlog = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const res = await fetch("http://localhost:5000/api/blogs", {
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
  };

  const handleLike = async (id) => {
    await fetch(`http://localhost:5000/api/blogs/${id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBlogs();
  };

  const handleComment = async (id) => {
    const text = commentTexts[id];
    if (!text) return;

    await fetch(`http://localhost:5000/api/blogs/${id}/comment`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text }),
    });

    setCommentTexts({ ...commentTexts, [id]: "" });
    fetchBlogs();
  };

  return (
    <div className="container mx-auto p-6">
 
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-3">Write a Tech Blog</h2>
        <form onSubmit={handlePostBlog} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
            Post Blog
          </button>
        </form>
      </div>

   
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white shadow-md rounded-xl p-6 mb-5 hover:shadow-lg transition"
        >
          <div className="flex items-center mb-3">
           
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center mr-3">
  <img
    className="w-full h-full object-cover"
    src={
      blog.author?.profileImage
        ? `http://localhost:5000${blog.author.profileImage}`
        : "/default-profile.png"
    }
    alt="profile"
  />
</div>

            <div>
              <p className="font-semibold">{blog.author.email}</p>
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
          <p className="mb-3">{blog.content}</p>
           <Link
  to={`/app/blogs/${blog._id}`}
  className="text-blue-500 hover:underline"
>
  Read More →
</Link>
          <div className="flex gap-4 mb-3">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleLike(blog._id)}
            >
              👍 Like ({blog.likes.length})
            </button>
          </div>

       
          <div className="mt-3">
            <h4 className="font-semibold text-gray-700 mb-2">Comments:</h4>
            {blog.comments.map((c) => (
              <p key={c._id} className="text-sm mb-1">
                <span className="font-semibold">{c.user.email}:</span> {c.text}
              </p>
            ))}

            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add a comment"
                value={commentTexts[blog._id] || ""}
                onChange={(e) =>
                  setCommentTexts({ ...commentTexts, [blog._id]: e.target.value })
                }
                className="flex-1 border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={() => handleComment(blog._id)}
                className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
