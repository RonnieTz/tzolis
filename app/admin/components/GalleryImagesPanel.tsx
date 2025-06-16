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
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {i18n.language === 'gr' ? currentGroup.nameGr : currentGroup.name}
          </h2>
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={onFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Upload size={20} />
              <span>{uploading ? 'Uploading...' : t('admin.addImages')}</span>
            </button>
          </div>
        </div>

        {/* Upload Progress Bar */}
        {uploading && (
          <motion.div
            className="mb-6 p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                Uploading {uploadingFiles.length} file
                {uploadingFiles.length !== 1 ? 's' : ''}...
              </span>
              <span className="text-sm font-semibold text-blue-800">
                {uploadProgress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
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
                  {filename}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {currentGroup.images.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No images uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  title="Delete image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
