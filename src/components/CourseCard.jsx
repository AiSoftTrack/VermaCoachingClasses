import { Clock, DollarSign, User } from 'lucide-react';

function CourseCard({ course, isSelected, onToggleSelect }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isSelected ? 'ring-4 ring-blue-500' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Selected
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{course.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <DollarSign className="w-4 h-4 mr-2 text-green-600" />
            <span className="font-semibold">Rs. {course.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            <span>{course.duration}</span>
          </div>

          <div className="flex items-start text-gray-600 text-sm">
            <User className="w-4 h-4 mr-2 mt-1 text-purple-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">{course.educator}</p>
              <p className="text-xs text-gray-500 mt-1">{course.educatorBio}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onToggleSelect(course.id)}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            isSelected
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSelected ? 'Remove from Selection' : 'Select Course'}
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
