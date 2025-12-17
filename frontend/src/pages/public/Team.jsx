import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Team = () => {
  const { data, loading } = usePublicData('/equipo');
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <div>
      <h1>Equipo de psicólogos</h1>
      <Row className="g-3">
        {data.map((p) => (
          <Col md={4} key={p._id}>
            <Card>
              {p.photo_url && <Card.Img variant="top" src={p.photo_url} alt={p.name} />}
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>{p.specialty}</Card.Text>
                <Link to={`/equipo/${p._id}`}>Ver perfil</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Team;
