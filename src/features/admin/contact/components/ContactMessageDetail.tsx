import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Calendar,
  User,
  MessageSquare,
  Trash2,
  Mail,
} from 'lucide-react';
import { ContactMessage } from './types';

interface ContactMessageDetailProps {
  message: ContactMessage | null;
  deleting: string | null;
  onMarkAsRead: (id: string, isRead: boolean) => void;
  onDeleteMessage: (id: string) => void;
}

export default function ContactMessageDetail({
  message,
  deleting,
  onMarkAsRead,
  onDeleteMessage,
}: ContactMessageDetailProps) {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString: string) => {
    const locale = i18n.language === 'gr' ? 'el-GR' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!message) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>{t('admin.selectMessage')}</p>
      </div>
    );
  }

  return (
    <motion.div
      key={message._id}
      className="bg-white rounded-lg shadow p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {message.name}
            </h2>
            <p className="text-gray-600">{message.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onMarkAsRead(message._id, !message.isRead)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              message.isRead
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
            }`}
          >
            {message.isRead ? t('admin.markAsUnread') : t('admin.markAsRead')}
          </button>
          <button
            onClick={() => onDeleteMessage(message._id)}
            disabled={deleting === message._id}
            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center space-x-1"
          >
            {deleting === message._id ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-800"></div>
            ) : (
              <Trash2 className="w-3 h-3" />
            )}
            <span>{t('admin.delete')}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {message.subject}
          </h3>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(message.createdAt)}</span>
          </div>
          {message.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{message.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">
              {t('admin.message')}
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex space-x-4">
          <a
            href={`mailto:${message.email}?subject=Re: ${message.subject}`}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t('admin.replyViaEmail')}
          </a>
          {message.phone && (
            <a
              href={`tel:${message.phone}`}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('admin.call')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
