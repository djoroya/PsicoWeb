import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
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
        <ImageUpload
          label="Imagen del tratamiento"
          value={form.image_url}
          onChange={(url) => setForm({ ...form, image_url: url })}
        />
        <div className="d-flex gap-2">
          <Button type="submit">{editingId ? 'Actualizar' : 'Crear'} tratamiento</Button>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((treatment) => (
            <tr key={treatment._id}>
              <td>{treatment.title}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(treatment)}
                >
                  Editar
                </Button>
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
