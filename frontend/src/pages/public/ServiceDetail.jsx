import { Link, useParams } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const ServiceDetail = () => {
  const { id } = useParams();
  const { data, loading } = usePublicData(`/servicios/${id}`);
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <Link to="/servicios" className="btn btn-outline-secondary mb-4">← Volver</Link>
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-4">{data.title}</h1>
          {data.image_url && (
            <img src={data.image_url} alt={data.title} className="img-fluid rounded mb-4 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          )}
          <div className="lead mb-4" style={{ whiteSpace: 'pre-line' }}>{data.description}</div>
          <div className="alert alert-info">
            <h4>Detalles</h4>
            <p className="mb-1"><strong>Precio:</strong> {data.price} €</p>
            <p className="mb-0"><strong>Duración:</strong> {data.duration} min</p>
          </div>
          <Link to="/reservar" className="btn btn-primary btn-lg mt-3">Reservar Cita</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
