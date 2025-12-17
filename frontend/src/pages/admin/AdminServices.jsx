import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import { useAdminResource } from '../../hooks/useAdminResource';

const AdminServices = () => {
  const { items, createItem, updateItem, removeItem, error } = useAdminResource('/services');
  const [form, setForm] = useState({ title: '', description: '', price: 0, duration: 0, image_url: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(form);
    setForm({ title: '', description: '', price: 0, duration: 0, image_url: '' });
  };

  return (
    <div>
      <h1>Servicios</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Título</Form.Label>
          <Form.Control value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Precio (€)</Form.Label>
          <Form.Control
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Duración (min)</Form.Label>
          <Form.Control
            type="number"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Imagen</Form.Label>
          <Form.Control value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        </Form.Group>
        <Button type="submit">Crear servicio</Button>
      </Form>

      <Table striped bordered hover>
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
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeItem(service._id)}
                >
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

export default AdminServices;
