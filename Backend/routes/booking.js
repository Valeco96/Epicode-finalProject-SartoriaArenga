import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getPastBookings,
  getSingleBooking,
  getUpcomingBookings,
  updateBookingDate,
  updateBookingStatus,
} from "../controllers/booking.js";

const bookingRouter = express.Router();

//Rotta pubblica
bookingRouter.post("/", createBooking); // crea prenotazione (valida input, salva pending)

//Rotte private
bookingRouter.get("/", verifyToken, isAdmin, getAllBookings); // lista prenotazioni (filtro per status, data, paginazione)
bookingRouter.get("/upcoming", getUpcomingBookings); //Prenotazioni future
bookingRouter.get("/past", getPastBookings); //Prenotazioni passate
bookingRouter.get("/:id", verifyToken, isAdmin, getSingleBooking); // dettaglio prenotazione
bookingRouter.patch("/:id/status", verifyToken, isAdmin, updateBookingStatus); // aggiorna stato o note parte admin
//bookingRouter.patch("/:id/date", updateBookingDate); //aggiorna data appuntamento
bookingRouter.delete("/:id", verifyToken, isAdmin, deleteBooking); // opzionale (soft delete o hard delete)

export default bookingRouter;
