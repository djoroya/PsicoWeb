import { useEffect, useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import { useAdminResource } from '../../hooks/useAdminResource';
import { getAdminData, postAdminData, deleteAdminData } from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';

const AdminSettings = () => {
  const { token } = useAuth();
  const { items, load, error } = useAdminResource('/settings');
  const [form, setForm] = useState({ key: '', value: '' });
  const [booking, setBooking] = useState({ booking_url: '', booking_api_key: '' });

  useEffect(() => {
    const loadBooking = async () => {
      const data = await getAdminData('/booking-config', token);
      setBooking({ booking_url: data.booking_url || '', booking_api_key: data.booking_api_key || '' });
    };
    loadBooking();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await postAdminData('/settings', token, form);
    setForm({ key: '', value: '' });
    load();
  };

  const handleBookingSave = async (e) => {
    e.preventDefault();
    await postAdminData('/booking-config', token, booking);
  };

  return (
    <div>
      <h1>Settings</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleCreate} className="bg-white p-3 rounded shadow-sm mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Clave</Form.Label>
          <Form.Control value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valor</Form.Label>
          <Form.Control value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        </Form.Group>
        <Button type="submit">Guardar</Button>
      </Form>

      <h2>Configuración de reservas externas</h2>
      <Form onSubmit={handleBookingSave} className="bg-white p-3 rounded shadow-sm mb-3">
        <Form.Group className="mb-2">
          <Form.Label>URL de reservas</Form.Label>
          <Form.Control
            value={booking.booking_url}
            onChange={(e) => setBooking({ ...booking, booking_url: e.target.value })}
            placeholder="https://calendly.com/..."
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>API Key externa</Form.Label>
          <Form.Control
            value={booking.booking_api_key}
            onChange={(e) => setBooking({ ...booking, booking_api_key: e.target.value })}
          />
        </Form.Group>
        <Button type="submit">Guardar configuración</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Clave</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((setting) => (
            <tr key={setting._id}>
              <td>{setting.key}</td>
              <td>{JSON.stringify(setting.value)}</td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => deleteAdminData(`/settings/${setting._id}`, token).then(load)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminSettings;
