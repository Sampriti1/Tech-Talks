import Blog from "../models/Blog.js";
import {User } from "../models/user.js";
export const getProfile = async (req, res) => {
  try {

    const user = await user.findById(req.user._id).populate("blogs");
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email, 
      blogs: user.blogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};