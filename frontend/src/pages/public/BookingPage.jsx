import { Alert, Button, Spinner, Container } from 'react-bootstrap';
import { usePublicData } from '../../hooks/usePublicData';

const BookingPage = () => {
  const { data, loading, error } = usePublicData('/settings/booking');
  if (loading || !data) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-5">
      <h1>Reservar cita</h1>
      {data.booking_url ? (
        <div className="p-3 bg-white rounded shadow-sm">
          <p>El sistema de reservas externo está disponible en el siguiente enlace:</p>
          <Button variant="primary" href={data.booking_url} target="_blank" rel="noreferrer">
            Abrir agenda externa
          </Button>
          <div className="mt-3">
            <iframe title="booking" src={data.booking_url} className="w-100" style={{ minHeight: '500px', border: 'none' }} />
          </div>
        </div>
      ) : (
        <p>Aún no se ha configurado el sistema de reservas.</p>
      )}
    </Container>
  );
};

export default BookingPage;
