import { useState, useEffect } from 'react';
import { ContactMessage } from '../components/types';

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string, isRead: boolean) => {
    try {
      const response = await fetch('/api/contact/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isRead }),
      });

      if (response.ok) {
        setMessages(
          messages.map((msg) => (msg._id === id ? { ...msg, isRead } : msg))
        );
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage({ ...selectedMessage, isRead });
        }
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessageToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteMessage = async () => {
    if (!messageToDelete) return;

    setDeleting(messageToDelete);
    try {
      const response = await fetch('/api/contact/messages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: messageToDelete }),
      });

      if (response.ok) {
        setMessages(messages.filter((msg) => msg._id !== messageToDelete));
        if (selectedMessage && selectedMessage._id === messageToDelete) {
          setSelectedMessage(null);
        }
      } else {
        const errorData = await response.json();
        alert(`Error deleting message: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message');
    } finally {
      setDeleting(null);
      setMessageToDelete(null);
    }
  };

  const cancelDeleteMessage = () => {
    setMessageToDelete(null);
    setShowDeleteConfirm(false);
  };

  const selectMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message._id, true);
    }
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return {
    messages,
    loading,
    selectedMessage,
    deleting,
    unreadCount,
    selectMessage,
    markAsRead,
    deleteMessage,
    confirmDeleteMessage,
    cancelDeleteMessage,
    showDeleteConfirm,
    messageToDelete,
  };
}
