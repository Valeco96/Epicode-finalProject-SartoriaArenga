import axios from "./axios.js";

export async function login(email, password) {
  try {
    const response = await axios.post("/api/auth/login", { email, password });
    const token = response.data.token;
    console.log("Dati ricevuti:", response, token);
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Errore login:", error);
    throw error;
  }
}
