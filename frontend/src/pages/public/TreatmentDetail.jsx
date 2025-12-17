import { Link, useParams } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const TreatmentDetail = () => {
  const { id } = useParams();
  const { data, loading } = usePublicData(`/tratamientos/${id}`);
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <Link to="/tratamientos" className="btn btn-outline-secondary mb-4">← Volver</Link>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4">{data.title}</h1>
          {data.image_url && (
            <img src={data.image_url} alt={data.title} className="img-fluid rounded mb-4 w-100" />
          )}
          <div className="prose" style={{ whiteSpace: 'pre-line' }}>{data.content}</div>
          <div className="mt-5 text-center">
            <Link to="/reservar" className="btn btn-primary btn-lg">Solicitar Consulta</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
