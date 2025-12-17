import { useParams } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import { usePublicData } from '../../hooks/usePublicData';

const ServiceDetail = () => {
  const { id } = useParams();
  const { data, loading } = usePublicData(`/servicios/${id}`);
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <Container className="py-5">
      <h1>{data.title}</h1>
      {data.image_url && <img src={data.image_url} alt={data.title} className="img-fluid mb-3" />}
      <p>{data.description}</p>
      <p>
        <strong>Precio:</strong> {data.price} €
      </p>
      <p>
        <strong>Duración:</strong> {data.duration} minutos
      </p>
    </Container>
  );
};

export default ServiceDetail;
