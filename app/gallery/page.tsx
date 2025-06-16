'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGalleryData } from './hooks/useGalleryData';
import { useImageNavigation } from './hooks/useImageNavigation';
import { GalleryTabs } from './components/GalleryTabs';
import { GalleryGrid } from './components/GalleryGrid';
import { ImageModal } from './components/ImageModal';

export default function GalleryPage() {
  const { t } = useTranslation();
  const { groups, loading } = useGalleryData();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Set the first group as selected when groups are loaded
  if (groups.length > 0 && !selectedGroup) {
    setSelectedGroup(groups[0]._id);
  }

  const currentGroup = groups.find((group) => group._id === selectedGroup);

  const {
    selectedImageIndex,
    selectedImage,
    setSelectedImageIndex,
    goToPrevious,
    goToNext,
    closeModal,
  } = useImageNavigation({ currentGroup });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <div className="text-xl font-medium text-gray-700 mb-2">
              Loading gallery...
            </div>
            <div className="text-sm text-gray-500">
              Preparing your visual experience
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 pt-16 pb-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t('gallery.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of stunning visuals
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-16">
        {groups.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Images Available
            </h3>
            <p className="text-gray-500">{t('gallery.noImages')}</p>
          </div>
        ) : (
          <>
            <GalleryTabs
              groups={groups}
              selectedGroup={selectedGroup}
              onGroupSelect={setSelectedGroup}
            />

            <GalleryGrid
              currentGroup={currentGroup || null}
              onImageClick={setSelectedImageIndex}
            />
          </>
        )}

        <ImageModal
          selectedImage={selectedImage}
          selectedImageIndex={selectedImageIndex}
          currentGroup={currentGroup}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}
