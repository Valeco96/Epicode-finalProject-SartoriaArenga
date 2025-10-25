import "dotenv/config"; // importa il contenuto del file env
import cors from "cors"; // permette di gestire il CORS (chiamate da FE su indirizzi diversi da quello del BE)
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import bookingRouter from "./routes/booking.js";
import portfolioRouter from "./routes/portfolio.js";
import globalErrors from "./middlewares/globalErrors.js";

const server = express(); // creo il server base
const port = process.env.PORT || 2000;
const corsOptions = {
  origin: [
    "http://localhost:5173", // per sviluppo
    "https://sartoria-arenga.netlify.app", // dominio Netlify
  ],
  credentials: true,
};

server.use(cors(corsOptions));
server.use(morgan("tiny"));
server.use(express.json()); // per gestire i body di tipo json

//rotta per l'autenticazione
server.use("/api/auth", authRouter);
server.use("/api/portfolio", portfolioRouter);
server.use("/api/bookings", bookingRouter);

server.use(globalErrors);

await mongoose
  .connect(process.env.MONGODB_CONNECTION_URI)
  .then(() => console.log("Connesso al database."))
  .catch((error) => console.log(error));

server.get("/", (request, response) => {
  response.send("Server online!");
});

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`)); // il server é in ascolto di richieste alla porta indicata
