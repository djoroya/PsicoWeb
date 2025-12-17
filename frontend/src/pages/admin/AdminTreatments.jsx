import { useState } from 'react';
import { useAdminResource } from '../../hooks/useAdminResource';
import ImageUpload from '../../components/ImageUpload';

const AdminTreatments = () => {
  const { items, createItem, updateItem, removeItem, error } = useAdminResource('/treatments');
  const [form, setForm] = useState({ title: '', content: '', image_url: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateItem(editingId, form);
      setEditingId(null);
    } else {
      await createItem(form);
    }
    setForm({ title: '', content: '', image_url: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleCancel = () => {
    setForm({ title: '', content: '', image_url: '' });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Tratamientos</h1>
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
          <label className="form-label">Contenido</label>
          <textarea
            className="form-control"
            rows="3"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        <ImageUpload
          label="Imagen del tratamiento"
          value={form.image_url}
          onChange={(url) => setForm({ ...form, image_url: url })}
        />
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">{editingId ? 'Actualizar' : 'Crear'} tratamiento</button>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((treatment) => (
            <tr key={treatment._id}>
              <td>{treatment.title}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleEdit(treatment)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeItem(treatment._id)}
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

export default AdminTreatments;
