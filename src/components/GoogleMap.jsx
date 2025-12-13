import { MapPin } from 'lucide-react';

function GoogleMap() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <MapPin className="w-8 h-8 mr-2 text-blue-600" />
            Visit Us
          </h3>
          <p className="text-gray-600">Find us at our campus location</p>
        </div>

        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <iframe
            title="Institute Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9534535826635!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

export default GoogleMap;
