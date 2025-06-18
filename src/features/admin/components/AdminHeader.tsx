import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { LogOut, Key, Mail, Settings } from 'lucide-react';

interface AdminHeaderProps {
  onChangePasswordClick: () => void;
  onLogout: () => void;
}

export default function AdminHeader({
  onChangePasswordClick,
  onLogout,
}: AdminHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
      <h1 className="text-2xl sm:text-4xl font-bold text-white">
        {t('admin.title')}
      </h1>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          onClick={() => router.push('/admin/business-settings')}
          className="flex items-center justify-center sm:justify-start space-x-2 bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
        >
          <Settings size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">
            {t('admin.businessSettings')}
          </span>
          <span className="sm:hidden">{t('admin.settings')}</span>
        </button>
        <button
          onClick={() => router.push('/admin/contact')}
          className="flex items-center justify-center sm:justify-start space-x-2 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
        >
          <Mail size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">{t('admin.contactMessages')}</span>
          <span className="sm:hidden">{t('admin.messages')}</span>
        </button>
        <button
          onClick={onChangePasswordClick}
          className="flex items-center justify-center sm:justify-start space-x-2 bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          <Key size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">{t('admin.changePassword')}</span>
          <span className="sm:hidden">{t('admin.password')}</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center justify-center sm:justify-start space-x-2 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
        >
          <LogOut size={18} className="sm:w-5 sm:h-5" />
          <span>{t('admin.logout')}</span>
        </button>
      </div>
    </div>
  );
}
