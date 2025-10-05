import express from "express";

const authRouter = express.Router();

authRouter.get("/login", (request, response) => {
  response.send("Login route attiva");
});

export default authRouter;
