export function isAdmin(request, response, next) {
  try {
    //Controlla che l'utente sia stato verificato anche dal middleware precedente
    if (!request.user) {
      return response.status(401).json({ message: "Utente non autenticato" });
    }
    //Controlla il flag isAdmin nel JWT o nel database
    if (request.user.isAdmin !== true) {
      return response
        .status(403)
        .json({ message: "Accesso negato. Solo admin autorizzati." });
    }

    //Se e' admin puo' passare

    next();
  } catch (error) {
    console.error(
      "L'utente non risulta come admin/Accesso negato",
      error.message
    );
    response.status(500).json({ message: "Errore del server" });
  }
}
