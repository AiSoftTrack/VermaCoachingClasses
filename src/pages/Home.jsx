import Header from '../components/Header';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import CourseList from '../components/CourseList';
import AdmissionForm from '../components/AdmissionForm';
import EnquiryForm from '../components/EnquiryForm';
import GoogleMap from '../components/GoogleMap';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 1. Institute Introduction (Hero Section) */}
      <section id="about" className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to Varma Coaching Classes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Empowering Tomorrow's Tech Leaders Today
            </p>
            <p className="text-lg text-blue-50 mb-12 leading-relaxed">
              Verma Coaching Classes is a premier institute dedicated to excellence in Physics, Chemistry, Mathematics, and Biology education. We bridge the gap between core scientific concepts and their practical applications, building a strong academic foundation for competitive exams and higher studies. Our learning environment fosters conceptual clarity, analytical thinking, and academic excellence.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-2">5+</h3>
                <p className="text-blue-100">Courses</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-2">500+</h3>
                <p className="text-blue-100">Students</p>
              </div>

              {/* <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-2">100+</h3>
                <p className="text-blue-100">Certifications</p>
              </div> */}

              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-2">95%</h3>
                <p className="text-blue-100">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* 2. Photo Gallery */}
      <Gallery />

      {/* 3. Courses Section (includes bundle discount logic) */}
      <CourseList />

      {/* 4. Admission Form */}
      {/* <AdmissionForm /> */}

      {/* 5. Enquiry/Contact Form */}
      <EnquiryForm />

      {/* 6. Google Map */}
      <GoogleMap />

      <Footer />
    </div>
  );
}

export default Home;
