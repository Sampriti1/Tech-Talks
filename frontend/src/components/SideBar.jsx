import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Settings, LogOut, Loader, Newspaper } from "lucide-react"; 

const ProfileSidebar = () => {
  const [user, setUser] = useState(null);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser._id && parsedUser.id) parsedUser._id = parsedUser.id;
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user || !user._id || !token) return;

      try {
        const res = await fetch(`http://localhost:5000/api/blogs/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) setMyBlogs(data);
        else setMyBlogs([]);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [user, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user || loading) {return (
    
      <aside className="bg-surface text-text-main p-6 w-72 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Loader className="animate-spin" />
          <p>Loading Profile...</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-surface text-text-main p-6 w-72 flex-shrink-0 hidden md:block rounded-r-xl">
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={user?.profileImage ? `http://localhost:5000${user.profileImage}` : "/default-profile.png"}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-primary mb-4"
        />
        <h2 className="text-xl font-bold text-text-main">{user.name}</h2>
        <p className="text-text-muted text-sm">{user.email}</p>
      </div>

      <div className="mb-8 text-sm space-y-2">
        <p className="flex items-center gap-2 text-text-muted">
          <Newspaper size={16} />
          <span>Blogs Published: {myBlogs.length}</span>
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-main">Recent Articles</h3>
        <ul className="space-y-2 max-h-40 overflow-y-auto">
          {myBlogs.slice(-5).reverse().map((blog) => (
            <li key={blog._id} className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer truncate">
              {blog.title}
            </li>
          ))}
          {myBlogs.length === 0 && <li className="text-sm text-text-muted">No articles yet.</li>}
        </ul>
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-border">
        <Link to="/app/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-border transition-colors">
          <Settings size={20} /> Settings
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;