import express from "express";
import User from "../models/User.js";
import { login } from "../controllers/auth.js";
import { generateJWT } from "../helpers/jwt.js";

const authRouter = express.Router();

authRouter.post("/register", async (request, response, next) => {
  try {
    const { username, email, password, isAdmin } = request.body;

    //Crea un nuovo user
    const adminUser = new User({
      username,
      email,
      password,
      isAdmin,
    });

    await adminUser.save();

    //Genera JWT
    const token = await generateJWT({ id: adminUser._id });

    //Manda la risposta
    response.status(201).json({
      message: "User admin creato con successo!",
      token,
      user: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        isAdmin: true,
      },
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore durante la registrazione", error });
    next(error);
  }
});

authRouter.post("/login", login);

export default authRouter;
