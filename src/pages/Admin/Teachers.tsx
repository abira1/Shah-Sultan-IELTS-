import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Mail,
  Award,
  BookOpen,
  Clock,
  Star,
  Save,
  X,
  Upload,
  Search,
  Filter,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { teacherService } from '../../services/teacherService';
import { Teacher } from '../../models/Teacher';

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Teacher | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState<string>('all');
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    image: '',
    qualification: '',
    specialization: 'All Skills',
    experience: 0,
    bio: '',
    achievements: [],
    email: '',
    isActive: true
  });

  // Load teachers from Firebase on mount
  useEffect(() => {
    loadTeachers();

    // Subscribe to real-time updates
    const unsubscribe = teacherService.subscribe((updatedTeachers) => {
      if (updatedTeachers) {
        setTeachers(updatedTeachers);
      } else {
        setTeachers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await teacherService.getAll();
      if (data) {
        setTeachers(data);
      }
    } catch (err) {
      setError('Failed to load teachers');
      console.error('Error loading teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = filterSpecialization === 'all' || teacher.specialization === filterSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  // Add new teacher
  const handleAddTeacher = async () => {
    if (!formData.name || !formData.email) return;

    try {
      setSaving(true);
      setError('');
      const teacherData: Omit<Teacher, 'id'> = {
        name: formData.name!,
        image: formData.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.name!),
        qualification: formData.qualification!,
        specialization: formData.specialization!,
        experience: formData.experience!,
        bio: formData.bio!,
        achievements: formData.achievements!,
        email: formData.email!,
        isActive: true
      };

      await teacherService.create(teacherData);
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError('Failed to add teacher');
      console.error('Error adding teacher:', err);
    } finally {
      setSaving(false);
    }
  };

  // Update teacher
  const handleUpdateTeacher = async () => {
    if (!editingItem) return;

    try {
      setSaving(true);
      setError('');
      await teacherService.update(editingItem.id!, editingItem);
      setEditingItem(null);
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Failed to update teacher');
      console.error('Error updating teacher:', err);
    } finally {
      setSaving(false);
    }
  };

  // Delete teacher
  const handleDeleteTeacher = async (teacherId: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      setError('');
      await teacherService.delete(teacherId);
    } catch (err) {
      setError('Failed to delete teacher');
      console.error('Error deleting teacher:', err);
    }
  };

  // Edit teacher
  const handleEditTeacher = (teacher: Teacher) => {
    setEditingItem(teacher);
    setFormData(teacher);
    setShowModal(true);
  };

  // Toggle teacher status
  const handleToggleStatus = async (teacher: Teacher) => {
    try {
      setError('');
      await teacherService.update(teacher.id!, { ...teacher, isActive: !teacher.isActive });
    } catch (err) {
      setError('Failed to update teacher status');
      console.error('Error updating teacher status:', err);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      qualification: '',
      specialization: 'All Skills',
      experience: 0,
      bio: '',
      achievements: [],
      email: '',
      image: '',
      isActive: true
    });
  };

  // Add achievement
  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...(formData.achievements || []), '']
    });
  };

  // Update achievement
  const updateAchievement = (index: number, value: string) => {
    const achievements = [...(formData.achievements || [])];
    achievements[index] = value;
    setFormData({
      ...formData,
      achievements
    });
  };

  // Remove achievement
  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Teachers Management</h1>
          <p className="text-gray-600 mt-1">Manage instructor profiles and specializations</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Teacher
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Specializations</option>
              <option value="Listening">Listening</option>
              <option value="Reading">Reading</option>
              <option value="Writing">Writing</option>
              <option value="Speaking">Speaking</option>
              <option value="All Skills">All Skills</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {/* Teachers Grid */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading teachers...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTeacher(teacher)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => teacher.id && handleDeleteTeacher(teacher.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{teacher.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{teacher.qualification}</p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {teacher.specialization}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {teacher.experience}y exp
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{teacher.bio}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-3 w-3 mr-1 text-gray-400" />
                  <span className="text-xs text-gray-500">{teacher.email}</span>
                </div>
                <button
                  onClick={() => handleToggleStatus(teacher)}
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    teacher.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {teacher.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Add/Edit Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {editingItem ? 'Edit Teacher' : 'Add New Teacher'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter teacher name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification *
                  </label>
                  <input
                    type="text"
                    value={formData.qualification || ''}
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter qualification details"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization
                    </label>
                    <select
                      value={formData.specialization || 'All Skills'}
                      onChange={(e) => setFormData({...formData, specialization: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All Skills">All Skills</option>
                      <option value="Listening">Listening</option>
                      <option value="Reading">Reading</option>
                      <option value="Writing">Writing</option>
                      <option value="Speaking">Speaking</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      value={formData.experience || 0}
                      onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Years of experience"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter teacher bio"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Achievements
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addAchievement}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(formData.achievements || []).map((achievement, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter achievement"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAchievement(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={editingItem ? handleUpdateTeacher : handleAddTeacher}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingItem ? 'Update Teacher' : 'Add Teacher'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;