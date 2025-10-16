//COMPONENTE CHE CONTIENE TUTTA LA PAGINA
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router";
import PortfolioForm from "./components/PortfolioForm";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import SNavbar from "./components/SNavbar";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <SNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/lavori" element={<PortfolioForm/>} />
          <Route path="/prenotazioni" element={<BookingForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/*Footer*/}
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
