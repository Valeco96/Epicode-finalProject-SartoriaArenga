import { generateJWT } from "../helpers/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function login(request, response, next) {
  try {
    const { email, password } = request.body;
    console.log(request.body);

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email e password sono obbligatorie." });
    }

    const userEmail = await User.findOne({ email }).select(`+password`);
    if (!userEmail) {
      return response
        .status(401)
        .json({ message: "Email o password non validi" });
    }

    //Confronta l'hash arrivato con la password salvata nel database
    const isMatch = await bcrypt.compare(password, userEmail.password);
    if (!isMatch) {
      return response
        .status(401)
        .json({ message: "Email o password non validi" });
    }

    //Genera il token JWT
    const token = await generateJWT({
      id: userEmail._id,
      email: userEmail.email,
      isAdmin: userEmail.isAdmin,
    });
    return response
      .status(200)
      .json({ message: "Accesso effettuato con successo", token: token });
  } catch (error) {
    response.status(500).json({
      message: "Errore nel funzionamento del server, riprova più tardi",
    });
  }
}
