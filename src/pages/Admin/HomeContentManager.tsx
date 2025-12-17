import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { homeContentService } from '../../services/homeContentService';
import { HomeContent } from '../../models/HomeContent';

const HomeContentManager: React.FC = () => {
  const [content, setContent] = useState<HomeContent>({
    heroTitle: '',
    heroSubtitle: '',
    aboutText: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [saved, setSaved] = useState(false);

  // Load home content on mount
  useEffect(() => {
    loadHomeContent();

    // Subscribe to real-time updates
    const unsubscribe = homeContentService.subscribe((data) => {
      if (data) {
        setContent(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadHomeContent = async () => {
    try {
      setLoading(true);
      const data = await homeContentService.get();
      if (data) {
        setContent(data);
      } else {
        // Set default values if no data exists
        const defaultContent: HomeContent = {
          heroTitle: 'Your trusted destination for mastering English and achieving the IELTS goals',
          heroSubtitle: 'Join thousands of successful students at Shah Sultan\'s IELTS Academy',
          aboutText: 'Shah Sultan\'s IELTS Academy has been providing quality IELTS preparation for over 10 years. Our experienced instructors and proven methodology have helped thousands of students achieve their desired band scores.',
          contactEmail: 'info@shahsultanielts.com',
          contactPhone: '+880 1234-567890',
          contactAddress: 'Dhaka, Bangladesh'
        };
        setContent(defaultContent);
        await homeContentService.update(defaultContent);
      }
    } catch (err) {
      setError('Failed to load home content');
      console.error('Error loading home content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      await homeContentService.update(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError('Failed to save home content');
      console.error('Error saving home content:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Home Page Content</h1>
          <p className="text-gray-600 mt-1">Manage homepage text and content</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={saving || loading}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          ✓ Content saved successfully!
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading home content...</span>
        </div>
      ) : (

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
          <input
            type="text"
            value={content.heroTitle}
            onChange={(e) => setContent({...content, heroTitle: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
          <input
            type="text"
            value={content.heroSubtitle}
            onChange={(e) => setContent({...content, heroSubtitle: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">About Section Text</label>
          <textarea
            value={content.aboutText}
            onChange={(e) => setContent({...content, aboutText: e.target.value})}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              value={content.contactEmail}
              onChange={(e) => setContent({...content, contactEmail: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
            <input
              type="tel"
              value={content.contactPhone}
              onChange={(e) => setContent({...content, contactPhone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={content.contactAddress}
              onChange={(e) => setContent({...content, contactAddress: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default HomeContentManager;