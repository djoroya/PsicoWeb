import { Alert, Spinner, Table } from 'react-bootstrap';
import { useAdminResource } from '../../hooks/useAdminResource';

const AdminBookings = () => {
  const { items, loading, error } = useAdminResource('/bookings');

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h1>Reservas (solo lectura)</h1>
      <Table striped bordered hover>
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
      </Table>
    </div>
  );
};

export default AdminBookings;
