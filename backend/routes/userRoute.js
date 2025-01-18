import express from "express";
import multer from "multer";
import fs from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";

import {
  createUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

const directory = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "../uploads"
);

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extName = filetypes.test(extname(file.originalname).toLowerCase());
    if (mimetype && extName) return cb(null, true);
    cb(new Error("Only images are allowed"));
  },
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post("/create", upload.array("image"), createUser);
router.get("/", getUsers);
router.delete("/delete", deleteUser);

export default router;
