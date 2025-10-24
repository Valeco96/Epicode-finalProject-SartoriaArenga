import axios from "./axios.js";

export async function login(email, password) {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    return response.data; //{message, token}
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Errore di connessione al server.");
    }
  }
}

