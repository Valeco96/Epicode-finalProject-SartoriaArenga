import "dotenv/config"; // importa il contenuto del file env
import cors from "cors"; // permette di gestire il CORS (chiamate da FE su indirizzi diversi da quello del BE)
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import portfolioRouter from "./routes/portfolio.js";
import bookingRouter from "./routes/booking.js";

const port = process.env.PORT;
const server = express(); // creo il server base
server.use(cors()); // accetta richieste da qualsiasi indirizzo - non specificato
server.use(express.json()); // per gestire i body di tipo json

//rotta per l'autenticazione
server.use("/api/auth", authRouter);
server.use("/api/portfolio", portfolioRouter);
server.use("/api/bookings", bookingRouter);

await mongoose
  .connect(process.env.MONGODB_CONNECTION_URI)
  .then(() => console.log("Connesso al database."))
  .catch((error) => console.log(error));

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`)); // il server é in ascolto di richieste alla porta indicata
