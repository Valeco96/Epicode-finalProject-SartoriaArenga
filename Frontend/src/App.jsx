//COMPONENTE CHE CONTIENE TUTTA LA PAGINA
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router";
import PortfolioForm from "./components/PortfolioForm";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import SNavbar from "./components/SNavbar";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import PortfolioPage from "./pages/PortfolioPage";
import About from "./pages/About";
import "./App.css";
import AdminPortfolio from "./pages/AdminPortfolio";
import TradNapoli from "./pages/TradNapoli";
import AdminBookings from "./pages/AdminBookings";
import RichiediAppuntamento from "./pages/RichiediAppuntamento";

function App() {
  return (
    <BrowserRouter>
      <SNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/tradizione-napoletana" element={<TradNapoli />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/admin-portfolio" element={<AdminPortfolio />} />
        <Route path="/PortfolioForm/:id" element={<PortfolioForm />} />
        <Route path="/prenotazioni" element={<AdminBookings />} />
        <Route
          path="/richiedi-appuntamento"
          element={<RichiediAppuntamento />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Container>{/*Footer*/}</Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
