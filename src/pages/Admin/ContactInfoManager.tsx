import React, { useState, useEffect } from 'react';
import { Save, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Loader2, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { contactService } from '../../services/contactService';
import { ContactInfo } from '../../models/ContactInfo';

const ContactInfoManager: React.FC = () => {
  const [info, setInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    address: '',
    facebook: '',
    instagram: '',
    youtube: '',
    mapUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [saved, setSaved] = useState(false);

  // Load contact info on mount
  useEffect(() => {
    loadContactInfo();

    // Subscribe to real-time updates
    const unsubscribe = contactService.subscribe((data) => {
      if (data) {
        setInfo(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const data = await contactService.get();
      if (data) {
        setInfo(data);
      } else {
        // Set default values if no data exists
        const defaultInfo: ContactInfo = {
          email: 'info@shahsultanielts.com',
          phone: '+880 1234-567890',
          address: 'Dhaka, Bangladesh',
          facebook: 'https://facebook.com/shahsultanielts',
          instagram: 'https://instagram.com/shahsultanielts',
          youtube: 'https://youtube.com/@shahsultanielts',
          mapUrl: ''
        };
        setInfo(defaultInfo);
        await contactService.update(defaultInfo);
      }
    } catch (err) {
      setError('Failed to load contact information');
      console.error('Error loading contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      await contactService.update(info);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError('Failed to save contact information');
      console.error('Error saving contact info:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Information</h1>
          <p className="text-gray-600 mt-1">Manage contact details and social media links</p>
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
          ✓ Contact information saved successfully!
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading contact information...</span>
        </div>
      ) : (

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline h-4 w-4 mr-2" />Email
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => setInfo({...info, email: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline h-4 w-4 mr-2" />Phone
          </label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => setInfo({...info, phone: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-2" />Address
          </label>
          <textarea
            value={info.address}
            onChange={(e) => setInfo({...info, address: e.target.value})}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-4">Social Media</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Facebook className="inline h-4 w-4 mr-2" />Facebook
              </label>
              <input
                type="url"
                value={info.facebook}
                onChange={(e) => setInfo({...info, facebook: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Instagram className="inline h-4 w-4 mr-2" />Instagram
              </label>
              <input
                type="url"
                value={info.instagram}
                onChange={(e) => setInfo({...info, instagram: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://instagram.com/yourpage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Youtube className="inline h-4 w-4 mr-2" />YouTube
              </label>
              <input
                type="url"
                value={info.youtube}
                onChange={(e) => setInfo({...info, youtube: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-2" />Google Maps Embed URL
          </label>
          <input
            type="url"
            value={info.mapUrl}
            onChange={(e) => setInfo({...info, mapUrl: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste Google Maps embed URL"
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default ContactInfoManager;