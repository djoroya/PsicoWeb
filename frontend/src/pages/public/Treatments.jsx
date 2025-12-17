import { Card, Col, Row, Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Treatments = () => {
  const { data, loading } = usePublicData('/tratamientos');
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <Container className="py-5">
      <h1>Tratamientos</h1>
      <Row className="g-3">
        {data.map((treatment) => (
          <Col md={4} key={treatment._id}>
            <Card>
              {treatment.image_url && <Card.Img variant="top" src={treatment.image_url} alt={treatment.title} />}
              <Card.Body>
                <Card.Title>{treatment.title}</Card.Title>
                <Card.Text>{treatment.content?.slice(0, 140)}...</Card.Text>
                <Link to={`/tratamientos/${treatment._id}`}>Ver detalle</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Treatments;
