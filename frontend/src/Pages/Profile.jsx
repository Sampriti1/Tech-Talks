import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
    
      if (!parsedUser._id && parsedUser.id) parsedUser._id = parsedUser.id;
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/blogs/user/${user._id}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(res.data)) {
          setMyBlogs(res.data);
        } else {
          console.error("Expected an array, got:", res.data);
          setMyBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setMyBlogs([]);
      }
    };

    if (user && user._id && token) fetchBlogs();
  }, [user, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!user) return <p className="p-6">No user logged in.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
<div className="user-profile" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
<img
  src={
    user?.profileImage
      ? `http://localhost:5000${user.profileImage}`
      : "/default-profile.png"
  }
  alt={user?.name}
  className="w-16 h-16 rounded-full"
/>


      </div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <h3 className="text-xl mt-6">My Blogs</h3>
      {myBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        myBlogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded my-2">
            <h4 className="font-bold">{blog.title}</h4>
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
}
