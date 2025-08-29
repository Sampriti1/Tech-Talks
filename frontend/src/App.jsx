import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import Home from "./Pages/Home";

import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BlogFeed from "./Pages/BlogFeed";
import BlogDetail from "./Pages/BlogDetail";
import Hero from "./Pages/HeroImage";
function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

   
        <Route
          path="/app/*"
          element={
            <div className="flex flex-col h-screen">
              <Navbar />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                  <Routes>
                    <Route path="home" element={<BlogFeed />} />
                  
                    <Route path="profile" element={<Profile />} />
                    <Route path="blog" element={<BlogFeed />} />
                    <Route path="blogs/:id" element={<BlogDetail />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

