import { useState, useEffect } from 'react';

export interface VisitorStats {
  hour: { total: number; unique: number };
  day: { total: number; unique: number };
  week: { total: number; unique: number };
  month: { total: number; unique: number };
  year: { total: number; unique: number };
  allTime: { total: number; unique: number };
}

export const useVisitorStats = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/visitors/stats');

      if (!response.ok) {
        throw new Error('Failed to fetch visitor stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (period: string) => {
    setPeriodToDelete(period);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteData = async () => {
    if (!periodToDelete) return false;

    try {
      setDeleting(periodToDelete);
      setError(null);

      const response = await fetch('/api/visitors/stats', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ period: periodToDelete }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete visitor data');
      }

      // Refresh stats after deletion
      await fetchStats();
      setPeriodToDelete(null);
      setShowDeleteConfirm(false);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setDeleting(null);
    }
  };

  const cancelDeleteData = () => {
    setPeriodToDelete(null);
    setShowDeleteConfirm(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    deleting,
    refetch: fetchStats,
    deleteData,
    showDeleteConfirm,
    periodToDelete,
    confirmDeleteData,
    cancelDeleteData,
  };
};
