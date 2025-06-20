'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useGalleryGroups } from '@/features/admin/hooks/useGalleryGroups';
import { useFileUpload } from '@/features/admin/hooks/useFileUpload';
import { usePasswordManagement } from '@/features/admin/hooks/usePasswordManagement';
import { useImageModal } from '@/features/admin/hooks/useImageModal';
import AdminHeader from '@/features/admin/components/AdminHeader';
import ChangePasswordModal from '@/features/admin/components/ChangePasswordModal';
import GalleryGroupsPanel from '@/features/admin/components/GalleryGroupsPanel';
import GalleryImagesPanel from '@/features/admin/components/GalleryImagesPanel';
import AdminImageModal from '@/features/admin/components/AdminImageModal';
import VisitorStatsPanel from '@/features/admin/components/VisitorStatsPanel';
import ConfirmationDialog from '@/features/admin/components/ConfirmationDialog';

export default function AdminPage() {
  const { t } = useTranslation();
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-21">
      <AdminHeader
        onChangePasswordClick={() =>
          passwordManagement.setShowChangePassword(true)
        }
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Visitor Statistics Panel */}
        <div className="mb-8">
          <VisitorStatsPanel />
        </div>

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
          onNext={imageModal.goToNext}
          onPrevious={imageModal.goToPrevious}
          onDeleteImage={handleDeleteImage}
        />

        <ChangePasswordModal
          show={passwordManagement.showChangePassword}
          onClose={() => passwordManagement.setShowChangePassword(false)}
          onSubmit={(e) => {
            e.preventDefault();
            passwordManagement.changePassword();
          }}
          passwordForm={passwordManagement.passwordForm}
          onFormChange={passwordManagement.handlePasswordFormChange}
          loading={passwordManagement.passwordLoading}
        />

        {/* Gallery Group Delete Confirmation */}
        <ConfirmationDialog
          isOpen={galleryGroups.showDeleteConfirm}
          title={t('admin.confirmDelete')}
          message={t('admin.confirmDeleteGallery')}
          onConfirm={galleryGroups.confirmDeleteGroup}
          onCancel={galleryGroups.cancelDeleteGroup}
          variant="danger"
        />
      </div>
    </div>
  );
}
