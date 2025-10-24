import { BrowserRouter, Routes, Route } from "react-router";
import PortfolioForm from "./components/PortfolioForm";
import Footer from "./components/Footer";
import SNavbar from "./components/SNavbar";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import PortfolioPage from "./pages/PortfolioPage";
import About from "./pages/About";
import AdminPortfolio from "./pages/AdminPortfolio";
import TradNapoli from "./pages/TradNapoli";
import AdminBookings from "./pages/AdminBookings";
import RichiediAppuntamento from "./pages/RichiediAppuntamento";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/tradizione-napoletana" element={<TradNapoli />} />
          <Route
            path="/richiedi-appuntamento"
            element={<RichiediAppuntamento />}
          />
          <Route path="/form-portfolio" element={<PortfolioForm />} />
          <Route path="/PortfolioForm/:id" element={<PortfolioForm />} />
          <Route path="/admin-storico-lavori" element={<AdminPortfolio />} />
          <Route path="/prenotazioni" element={<AdminBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
