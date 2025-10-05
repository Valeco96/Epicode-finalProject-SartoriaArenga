import express from "express";

const bookingRouter = express.Router();

//Rotta pubblica
bookingRouter.post("/", (request, response) => {
  response.send("Booking POST route attiva");
}); // crea prenotazione (valida input, salva pending)

//Rotte private
bookingRouter.get("/", (request, response) => {
  response.send("Booking route attiva");
}); // lista prenotazioni (filtro per status, data, paginazione)
bookingRouter.get("/:id", (request, response) => {
  response.send("Booking id route attiva");
}); // dettaglio prenotazione
bookingRouter.put("/:id", (request, response) => {
  response.send("Booking id PUT route attiva");
}); // aggiorna stato o note parte admin
bookingRouter.delete("/:id", (request, response) => {
  response.send("Booking DELETE route attiva");
}); // opzionale (soft delete o hard delete)

export default bookingRouter;