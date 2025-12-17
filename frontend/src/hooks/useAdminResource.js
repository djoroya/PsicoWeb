import { useEffect, useState } from 'react';
import { deleteAdminData, getAdminData, postAdminData, putAdminData } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';

export const useAdminResource = (path) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAdminData(path, token);
      setItems(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [path, token]);

  const createItem = async (payload) => {
    const saved = await postAdminData(path, token, payload);
    setItems((prev) => [...prev, saved]);
    return saved;
  };

  const updateItem = async (id, payload) => {
    const saved = await putAdminData(`${path}/${id}`, token, payload);
    setItems((prev) => prev.map((item) => (item._id === id ? saved : item)));
    return saved;
  };

  const removeItem = async (id) => {
    await deleteAdminData(`${path}/${id}`, token);
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  return { items, loading, error, load, createItem, updateItem, removeItem };
};
