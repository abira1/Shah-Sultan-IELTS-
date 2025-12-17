import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Logo from '../ui/Logo';
const Footer: React.FC = () => {
  return <footer className="bg-primary text-white">
      <div className="container py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <Logo />
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-300">
              Shah Sultan's IELTS Academy is dedicated to helping students
              achieve their target band scores through personalized coaching and
              structured learning programs.
            </p>
            <div className="flex mt-4 sm:mt-6 space-x-3 sm:space-x-4">
              <a href="https://facebook.com/shahsultansieltsacademy/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent" aria-label="Facebook">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://www.facebook.com/messages/t/shahsultansieltsacademy/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent" aria-label="Messenger">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.13 2 11.25c0 2.9 1.45 5.49 3.72 7.19V22l3.38-1.85c.9.25 1.86.38 2.9.38 5.52 0 10-4.13 10-9.25S17.52 2 12 2zm1.08 12.45l-2.6-2.77-5.07 2.77 5.57-5.91 2.66 2.77 5.01-2.77-5.57 5.91z"/>
                </svg>
              </a>
              <a href="https://wa.me/8801777476142" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent" aria-label="WhatsApp">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Teachers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Resources
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-accent text-xs sm:text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-accent mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300">
                  R.B. Complex, 6th Floor, East Zindabazar, Sylhet
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-accent" />
                <a href="tel:+8801777476142" className="text-xs sm:text-sm text-gray-300 hover:text-accent">
                  +880 1777-476142
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-accent" />
                <a href="mailto:shahsultans.ieltsacademy02@gmail.com" className="text-xs sm:text-sm text-gray-300 hover:text-accent break-all">
                  shahsultans.ieltsacademy02@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 sm:mt-10 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-400">
              © {new Date().getFullYear()} Shah Sultan's IELTS Academy. All
              rights reserved.
            </p>
            <div className="mt-2 sm:mt-0">
              <Link 
                to="/admin-login" 
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Staff Login
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Design and Developed by{' '}
              <a 
                href="https://toiral-development.web.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition-colors font-medium"
              >
                Toiral Web Development
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;