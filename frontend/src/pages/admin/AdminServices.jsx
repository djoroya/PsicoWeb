import { useState } from 'react';
import { useAdminResource } from '../../hooks/useAdminResource';
import ImageUpload from '../../components/ImageUpload';

const AdminServices = () => {
  const { items, createItem, updateItem, removeItem, error } = useAdminResource('/services');
  const [form, setForm] = useState({ title: '', description: '', price: 0, duration: 0, image_url: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateItem(editingId, form);
      setEditingId(null);
    } else {
      await createItem(form);
    }
    setForm({ title: '', description: '', price: 0, duration: 0, image_url: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleCancel = () => {
    setForm({ title: '', description: '', price: 0, duration: 0, image_url: '' });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Servicios</h1>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm mb-3">
        <div className="mb-2">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            rows="2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Precio (€)</label>
          <input
            type="number"
            className="form-control"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Duración (min)</label>
          <input
            type="number"
            className="form-control"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
          />
        </div>
        <ImageUpload
          label="Imagen del servicio"
          value={form.image_url}
          onChange={(url) => setForm({ ...form, image_url: url })}
        />
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">{editingId ? 'Actualizar' : 'Crear'} servicio</button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Título</th>
            <th>Precio</th>
            <th>Duración</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((service) => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>{service.price} €</td>
              <td>{service.duration} min</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleEdit(service)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeItem(service._id)}
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

export default AdminServices;
