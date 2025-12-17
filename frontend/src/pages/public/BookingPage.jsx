import { usePublicData } from '../../hooks/usePublicData';

const BookingPage = () => {
  const { data, loading, error } = usePublicData('/settings/booking');
  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  // Use 'data' directly as 'config' is not defined in the provided context
  // Assuming 'data' contains the 'booking_url' property
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Reserva tu cita</h1>
      {data && data.booking_url ? (
        <div className="ratio ratio-16x9 border rounded shadow-sm" style={{ minHeight: '600px' }}>
          <iframe
            src={data.booking_url}
            title="Booking"
            allow="camera; microphone; autoplay; encrypted-media;"
            style={{ width: '100%', height: '100%', border: 'none' }}
          ></iframe>
        </div>
      ) : (
        <p>Aún no se ha configurado el sistema de reservas.</p>
      )}
    </div>
  );
};

export default BookingPage;
