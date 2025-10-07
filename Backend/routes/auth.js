import bcrypt from "bcrypt";
import express from "express";
import { Router } from "express";
import User from "../models/User.js";
import { login } from "../controllers/auth.js";
import { generateJWT } from "../helpers/jwt.js";

const authRouter = express.Router();

authRouter.post("/register", async (request, response, next) => {
  try {
    const { username, email, password, isAdmin } = request.body;

    //crea un nuovo user
    const adminUser = new User({
      username,
      email,
      password,
      isAdmin,
    });

    await adminUser.save();

    //genera JWT
    const token = await generateJWT({ id: adminUser._id });

    //manda la risposta
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
    console.error("Errore nel processo di registrazione", error);
    response
      .status(500)
      .json({ message: "Errore durante la registrazione", error });
    next(error);
  }
});

 authRouter.post("/login", login);
// async (request, response, next) => {
//   const body = request.body;

//   //cerchiamo l'utente con la mail
//   const user = (await User.findOne({ email: body.email.toLowerCase() })).select(
//     "+passwordHash"
//   );
//   // se non lo troviamo: errore
//   if (!user) return next(createHttpError.Unauthorized("Credenziali sbagliate"));
//   // se lo troviamo: verifichiamo la password
//   if (!(await bcrypt.compare(body.password, user.password)))
//     return next(createHttpError.Unauthorized("Credenziali sbagliate"));

//   // generare il token per le risposte future
//   const token = await generateJWT({userId: user._id});

//   response.send({ token });
// });

export default authRouter;
