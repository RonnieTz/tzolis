'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, LogOut } from 'lucide-react';
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

export default function AdminPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newGroup, setNewGroup] = useState({
    name: '',
    nameGr: '',
    description: '',
    descriptionGr: '',
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/gallery/groups');
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/gallery/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup),
      });

      if (response.ok) {
        setNewGroup({
          name: '',
          nameGr: '',
          description: '',
          descriptionGr: '',
        });
        setShowCreateForm(false);
        fetchGroups();
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm('Are you sure you want to delete this gallery group?')) return;

    try {
      const response = await fetch(`/api/gallery/groups/${groupId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchGroups();
        if (selectedGroup === groupId) {
          setSelectedGroup(null);
        }
      }
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectedGroup || !event.target.files) return;

    const files = Array.from(event.target.files);
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      const response = await fetch(`/api/gallery/groups/${selectedGroup}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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

  const currentGroup = groups.find((group) => group._id === selectedGroup);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {t('admin.title')}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span>{t('admin.logout')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery Groups Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {t('admin.galleries')}
                </h2>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Create Group Form */}
              {showCreateForm && (
                <motion.form
                  onSubmit={handleCreateGroup}
                  className="mb-6 p-4 border rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h3 className="text-lg font-medium mb-3">
                    {t('admin.createGroup')}
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="English Name"
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Greek Name"
                      value={newGroup.nameGr}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, nameGr: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <textarea
                      placeholder="English Description (optional)"
                      value={newGroup.description}
                      onChange={(e) =>
                        setNewGroup({
                          ...newGroup,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={2}
                    />
                    <textarea
                      placeholder="Greek Description (optional)"
                      value={newGroup.descriptionGr}
                      onChange={(e) =>
                        setNewGroup({
                          ...newGroup,
                          descriptionGr: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}

              {/* Groups List */}
              <div className="space-y-2">
                {groups.map((group) => (
                  <div
                    key={group._id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedGroup === group._id
                        ? 'bg-orange-100 border-orange-500 border'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div
                      onClick={() => setSelectedGroup(group._id)}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">
                          {i18n.language === 'gr' ? group.nameGr : group.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {group.images.length} images
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group._id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Images Panel */}
          <div className="lg:col-span-2">
            {currentGroup ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {i18n.language === 'gr'
                      ? currentGroup.nameGr
                      : currentGroup.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <Upload size={20} />
                      <span>
                        {uploading ? 'Uploading...' : t('admin.addImages')}
                      </span>
                    </button>
                  </div>
                </div>

                {currentGroup.images.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <p>No images uploaded yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentGroup.images.map((image, index) => (
                      <div key={image.filename} className="relative group">
                        <Image
                          src={image.url}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          width={500}
                          height={500}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                          <button
                            onClick={() => {
                              // You can implement image deletion here
                              console.log('Delete image:', image.filename);
                            }}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <p>Select a gallery group to manage images</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
