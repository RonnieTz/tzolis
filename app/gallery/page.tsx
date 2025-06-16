'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  filename: string;
  uploadedAt: string;
}

interface GalleryGroup {
  _id: string;
  name: string;
  nameGr: string;
  description: string;
  descriptionGr: string;
  images: GalleryImage[];
}

export default function GalleryPage() {
  const { t, i18n } = useTranslation();
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/gallery/groups');
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
        if (data.length > 0) {
          setSelectedGroup(data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching gallery groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentGroup = groups.find((group) => group._id === selectedGroup);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          {t('gallery.title')}
        </h1>

        {groups.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">{t('gallery.noImages')}</p>
          </div>
        ) : (
          <>
            {/* Gallery Group Tabs */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {groups.map((group) => (
                <button
                  key={group._id}
                  onClick={() => setSelectedGroup(group._id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedGroup === group._id
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {i18n.language === 'gr' ? group.nameGr : group.name}
                </button>
              ))}
            </div>

            {/* Gallery Images */}
            {currentGroup && (
              <div>
                {currentGroup.description && (
                  <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    {i18n.language === 'gr'
                      ? currentGroup.descriptionGr
                      : currentGroup.description}
                  </p>
                )}

                {currentGroup.images.length === 0 ? (
                  <div className="text-center text-gray-600">
                    <p>{t('gallery.noImages')}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentGroup.images.map((image, index) => (
                      <motion.div
                        key={image.filename}
                        className="relative aspect-square cursor-pointer group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => setSelectedImage(image.url)}
                      >
                        <Image
                          src={image.url}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                              className="w-12 h-12"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={selectedImage}
                alt="Gallery image"
                width={1200}
                height={800}
                className="object-contain max-h-[90vh] max-w-full"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
