import express from "express";

const portfolioRouter = express.Router();

//Rotte pubbliche
portfolioRouter.get("/", (request, response) => {
  response.send("Portfolio route attiva");
}); // lista (supporta query: category, page, limit, search)
portfolioRouter.get("/:id", (request, response) => {
  response.send("Portfolio id attiva");
}); // dettaglio lavoro

//Rotte private (admin)
portfolioRouter.post("/", (request, response) => {
  response.send("Portfolio route POST attiva");
}); // crea lavoro (autenticazione admin da aggiungere)
portfolioRouter.put("/:id", (request, response) => {
  response.send("Portfolio PUT id attiva");
}); // modifica il lavoro (autorizzazione admin da aggiungere)
portfolioRouter.delete("/:id", (request, response) => {
  response.send("Portfolio DELETE id attiva");
}); // elimina il lavoro (autenticazione admin da aggiungere)

export default portfolioRouter;
