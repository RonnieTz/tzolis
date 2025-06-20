import { useEffect } from 'react';

export const useVisitorTracking = (page: string = 'home') => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/visitors/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page }),
        });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    trackVisitor();
  }, [page]);
};
