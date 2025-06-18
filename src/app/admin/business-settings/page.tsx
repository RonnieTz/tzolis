'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Save, Phone, Mail, MapPin } from 'lucide-react';
import AdminHeader from '@/features/admin/components/AdminHeader';
import { usePasswordManagement } from '@/features/admin/hooks/usePasswordManagement';
import ChangePasswordModal from '@/features/admin/components/ChangePasswordModal';
import { useRouter } from 'next/navigation';

interface BusinessHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  specialNote: string;
}

interface BusinessSettings {
  _id?: string;
  businessHours: BusinessHours[];
  phone: string[];
  email: string[];
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
}

export default function BusinessSettingsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const passwordManagement = usePasswordManagement();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/business-settings');
      const result = await response.json();

      if (result.success) {
        setSettings(result.data);
      } else {
        setMessage({ type: 'error', text: 'Failed to load business settings' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error loading business settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/business-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (result.success) {
        setSettings(result.data);
        setMessage({
          type: 'success',
          text: 'Business settings updated successfully!',
        });
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to update business settings',
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error updating business settings' });
    } finally {
      setSaving(false);
    }
  };

  const updateBusinessHour = (
    index: number,
    field: keyof BusinessHours,
    value: string | boolean
  ) => {
    if (!settings) return;

    const updatedHours = [...settings.businessHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setSettings({ ...settings, businessHours: updatedHours });
  };

  const updateContactInfo = (field: string, value: string | string[]) => {
    if (!settings) return;

    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSettings({
        ...settings,
        [parent]: {
          ...(settings[parent as keyof BusinessSettings] as Record<
            string,
            string
          >),
          [child]: value,
        },
      });
    } else {
      setSettings({ ...settings, [field]: value });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePasswordFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await passwordManagement.changePassword();
  };

  const handlePasswordModalClose = () => {
    passwordManagement.setShowChangePassword(false);
    passwordManagement.resetPasswordForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading business settings...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-400">
          Failed to load business settings
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-8">
      <div className="container mx-auto px-4">
        <AdminHeader
          onChangePasswordClick={() =>
            passwordManagement.setShowChangePassword(true)
          }
          onLogout={handleLogout}
        />

        <ChangePasswordModal
          show={passwordManagement.showChangePassword}
          onClose={handlePasswordModalClose}
          onSubmit={handlePasswordFormSubmit}
          passwordForm={passwordManagement.passwordForm}
          onFormChange={passwordManagement.handlePasswordFormChange}
          loading={passwordManagement.passwordLoading}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Clock className="mr-3" />
              {t('admin.businessSettings')}
            </h2>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              <span>{saving ? t('admin.saving') : t('admin.save')}</span>
            </button>
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.type === 'success'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Business Hours */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('admin.businessHours')}
              </h3>
              <div className="space-y-4">
                {settings.businessHours.map((hour, index) => (
                  <div
                    key={hour.day}
                    className="border border-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-white font-medium capitalize">
                        {t(`admin.days.${hour.day}`)}
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={hour.isOpen}
                          onChange={(e) =>
                            updateBusinessHour(
                              index,
                              'isOpen',
                              e.target.checked
                            )
                          }
                          className="mr-2"
                        />
                        <span className="text-gray-300">{t('admin.open')}</span>
                      </label>
                    </div>

                    {hour.isOpen ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">
                            {t('admin.openTime')}
                          </label>
                          <input
                            type="time"
                            value={hour.openTime}
                            onChange={(e) =>
                              updateBusinessHour(
                                index,
                                'openTime',
                                e.target.value
                              )
                            }
                            className="w-full bg-gray-700 text-white p-2 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">
                            {t('admin.closeTime')}
                          </label>
                          <input
                            type="time"
                            value={hour.closeTime}
                            onChange={(e) =>
                              updateBusinessHour(
                                index,
                                'closeTime',
                                e.target.value
                              )
                            }
                            className="w-full bg-gray-700 text-white p-2 rounded"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">
                          {t('admin.specialNote')}
                        </label>
                        <input
                          type="text"
                          value={hour.specialNote}
                          onChange={(e) =>
                            updateBusinessHour(
                              index,
                              'specialNote',
                              e.target.value
                            )
                          }
                          placeholder={t('admin.specialNotePlaceholder')}
                          className="w-full bg-gray-700 text-white p-2 rounded"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('admin.contactInformation')}
              </h3>

              <div className="space-y-6">
                {/* Phone Numbers */}
                <div>
                  <label className="flex items-center text-white font-medium mb-2">
                    <Phone className="mr-2" size={18} />
                    {t('admin.phoneNumbers')}
                  </label>
                  {settings.phone.map((phone, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => {
                          const newPhones = [...settings.phone];
                          newPhones[index] = e.target.value;
                          updateContactInfo('phone', newPhones);
                        }}
                        className="w-full bg-gray-700 text-white p-2 rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Email Addresses */}
                <div>
                  <label className="flex items-center text-white font-medium mb-2">
                    <Mail className="mr-2" size={18} />
                    {t('admin.emailAddresses')}
                  </label>
                  {settings.email.map((email, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          const newEmails = [...settings.email];
                          newEmails[index] = e.target.value;
                          updateContactInfo('email', newEmails);
                        }}
                        className="w-full bg-gray-700 text-white p-2 rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center text-white font-medium mb-2">
                    <MapPin className="mr-2" size={18} />
                    {t('admin.address')}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={settings.address.line1}
                      onChange={(e) =>
                        updateContactInfo('address.line1', e.target.value)
                      }
                      placeholder={t('admin.addressLine1')}
                      className="w-full bg-gray-700 text-white p-2 rounded"
                    />
                    <input
                      type="text"
                      value={settings.address.line2}
                      onChange={(e) =>
                        updateContactInfo('address.line2', e.target.value)
                      }
                      placeholder={t('admin.addressLine2')}
                      className="w-full bg-gray-700 text-white p-2 rounded"
                    />
                    <input
                      type="text"
                      value={settings.address.line3}
                      onChange={(e) =>
                        updateContactInfo('address.line3', e.target.value)
                      }
                      placeholder={t('admin.postalCode')}
                      className="w-full bg-gray-700 text-white p-2 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
