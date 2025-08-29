import { useState } from "react";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      <div className="mb-4">
        <textarea
          className="w-full border p-2 rounded-md"
          rows="2"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>

      <ul className="space-y-2">
        {comments.map((c, idx) => (
          <li key={idx} className="bg-gray-100 p-2 rounded-md">{c}</li>
        ))}
      </ul>
    </div>
  );
}
