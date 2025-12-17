import { useState } from 'react';
import { useAdminResource } from '../../hooks/useAdminResource';
import ImageUpload from '../../components/ImageUpload';

const AdminTeam = () => {
  const { items, createItem, updateItem, removeItem, error } = useAdminResource('/psychologists');
  const [form, setForm] = useState({ name: '', bio: '', specialty: '', photo_url: '', active: true });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateItem(editingId, form);
      setEditingId(null);
    } else {
      await createItem(form);
    }
    setForm({ name: '', bio: '', specialty: '', photo_url: '', active: true });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleCancel = () => {
    setForm({ name: '', bio: '', specialty: '', photo_url: '', active: true });
    setEditingId(null);
  };

  const toggleActive = async (psych) => {
    await updateItem(psych._id, { active: !psych.active });
  };

  return (
    <div>
      <h1>Equipo</h1>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm mb-3">
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Especialidad</label>
          <input
            type="text"
            className="form-control"
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Bio</label>
          <textarea
            className="form-control"
            rows="2"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
        <ImageUpload
          label="Foto de perfil"
          value={form.photo_url}
          onChange={(url) => setForm({ ...form, photo_url: url })}
        />
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="activeCheck"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="activeCheck">
            Activo
          </label>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">{editingId ? 'Actualizar' : 'Agregar'} profesional</button>
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
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((psych) => (
            <tr key={psych._id}>
              <td>{psych.name}</td>
              <td>{psych.specialty}</td>
              <td>
                <button
                  className={`btn btn-sm ${psych.active ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => toggleActive(psych)}
                >
                  {psych.active ? 'Activo' : 'Inactivo'}
                </button>
                <button
                  className="btn btn-outline-primary btn-sm ms-2"
                  onClick={() => handleEdit(psych)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeItem(psych._id)}
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

export default AdminTeam;
