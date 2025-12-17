import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
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
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Título</Form.Label>
          <Form.Control value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Slug</Form.Label>
          <Form.Control value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Contenido</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </Form.Group>
        <ImageUpload
          label="Imagen de portada"
          value={form.cover_image}
          onChange={(url) => setForm({ ...form, cover_image: url })}
        />
        <div className="d-flex gap-2">
          <Button type="submit">{editingId ? 'Actualizar' : 'Publicar'}</Button>
          {editingId && (
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </Form>

      <Table striped bordered hover>
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
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(post)}
                >
                  Editar
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => removeItem(post._id)}>
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

export default AdminBlog;
