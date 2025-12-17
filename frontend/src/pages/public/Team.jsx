import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Team = () => {
  const { data, loading } = usePublicData('/equipo');
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  return (
    <div className="container py-5">
      <h1>Equipo de psicólogos</h1>
      <div className="row g-3">
        {data.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card h-100">
              {p.photo_url && <img src={p.photo_url} className="card-img-top" alt={p.name} />}
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.specialty}</p>
                <Link to={`/equipo/${p._id}`} className="btn btn-primary">Ver perfil</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
