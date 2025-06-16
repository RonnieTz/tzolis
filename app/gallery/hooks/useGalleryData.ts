import { useState, useEffect } from 'react';
import { GalleryGroup } from '../types';

export function useGalleryData() {
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/gallery/groups');
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      }
    } catch (error) {
      console.error('Error fetching gallery groups:', error);
    } finally {
      setLoading(false);
    }
  };

  return { groups, loading, refetch: fetchGroups };
}
