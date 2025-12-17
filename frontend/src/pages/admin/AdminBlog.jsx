import { useState } from 'react';
import { useAdminResource } from '../../hooks/useAdminResource';
import ImageUpload from '../../components/ImageUpload';

const AdminBlog = () => {
  const { items, createItem, updateItem, removeItem, error } = useAdminResource('/blog');
  const [form, setForm] = useState({ title: '', slug: '', content: '', cover_image: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateItem(editingId, form);
      setEditingId(null);
    } else {
      await createItem(form);
    }
    setForm({ title: '', slug: '', content: '', cover_image: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleCancel = () => {
    setForm({ title: '', slug: '', content: '', cover_image: '' });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Blog</h1>
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
          <label className="form-label">Slug</label>
          <input
            type="text"
            className="form-control"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
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
          label="Imagen de portada"
          value={form.cover_image}
          onChange={(url) => setForm({ ...form, cover_image: url })}
        />
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">{editingId ? 'Actualizar' : 'Publicar'}</button>
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
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.slug}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleEdit(post)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeItem(post._id)}
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

export default AdminBlog;
