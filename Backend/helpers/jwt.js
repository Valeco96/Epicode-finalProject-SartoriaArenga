import jwt from "jsonwebtoken";

//Genera un JWT valido per 30 giorni
export function generateJWT(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRESIN },
      (error, token) => {
        if (error) {
          console.error("Errore nella generazione del token", error);
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

//Verifica un JWT e restituisce il payload decodificato
export function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.error("Token non valido o scaduto", error.message);
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
}
