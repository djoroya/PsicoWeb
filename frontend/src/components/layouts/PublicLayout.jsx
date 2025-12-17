import { Link, Outlet } from 'react-router-dom';

const PublicLayout = () => (
  <div className="bg-light min-vh-100 d-flex flex-column">

    {/* NAVBAR */}
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom sticky-top">
      <div className="container">

        {/* Brand */}
        <Link to="/" className="navbar-brand fw-bold fs-4 text-primary">
          Psico<span className="text-dark">Web</span>
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#publicNav"
          aria-controls="publicNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse */}
        <div className="collapse navbar-collapse" id="publicNav">

          {/* Menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <Link to="/servicios" className="nav-link">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link to="/tratamientos" className="nav-link">Tratamientos</Link>
            </li>
            <li className="nav-item">
              <Link to="/equipo" className="nav-link">Equipo</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </li>
          </ul>

          {/* CTA + Panel */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2">
            <Link to="/reservar" className="btn btn-primary px-3">
              Reservar cita
            </Link>
            <Link
              to="/login"
              className="text-muted small text-center text-lg-start"
            >
              Panel profesional
            </Link>
          </div>

        </div>
      </div>
    </nav>

    {/* CONTENT */}
    <main className="flex-grow-1">
      <Outlet />
    </main>

    {/* FOOTER */}
    <footer className="bg-white border-top py-3">
      <div className="container text-center text-muted small">
        © {new Date().getFullYear()} PsicoWeb · Psicología online con cabeza y corazón 🧠💙
      </div>
    </footer>

  </div>
);

export default PublicLayout;
