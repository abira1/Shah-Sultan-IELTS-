import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Award
} from 'lucide-react';
import Button from '../../components/ui/Button';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  course: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  band?: number;
  avatar: string;
  totalTests: number;
  completedTests: number;
  averageScore: number;
  lastActive: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: string;
  notes: string;
  paymentStatus: 'paid' | 'pending' | 'overdue' | 'partial';
  courseFees: number;
  paidAmount: number;
}

interface NewStudent {
  name: string;
  email: string;
  phone: string;
  course: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  address: string;
  dateOfBirth: string;
  emergencyContact: string;
  notes: string;
  paymentStatus: 'paid' | 'pending' | 'overdue' | 'partial';
  courseFees: number;
  paidAmount: number;
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Ahmad Khan',
      email: 'ahmad@example.com',
      phone: '+92 300 1234567',
      enrollmentDate: '2024-01-15',
      course: 'Academic IELTS',
      status: 'active',
      band: 7.5,
      avatar: 'https://ui-avatars.com/api/?name=Ahmad+Khan&background=0a2a66&color=fff',
      totalTests: 12,
      completedTests: 8,
      averageScore: 7.2,
      lastActive: '2024-03-20',
      address: 'Islamabad, Pakistan',
      dateOfBirth: '1995-06-15',
      emergencyContact: '+92 300 7654321',
      notes: 'Excellent listening skills, needs work on writing.',
      paymentStatus: 'paid',
      courseFees: 25000,
      paidAmount: 25000
    },
    {
      id: 2,
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      phone: '+92 301 2345678',
      enrollmentDate: '2024-02-01',
      course: 'General IELTS',
      status: 'active',
      band: 6.0,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Ahmed&background=0a2a66&color=fff',
      totalTests: 8,
      completedTests: 5,
      averageScore: 6.3,
      lastActive: '2024-03-19',
      address: 'Lahore, Pakistan',
      dateOfBirth: '1992-08-22',
      emergencyContact: '+92 301 8765432',
      notes: 'Strong speaking skills, working on reading comprehension.',
      paymentStatus: 'partial',
      courseFees: 20000,
      paidAmount: 15000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [newStudent, setNewStudent] = useState<NewStudent>({
    name: '',
    email: '',
    phone: '',
    course: 'Academic IELTS',
    status: 'active',
    address: '',
    dateOfBirth: '',
    emergencyContact: '',
    notes: '',
    paymentStatus: 'pending',
    courseFees: 15000,
    paidAmount: 0
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle student selection
  const handleSelectStudent = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  // Handle add new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) return;

    const student: Student = {
      id: Date.now(),
      name: newStudent.name,
      email: newStudent.email,
      phone: newStudent.phone || '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      course: newStudent.course || 'Academic IELTS',
      status: newStudent.status || 'active',
      band: undefined,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStudent.name)}&background=0a2a66&color=fff`,
      totalTests: 0,
      completedTests: 0,
      averageScore: 0,
      lastActive: new Date().toISOString().split('T')[0],
      address: newStudent.address || '',
      dateOfBirth: newStudent.dateOfBirth || '',
      emergencyContact: newStudent.emergencyContact || '',
      notes: newStudent.notes || '',
      paymentStatus: newStudent.paymentStatus || 'pending',
      courseFees: newStudent.courseFees || 15000,
      paidAmount: newStudent.paidAmount || 0
    };

    setStudents([...students, student]);
    resetForm();
  };

  // Handle update student
  const handleUpdateStudent = () => {
    if (!editingStudent) return;

    setStudents(students.map(student =>
      student.id === editingStudent.id ? editingStudent : student
    ));
    setEditingStudent(null);
    resetForm();
  };

  // Handle delete student
  const handleDeleteStudent = (studentId: number) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  // Handle edit student
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent(student);
  };

  // Reset form
  const resetForm = () => {
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      course: 'Academic IELTS',
      status: 'active',
      address: '',
      dateOfBirth: '',
      emergencyContact: '',
      notes: '',
      paymentStatus: 'pending',
      courseFees: 15000,
      paidAmount: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">Manage student registrations and track progress</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              <option value="Academic IELTS">Academic IELTS</option>
              <option value="General IELTS">General IELTS</option>
              <option value="IELTS Prep">IELTS Prep</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Student</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Course</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Band Score</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Payment</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Last Active</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {student.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {student.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{student.course}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Enrolled: {student.enrollmentDate}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    {student.band ? (
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium text-gray-900">{student.band}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(student.paymentStatus)}`}>
                      {student.paymentStatus.charAt(0).toUpperCase() + student.paymentStatus.slice(1)}
                    </span>
                    <div className="text-sm text-gray-500 mt-1">
                      Rs. {student.paidAmount.toLocaleString()} / Rs. {student.courseFees.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">{student.lastActive}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedStudents.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedStudents.length} student(s) selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;