import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">

          {/* Brand */}
          <Link to="/admin" className="navbar-brand fw-semibold">
            Panel PsicoWeb
          </Link>

          {/* Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNav"
            aria-controls="adminNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapse */}
          <div className="collapse navbar-collapse" id="adminNav">

            {/* Menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
              <li className="nav-item">
                <Link to="/admin" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/servicios" className="nav-link">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/tratamientos" className="nav-link">Tratamientos</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/equipo" className="nav-link">Equipo</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/blog" className="nav-link">Blog</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/reservas" className="nav-link">Reservas</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/settings" className="nav-link">Settings</Link>
              </li>
            </ul>

            {/* Logout */}
            <div className="d-flex align-items-lg-center">
              <button
                onClick={logout}
                className="btn btn-outline-light btn-sm"
              >
                Cerrar sesión
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="container py-4 flex-grow-1">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
