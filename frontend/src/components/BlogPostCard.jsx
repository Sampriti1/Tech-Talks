import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare } from "lucide-react";

const BlogPostCard = ({ blog, onLike, onComment, onDeletePost, onDeleteComment, currentUser }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(blog._id, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border transition hover:border-primary">

      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4"
            src={blog.author?.profileImage ? `http://localhost:5000${blog.author.profileImage}` : "/default-profile.png"}
            alt={blog.author.name}
          />
          <div>
            <p className="font-semibold text-text-main">
              {blog.author.name || blog.author.email}
            </p>
            <p className="text-xs text-text-muted">
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

      
        {currentUser && blog.author._id === currentUser._id && (
          <button
            onClick={() => onDeletePost(blog._id)}
            className="text-red-500 text-xs"
          >
            Delete
          </button>
        )}
      </div>

      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-text-main mb-2 hover:text-primary transition-colors">
          <Link to={`/app/blogs/${blog._id}`}>{blog.title}</Link>
        </h3>
        <p className="text-text-muted line-clamp-3">{blog.content}</p>
      </div>

    
      <div className="flex items-center gap-6 text-text-muted mb-4">
        <button
          className="flex items-center gap-2 hover:text-red-500 transition-colors"
          onClick={() => onLike(blog._id)}
        >
          <Heart size={20} />
          <span>{blog.likes.length} Likes</span>
        </button>

        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <span>{blog.comments.length} Comments</span>
        </div>
      </div>


      <div className="pt-4 border-t border-border">
        <div className="space-y-3 mb-4">
          {blog.comments.slice(-2).map((c) => (
            <div key={c._id} className="flex justify-between text-sm">
              <div>
                <span className="font-semibold text-text-main">
                  {c.user.email}:
                </span>{" "}
                <span className="text-text-muted">{c.text}</span>
              </div>

              
              {currentUser && c.user._id === currentUser._id && (
                <button
                  onClick={() => onDeleteComment(blog._id, c._id)}
                  className="text-red-400 text-xs"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-background border border-border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white text-sm"
          />
          <button
            type="submit"
            className="flex-1 bg-background text-white border border-border px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm placeholder-gray-400"
          >
            Post
          </button>
        </form>
      </div>

    </div>
  );
};

export default BlogPostCard;