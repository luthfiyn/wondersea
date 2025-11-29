import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Star, Heart, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import ReviewForm from '../components/reviews/ReviewForm';

export default function BeachDetailPage({ beach, onBack, user, isWishlisted, onToggleWishlist }) {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);

  // 1. Fetch Reviews
  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (email, avatar_url, full_name)
      `)
      .eq('beach_id', beach.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching reviews:", error);
    } else {
      setReviews(data || []);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [beach]);

  // 2. Create Review
  const handleSubmitReview = async (rating, comment) => {
    if (!user) return alert("Please login to review");
    
    const { error } = await supabase.from('reviews').insert({
      beach_id: beach.id,
      user_id: user.id,
      rating,
      comment
    });

    if (error) {
      alert("Gagal post review: " + error.message);
    } else {
      await fetchReviews();
    }
  };

  // 3. Update Review
  const handleUpdateReview = async (rating, comment) => {
    const { error } = await supabase
      .from('reviews')
      .update({ rating, comment, updated_at: new Date() }) 
      .eq('id', editingReviewId)
      .eq('user_id', user.id);

    if (error) {
      alert("Gagal update: " + error.message);
    } else {
      setEditingReviewId(null);
      await fetchReviews();
    }
  };

  // 4. Delete Review
  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Hapus review ini?")) return;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', user.id);

    if (error) {
      alert("Gagal hapus: " + error.message);
    } else {
      await fetchReviews();
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 min-h-screen pb-10 px-4 md:px-8 pt-6">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Back */}
        <button 
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-500 hover:text-cyan-700 transition-colors font-medium group"
        >
          <div className="p-1.5 rounded-full bg-white/50 group-hover:bg-cyan-100 transition-colors">
             <ChevronLeft size={20} />
          </div>
          Back to Explore
        </button>

        {/* Card Utama */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-cyan-100">
          
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 w-full">
            <img src={beach.image_url} alt={beach.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
               <div className="flex items-center gap-2 mb-2 opacity-90 text-sm font-medium">
                 <span className="bg-cyan-500/90 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-xs uppercase tracking-wider shadow-sm">
                   {beach.province}
                 </span>
                 <span className="flex items-center gap-1 text-gray-100">
                   <MapPin size={14} /> {beach.location}
                 </span>
               </div>
               <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md">{beach.name}</h1>
            </div>
          </div>

          {/* Konten Detail */}
          <div className="p-6 md:p-8">
             
             {/* Rating & Wishlist */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100">
                      <Star className="text-yellow-400 fill-yellow-400" size={20} />
                      <span className="font-bold text-gray-800 text-lg">{beach.rating}</span>
                      <span className="text-gray-400 text-xs">/ 5.0</span>
                   </div>
                   <span className="text-gray-400 text-sm">• {reviews.length} Reviews</span>
                </div>
                
                <button 
                  onClick={() => onToggleWishlist(beach.id)}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all shadow-sm ${
                    isWishlisted 
                      ? 'bg-red-50 text-red-600 border border-red-100' 
                      : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-100'
                  }`}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                  {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
             </div>

             {/* About */}
             <div className="mb-8">
               <h3 className="font-bold text-lg text-gray-900 mb-3">About</h3>
               <p className="text-gray-600 leading-relaxed text-base">{beach.description}</p>
             </div>

             {/* Location */}
             <div className="mb-8">
               <h3 className="font-bold text-lg text-gray-900 mb-3">Location</h3>
               <div className="rounded-2xl overflow-hidden h-64 bg-gray-100 relative border border-gray-200 shadow-inner">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(beach.name + ' ' + beach.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="filter grayscale hover:grayscale-0 transition duration-500"
                  ></iframe>
               </div>
             </div>

             {/* Reviews */}
             <div>
               <h3 className="font-bold text-lg text-gray-900 mb-4">Traveler Reviews</h3>
               
               {!editingReviewId && (
                 <div className="mb-8 bg-cyan-50/30 p-5 rounded-2xl border border-cyan-100">
                    <h4 className="text-sm font-bold text-cyan-800 mb-3">Write a review</h4>
                    <ReviewForm onSubmit={handleSubmitReview} />
                 </div>
               )}
               
               <div className="space-y-6">
                 {reviews.length > 0 ? (
                   reviews.map(review => (
                     <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        {editingReviewId === review.id ? (
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <h4 className="text-sm font-bold text-gray-700 mb-2">Edit Review</h4>
                            <ReviewForm 
                              initialData={review} 
                              onSubmit={handleUpdateReview} 
                              onCancel={() => setEditingReviewId(null)} 
                            />
                          </div>
                        ) : (
                          <div className="group">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={review.profiles?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${review.user_id}`} 
                                  className="w-10 h-10 rounded-full bg-gray-100 object-cover border border-gray-200" 
                                  alt="User" 
                                />
                                <div>
                                  <p className="text-sm font-bold text-gray-900">
                                    {review.profiles?.full_name || review.profiles?.email?.split('@')[0] || 'Traveler'}
                                  </p>
                                  <div className="flex text-yellow-400 text-xs mt-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Tombol Edit/Delete */}
                              {user && user.id === review.user_id && (
                                <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                                  <button onClick={() => setEditingReviewId(review.id)} className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition" title="Edit">
                                    <Pencil size={16} />
                                  </button>
                                  <button onClick={() => handleDeleteReview(review.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed pl-13">{review.comment}</p>
                          </div>
                        )}
                     </div>
                   ))
                 ) : (
                   <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                     <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}