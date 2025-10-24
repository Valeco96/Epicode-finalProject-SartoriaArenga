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
      enum: ["giacca", "abito", "gilet", "pantalone", "cappotto"],
    },
    color: {
      type: [String],
      enum: [
        "bianco",
        "beige",
        "grigio",
        "azzurro",
        "blu",
        "arancione",
        "rosso",
        "borgogna",
        "marrone",
      ],
    },
    fabric: {
      type: [String],
      enum: [
        "cotone",
        "lino",
        "lana/lino/seta",
        "lana/lino",
        "lana",
        "cachemire",
        "lana/cachemire",
      ],
    },
    season: {
      type: [String],
      enum: ["quattro stagioni", "estate", "inverno"],
    },
    image: {
      type: String,
      required: true,
      trim:true,
    },
    imagePublicId: {
      //Id di Cloudinary per eventuale eliminazione
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Portfolio = model("Porfolio", portfolioSchema);

export default Portfolio;
