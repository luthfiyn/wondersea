import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import BeachCard from '../components/cards/BeachCard';


export default function HomePage({ onDetail, wishlistIds, onToggleWishlist }) {
  const [beaches, setBeaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('All');

  useEffect(() => {
    const fetchBeaches = async () => {
      const { data, error } = await supabase.from('beaches').select('*');
      if (!error && data.length > 0) {
        setBeaches(data);
      } else {
        setBeaches(MOCK_BEACHES); 
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
    <div className="space-y-6 pb-24 md:pb-0">
      {/* Hero Section dengan animasi Slide Up */}
      <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 shadow-xl mx-4 mt-4 animate-slide-up">
        <img 
          src="https://awsimages.detik.net.id/community/media/visual/2019/11/17/5eda442f-f2df-4863-8950-008143e43f90_169.jpeg?w=1200" 
          alt="Hero" 
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Discover Paradise</h2>
          <p className="text-white/90 max-w-lg">Explore the hidden gems of the Indonesian archipelago.</p>
        </div>
      </div>

      {/* Search & Filter dengan animasi Slide Up Delay */}
      <div className="mx-4 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-cyan-100 animate-slide-up delay-100">
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
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all active:scale-95 ${
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

      {/* Grid List dengan animasi Staggered */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeaches.map((beach, index) => (
          <BeachCard 
            key={beach.id} 
            beach={beach} 
            onClick={() => onDetail(beach)} 
            isWishlisted={wishlistIds.includes(beach.id)}
            onToggleWishlist={onToggleWishlist}
            // Menambahkan delay bertingkat (0.1s, 0.2s, dst)
            style={{ animationDelay: `${1000 + (index * 200)}ms` }}
          />
        ))}
        {/* Catatan: Untuk animasi per-item bekerja sempurna, pastikan BeachCard menerima prop 'style' 
            dan menerapkannya ke div terluar, atau bungkus BeachCard dengan div yang memiliki className="animate-slide-up" */}
      </div>
      
      {/* Jika ingin lebih simpel tanpa mengubah props BeachCard, gunakan wrapper ini: */}
      {/* <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeaches.map((beach, index) => (
          <div key={beach.id} className="animate-slide-up" style={{ animationDelay: `${200 + (index * 100)}ms` }}>
            <BeachCard ... />
          </div>
        ))}
      </div> 
      */}
    </div>
  );
}