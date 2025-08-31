import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">Tech Talks</h1>

     
        <div className="hidden md:flex gap-6">
          <Link to="/app/blog" className="hover:text-blue-400">Home</Link>
          <Link to="/app/profile" className="hover:text-blue-400">Profile</Link>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          <Link
            to="/app/blog"
            className="hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/app/profile"
            className="hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
