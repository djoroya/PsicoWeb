import { Link, useParams } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const PsychologistDetail = () => {
  const { id } = useParams();
  const { data, loading } = usePublicData(`/equipo/${id}`);
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <Link to="/equipo" className="btn btn-outline-secondary mb-4">← Volver</Link>
      <div className="row align-items-center">
        <div className="col-md-4 text-center mb-4 mb-md-0">
          {data.photo_url ? (
            <img src={data.photo_url} alt={data.name} className="img-fluid rounded-circle shadow" style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
          ) : (
            <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto text-white" style={{ width: '250px', height: '250px', fontSize: '3rem' }}>
              {data.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="col-md-8">
          <h1 className="mb-2">{data.name}</h1>
          <h4 className="text-primary mb-3">{data.specialty}</h4>
          <p className="lead" style={{ whiteSpace: 'pre-line' }}>{data.bio}</p>
          <Link to="/reservar" className="btn btn-primary mt-3">Pedir Cita</Link>
        </div>
      </div>
    </div>
  );
};

export default PsychologistDetail;
