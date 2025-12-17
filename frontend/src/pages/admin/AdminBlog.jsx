import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import { useAdminResource } from '../../hooks/useAdminResource';

const AdminBlog = () => {
  const { items, createItem, removeItem, error } = useAdminResource('/blog');
  const [form, setForm] = useState({ title: '', slug: '', content: '', cover_image: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(form);
    setForm({ title: '', slug: '', content: '', cover_image: '' });
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
        <Form.Group className="mb-2">
          <Form.Label>Imagen</Form.Label>
          <Form.Control value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} />
        </Form.Group>
        <Button type="submit">Publicar</Button>
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
