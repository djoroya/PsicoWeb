import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', gdpr: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', message: '', gdpr: false });
  };

  return (
    <div className="container py-5">
      {/* 1. Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-primary">Contacto del centro PsicoWeb</h1>
        <p className="lead text-muted">Estamos aquí para escucharte y acompañarte</p>
      </div>

      <div className="row g-5">
        {/* 2 & 3 & 4. Info Column */}
        <div className="col-lg-5">
          <div className="mb-4">
            <h3 className="h4 mb-3">Nos gustaría conversar contigo</h3>
            <p className="text-muted">
              Sabemos que dar el primer paso no es fácil. Agradecemos tu interés y confianza.
              Estamos aquí para responder tus dudas y explicarte cómo podemos ayudarte a mejorar tu bienestar.
            </p>
          </div>

          <div className="mb-5">
            <h4 className="h5 mb-4 text-primary border-bottom pb-2">Información de contacto</h4>
            <ul className="list-unstyled">
              <li className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <i className="bi bi-geo-alt-fill fs-4"></i>
                </div>
                <div>
                  <strong className="d-block text-dark">Dirección</strong>
                  <span className="text-muted">Calle Salud 123, 48001 Bilbao</span>
                </div>
              </li>
              <li className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <i className="bi bi-telephone-fill fs-4"></i>
                </div>
                <div>
                  <strong className="d-block text-dark">Teléfono</strong>
                  <span className="text-muted">555-123-456</span>
                </div>
              </li>
              <li className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <i className="bi bi-envelope-fill fs-4"></i>
                </div>
                <div>
                  <strong className="d-block text-dark">Email</strong>
                  <span className="text-muted">contacto@psicoweb.com</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="h5 mb-3 text-primary border-bottom pb-2">Horario de atención</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Lunes - Viernes:</span>
              <span className="fw-semibold">09:00 - 20:00</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Sábados:</span>
              <span className="fw-semibold">10:00 - 14:00</span>
            </div>
          </div>
        </div>

        {/* 5. Contact Form */}
        <div className="col-lg-7">
          <div className="card shadow border-0 bg-white">
            <div className="card-body p-4 p-md-5">
              <h3 className="h4 mb-4">Envíanos un mensaje</h3>
              {submitted && (
                <div className="alert alert-success d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <div>¡Gracias por contactarnos! Te responderemos lo antes posible.</div>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted small">NOMBRE *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><i className="bi bi-person"></i></span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">CORREO ELECTRÓNICO *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                      <input
                        type="email"
                        className="form-control border-start-0"
                        required
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">TELÉFONO</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="bi bi-telephone"></i></span>
                      <input
                        type="tel"
                        className="form-control border-start-0"
                        placeholder="Tu teléfono"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small">MENSAJE</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="¿En qué podemos ayudarte?"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="gdpr"
                    required
                    checked={form.gdpr}
                    onChange={e => setForm({ ...form, gdpr: e.target.checked })}
                  />
                  <label className="form-check-label small text-muted" htmlFor="gdpr">
                    He leído y acepto la <a href="#" className="text-decoration-none">política de privacidad</a>. Entiendo que mis datos serán usados para gestionar la consulta.
                  </label>
                </div>

                <div className="alert alert-light border py-2 mb-4 small text-muted d-flex align-items-center">
                  <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                  <span>Revisa tu carpeta de SPAM si no recibes respuesta en 24h.</span>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold text-uppercase tracking-wider shadow-sm">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Map / Location */}
      <div className="mt-5 pt-5 border-top">
        <div className="row align-items-center">
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="mb-4 text-primary">Cómo llegar</h4>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-train-front fs-5 text-secondary me-3"></i>
                <span><strong>Metro:</strong> Parada Moyúa (Salida Ercilla)</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-train-lightrail-front fs-5 text-secondary me-3"></i>
                <span><strong>Tren:</strong> Estación Abando (a 10 min)</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-p-square-fill fs-5 text-secondary me-3"></i>
                <span><strong>Parking:</strong> Plaza Indautxu</span>
              </li>
            </ul>
          </div>
          <div className="col-md-8">
            <div className="ratio ratio-21x9 bg-light rounded shadow-sm border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.553935222258!2d-2.937213484277709!3d43.260656679136865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e4fdae613b52f%3A0x6b772c7247e62d4e!2sGran%20V%C3%ADa%20de%20Don%20Diego%20L%C3%B3pez%20de%20Haro%2C%20Bilbao%2C%20Bizkaia!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
                title="Mapa"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Final Motivation */}
      <div className="mt-5 text-center p-5 bg-primary bg-opacity-10 rounded-3">
        <p className="lead fst-italic mb-0 text-primary fw-medium">
          “Tomar la decisión de comenzar terapia es un acto de valentía y bondad hacia ti misma/o. Estamos aquí para acompañarte en el proceso.”
        </p>
      </div>
    </div>
  );
};

export default Contact;
