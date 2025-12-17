import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Services = () => {
  const { data, loading } = usePublicData('/servicios');
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <div>
      <h1>Servicios</h1>
      <Row className="g-3">
        {data.map((service) => (
          <Col md={4} key={service._id}>
            <Card>
              {service.image_url && <Card.Img variant="top" src={service.image_url} alt={service.title} />}
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Card.Text>
                  <strong>{service.price} €</strong> · {service.duration} min
                </Card.Text>
                <Link to={`/servicios/${service._id}`}>Ver detalle</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Services;
