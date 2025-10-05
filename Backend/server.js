import "dotenv/config"; // importa il contenuto del file env
import cors from "cors"; // permette di gestire il CORS (chiamate da FE su indirizzi diversi da quello del BE)
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";

const port = process.env.PORT;
const server = express(); // creo il server base
server.use(cors()); // accetta richieste da qualsiasi indirizzo - non specificato
server.use(express.json()); // per gestire i body di tipo json

//indirizzo di esempio per provare che funzioni
server.get("/", (request, response) => response.send("heyyy"));
server.get("/bo", (request, response) => response.send("theereee"));
server.get("/username", (request, response) =>
  response.send({ username: "suzu" })
);

//rotta per l'autenticazione
server.use("/api/auth", authRouter);

await mongoose
  .connect(process.env.MONGODB_CONNECTION_URI)
  .then(() => console.log("Connesso al database."))
  .catch((error) => console.log(error));

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`)); // il server é in ascolto di richieste alla porta indicata
