import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
  };

  const unload = () => {
    setTimeout(() => {
      setLoading(false);
    }, 4500);
  };

  return {
    loading,
    load,
    unload
  };
};
