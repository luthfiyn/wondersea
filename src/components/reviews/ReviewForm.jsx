import { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';

// Tambahkan prop initialData dan onCancel
export default function ReviewForm({ onSubmit, initialData = null, onCancel }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Jika ada initialData (Mode Edit), isi form dengan data tersebut
  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating);
      setComment(initialData.comment);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    await onSubmit(rating, comment);
    
    // Reset form hanya jika bukan mode edit (Mode Create)
    if (!initialData) {
      setComment('');
      setRating(5);
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none transition hover:scale-110"
          >
            <Star 
              size={24} 
              // Isi bintang sesuai rating saat ini
              className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 text-sm min-h-[80px]"
      />
      
      <div className="flex justify-end gap-2 mt-2">
        {/* Tombol Cancel hanya muncul saat Mode Edit */}
        {initialData && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-3 py-2 text-sm text-gray-500 font-bold hover:text-gray-700 transition"
          >
            Cancel
          </button>
        )}
        
        <button 
          type="submit" 
          disabled={!comment.trim() || submitting}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-cyan-700 disabled:opacity-50 transition"
        >
          <Send size={16} /> {submitting ? 'Sending...' : (initialData ? 'Update' : 'Post Review')}
        </button>
      </div>
    </form>
  );
}