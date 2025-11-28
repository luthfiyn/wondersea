import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import BeachCard from '../components/cards/BeachCard';

export default function ExplorePage({ onDetail }) {
  const [beaches, setBeaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('All');
  const [provinces, setProvinces] = useState(['All']);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('beaches').select('*');
      if (data) {
        setBeaches(data);
        // Ekstrak provinsi unik
        const uniqueProvs = ['All', ...new Set(data.map(b => b.province))];
        setProvinces(uniqueProvs);
      }
    };
    fetchData();
  }, []);

  const filteredBeaches = beaches.filter(beach => {
    const matchesSearch = beach.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          beach.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = filterProvince === 'All' || beach.province === filterProvince;
    return matchesSearch && matchesProvince;
  });

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-cyan-100 sticky top-4 z-30">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Find a beach or island..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeaches.map(beach => (
          <BeachCard key={beach.id} beach={beach} onClick={() => onDetail(beach)} />
        ))}
        {filteredBeaches.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-10">No beaches found.</p>
        )}
      </div>
    </div>
  );
}