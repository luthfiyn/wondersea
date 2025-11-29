import { Compass } from 'lucide-react';

export default function DesktopNavbar({ currentPage, onNavigate, user, profile }) {
  const navItems = [
    { id: 'home', label: 'Explore' },
    { id: 'guide', label: 'Guides' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'about', label: 'About' },
  ];

  // Tentukan Display Name & Avatar
  const displayName = profile?.full_name || 'Traveler';
  const displayAvatar = profile?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.id || 'guest'}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cyan-100 shadow-sm px-4 py-3 hidden md:flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
         <img src="/icon.png" alt="WonderSea Logo" className="w-10 h-10 object-contain rounded-xl group-hover:rotate-12 transition-transform duration-300"/>
          <h1 className="text-2xl font-bold text-cyan-900 tracking-tight">WonderSea</h1>
      </div>
      
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => onNavigate(item.id)} 
            className={`font-medium transition-colors ${
              currentPage === item.id ? 'text-cyan-600' : 'text-gray-500 hover:text-cyan-600'
            }`}
          >
            {item.label}
          </button>
        ))}
        
        <div 
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 cursor-pointer bg-cyan-100 px-3 py-1.5 rounded-full hover:bg-cyan-200 transition"
        >
          <img 
            src={displayAvatar} 
            className="w-6 h-6 rounded-full bg-white object-cover" 
            alt="User" 
          />
          <span className="text-sm font-semibold text-cyan-900 truncate max-w-[100px]">
            {user ? displayName : 'Guest'}
          </span>
        </div>
      </div>
    </nav>
  );
}