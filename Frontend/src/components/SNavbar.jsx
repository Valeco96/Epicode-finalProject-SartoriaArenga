import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router";
import logoTrasparenteBianco from "../assets/logo-bianco.png";

function SNavbar() {
  return (
    <header id="navbar">
      <Navbar expand="lg" data-bs-theme="dark" className="nav-justified py-3">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <img src={logoTrasparenteBianco} style={{ height: 50, width: "auto" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-white" to="/about" as={Link}>
                Chi sono
              </Nav.Link>
              <Nav.Link className="text-white" to="/portfolio" as={Link}>
                Portfolio
              </Nav.Link>
              <Nav.Link className="text-white" to="/tradizione-napoletana" as={Link}>
                Tradizione napoletana
              </Nav.Link>
              <Nav.Link className="text-white" href="#link">
                Contatti
              </Nav.Link>

              <div className="ms-auto"></div>
              <NavDropdown
                title="Area Admin"
                id="basic-nav-dropdown"
                className="text-white"
              >
                <NavDropdown.Item
                  className="text-white"
                  to="/admin-portfolio"
                  as={Link}
                >
                  Lavori
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-white"
                  to="/prenotazioni"
                  as={Link}
                >
                  Prenotazioni
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default SNavbar;
