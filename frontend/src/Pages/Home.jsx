
import Sidebar from "../components/SideBar";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  return (
    <div className="flex gap-6 p-6">
     
      

      
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ArticleCard
            title="The Future of AI"
            author="Alice"
            preview="Artificial Intelligence is shaping the future of technology..."
          />
          <ArticleCard
            title="Mastering JavaScript"
            author="Bob"
            preview="JavaScript is the backbone of modern web applications..."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
