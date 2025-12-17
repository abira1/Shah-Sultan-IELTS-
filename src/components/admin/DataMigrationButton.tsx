import React, { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { migrateAllData } from '../../utils/migrateData';

const DataMigrationButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleMigrate = async () => {
    if (!window.confirm('This will populate the Firebase database with initial data. Continue?')) {
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      await migrateAllData();
      setStatus('success');
      setMessage('Successfully migrated all data to Firebase!');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Failed to migrate data');
      console.error('Migration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Database className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Firebase Data Migration
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Populate Firebase Realtime Database with initial data including courses, testimonials, features, gallery images, and sample questions.
          </p>

          {status === 'success' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{message}</p>
            </div>
          )}

          <button
            onClick={handleMigrate}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Migrating Data...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Populate Database
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Note: This should only be run once to initialize the database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataMigrationButton;
