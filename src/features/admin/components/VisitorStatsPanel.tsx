import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useVisitorStats } from '../hooks/useVisitorStats';

const VisitorStatsPanel: React.FC = () => {
  const { t } = useTranslation();
  const {
    stats,
    loading,
    error,
    deleting,
    refetch,
    deleteData,
    showDeleteConfirm,
    periodToDelete,
    confirmDeleteData,
    cancelDeleteData,
  } = useVisitorStats();

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t('admin.visitorStats.title')}
        </h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t('admin.visitorStats.title')}
        </h2>
        <div className="text-red-400 mb-4">
          {t('admin.visitorStats.error')}: {error}
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t('admin.visitorStats.retry')}
        </button>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statItems = [
    {
      label: t('admin.visitorStats.periods.hour'),
      data: stats.hour,
      key: 'hour',
    },
    { label: t('admin.visitorStats.periods.day'), data: stats.day, key: 'day' },
    {
      label: t('admin.visitorStats.periods.week'),
      data: stats.week,
      key: 'week',
    },
    {
      label: t('admin.visitorStats.periods.month'),
      data: stats.month,
      key: 'month',
    },
    {
      label: t('admin.visitorStats.periods.year'),
      data: stats.year,
      key: 'year',
    },
    {
      label: t('admin.visitorStats.periods.allTime'),
      data: stats.allTime,
      key: 'allTime',
    },
  ];

  const handleDelete = async (period: string) => {
    deleteData(period);
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {t('admin.visitorStats.title')}
          </h2>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 text-sm"
            disabled={!!deleting}
          >
            {t('admin.visitorStats.refresh')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="border border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-300">
                  {item.label}
                </h3>
                <button
                  onClick={() => handleDelete(item.key)}
                  disabled={deleting === item.key || !!deleting}
                  className="text-red-400 hover:text-red-300 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t('admin.visitorStats.deleteConfirm', {
                    period: item.label,
                  })}
                >
                  {deleting === item.key ? (
                    <div className="animate-spin w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full"></div>
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {t('admin.visitorStats.metrics.totalVisits')}:
                  </span>
                  <span className="text-lg font-semibold text-blue-400">
                    {item.data.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {t('admin.visitorStats.metrics.uniqueVisitors')}:
                  </span>
                  <span className="text-lg font-semibold text-green-400">
                    {item.data.unique.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>
            • {t('admin.visitorStats.metrics.totalVisits')}:{' '}
            {t('admin.visitorStats.descriptions.totalVisits')}
          </p>
          <p>
            • {t('admin.visitorStats.metrics.uniqueVisitors')}:{' '}
            {t('admin.visitorStats.descriptions.uniqueVisitors')}
          </p>
          <p>• {t('admin.visitorStats.descriptions.realTime')}</p>
          <p>• {t('admin.visitorStats.descriptions.deleteInfo')}</p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showDeleteConfirm && periodToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {t('admin.confirmDelete')}
              </h3>
              <p className="text-gray-300 mb-6">
                {t('admin.confirmDeleteVisitorData', {
                  period: statItems.find((item) => item.key === periodToDelete)
                    ?.label,
                })}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDeleteData}
                  className="px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {t('admin.cancel')}
                </button>
                <button
                  onClick={confirmDeleteData}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {t('admin.confirmDelete')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VisitorStatsPanel;
