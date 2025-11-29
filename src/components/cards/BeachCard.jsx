import { MapPin, Star, Heart } from 'lucide-react';

export default function BeachCard({ beach, onClick, isWishlisted, onToggleWishlist, style }) {
  return (
    <div 
      onClick={onClick}
      style={style}
      className="group bg-white rounded-2xl overflow-hidden border border-cyan-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer active:scale-95 animate-slide-up opacity-0" 
    >
      <div className="relative h-48 overflow-hidden">
        {/* Zoom effect pada gambar saat hover */}
        <img 
          src={beach.image_url} 
          alt={beach.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Tombol Wishlist */}
        <button 
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 active:scale-75 hover:scale-110 group/btn ${
            isWishlisted 
              ? 'bg-red-50/90 text-red-500 animate-pop' 
              : 'bg-white/90 text-gray-400 hover:text-red-400'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(beach.id);
          }}
        >
          <Heart 
            size={20} 
            className={`transition-all duration-300 ${isWishlisted ? 'fill-current' : 'fill-none'}`} 
          />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
          <Star size={12} fill="currentColor" className="text-yellow-400" />
          {beach.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 group-hover:text-cyan-700 transition-colors line-clamp-1">{beach.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin size={14} className="text-cyan-500" />
          {beach.province}
        </div>
      </div>
    </div>
  );
}