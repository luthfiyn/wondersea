import { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, Calendar, Anchor } from 'lucide-react';
import GuideCard from '../components/cards/GuideCard';

// Mock Data untuk Guide
const SEED_GUIDES = [
  { id: 'g1', title: 'Best Time to Visit Indonesia', category: 'Planning', readTime: '5 min read', image_url: 'https://images.unsplash.com/photo-1555412654-72a95a495858?auto=format&fit=crop&q=80&w=800', excerpt: 'Avoid the rainy season and make the most of your island hopping adventure.', content: 'Indonesia is a tropical country with two main seasons...' },
  { id: 'g2', title: 'Snorkeling Safety 101', category: 'Safety', readTime: '3 min read', image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800', excerpt: 'Essential tips to keep you safe while exploring underwater wonders.', content: 'Always snorkel with a buddy and never touch the coral...' },
  { id: 'g3', title: 'Sustainable Tourism', category: 'Eco', readTime: '4 min read', image_url: 'https://images.unsplash.com/photo-1534329539061-199093041b48?auto=format&fit=crop&q=80&w=800', excerpt: 'How to travel responsibly and minimize your environmental footprint.', content: 'Reduce plastic usage by bringing a reusable water bottle...' }
];

export default function GuidePage() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  if (selectedGuide) {
    return (
      <div className="animate-in slide-in-from-right-4 duration-500 max-w-3xl mx-auto p-4 pb-24">
         <button 
           onClick={() => setSelectedGuide(null)}
           className="mb-4 flex items-center gap-2 text-gray-500 hover:text-cyan-600 transition"
         >
           <ChevronLeft size={20} /> Back to Guides
         </button>
         <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-cyan-100">
           <div className="h-64 md:h-80 w-full relative">
              <img src={selectedGuide.image_url} alt={selectedGuide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-cyan-600 px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block uppercase tracking-wider">
                  {selectedGuide.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold">{selectedGuide.title}</h1>
              </div>
           </div>
           <div className="p-8">
             <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
                <span className="flex items-center gap-1"><Calendar size={16}/> Updated Today</span>
                <span className="flex items-center gap-1"><Anchor size={16}/> WonderSea Team</span>
                <span className="flex items-center gap-1"><BookOpen size={16}/> {selectedGuide.readTime}</span>
             </div>
             <div className="prose prose-cyan max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg text-gray-500 font-medium mb-6">{selectedGuide.excerpt}</p>
                <p>{selectedGuide.content}</p>
             </div>
           </div>
         </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 p-4 pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cyan-900 flex items-center gap-2">
          <BookOpen className="text-cyan-600" /> Travel Guides
        </h2>
        <p className="text-gray-600 mt-1">Expert tips and guides for your Indonesian adventure.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SEED_GUIDES.map(guide => (
          <GuideCard key={guide.id} guide={guide} onClick={() => setSelectedGuide(guide)} />
        ))}
      </div>
    </div>
  );
}