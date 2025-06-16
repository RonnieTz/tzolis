'use client';

import { useRouter } from 'next/navigation';
import { useGalleryGroups } from './hooks/useGalleryGroups';
import { useFileUpload } from './hooks/useFileUpload';
import { usePasswordManagement } from './hooks/usePasswordManagement';
import { useImageModal } from './hooks/useImageModal';
import AdminHeader from './components/AdminHeader';
import ChangePasswordModal from './components/ChangePasswordModal';
import GalleryGroupsPanel from './components/GalleryGroupsPanel';
import GalleryImagesPanel from './components/GalleryImagesPanel';
import AdminImageModal from './components/AdminImageModal';

export default function AdminPage() {
  const router = useRouter();
  
  // Custom hooks
  const galleryGroups = useGalleryGroups();
  const fileUpload = useFileUpload();
  const passwordManagement = usePasswordManagement();
  const imageModal = useImageModal(galleryGroups.currentGroup);

  // Handlers
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (galleryGroups.selectedGroup) {
      fileUpload.handleFileUpload(
        event,
        galleryGroups.selectedGroup,
        galleryGroups.fetchGroups
      );
    }
  };

  const handleDeleteImage = (groupId: string, filename: string) => {
    fileUpload.deleteImage(groupId, filename, galleryGroups.fetchGroups);
  };

  if (galleryGroups.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <AdminHeader
          onChangePasswordClick={() => passwordManagement.setShowChangePassword(true)}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GalleryGroupsPanel
            groups={galleryGroups.groups}
            selectedGroup={galleryGroups.selectedGroup}
            onSelectGroup={galleryGroups.setSelectedGroup}
            onCreateGroup={galleryGroups.createGroup}
            onDeleteGroup={galleryGroups.deleteGroup}
          />

          <GalleryImagesPanel
            currentGroup={galleryGroups.currentGroup}
            uploading={fileUpload.uploading}
            uploadProgress={fileUpload.uploadProgress}
            uploadingFiles={fileUpload.uploadingFiles}
            fileInputRef={fileUpload.fileInputRef}
            onFileUpload={handleFileUpload}
            onDeleteImage={handleDeleteImage}
            onImageClick={imageModal.setSelectedImageIndex}
          />
        </div>

        <AdminImageModal
          selectedImage={imageModal.selectedImage}
          selectedImageIndex={imageModal.selectedImageIndex}
          currentGroup={galleryGroups.currentGroup}
          onClose={imageModal.closeModal}
          onPrevious={imageModal.goToPrevious}
          onNext={imageModal.goToNext}
          onDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}
