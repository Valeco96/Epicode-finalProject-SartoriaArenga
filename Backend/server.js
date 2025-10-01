import express from "express";
import "dotenv/config";

const port = process.env.PORT;
const server = express();

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));
