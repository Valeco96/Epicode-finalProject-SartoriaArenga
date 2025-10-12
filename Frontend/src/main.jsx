//PUNTO DI INGRESSO DELLA NOSTRA APPLICAZIONE
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <App />
  //</StrictMode>,
);
