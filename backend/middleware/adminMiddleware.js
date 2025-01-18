import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";

export const adminMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.admin = decoded;

      Admin.findById(
        req.admin._id
          .then((admin) => {
            if (!admin || !admin.isAdmin) {
              return res
                .status(403)
                .send({ error: "Access denied Admins only" });
            }
            next();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Internal server Error." });
          })
      );
    } catch (error) {
      res.status(400).send({ error });
    }
  }
};
