import CommentSection from "./CommentSection";

export default function ArticleDetail({ article }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-800 mb-6">{article.content}</p>

      <div className="flex items-center space-x-4 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          👍 Like
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          💬 Ask Question
        </button>
      </div>

      <CommentSection />
    </div>
  );
}
