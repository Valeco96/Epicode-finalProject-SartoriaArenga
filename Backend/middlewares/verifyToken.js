import { verifyJWT } from "../helpers/jwt.js";

export async function verifyToken(request, response, next) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response
        .status(401)
        .json({ message: "Token mancante o non valido" });
    }

    //Verifica il token
    const token = authHeader.split(" ")[1];
    const decoded = await verifyJWT(token);

    //Salva i dati dell'utente verificati nella request:
    request.user = decoded;

    next();
  } catch (error) {
    console.error("Errore nell'autenticazione: ", error.message);
    response.status(401).json({ message: "Token non valido o scaduto" });
  }
}
