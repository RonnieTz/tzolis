import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { LogOut, Key, Mail } from 'lucide-react';

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
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">{t('admin.title')}</h1>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => router.push('/admin/contact')}
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Mail size={20} />
          <span>Contact Messages</span>
        </button>
        <button
          onClick={onChangePasswordClick}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Key size={20} />
          <span>Change Password</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>{t('admin.logout')}</span>
        </button>
      </div>
    </div>
  );
}
