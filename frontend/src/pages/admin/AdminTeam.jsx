import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
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
        <ImageUpload
          label="Foto de perfil"
          value={form.photo_url}
          onChange={(url) => setForm({ ...form, photo_url: url })}
        />
        <Form.Check
          type="checkbox"
          label="Activo"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
          className="mb-2"
        />
        <div className="d-flex gap-2">
          <Button type="submit">{editingId ? 'Actualizar' : 'Agregar'} profesional</Button>
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
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleEdit(psych)}
                >
                  Editar
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
