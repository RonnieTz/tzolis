'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactMessages } from '@/features/admin/contact/hooks/useContactMessages';
import ContactMessageList from '@/features/admin/contact/components/ContactMessageList';
import ContactMessageDetail from '@/features/admin/contact/components/ContactMessageDetail';
import ConfirmationDialog from '@/features/admin/components/ConfirmationDialog';

export default function ContactMessagesPage() {
  const { t } = useTranslation();
  const {
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
  } = useContactMessages();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('admin.contactMessages')}
          </h1>
          <p className="text-gray-300">
            {messages.length} {t('admin.totalMessages')}
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                {unreadCount} {t('admin.unread')}
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

        {/* Message Delete Confirmation */}
        <ConfirmationDialog
          isOpen={showDeleteConfirm}
          title={t('admin.confirmDelete')}
          message={t('admin.confirmDeleteMessage')}
          onConfirm={confirmDeleteMessage}
          onCancel={cancelDeleteMessage}
          variant="danger"
        />
      </div>
    </div>
  );
}
