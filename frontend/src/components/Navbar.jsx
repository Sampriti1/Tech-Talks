
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Tech Talks</h1>
      <div className="flex gap-6">
        <Link to="/app/blog" className="hover:text-blue-400">Home</Link>
     
        <Link to="/app/profile" className="hover:text-blue-400">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
