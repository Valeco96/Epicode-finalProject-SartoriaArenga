import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router";
import logoTrasparenteBianco from "../assets/logo-bianco.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./components.css";

function SNavbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header id="navbar">
      <Navbar expand="lg" data-bs-theme="dark" className="nav-justified py-3">
        <Container>
          <Navbar.Brand to="/" as={Link} className="ms-4">
            <img
              src={logoTrasparenteBianco}
              style={{ height: 50, width: "auto" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="me auto">
              <Nav.Link className="text-white me-3" to="/about" as={Link}>
                Chi sono
              </Nav.Link>
              <Nav.Link className="text-white me-3" to="/portfolio" as={Link}>
                Portfolio
              </Nav.Link>
              <Nav.Link
                className="text-white me-3"
                to="/tradizione-napoletana"
                as={Link}
              >
                Tradizione napoletana
              </Nav.Link>
              <Nav.Link
                className="text-white"
                to="/richiedi-appuntamento"
                as={Link}
              >
                Richiedi appuntamento
              </Nav.Link>

              {/* Area Admin */}
              {isAuthenticated && user?.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="basic-nav-dropdown"
                  className="text-white"
                  style={{ backgroundColor: "#141f32" }}
                >
                  <NavDropdown.Item
                    className="text-white"
                    to="/form-portfolio"
                    as={Link}
                    
                  >
                    Form Portfolio
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="text-white"
                    to="/admin-storico-lavori"
                    as={Link}
                  >
                    Storico lavori
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    className="text-white"
                    to="/prenotazioni"
                    as={Link}
                  >
                    Prenotazioni
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="text-white"
                    to="/login"
                    as={Link}
                    onClick={logout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default SNavbar;
