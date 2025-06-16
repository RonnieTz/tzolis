'use client';

import { motion } from 'framer-motion';
import { useContactMessages } from './hooks/useContactMessages';
import ContactMessageList from './components/ContactMessageList';
import ContactMessageDetail from './components/ContactMessageDetail';

export default function ContactMessagesPage() {
  const {
    messages,
    loading,
    selectedMessage,
    deleting,
    unreadCount,
    selectMessage,
    markAsRead,
    deleteMessage,
  } = useContactMessages();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600">
            {messages.length} total messages
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <ContactMessageList
              messages={messages}
              selectedMessage={selectedMessage}
              deleting={deleting}
              onSelectMessage={selectMessage}
              onDeleteMessage={deleteMessage}
              onMarkAsRead={markAsRead}
            />
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <ContactMessageDetail
              message={selectedMessage}
              deleting={deleting}
              onMarkAsRead={markAsRead}
              onDeleteMessage={deleteMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
