import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, X, Save, Loader2, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { featureService } from '../../services/featureService';
import { Feature } from '../../models/Feature';

const FeaturesManager: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Feature | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Feature>>({
    title: '',
    description: '',
    icon: '⭐',
    isActive: true
  });

  // Load features from Firebase on mount
  useEffect(() => {
    loadFeatures();
    
    // Subscribe to real-time updates
    const unsubscribe = featureService.subscribe((updatedFeatures) => {
      setFeatures(updatedFeatures || []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await featureService.getAll();
      setFeatures(data || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load features');
      console.error('Error loading features:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      setSaving(true);
      const newFeature: Feature = {
        id: `feature_${Date.now()}`,
        title: formData.title!,
        description: formData.description!,
        icon: formData.icon || '⭐',
        isActive: true,
        order: features.length + 1,
        createdAt: new Date().toISOString()
      };

      await featureService.create(newFeature);
      resetForm();
    } catch (err: any) {
      alert('Error adding feature: ' + (err.message || 'Unknown error'));
      console.error('Error adding feature:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    
    try {
      setSaving(true);
      await featureService.update(editingItem.id, formData);
      resetForm();
    } catch (err: any) {
      alert('Error updating feature: ' + (err.message || 'Unknown error'));
      console.error('Error updating feature:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;
    
    try {
      await featureService.delete(id);
    } catch (err: any) {
      alert('Error deleting feature: ' + (err.message || 'Unknown error'));
      console.error('Error deleting feature:', err);
    }
  };

  const handleEdit = (item: Feature) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const toggleActive = async (item: Feature) => {
    try {
      await featureService.update(item.id, {
        isActive: !item.isActive
      });
    } catch (err: any) {
      alert('Error updating feature status: ' + (err.message || 'Unknown error'));
      console.error('Error updating feature status:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '⭐',
      isActive: true
    });
    setEditingItem(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Features</h1>
          <p className="text-gray-600 mt-1">Manage academy features and highlights</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {features.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No features yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first feature</p>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <button
                onClick={() => toggleActive(item)}
                className={`px-3 py-1 text-xs rounded-full ${
                  item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {item.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingItem ? 'Edit Feature' : 'Add Feature'}
              </h2>
              <button onClick={resetForm} disabled={saving}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="⭐"
                  disabled={saving}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={resetForm} disabled={saving}>Cancel</Button>
              <Button variant="primary" onClick={editingItem ? handleUpdate : handleAdd} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? 'Update' : 'Add'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesManager;