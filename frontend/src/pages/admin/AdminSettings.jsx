import { useEffect, useState } from 'react';
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
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <form onSubmit={handleCreate} className="bg-white p-3 rounded shadow-sm mb-3">
        <div className="mb-2">
          <label className="form-label">Clave</label>
          <input
            type="text"
            className="form-control"
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Valor</label>
          <input
            type="text"
            className="form-control"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      <h2>Configuración de reservas externas</h2>
      <form onSubmit={handleBookingSave} className="bg-white p-3 rounded shadow-sm mb-3">
        <div className="mb-2">
          <label className="form-label">URL de reservas</label>
          <input
            type="text"
            className="form-control"
            value={booking.booking_url}
            onChange={(e) => setBooking({ ...booking, booking_url: e.target.value })}
            placeholder="https://calendly.com/..."
          />
        </div>
        <div className="mb-2">
          <label className="form-label">API Key externa</label>
          <input
            type="text"
            className="form-control"
            value={booking.booking_api_key}
            onChange={(e) => setBooking({ ...booking, booking_api_key: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar configuración</button>
      </form>

      <table className="table table-striped table-bordered table-hover">
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
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteAdminData(`/settings/${setting._id}`, token).then(load)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSettings;
