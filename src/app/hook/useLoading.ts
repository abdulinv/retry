import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
  };

  const unload = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return {
    loading,
    load,
    unload
  };
};
