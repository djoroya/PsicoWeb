import { useAdminResource } from '../../hooks/useAdminResource';

const Dashboard = () => {
  const services = useAdminResource('/services');
  const team = useAdminResource('/psychologists');
  const blog = useAdminResource('/blog');

  if (services.loading || team.loading || blog.loading) return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  );
  if (services.error) return <div className="alert alert-danger">{services.error}</div>;

  return (
    <div>
      <h1>Resumen</h1>
      <ul className="list-group mb-3">
        <li className="list-group-item">Servicios activos: {services.items.length}</li>
        <li className="list-group-item">Profesionales: {team.items.length}</li>
        <li className="list-group-item">Posts publicados: {blog.items.length}</li>
      </ul>
      <p className="text-muted">Accede a cada módulo desde la barra superior para gestionar el contenido.</p>
    </div>
  );
};

export default Dashboard;
