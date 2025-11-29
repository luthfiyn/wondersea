import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import BeachCard from '../components/cards/BeachCard';

export default function HomePage({ onDetail, wishlistIds, onToggleWishlist }) {
  const [beaches, setBeaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('All');
  
  // STATE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBeaches = async () => {
      const { data, error } = await supabase.from('beaches').select('*');
      if (!error && data.length > 0) {
        setBeaches(data);
      } else {
        setBeaches([]); 
      }
    };
    fetchBeaches();
  }, []);

  // Reset ke halaman 1 setiap kali filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterProvince]);

  const provinces = ['All', ...new Set(beaches.map(b => b.province))];

  // 1. Filter Data
  const filteredBeaches = beaches.filter(beach => {
    const matchesSearch = beach.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          beach.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = filterProvince === 'All' || beach.province === filterProvince;
    return matchesSearch && matchesProvince;
  });

  // 2. Hitung Data Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBeaches = filteredBeaches.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBeaches.length / itemsPerPage);

  // 3. Ganti Halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' }); 
  };

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      {/* Hero Section */}
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

      {/* Search & Filter */}
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

      {/* Grid List (Menampilkan currentBeaches) */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
        {currentBeaches.length > 0 ? (
          currentBeaches.map((beach, index) => (
            <BeachCard 
              key={beach.id} 
              beach={beach} 
              onClick={() => onDetail(beach)} 
              isWishlisted={wishlistIds.includes(beach.id)}
              onToggleWishlist={onToggleWishlist}
              style={{ animationDelay: `${100 + (index * 100)}ms` }} // Delay dipercepat
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 animate-in fade-in">
            <p>No beaches found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 px-4 py-6 animate-slide-up delay-200">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-cyan-100 bg-white text-cyan-700 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page Indicator */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                  currentPage === page
                    ? 'bg-cyan-600 text-white shadow-md scale-110'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-cyan-100 bg-white text-cyan-700 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}