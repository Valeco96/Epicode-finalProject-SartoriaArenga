import express from "express";
import cors from "cors"; // permette di gestire il CORS (chiamate da FE su indirizzi diversi da quello del BE)
import "dotenv/config"; // importa il contenuto del file env

const port = process.env.PORT;
const server = express(); // creo il server base
server.use(cors()); // accetta richieste da qualsiasi indirizzo - non specificato 

//indirizzo di esempio per provare che funzioni
server.get("/", (request, response) => response.send("heyyy"));
server.get("/bo", (request, response) => response.send("theereee"));
server.get("/username", (request, response) =>
  response.send({ username: "suzu" })
);

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`)); // il server é in ascolto di richieste alla porta indicata
