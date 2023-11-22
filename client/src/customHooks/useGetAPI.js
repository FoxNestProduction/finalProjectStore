import React, { useEffect, useState } from 'react';
import { instance } from '../API/instance';

const useGetAPI = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await instance.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.response);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return [data, loading, error];
};

export default useGetAPI;
