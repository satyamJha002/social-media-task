import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imagePath = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      uploadedAt: new Date(),
    }));

    const newUser = new User({
      name,
      socialMediaHandle,
      uploadedImages: imagePath,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User submitted successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found", users: [] });
    }
    res.status(200).json({ success: true, message: "Fetch successful", users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.uploadedImages.forEach((image) => {
      const filePath = path.join(__dirname, "..", image.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};
