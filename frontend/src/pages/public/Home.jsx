import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Home = () => {
  const { data, loading } = usePublicData('/home');

  if (loading || !data) return <Spinner animation="border" />;

  return (
    <div className="py-3">
      <div className="p-4 mb-4 bg-white rounded shadow-sm">
        <h1 className="mb-2">{data.hero?.title || 'Clínica de Psicología'}</h1>
        <p className="text-muted">{data.hero?.subtitle || 'Cuidamos tu salud mental con especialistas certificados.'}</p>
        <Button as={Link} to="/reservar">Agendar cita</Button>
      </div>

      <h2 className="mt-4">Servicios destacados</h2>
      <Row className="g-3">
        {data.services.map((service) => (
          <Col md={4} key={service._id}>
            <Card>
              {service.image_url && <Card.Img variant="top" src={service.image_url} alt={service.title} />}
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Button as={Link} to={`/servicios/${service._id}`} variant="outline-primary">
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mt-5">Nuestro equipo</h2>
      <Row className="g-3">
        {data.psychologists.map((p) => (
          <Col md={4} key={p._id}>
            <Card>
              {p.photo_url && <Card.Img variant="top" src={p.photo_url} alt={p.name} />}
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>{p.specialty}</Card.Text>
                <Button as={Link} to={`/equipo/${p._id}`} variant="outline-secondary">
                  Ver perfil
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mt-5">Últimas noticias</h2>
      <Row className="g-3">
        {data.blog.map((post) => (
          <Col md={4} key={post._id}>
            <Card>
              {post.cover_image && <Card.Img variant="top" src={post.cover_image} alt={post.title} />}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Button as={Link} to={`/blog/${post.slug}`} variant="link">
                  Leer artículo
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
