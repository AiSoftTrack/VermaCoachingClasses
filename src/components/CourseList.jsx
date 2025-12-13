import { useState } from 'react';
import CourseCard from './CourseCard';
import { coursesData } from '../data/courses';
import { Tag, TrendingDown } from 'lucide-react';

function CourseList() {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleToggleSelect = (courseId) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  // Bundle discount calculation
  // If 3 or more courses are selected, apply 15% discount
  const calculateTotal = () => {
    const selectedCoursesData = coursesData.filter(course =>
      selectedCourses.includes(course.id)
    );

    const originalTotal = selectedCoursesData.reduce((sum, course) => sum + course.price, 0);

    // Apply 15% discount if 3 or more courses selected
    const hasDiscount = selectedCourses.length >= 3;
    const discountRate = 0.15; // 15% discount
    const discountAmount = hasDiscount ? originalTotal * discountRate : 0;
    const finalTotal = originalTotal - discountAmount;

    return {
      originalTotal,
      discountAmount,
      finalTotal,
      hasDiscount
    };
  };

  const { originalTotal, discountAmount, finalTotal, hasDiscount } = calculateTotal();

  return (
    <section id="courses" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of technology courses designed to make you industry-ready
          </p>

          {selectedCourses.length >= 3 && (
            <div className="mt-6 inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-lg">
              <Tag className="w-5 h-5 mr-2" />
              <span className="font-semibold">Bundle Discount Active! Save 15% on 3+ courses</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {coursesData.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isSelected={selectedCourses.includes(course.id)}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>

        {selectedCourses.length > 0 && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 border-2 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Tag className="w-6 h-6 mr-2 text-blue-600" />
              Course Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-gray-700">
                <span>Selected Courses:</span>
                <span className="font-semibold">{selectedCourses.length}</span>
              </div>

              <div className="flex justify-between items-center text-gray-700">
                <span>Original Total:</span>
                <span className="font-semibold">Rs. {originalTotal.toLocaleString()}</span>
              </div>

              {hasDiscount && (
                <div className="flex justify-between items-center text-green-600 bg-green-50 px-3 py-2 rounded">
                  <span className="flex items-center">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Discount (15%):
                  </span>
                  <span className="font-semibold">- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t-2 border-gray-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Final Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Rs. {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {hasDiscount && (
                <p className="text-sm text-green-600 text-center font-medium">
                  You saved Rs. {discountAmount.toLocaleString()}!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseList;
