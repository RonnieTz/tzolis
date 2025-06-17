import { useState } from 'react';
import { PasswordForm } from '../types';

export function usePasswordManagement() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const resetPasswordForm = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return false;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return false;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password changed successfully');
        setShowChangePassword(false);
        resetPasswordForm();
        return true;
      } else {
        alert(data.error || 'Failed to change password');
        return false;
      }
    } catch (error) {
      console.error('Password change error:', error);
      alert('Error changing password');
      return false;
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordFormChange = (
    field: keyof PasswordForm,
    value: string
  ) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    showChangePassword,
    setShowChangePassword,
    passwordLoading,
    passwordForm,
    setPasswordForm,
    handlePasswordFormChange,
    changePassword,
    resetPasswordForm,
  };
}
