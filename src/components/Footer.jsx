import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold">Verma Coaching Classes</h3>
            </div>
            <p className="text-gray-400 text-sm">
             Empowering students with strong foundations in Physics, Chemistry, Mathematics, and Biology through conceptual clarity and structured learning.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Our Courses</a></li>
              <li><a href="#admission" className="hover:text-blue-400 transition-colors">Admissions</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Chandametta, Parasiya, Madhya Pradesh, 480447</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98935 26085</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>diamondsantosh123@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Made by <span className="text-blue-400 font-semibold">AI Softrack Solution</span>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            &copy; {new Date().getFullYear()} TechLearn Institute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
