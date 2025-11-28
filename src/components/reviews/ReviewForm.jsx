import { useState } from 'react';
import { Star, Send } from 'lucide-react';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    await onSubmit(rating, comment);
    setComment('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button 
        type="submit" 
        disabled={!comment.trim() || submitting}
        className="mt-2 bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ml-auto hover:bg-cyan-700 disabled:opacity-50 transition"
      >
        <Send size={16} /> {submitting ? 'Posting...' : 'Post Review'}
      </button>
    </form>
  );
}