import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  return (
    <div className="bg-light min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/admin">Panel PsicoWeb</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-nav" />
          <Navbar.Collapse id="admin-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/admin/servicios">Servicios</Nav.Link>
              <Nav.Link as={Link} to="/admin/tratamientos">Tratamientos</Nav.Link>
              <Nav.Link as={Link} to="/admin/equipo">Equipo</Nav.Link>
              <Nav.Link as={Link} to="/admin/blog">Blog</Nav.Link>
              <Nav.Link as={Link} to="/admin/settings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/admin/reservas">Reservas</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminLayout;
