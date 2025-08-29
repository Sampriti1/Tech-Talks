import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profileImage = `/uploads/${req.file.filename}`;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password,  profileImage });
    const token = makeToken(user._id);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, profileImage: user.profileImage }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = makeToken(user._id);
    return res.json({
  message: "Login successful",
  token,
  user: { id: user._id, name: user.name, email: user.email, profileImage: user.profileImage }
});

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email createdAt");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
