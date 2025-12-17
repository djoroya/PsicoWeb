import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Services = () => {
  const { data, loading } = usePublicData('/servicios');
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  return (
    <div className="container py-5">
      <h1>Servicios</h1>
      <div className="row g-3">
        {data.map((service) => (
          <div className="col-md-4" key={service._id}>
            <div className="card h-100">
              {service.image_url && <img src={service.image_url} className="card-img-top" alt={service.title} />}
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <p className="text-muted fw-bold">{service.price} € - {service.duration} min</p>
                <Link to={`/servicios/${service._id}`} className="btn btn-primary">Ver detalle</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
