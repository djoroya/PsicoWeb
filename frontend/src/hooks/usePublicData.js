import { useEffect, useState } from 'react';
import { getPublicData } from '../services/apiClient';

export const usePublicData = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getPublicData(path);
        if (active) setData(response);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, [path]);

  return { data, loading, error };
};
