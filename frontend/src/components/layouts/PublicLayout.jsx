import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const PublicLayout = () => (
  <div className="bg-light min-vh-100">
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">PsicoWeb</Navbar.Brand>
        <Navbar.Toggle aria-controls="public-nav" />
        <Navbar.Collapse id="public-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/servicios">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/tratamientos">Tratamientos</Nav.Link>
            <Nav.Link as={Link} to="/equipo">Equipo</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/reservar">Reservar</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Panel</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container className="py-4">
      <Outlet />
    </Container>
  </div>
);

export default PublicLayout;
