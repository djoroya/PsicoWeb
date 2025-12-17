import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import { useAdminResource } from '../../hooks/useAdminResource';

const AdminTreatments = () => {
  const { items, createItem, removeItem, error } = useAdminResource('/treatments');
  const [form, setForm] = useState({ title: '', content: '', image_url: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(form);
    setForm({ title: '', content: '', image_url: '' });
  };

  return (
    <div>
      <h1>Tratamientos</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Título</Form.Label>
          <Form.Control value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
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
          <Form.Control value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        </Form.Group>
        <Button type="submit">Crear tratamiento</Button>
      </Form>

      <Table striped bordered hover>
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
                <Button variant="outline-danger" size="sm" onClick={() => removeItem(treatment._id)}>
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

export default AdminTreatments;
