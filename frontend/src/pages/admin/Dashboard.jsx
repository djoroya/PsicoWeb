import { Alert, ListGroup, Spinner } from 'react-bootstrap';
import { useAdminResource } from '../../hooks/useAdminResource';

const Dashboard = () => {
  const services = useAdminResource('/services');
  const team = useAdminResource('/psychologists');
  const blog = useAdminResource('/blog');

  if (services.loading || team.loading || blog.loading) return <Spinner animation="border" />;
  if (services.error) return <Alert variant="danger">{services.error}</Alert>;

  return (
    <div>
      <h1>Resumen</h1>
      <ListGroup className="mb-3">
        <ListGroup.Item>Servicios activos: {services.items.length}</ListGroup.Item>
        <ListGroup.Item>Profesionales: {team.items.length}</ListGroup.Item>
        <ListGroup.Item>Posts publicados: {blog.items.length}</ListGroup.Item>
      </ListGroup>
      <p className="text-muted">Accede a cada módulo desde la barra superior para gestionar el contenido.</p>
    </div>
  );
};

export default Dashboard;
