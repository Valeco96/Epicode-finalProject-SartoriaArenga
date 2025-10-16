import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router";

function SNavbar() {
  return (
    <header>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="py-3 border-bottom border-white"
      >
        <Container>
          <Navbar.Brand to="/" as={Link}>
            Sartoria Arenga
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/about" as={Link}>
                Chi sono
              </Nav.Link>
              <Nav.Link to="/portfolio" as={Link}>
                Portfolio
              </Nav.Link>
              <Nav.Link href="#home">Tradizione napoletana</Nav.Link>
              <Nav.Link href="#link">Contatti</Nav.Link>

              <div className="ms-auto"></div>
              <NavDropdown title="Area Admin" id="basic-nav-dropdown">
                <NavDropdown.Item to="/lavori" as={Link}>
                  Lavori
                </NavDropdown.Item>
                <NavDropdown.Item to="/prenotazioni" as={Link}>
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
