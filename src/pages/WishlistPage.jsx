import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import BeachCard from '../components/cards/BeachCard';

export default function WishlistPage({ user, onDetail, wishlistIds, onToggleWishlist }) {
  const [wishlistBeaches, setWishlistBeaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistDetails = async () => {
      if (!user || wishlistIds.length === 0) {
        setWishlistBeaches([]);
        setLoading(false);
        return;
      }

      // Ambil detail pantai berdasarkan ID di wishlist
      const { data } = await supabase
        .from('beaches')
        .select('*')
        .in('id', wishlistIds);
      
      setWishlistBeaches(data || []);
      setLoading(false);
    };
    fetchWishlistDetails();
  }, [user, wishlistIds]);

  if (!user) {
    return (
      <div className="text-center py-20 px-4 min-h-[60vh] flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Login Required</h3>
        <p className="text-gray-500 mb-6">Please login to view your saved destinations.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 p-4 pb-24">
      <h2 className="text-2xl font-bold text-cyan-900 mb-6 flex items-center gap-2">
        <Heart className="text-red-500 fill-red-500" /> My Wishlist
      </h2>
      
      {loading ? (
        <p className="text-center text-cyan-800">Loading...</p>
      ) : wishlistBeaches.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-cyan-200">
          <div className="text-6xl mb-4">🏝️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Start exploring and save your dream destinations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistBeaches.map(beach => (
            <BeachCard 
              key={beach.id} 
              beach={beach} 
              onClick={() => onDetail(beach)} 
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}