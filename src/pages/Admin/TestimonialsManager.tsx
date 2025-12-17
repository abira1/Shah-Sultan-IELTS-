import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, X, Save, Loader2, AlertCircle, Quote } from 'lucide-react';
import Button from '../../components/ui/Button';
import { testimonialService } from '../../services/testimonialService';
import { Testimonial } from '../../models/Testimonial';

const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    band: 7.0,
    comment: '',
    image: '',
    course: '',
    date: new Date().toISOString().split('T')[0],
    isActive: true
  });

  // Load testimonials from Firebase on mount
  useEffect(() => {
    loadTestimonials();
    
    // Subscribe to real-time updates
    const unsubscribe = testimonialService.subscribe((updatedTestimonials) => {
      setTestimonials(updatedTestimonials || []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.getAll();
      setTestimonials(data || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load testimonials');
      console.error('Error loading testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.comment) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      setSaving(true);
      const newTestimonial: Testimonial = {
        id: `testimonial_${Date.now()}`,
        name: formData.name!,
        band: formData.band!,
        comment: formData.comment!,
        image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name!)}`,
        course: formData.course!,
        date: formData.date!,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      await testimonialService.create(newTestimonial);
      resetForm();
    } catch (err: any) {
      alert('Error adding testimonial: ' + (err.message || 'Unknown error'));
      console.error('Error adding testimonial:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    
    try {
      setSaving(true);
      await testimonialService.update(editingItem.id, formData);
      resetForm();
    } catch (err: any) {
      alert('Error updating testimonial: ' + (err.message || 'Unknown error'));
      console.error('Error updating testimonial:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await testimonialService.delete(id);
    } catch (err: any) {
      alert('Error deleting testimonial: ' + (err.message || 'Unknown error'));
      console.error('Error deleting testimonial:', err);
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const toggleActive = async (item: Testimonial) => {
    try {
      await testimonialService.update(item.id, {
        isActive: !item.isActive
      });
    } catch (err: any) {
      alert('Error updating testimonial status: ' + (err.message || 'Unknown error'));
      console.error('Error updating testimonial status:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      band: 7.0,
      comment: '',
      image: '',
      course: '',
      date: new Date().toISOString().split('T')[0],
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
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage student testimonials and reviews</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
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

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <Quote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first testimonial</p>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-semibold">Band {item.band}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.comment}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{item.course}</span>
                <button
                  onClick={() => toggleActive(item)}
                  className={`px-2 py-1 rounded-full ${
                    item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={resetForm} disabled={saving}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Band Score *</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9"
                  value={formData.band || 7.0}
                  onChange={(e) => setFormData({...formData, band: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Comment *</label>
                <textarea
                  value={formData.comment || ''}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <input
                  type="text"
                  value={formData.course || ''}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Leave blank for auto-generated avatar"
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

export default TestimonialsManager;