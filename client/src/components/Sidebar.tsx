import { Link, useLocation } from 'wouter';
import Logo from './Logo';

export default function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { path: '/', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/equipment', icon: 'fas fa-tractor', label: 'Equipment' },
    { path: '/bookings', icon: 'fas fa-calendar-alt', label: 'My Bookings' },
    { path: '/listings', icon: 'fas fa-list', label: 'My Listings' },
    { path: '/chat', icon: 'fas fa-comments', label: 'Messages' },
    { path: '/education', icon: 'fas fa-graduation-cap', label: 'Farming Education' },
  ];

  return (
    <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-white lg:shadow-lg lg:flex lg:flex-col lg:z-40">
      <div className="p-6 border-b border-gray-200">
        <Logo />
      </div>
      
      {/* Desktop Navigation Menu */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
              location === item.path 
                ? 'bg-forest-green text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Contact Information */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <i className="fas fa-phone text-forest-green"></i>
            <span>+91 9040000099</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-envelope text-forest-green"></i>
            <span className="text-xs">shindezorganics@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fab fa-linkedin text-forest-green"></i>
            <a 
              href="https://www.linkedin.com/in/shinde-z-organics-0430a1377/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-forest-green"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
