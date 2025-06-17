import { motion } from 'framer-motion';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { ContactMessage } from './types';

interface ContactMessageListProps {
  messages: ContactMessage[];
  selectedMessage: ContactMessage | null;
  deleting: string | null;
  onSelectMessage: (message: ContactMessage) => void;
  onDeleteMessage: (id: string) => void;
  onMarkAsRead: (id: string, isRead: boolean) => void;
}

export default function ContactMessageList({
  messages,
  selectedMessage,
  deleting,
  onSelectMessage,
  onDeleteMessage,
  onMarkAsRead,
}: ContactMessageListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No messages yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <motion.div
          key={message._id}
          className={`p-4 bg-white rounded-lg shadow cursor-pointer border-l-4 transition-all relative ${
            message.isRead
              ? 'border-gray-300 hover:shadow-md'
              : 'border-orange-500 shadow-md'
          } ${
            selectedMessage?._id === message._id ? 'ring-2 ring-orange-500' : ''
          }`}
          onClick={() => {
            onSelectMessage(message);
            if (!message.isRead) {
              onMarkAsRead(message._id, true);
            }
          }}
          whileHover={{ scale: 1.02 }}
          layout
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              {message.isRead ? (
                <MailOpen className="w-4 h-4 text-gray-400" />
              ) : (
                <Mail className="w-4 h-4 text-orange-500" />
              )}
              <span
                className={`font-medium ${
                  message.isRead ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                {message.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMessage(message._id);
                }}
                disabled={deleting === message._id}
                className="text-red-500 hover:text-red-700 p-1 transition-colors disabled:opacity-50"
                title="Delete message"
              >
                {deleting === message._id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <p
            className={`text-sm mb-2 ${
              message.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'
            }`}
          >
            {message.subject}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {formatDate(message.createdAt)}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {message.message.substring(0, 100)}
            {message.message.length > 100 && '...'}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
