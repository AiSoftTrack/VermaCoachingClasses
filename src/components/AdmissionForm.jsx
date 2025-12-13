import { useState } from 'react';
import { subjectsData } from '../data/subjects';
import { submitToGoogleForm, ADMISSION_FORM_URL, ADMISSION_FORM_FIELDS } from '../utils/googleFormConfig';
import { CheckCircle, XCircle, BookOpen, Plus, X } from 'lucide-react';

function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedSubjects: []
  });

  const [customSubject, setCustomSubject] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle checkbox selection for subjects
  const handleSubjectToggle = (subjectName) => {
    setFormData(prev => {
      const isSelected = prev.selectedSubjects.includes(subjectName);
      return {
        ...prev,
        selectedSubjects: isSelected
          ? prev.selectedSubjects.filter(s => s !== subjectName)
          : [...prev.selectedSubjects, subjectName]
      };
    });
    if (errors.selectedSubjects) {
      setErrors(prev => ({ ...prev, selectedSubjects: '' }));
    }
  };

  // Add custom subject dynamically
  const handleAddCustomSubject = () => {
    if (customSubject.trim() && !formData.selectedSubjects.includes(customSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        selectedSubjects: [...prev.selectedSubjects, customSubject.trim()]
      }));
      setCustomSubject('');
      if (errors.selectedSubjects) {
        setErrors(prev => ({ ...prev, selectedSubjects: '' }));
      }
    }
  };

  // Remove subject from selection
  const handleRemoveSubject = (subject) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.filter(s => s !== subject)
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // MANDATORY: At least one subject must be selected
    if (formData.selectedSubjects.length === 0) {
      newErrors.selectedSubjects = 'Please select at least one subject';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission to Google Sheets
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare data for Google Form submission
      // The subjects are joined into a comma-separated string
      const googleFormData = {
        [ADMISSION_FORM_FIELDS.name]: formData.name,
        [ADMISSION_FORM_FIELDS.email]: formData.email,
        [ADMISSION_FORM_FIELDS.phone]: formData.phone,
        [ADMISSION_FORM_FIELDS.subjects]: formData.selectedSubjects.join(', ')
      };

      // Submit to Google Form (which stores in Google Sheets)
      // This will also trigger email notification to admin Gmail
      const result = await submitToGoogleForm(ADMISSION_FORM_URL, googleFormData);

      if (result.success) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          selectedSubjects: []
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="admission" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <BookOpen className="w-10 h-10 mr-3 text-blue-600" />
            Admission Form
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Begin your journey with us. Fill out the form below to apply for admission.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Subjects <span className="text-red-500">* (At least one required)</span>
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {subjectsData.map(subject => (
                  <label
                    key={subject.id}
                    className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.selectedSubjects.includes(subject.name)
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedSubjects.includes(subject.name)}
                      onChange={() => handleSubjectToggle(subject.name)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{subject.name}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Add custom subject..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomSubject();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCustomSubject}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>

              {formData.selectedSubjects.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Selected Subjects ({formData.selectedSubjects.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedSubjects.map((subject, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {subject}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(subject)}
                          className="ml-2 hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {errors.selectedSubjects && (
                <p className="mt-2 text-sm text-red-500">{errors.selectedSubjects}</p>
              )}
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-semibold">Application Submitted Successfully!</p>
                  <p className="text-green-700 text-sm mt-1">
                    Thank you for applying. We have received your application and will contact you shortly.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-semibold">Submission Failed</p>
                  <p className="text-red-700 text-sm mt-1">
                    There was an error submitting your application. Please try again or contact us directly.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdmissionForm;
