import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Home = () => {
  const { data, loading } = usePublicData('/home');

  if (loading || !data) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 mb-5" style={{ minHeight: '600px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">
                {data.hero?.title || 'Aprende a gestionar tus emociones'}
              </h1>
              <p className="lead mb-4 opacity-75">
                {data.hero?.subtitle || 'En PsicoWeb te acompañamos para que encuentres tu bienestar emocional y un lugar seguro en ti mismo.'}
              </p>
              <div className="d-flex gap-3">
                <Link
                  to="/reservar"
                  className="btn btn-light btn-lg fw-semibold px-4 text-primary"
                >
                  Reserva tu cita ahora
                </Link>
                <Link
                  to="/servicios"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Descubre más
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              {data.hero?.image ? (
                <img
                  src={data.hero.image}
                  alt="Psicología"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
              ) : (
                <div className="bg-white bg-opacity-10 rounded-4 p-5 text-center" style={{ height: '400px' }}>
                  <span className="text-white-50">Imagen Hero</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="container mb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Servicios destacados</h2>
          <p className="text-muted">Encuentra el apoyo profesional que necesitas</p>
        </div>
        <div className="row g-4">
          {data.services.map((service) => (
            <div className="col-md-4" key={service._id}>
              <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                {service.image_url && (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-3">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                  <Link to={`/servicios/${service._id}`} className="btn btn-outline-primary mt-2">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">Nuestro equipo</h2>
            <p className="text-muted">Profesionales comprometidos con tu salud mental</p>
          </div>
          <div className="row g-4 justify-content-center">
            {data.psychologists.map((p) => (
              <div className="col-md-6 col-lg-4" key={p._id}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-4">
                      {p.photo_url ? (
                        <img
                          src={p.photo_url}
                          alt={p.name}
                          className="img-fluid h-100 w-100"
                          style={{ objectFit: 'cover', minHeight: '150px' }}
                        />
                      ) : (
                        <div className="bg-secondary h-100 w-100 d-flex align-items-center justify-content-center text-white">
                          Icon
                        </div>
                      )}
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{p.name}</h5>
                        <p className="card-text small text-muted">{p.specialty}</p>
                        <Link
                          to={`/equipo/${p._id}`}
                          className="btn btn-link p-0 text-decoration-none fw-semibold"
                        >
                          Ver perfil →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / Latest News Section */}
      <div className="container py-5">
        <h2 className="fw-bold text-primary mb-4">Últimas noticias</h2>
        <div className="row g-4">
          {data.blog.map((post) => (
            <div className="col-md-6" key={post._id}>
              <div className="card border-0 shadow-sm h-100 flex-row overflow-hidden">
                {post.cover_image && (
                  <div style={{ width: '40%' }}>
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="h-100 w-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="card-body d-flex flex-column justify-content-center" style={{ width: post.cover_image ? '60%' : '100%' }}>
                  <h5 className="card-title fw-bold">{post.title}</h5>
                  <Link to={`/blog/${post.slug}`} className="btn btn-link p-0 text-decoration-none text-start">
                    Leer artículo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
