import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Star, Heart } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import ReviewForm from '../components/reviews/ReviewForm';

export default function BeachDetailPage({ beach, onBack, user, isWishlisted, onToggleWishlist }) {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews saat komponen di-load atau beach berubah
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            email,
            avatar_url
          )
        `) // Mengambil data profil user yang menulis review
        .eq('beach_id', beach.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data || []);
      }
    };

    fetchReviews();
  }, [beach]);

  const handleSubmitReview = async (rating, comment) => {
    if (!user) return alert("Please login to review");
    
    // Insert review baru (hanya data yang relevan dengan tabel reviews)
    const { error } = await supabase.from('reviews').insert({
      beach_id: beach.id,
      user_id: user.id, // Relasi ke tabel profiles
      rating,
      comment
    });

    if (error) {
      alert("Gagal mengirim review: " + error.message);
    } else {
      // Refresh data review agar review baru muncul (termasuk data profilnya)
      const { data } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            email,
            avatar_url
          )
        `)
        .eq('beach_id', beach.id)
        .order('created_at', { ascending: false });
        
      setReviews(data || []);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 pb-24 bg-cyan-50 min-h-screen">
      {/* Tombol Kembali */}
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur p-2 rounded-full shadow-md text-gray-700 hover:text-cyan-600 transition"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Hero Image */}
      <div className="relative h-72 md:h-96">
        <img src={beach.image_url} alt={beach.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6 text-white">
          <h1 className="text-3xl font-bold">{beach.name}</h1>
          <div className="flex items-center gap-2 mt-2 opacity-90">
            <MapPin size={16} /> {beach.location}, {beach.province}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-cyan-50">
          
          {/* Rating & Wishlist Action */}
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
                <span className="text-2xl font-bold text-gray-800">{beach.rating}</span>
                <span className="text-gray-400 text-sm">/ 5.0</span>
             </div>
             <button 
                onClick={() => onToggleWishlist(beach.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${
                  isWishlisted 
                    ? 'bg-red-50 text-red-600 border border-red-100' 
                    : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                }`}
             >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                {isWishlisted ? 'Saved' : 'Add to Wishlist'}
             </button>
          </div>

          {/* Description */}
          <h3 className="font-bold text-lg text-gray-800 mb-2">About</h3>
          <p className="text-gray-600 leading-relaxed mb-6">{beach.description}</p>

          {/* Google Maps Embed */}
          <h3 className="font-bold text-lg text-gray-800 mb-3">Location</h3>
          <div className="rounded-2xl overflow-hidden h-48 bg-gray-200 mb-8 relative border border-cyan-100">
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               src={`https://maps.google.com/maps?q=${encodeURIComponent(beach.name + ' ' + beach.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
               className="filter grayscale hover:grayscale-0 transition duration-500"
             ></iframe>
          </div>

          {/* Reviews Section */}
          <h3 className="font-bold text-lg text-gray-800 mb-4">Traveler Reviews</h3>
          
          {/* Form Review */}
          <div className="mb-6 bg-gray-50 p-4 rounded-xl">
             <h4 className="text-sm font-bold text-gray-700 mb-2">Write a review</h4>
             <ReviewForm onSubmit={handleSubmitReview} />
          </div>
          
          {/* List Reviews */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Avatar User */}
                    <img 
                      src={review.profiles?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${review.user_id}`} 
                      className="w-8 h-8 rounded-full bg-cyan-100" 
                      alt="User" 
                    />
                    <div>
                      {/* Email/Nama User */}
                      <p className="text-sm font-bold text-gray-800">
                        {review.profiles?.email?.split('@')[0] || 'Traveler'}
                      </p>
                      {/* Bintang Rating */}
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Isi Komentar */}
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-4">No reviews yet. Be the first!</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}