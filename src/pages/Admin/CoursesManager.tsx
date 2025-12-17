import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen, X, Save, Loader2, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { courseService } from '../../services/courseService';
import { Course } from '../../models/Course';

const CoursesManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    fee: '',
    duration: '',
    image: '',
    features: [],
    isActive: true
  });

  // Load courses from Firebase on mount
  useEffect(() => {
    loadCourses();
    
    // Subscribe to real-time updates
    const unsubscribe = courseService.subscribe((updatedCourses) => {
      setCourses(updatedCourses || []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAll();
      setCourses(data || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load courses');
      console.error('Error loading courses:', err);
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
      const newCourse: Course = {
        id: `course_${Date.now()}`,
        title: formData.title!,
        description: formData.description!,
        fee: formData.fee || '',
        duration: formData.duration || '',
        image: formData.image || 'https://via.placeholder.com/400x300',
        features: formData.features || [],
        syllabus: formData.syllabus || [],
        popular: formData.popular || false,
        category: formData.category || 'full-courses',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await courseService.create(newCourse);
      resetForm();
    } catch (err: any) {
      alert('Error adding course: ' + (err.message || 'Unknown error'));
      console.error('Error adding course:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    
    try {
      setSaving(true);
      await courseService.update(editingItem.id, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      resetForm();
    } catch (err: any) {
      alert('Error updating course: ' + (err.message || 'Unknown error'));
      console.error('Error updating course:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await courseService.delete(id);
    } catch (err: any) {
      alert('Error deleting course: ' + (err.message || 'Unknown error'));
      console.error('Error deleting course:', err);
    }
  };

  const handleEdit = (item: Course) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const toggleActive = async (item: Course) => {
    try {
      await courseService.update(item.id, {
        isActive: !item.isActive,
        updatedAt: new Date().toISOString()
      });
    } catch (err: any) {
      alert('Error updating course status: ' + (err.message || 'Unknown error'));
      console.error('Error updating course status:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      fee: '',
      duration: '',
      image: '',
      features: [],
      isActive: true
    });
    setEditingItem(null);
    setShowModal(false);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const features = [...(formData.features || [])];
    features[index] = value;
    setFormData({ ...formData, features });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || []
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-1">Manage course offerings and pricing</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
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

      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first course</p>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="space-y-2 mb-3">
                  {item.features && item.features.map((feature, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex items-start">
                      <span className="mr-1">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-primary">{item.fee}</span>
                    {item.duration && (
                      <span className="text-xs text-gray-500 ml-2">{item.duration}</span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleActive(item)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingItem ? 'Edit Course' : 'Add Course'}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fee</label>
                  <input
                    type="text"
                    value={formData.fee || ''}
                    onChange={(e) => setFormData({...formData, fee: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., ৳ 4,000"
                    disabled={saving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., 8 weeks"
                    disabled={saving}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={saving}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Features</label>
                  <Button variant="outline" size="sm" onClick={addFeature} disabled={saving}>
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {(formData.features || []).map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg"
                        disabled={saving}
                      />
                      <Button variant="outline" size="sm" onClick={() => removeFeature(index)} disabled={saving}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
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

export default CoursesManager;