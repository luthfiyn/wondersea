import { Home, BookOpen, Heart, User } from 'lucide-react';

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Explore', icon: Home },
    { id: 'guide', label: 'Guides', icon: BookOpen },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around py-3 px-2 pb-safe z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 w-16 transition-colors duration-300 ${
              isActive ? 'text-cyan-600' : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            {/* Tambahkan animate-pop saat aktif */}
            <div className={`${isActive ? 'animate-pop' : ''}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} fill={isActive && item.id === 'wishlist' ? "currentColor" : "none"} />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}