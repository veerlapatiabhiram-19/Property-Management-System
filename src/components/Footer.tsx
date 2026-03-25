import { Home, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">PropertyHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted platform for finding and managing properties. Browse thousands of listings and find your dream property.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/?type=house" className="hover:text-white transition">Houses</a></li>
              <li><a href="/?type=apartment" className="hover:text-white transition">Apartments</a></li>
              <li><a href="/?type=land" className="hover:text-white transition">Land</a></li>
              <li><a href="/?status=available" className="hover:text-white transition">Available Now</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Property Street, City
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 234 567 8900
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@propertyhub.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 PropertyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
