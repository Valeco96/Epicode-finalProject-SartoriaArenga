import { Schema, model } from "mongoose";

const portfolioSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
    },
    categories: { type: [String], required: true },
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      required: true,
    },
    visible: { type: Boolean, default: true }, //per nascondere i lavori non pubblici
  },
  { timestamps: true }
);

const Portfolio = model("Porfolio", portfolioSchema);

export default Portfolio;
