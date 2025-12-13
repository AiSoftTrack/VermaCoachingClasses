import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { coursesData as initialCoursesData } from '../data/courses';
import { galleryData as initialGalleryData } from '../data/gallery';
import { subjectsData as initialSubjectsData } from '../data/subjects';
import { Plus, Trash2, Edit2, Save, X, Shield, LogOut } from 'lucide-react';

function Admin() {
  const navigate = useNavigate();

  // Admin protection: If isAdmin is false, redirect to home
  // In production, this would check authentication from a secure source
  const isAdmin = true;

  // Redirect if not admin
  if (!isAdmin) {
    navigate('/');
    return null;
  }

  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState(initialCoursesData);
  const [gallery, setGallery] = useState(initialGalleryData);
  const [subjects, setSubjects] = useState(initialSubjectsData);

  const [editingCourse, setEditingCourse] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);

  const [newCourse, setNewCourse] = useState({
    name: '',
    price: '',
    duration: '',
    educator: '',
    educatorBio: '',
    image: ''
  });

  const [newGalleryImage, setNewGalleryImage] = useState({ url: '', caption: '' });
  const [newSubject, setNewSubject] = useState('');

  // Course Management
  const handleAddCourse = () => {
    if (newCourse.name && newCourse.price && newCourse.duration && newCourse.educator) {
      const course = {
        id: Date.now(),
        ...newCourse,
        price: parseFloat(newCourse.price)
      };
      setCourses([...courses, course]);
      setNewCourse({ name: '', price: '', duration: '', educator: '', educatorBio: '', image: '' });
    }
  };

  const handleUpdateCourse = (id) => {
    setCourses(courses.map(c => (c.id === id ? { ...editingCourse } : c)));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Gallery Management
  const handleAddGalleryImage = () => {
    if (newGalleryImage.url && newGalleryImage.caption) {
      const image = {
        id: Date.now(),
        ...newGalleryImage
      };
      setGallery([...gallery, image]);
      setNewGalleryImage({ url: '', caption: '' });
    }
  };

  const handleDeleteGalleryImage = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setGallery(gallery.filter(img => img.id !== id));
    }
  };

  // Subject Management
  const handleAddSubject = () => {
    if (newSubject.trim()) {
      const subject = {
        id: Date.now(),
        name: newSubject.trim()
      };
      setSubjects([...subjects, subject]);
      setNewSubject('');
    }
  };

  const handleUpdateSubject = (id) => {
    setSubjects(subjects.map(s => (s.id === id ? { ...editingSubject } : s)));
    setEditingSubject(null);
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-blue-100 text-sm">TechLearn Institute Management</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'courses'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'gallery'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setActiveTab('subjects')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'subjects'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Subjects
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Course</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 3 Months)"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Educator Name"
                      value={newCourse.educator}
                      onChange={(e) => setNewCourse({ ...newCourse, educator: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={newCourse.image}
                      onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Educator Bio"
                      value={newCourse.educatorBio}
                      onChange={(e) => setNewCourse({ ...newCourse, educatorBio: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleAddCourse}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Course</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      {editingCourse?.id === course.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editingCourse.name}
                            onChange={(e) =>
                              setEditingCourse({ ...editingCourse, name: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <input
                            type="number"
                            value={editingCourse.price}
                            onChange={(e) =>
                              setEditingCourse({ ...editingCourse, price: parseFloat(e.target.value) })
                            }
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            value={editingCourse.duration}
                            onChange={(e) =>
                              setEditingCourse({ ...editingCourse, duration: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            value={editingCourse.educator}
                            onChange={(e) =>
                              setEditingCourse({ ...editingCourse, educator: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <textarea
                            value={editingCourse.educatorBio}
                            onChange={(e) =>
                              setEditingCourse({ ...editingCourse, educatorBio: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateCourse(course.id)}
                              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingCourse(null)}
                              className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                              <X className="w-4 h-4" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold">{course.name}</h4>
                            <p className="text-gray-600">
                              Rs. {course.price.toLocaleString()} - {course.duration}
                            </p>
                            <p className="text-sm text-gray-500">{course.educator}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingCourse(course)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Image</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={newGalleryImage.url}
                      onChange={(e) =>
                        setNewGalleryImage({ ...newGalleryImage, url: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Caption"
                      value={newGalleryImage.caption}
                      onChange={(e) =>
                        setNewGalleryImage({ ...newGalleryImage, caption: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleAddGalleryImage}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gallery.map((image) => (
                    <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <img src={image.url} alt={image.caption} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <p className="text-sm text-gray-700 mb-3">{image.caption}</p>
                        <button
                          onClick={() => handleDeleteGalleryImage(image.id)}
                          className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Manage Subjects</h2>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Subject</h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSubject();
                        }
                      }}
                    />
                    <button
                      onClick={handleAddSubject}
                      className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Subject</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                    >
                      {editingSubject?.id === subject.id ? (
                        <div className="flex items-center space-x-2 flex-1">
                          <input
                            type="text"
                            value={editingSubject.name}
                            onChange={(e) =>
                              setEditingSubject({ ...editingSubject, name: e.target.value })
                            }
                            className="flex-1 px-4 py-2 border rounded-lg"
                          />
                          <button
                            onClick={() => handleUpdateSubject(subject.id)}
                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingSubject(null)}
                            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-gray-800 font-medium">{subject.name}</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingSubject(subject)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubject(subject.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
