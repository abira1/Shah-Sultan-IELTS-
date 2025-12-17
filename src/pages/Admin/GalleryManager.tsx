import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, X, Save, Loader2, AlertCircle } from 'lucide-react';
import { galleryService } from '../../services/galleryService';
import { GalleryImage } from '../../models/GalleryImage';

const GalleryManager: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    title: '',
    url: '',
    category: 'classroom',
    isActive: true
  });

  // Load gallery from Firebase on mount
  useEffect(() => {
    loadGallery();
    
    // Subscribe to real-time updates
    const unsubscribe = galleryService.subscribe((updatedGallery) => {
      setGallery(updatedGallery || []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAll();
      setGallery(data || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load gallery');
      console.error('Error loading gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (item: GalleryImage) => {
    try {
      await galleryService.update(item.id, {
        isActive: !item.isActive
      });
    } catch (err: any) {
      alert('Error updating image status: ' + (err.message || 'Unknown error'));
      console.error('Error updating image status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await galleryService.delete(id);
    } catch (err: any) {
      alert('Error deleting image: ' + (err.message || 'Unknown error'));
      console.error('Error deleting image:', err);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingItem(image);
    setFormData(image);
    setShowEditModal(true);
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.url) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      setSaving(true);
      const newImage: GalleryImage = {
        id: `gallery_${Date.now()}`,
        title: formData.title!,
        url: formData.url!,
        category: formData.category || 'classroom',
        isActive: true,
        createdAt: new Date().toISOString()
      };

      await galleryService.create(newImage);
      resetForm();
    } catch (err: any) {
      alert('Error adding image: ' + (err.message || 'Unknown error'));
      console.error('Error adding image:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    
    try {
      setSaving(true);
      await galleryService.update(editingItem.id, formData);
      resetForm();
    } catch (err: any) {
      alert('Error updating image: ' + (err.message || 'Unknown error'));
      console.error('Error updating image:', err);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      category: 'classroom',
      isActive: true
    });
    setEditingItem(null);
    setShowEditModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <ImageIcon className="h-6 w-6 mr-2 text-primary" />
              Gallery Manager
            </h1>
            <p className="text-gray-600 mt-1">Manage gallery images across all categories</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({
                title: '',
                url: '',
                category: 'classroom',
                isActive: true
              });
              setShowEditModal(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-600">Total Images</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{gallery.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-600">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {gallery.filter(g => g.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-600">Classroom</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {gallery.filter(g => g.category === 'classroom').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-600">Achievements</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">
            {gallery.filter(g => g.category === 'achievements').length}
          </p>
        </div>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first image</p>
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    image.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {image.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white rounded text-xs capitalize">
                    {image.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-3">{image.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(image)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                      image.isActive 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {image.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit Image"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete Image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? 'Edit Image' : 'Add New Image'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
                disabled={saving}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
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
                <label className="block text-sm font-medium mb-1">Image URL *</label>
                <input
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://example.com/image.jpg"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category || 'classroom'}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                >
                  <option value="classroom">Classroom</option>
                  <option value="events">Events</option>
                  <option value="achievements">Achievements</option>
                  <option value="facilities">Facilities</option>
                </select>
              </div>
              {formData.url && (
                <div>
                  <label className="block text-sm font-medium mb-2">Preview</label>
                  <img 
                    src={formData.url} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={editingItem ? handleUpdate : handleAdd}
                disabled={saving}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? 'Update' : 'Add Image'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;