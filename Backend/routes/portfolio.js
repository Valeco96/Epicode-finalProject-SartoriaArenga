import express from "express";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import {
  createPiece,
  deletePiece,
  editPiece,
  getAllPieces,
  getSinglePiece,
  updateImage,
} from "../controllers/portfolio.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const portfolioRouter = express.Router();

//Rotte pubbliche
portfolioRouter.get("/", getAllPieces);
portfolioRouter.get("/:id", getSinglePiece);

//Rotte private (admin)
portfolioRouter.post(
  "/",
  verifyToken,
  isAdmin,
  uploadCloudinary.single("image"),
  createPiece
);
portfolioRouter.put(
  "/:id",
  verifyToken,
  isAdmin,
  uploadCloudinary.single("image"),
  editPiece
);
portfolioRouter.patch(
  "/:imageId/image",
  uploadCloudinary.single("image"),
  verifyToken,
  isAdmin,
  updateImage
);
portfolioRouter.delete("/:id", verifyToken, isAdmin, deletePiece);

export default portfolioRouter;
