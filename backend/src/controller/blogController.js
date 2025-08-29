
import Blog from "../models/Blog.js";
import { User } from "../models/user.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

   
    const blog = new Blog({
      title,
      content,
      author: req.user._id,
    });

    const savedBlog = await blog.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { blogs: savedBlog._id },
    });

    res.status(201).json(savedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.userId })
      .populate("author", "name email profileImage"); 
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};



