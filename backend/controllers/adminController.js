import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Fill all the required fields." });
    }

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

    if (!usernamePattern.test(username)) {
      return res.status(400).json({
        success: false,
        message:
          "Username contains invalid characters. Only letters, numbers, dots, and underscores are allowed.",
      });
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-15 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, ., #, $, !, %, *, ?, or &)",
      });
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ username, password: hashPassword });

    await admin.save();

    res.status(201).json({ success: true, message: "Admin is registered" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error });
  }
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Fill all the required fields." });
    }

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
