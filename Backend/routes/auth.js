import express from "express";

const authRouter = express.Router();

authRouter.post("/login", (request, response) => {
  response.send("Login route attiva");
});

export default authRouter;
