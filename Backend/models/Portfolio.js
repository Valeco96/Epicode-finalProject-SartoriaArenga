import { Schema, model } from "mongoose";

const portfolioSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
    },
    category: {
      type: [String],
      required: true,
      enum: ["giacca", "cappotto", "gilet", "smoking", "completo", "evento"],
    },
    color: {
      type: [String],
      enum: ["blu", "grigio", "nero"],
    },
    fabric: {
      type: [String],
      enum: ["cotone", "100% lana", "flanella"],
    },
    image: {
      type: String,
      required: true,
    },
    imagePublicId: {
      //Id di Cloudinary per eventuale eliminazione
      type: String,
      default: null,
    },
    visible: { type: Boolean, default: true }, //per nascondere i lavori non pubblici
  },
  { timestamps: true }
);

const Portfolio = model("Porfolio", portfolioSchema);

export default Portfolio;
