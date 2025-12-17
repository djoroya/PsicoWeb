import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Treatments = () => {
  const { data, loading } = usePublicData('/tratamientos');
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  return (
    <div className="container py-5">
      <h1>Tratamientos</h1>
      <div className="row g-3">
        {data.map((treatment) => (
          <div className="col-md-4" key={treatment._id}>
            <div className="card h-100">
              {treatment.image_url && <img src={treatment.image_url} className="card-img-top" alt={treatment.title} />}
              <div className="card-body">
                <h5 className="card-title">{treatment.title}</h5>
                <p className="card-text">{treatment.content?.slice(0, 140)}...</p>
                <Link to={`/tratamientos/${treatment._id}`} className="btn btn-primary">Ver detalle</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Treatments;
