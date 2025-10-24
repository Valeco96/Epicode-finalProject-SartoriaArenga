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
  updateBookingStatus,
} from "../controllers/booking.js";

const bookingRouter = express.Router();

//Rotta pubblica
bookingRouter.post("/", createBooking); 

//Rotte private
bookingRouter.get("/", verifyToken, isAdmin, getAllBookings); 
bookingRouter.get("/upcoming", getUpcomingBookings); 
bookingRouter.get("/past", getPastBookings); 
bookingRouter.get("/:id", verifyToken, isAdmin, getSingleBooking); 
bookingRouter.patch("/:id/status", verifyToken, isAdmin, updateBookingStatus); 
bookingRouter.delete("/:id", verifyToken, isAdmin, deleteBooking);

export default bookingRouter;
