import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import BeachCard from '../components/cards/BeachCard';

export default function HomePage({ onDetail, wishlistIds, onToggleWishlist }) {
  const [beaches, setBeaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('All');
  
  // Mock Data jika Supabase kosong (untuk testing UI)
  const MOCK_BEACHES = [
    { id: 'b1', name: 'Pink Beach', province: 'NTT', location: 'Komodo', rating: 4.8, image_url: 'https://images.unsplash.com/photo-1501179691660-2f0b9125d78e?auto=format&fit=crop&q=80&w=800' },
    { id: 'b2', name: 'Kelingking Beach', province: 'Bali', location: 'Nusa Penida', rating: 4.9, image_url: 'https://images.unsplash.com/photo-1532202802371-dc8609332a3a?auto=format&fit=crop&q=80&w=800' },
    { id: 'b3', name: 'Raja Ampat', province: 'Papua', location: 'Wayag', rating: 5.0, image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' }
  ];

  useEffect(() => {
    const fetchBeaches = async () => {
      const { data, error } = await supabase.from('beaches').select('*');
      if (!error && data.length > 0) {
        setBeaches(data);
      } else {
        setBeaches(MOCK_BEACHES); // Fallback ke mock data
      }
    };
    fetchBeaches();
  }, []);

  const provinces = ['All', ...new Set(beaches.map(b => b.province))];

  const filteredBeaches = beaches.filter(beach => {
    const matchesSearch = beach.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          beach.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = filterProvince === 'All' || beach.province === filterProvince;
    return matchesSearch && matchesProvince;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 shadow-xl mx-4 mt-4">
        <img 
          src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Discover Paradise</h2>
          <p className="text-white/90 max-w-lg">Explore the hidden gems of the Indonesian archipelago.</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mx-4 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-cyan-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Find a beach or island..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {provinces.map(prov => (
            <button
              key={prov}
              onClick={() => setFilterProvince(prov)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                filterProvince === prov 
                  ? 'bg-cyan-600 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeaches.map(beach => (
          <BeachCard 
            key={beach.id} 
            beach={beach} 
            onClick={() => onDetail(beach)} 
            isWishlisted={wishlistIds.includes(beach.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}