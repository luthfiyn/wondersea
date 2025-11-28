import { MapPin, Star, Heart } from 'lucide-react';

export default function BeachCard({ beach, onClick, isWishlisted, onToggleWishlist }) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden border border-cyan-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={beach.image_url} 
          alt={beach.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur text-red-500 shadow-sm hover:bg-white transition"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(beach.id);
          }}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
          <Star size={12} fill="currentColor" className="text-yellow-400" />
          {beach.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 group-hover:text-cyan-700 transition">{beach.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin size={14} />
          {beach.province}
        </div>
      </div>
    </div>
  );
}