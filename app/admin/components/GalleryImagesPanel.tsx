import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Upload, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { GalleryGroup } from '../types';

interface GalleryImagesPanelProps {
  currentGroup: GalleryGroup | undefined;
  uploading: boolean;
  uploadProgress: number;
  uploadingFiles: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (groupId: string, filename: string) => void;
  onImageClick: (index: number) => void;
}

export default function GalleryImagesPanel({
  currentGroup,
  uploading,
  uploadProgress,
  uploadingFiles,
  fileInputRef,
  onFileUpload,
  onDeleteImage,
  onImageClick,
}: GalleryImagesPanelProps) {
  const { t, i18n } = useTranslation();

  if (!currentGroup) {
    return (
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          <p>Select a gallery group to manage images</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold">
            {i18n.language === 'gr' ? currentGroup.nameGr : currentGroup.name}
          </h2>
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,image/heic,image/heif"
              capture="environment"
              onChange={onFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
            >
              <Upload size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">
                {uploading ? 'Uploading...' : t('admin.addImages')}
              </span>
              <span className="sm:hidden">
                {uploading ? 'Uploading...' : 'Add Images'}
              </span>
            </button>
          </div>
        </div>

        {/* Upload Progress Bar */}
        {uploading && (
          <motion.div
            className="mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-blue-800">
                Uploading {uploadingFiles.length} file
                {uploadingFiles.length !== 1 ? 's' : ''}...
              </span>
              <span className="text-xs sm:text-sm font-semibold text-blue-800">
                {uploadProgress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-blue-200 rounded-full h-2 sm:h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* File List */}
            <div className="mt-3 space-y-1">
              {uploadingFiles.map((filename, index) => (
                <div
                  key={index}
                  className="flex items-center text-xs text-blue-700"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                  <span className="truncate">{filename}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {currentGroup.images.length === 0 ? (
          <div className="text-center text-gray-500 py-8 sm:py-12">
            <p className="text-sm sm:text-base">No images uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {currentGroup.images.map((image, index) => (
              <div
                key={image.filename}
                className="relative aspect-square cursor-pointer"
                onClick={() => onImageClick(index)}
              >
                <Image
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg hover:scale-105 transition-transform"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteImage(currentGroup._id, image.filename);
                  }}
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  title="Delete image"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
