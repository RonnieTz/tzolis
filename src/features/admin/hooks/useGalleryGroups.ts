import { useState, useEffect } from 'react';
import { GalleryGroup, NewGroupForm } from '../types';

export function useGalleryGroups() {
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/gallery/groups');
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (newGroup: NewGroupForm) => {
    try {
      const response = await fetch('/api/gallery/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup),
      });

      if (response.ok) {
        await fetchGroups();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating group:', error);
      return false;
    }
  };

  const deleteGroup = async (groupId: string): Promise<boolean> => {
    setGroupToDelete(groupId);
    setShowDeleteConfirm(true);
    return true; // Return true to indicate the confirmation dialog was shown
  };

  const confirmDeleteGroup = async () => {
    if (!groupToDelete) return false;

    try {
      const response = await fetch(`/api/gallery/groups/${groupToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchGroups();
        if (selectedGroup === groupToDelete) {
          setSelectedGroup(null);
        }
        setGroupToDelete(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting group:', error);
      return false;
    }
  };

  const cancelDeleteGroup = () => {
    setGroupToDelete(null);
    setShowDeleteConfirm(false);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const currentGroup = groups.find((group) => group._id === selectedGroup);

  return {
    groups,
    loading,
    selectedGroup,
    setSelectedGroup,
    currentGroup,
    fetchGroups,
    createGroup,
    deleteGroup,
    confirmDeleteGroup,
    cancelDeleteGroup,
    showDeleteConfirm,
    groupToDelete,
  };
}
