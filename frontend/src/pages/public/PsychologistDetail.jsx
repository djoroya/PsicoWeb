import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const PsychologistDetail = () => {
  const { id } = useParams();
  const { data, loading } = usePublicData(`/equipo/${id}`);
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <div>
      <h1>{data.name}</h1>
      {data.photo_url && <img src={data.photo_url} alt={data.name} className="img-fluid mb-3" />}
      <p className="text-muted">{data.specialty}</p>
      <p>{data.bio}</p>
    </div>
  );
};

export default PsychologistDetail;
