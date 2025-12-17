import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import { useAdminResource } from '../../hooks/useAdminResource';

const AdminTeam = () => {
  const { items, createItem, updateItem, removeItem, error } = useAdminResource('/psychologists');
  const [form, setForm] = useState({ name: '', bio: '', specialty: '', photo_url: '', active: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(form);
    setForm({ name: '', bio: '', specialty: '', photo_url: '', active: true });
  };

  const toggleActive = async (psych) => {
    await updateItem(psych._id, { active: !psych.active });
  };

  return (
    <div>
      <h1>Equipo</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows={2} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Foto</Form.Label>
          <Form.Control value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} />
        </Form.Group>
        <Form.Check
          type="checkbox"
          label="Activo"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
          className="mb-2"
        />
        <Button type="submit">Agregar profesional</Button>
      </Form>

      <Table striped bordered hover>
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
                <Button variant={psych.active ? 'success' : 'secondary'} size="sm" onClick={() => toggleActive(psych)}>
                  {psych.active ? 'Activo' : 'Inactivo'}
                </Button>
              </td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => removeItem(psych._id)}>
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

export default AdminTeam;
