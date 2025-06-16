import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { GalleryGroup, NewGroupForm } from '../types';

interface GalleryGroupsPanelProps {
  groups: GalleryGroup[];
  selectedGroup: string | null;
  onSelectGroup: (groupId: string) => void;
  onCreateGroup: (group: NewGroupForm) => Promise<boolean>;
  onDeleteGroup: (groupId: string) => Promise<boolean>;
}

export default function GalleryGroupsPanel({
  groups,
  selectedGroup,
  onSelectGroup,
  onCreateGroup,
  onDeleteGroup,
}: GalleryGroupsPanelProps) {
  const { t, i18n } = useTranslation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState<NewGroupForm>({
    name: '',
    nameGr: '',
    description: '',
    descriptionGr: '',
  });

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onCreateGroup(newGroup);
    if (success) {
      setNewGroup({
        name: '',
        nameGr: '',
        description: '',
        descriptionGr: '',
      });
      setShowCreateForm(false);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    await onDeleteGroup(groupId);
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('admin.galleries')}</h2>
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                required
              />
              <input
                type="text"
                placeholder="Greek Name"
                value={newGroup.nameGr}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, nameGr: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
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
                onClick={() => onSelectGroup(group._id)}
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
  );
}
