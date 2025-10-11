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

const portfolioRouter = express.Router();

//Rotte pubbliche
portfolioRouter.get("/", getAllPieces); // lista (supporta query: category, page, limit, search)
portfolioRouter.get("/:id", getSinglePiece);

//Rotte private (admin)
portfolioRouter.post("/", createPiece); // (autorizzazione admin da aggiungere)
portfolioRouter.put("/:id", uploadCloudinary.single("image"), editPiece); // (autorizzazione admin da aggiungere)
portfolioRouter.patch(
  "/:imageId/image",
  uploadCloudinary.single("image"),
  updateImage
);
portfolioRouter.delete("/:id", deletePiece); //(autenticazione admin da aggiungere)

export default portfolioRouter;
