import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; 

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

  if (!user || loading) return <p className="p-4">Loading sidebar...</p>;

  return (
    <>
      
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">Profile</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      <aside
        className={`bg-gray-800 text-white p-4 sm:p-6 shadow-md 
          w-full sm:w-72 md:w-64 
          md:block 
          fixed md:static top-0 h-full md:h-auto z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
     
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              user?.profileImage
                ? `http://localhost:5000${user.profileImage}`
                : "/default-profile.png"
            }
            alt={user?.name}
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-xl font-bold mt-2">{user.name}</h2>
          <p className="text-gray-300 text-sm">{user.email}</p>
        </div>

     
        <div className="mb-6 text-sm">
          <p className="flex items-center gap-2"> Blogs: {myBlogs.length}</p>
          {user.createdAt && (
            <p className="flex items-center gap-2">
               Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

    
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Recent Articles</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1 max-h-40 overflow-y-auto text-sm">
            {myBlogs.slice(-5).reverse().map((blog) => (
              <li key={blog._id}>{blog.title}</li>
            ))}
            {myBlogs.length === 0 && <li>No blogs yet</li>}
          </ul>
        </div>

       
        <div className="flex flex-col gap-2">
          <button
            onClick={() => (window.location.href = "/app/settings")}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm sm:text-base"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProfileSidebar;
