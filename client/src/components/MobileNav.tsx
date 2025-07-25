import { Link, useLocation } from 'wouter';
import Logo from './Logo';

export default function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { path: '/', icon: 'fas fa-home', label: 'Home' },
    { path: '/equipment', icon: 'fas fa-tractor', label: 'Equipment' },
    { path: '/add', icon: 'fas fa-plus', label: 'Add' },
    { path: '/bookings', icon: 'fas fa-calendar', label: 'Bookings' },
    { path: '/profile', icon: 'fas fa-user', label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Top Navigation */}
      <nav className="bg-white shadow-lg fixed top-0 w-full z-50 lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <button className="text-forest-green">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-30">
        <div className="grid grid-cols-5 py-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div className={`flex flex-col items-center justify-center py-2 cursor-pointer ${
                location === item.path ? 'text-forest-green' : 'text-gray-500'
              }`}>
                {item.path === '/add' ? (
                  <div className="bg-forest-green text-white rounded-full w-8 h-8 flex items-center justify-center mb-1">
                    <i className={`${item.icon} text-sm`}></i>
                  </div>
                ) : (
                  <i className={`${item.icon} text-lg mb-1`}></i>
                )}
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
