
import { Link } from "react-router-dom";

const ArticleCard = ({ title, author, preview }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400 text-sm mb-2">By {author}</p>
      <p className="text-gray-300">{preview}</p>
      <Link
        to="/article/1"
        className="inline-block mt-4 text-blue-400 hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
};

export default ArticleCard;
