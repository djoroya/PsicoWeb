import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const TreatmentDetail = () => {
  const { id } = useParams();
  const { data, loading } = usePublicData(`/tratamientos/${id}`);
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <div>
      <h1>{data.title}</h1>
      {data.image_url && <img src={data.image_url} alt={data.title} className="img-fluid mb-3" />}
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

export default TreatmentDetail;
