import { useAdminResource } from '../../hooks/useAdminResource';

const AdminBookings = () => {
  const { items, loading, error } = useAdminResource('/bookings');

  if (loading) return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  );
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h1>Reservas (solo lectura)</h1>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Externo</th>
            <th>Psicólogo</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {items.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.external_id}</td>
              <td>{booking.psychologist_id}</td>
              <td>{booking.service_id}</td>
              <td>{booking.date}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
