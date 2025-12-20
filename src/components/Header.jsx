import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Varma Coaching Classes</h1>
              <p className="text-xs text-gray-500">Excellence in Education</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </a>
            <a href="#gallery" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Gallery
            </a>
            <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Courses
            </a>
                       {/* ✅ Admission page */}
            <Link
              to="/admission"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Admission
            </Link>

            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
