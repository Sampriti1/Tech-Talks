// blogRoutes.js
import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { createBlog, getUserBlogs } from "../controller/blogController.js";
import Blog from "../models/Blog.js";

const router = express.Router();


router.post("/", authenticateUser, createBlog);

router.get("/user/:userId", authenticateUser, getUserBlogs);


router.get("/", authenticateUser, async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "name email profileImage")
      .populate("comments.user", "email")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/:id/like", authenticateUser, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user._id;
    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/:id/comment", authenticateUser, async (req, res) => {
  try {
    const { text } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({ user: req.user._id, text });
    await blog.save();
    const populatedBlog = await blog.populate("comments.user", "email");
    res.json(populatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "email")
      .populate("comments.user", "email");

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
