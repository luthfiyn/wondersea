import { useState } from 'react';
import { BookOpen, ChevronLeft, Calendar, Anchor, Clock, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

// --- DATA DUMMY "NIAT" & LENGKAP ---
const GUIDES_DATA = [
  {
    id: 1,
    title: 'Waktu Terbaik Mengunjungi Raja Ampat: Panduan Musiman',
    category: 'Planning',
    read_time: '5 min read',
    author: ' Wondersea Team',
    date: '12 Oct 2023',
    image_url: 'https://ik.imagekit.io/tvlk/blog/2024/07/shutterstock_2328289305.jpg?tr=q-70,c-at_max,w-1000,h-600',
    excerpt: 'Jangan sampai liburanmu terganggu ombak besar! Simak panduan lengkap bulan terbaik untuk menyelam dan menikmati surga Papua.',
    content: `
      <p>Raja Ampat adalah destinasi impian bagi banyak pelancong, tetapi cuaca memegang peranan kunci dalam menentukan kualitas liburan Anda. Salah memilih waktu bisa berarti terjebak hujan atau menghadapi ombak tinggi yang membatalkan rencana island hopping.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Musim Terbaik: Oktober - April</h3>
      <p>Waktu terbaik untuk berkunjung adalah antara bulan <strong>Oktober hingga April</strong>. Pada periode ini, angin muson timur laut membawa laut yang lebih tenang dan langit yang cerah. Ini adalah kondisi primadona bagi penyelam karena visibilitas air sedang jernih-jernihnya, seringkali mencapai 20-30 meter.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Kapan Harus Menghindar?</h3>
      <p>Hindari bulan <strong>Juni hingga Agustus</strong>. Angin muson selatan bertiup kencang, menyebabkan gelombang tinggi yang berbahaya untuk penyeberangan antar pulau kecil. Banyak operator liveaboard juga meliburkan operasional mereka di bulan-bulan ini.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Tips Tambahan</h3>
      <ul class="list-disc list-inside space-y-2 ml-2">
        <li>Pesan akomodasi setidaknya 3 bulan di muka jika berencana datang di bulan Desember.</li>
        <li>Bawa obat anti mabuk laut, karena perjalanan dari Sorong ke Waisai memakan waktu 2 jam dengan kapal cepat.</li>
      </ul>
    `
  },
  {
    id: 2,
    title: 'Etika Snorkeling: Jangan Sentuh Karang!',
    category: 'Edukasi',
    read_time: '4 min read',
    author: 'Wondersea Team',
    date: '05 Nov 2023',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Karang bukan batu, mereka makhluk hidup! Pelajari cara menikmati keindahan bawah laut tanpa merusaknya.',
    content: `
      <p>Banyak pemula yang tidak menyadari bahwa terumbu karang adalah hewan, bukan sekadar batuan hiasan akuarium. Sentuhan sekecil apapun, terutama dari sirip katak (fin) atau tangan yang menggunakan sunblock kimia, dapat menyebabkan stres bahkan kematian pada polip karang.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">The Golden Rules</h3>
      <ol class="list-decimal list-inside space-y-2 ml-2">
        <li><strong>Lihat, Jangan Sentuh:</strong> Nikmati keindahan dari jarak aman. Jangan berdiri atau beristirahat di atas karang saat lelah. Cari area berpasir jika perlu berdiri.</li>
        <li><strong>Gunakan Reef-Safe Sunscreen:</strong> Bahan kimia seperti Oxybenzone dan Octinoxate terbukti memutihkan (bleaching) karang. Cari sunblock dengan bahan dasar mineral (Zinc Oxide atau Titanium Dioxide).</li>
        <li><strong>Jangan Memberi Makan Ikan:</strong> Roti atau biskuit mengganggu pencernaan ikan dan mengubah perilaku alami mereka menjadi agresif.</li>
      </ol>
    `
  },
  {
    id: 3,
    title: 'Hidden Gem: Menjelajahi Pulau Lengkuas Belitung',
    category: 'Destinasi',
    read_time: '6 min read',
    author: 'Wondersea Team',
    date: '20 Sep 2023',
    image_url: 'https://www.pakettourbelitung.net/wp-content/uploads/2018/10/pulau-lengkuas-1024x685.jpg',
    excerpt: 'Mercusuar tua peninggalan Belanda dan formasi batu granit raksasa menantimu di lepas pantai Tanjung Kelayang.',
    content: `
      <p>Belitung tidak hanya soal Laskar Pelangi. Sekitar 30 menit menaiki perahu nelayan dari Pantai Tanjung Kelayang, Anda akan disambut oleh siluet mercusuar putih setinggi 60 meter yang berdiri kokoh di tengah pulau kecil.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Sejarah yang Hidup</h3>
      <p>Mercusuar ini dibangun oleh Belanda pada tahun 1882 dan masih berfungsi hingga hari ini untuk memandu kapal yang melewati Selat Gaspar. Pengunjung diperbolehkan naik hingga ke lantai 3 untuk menikmati panorama 360 derajat laut biru tosca yang kontras dengan batu granit raksasa.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Kolam Bidadari</h3>
      <p>Jangan lupa mengunjungi 'Kolam Bidadari', sebuah laguna alami yang terbentuk dari susunan batu granit yang memecah ombak, menciptakan kolam renang air laut yang tenang dan jernih.</p>
    `
  },
  {
    id: 4,
    title: 'Starter Pack Liburan ke Labuan Bajo',
    category: 'Persiapan',
    read_time: '3 min read',
    author: 'Wondersea Team',
    date: '15 Jan 2024',
    image_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Daftar barang bawaan wajib agar sailing trip kamu nyaman dan tetap stylish.',
    content: `
      <p>Sailing trip di Labuan Bajo berbeda dengan liburan hotel biasa. Anda akan menghabiskan waktu berhari-hari di atas kapal (Liveaboard). Space di kabin kapal biasanya terbatas, jadi packing yang efisien adalah kunci.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Must-Have Items</h3>
      <ul class="list-disc list-inside space-y-2 ml-2">
        <li><strong>Dry Bag (5L - 10L):</strong> Sangat penting untuk melindungi HP, kamera, dan dompet saat naik sekoci kecil menuju pulau.</li>
        <li><strong>Sandal Trekking:</strong> Untuk mendaki bukit di Pulau Padar. Sandal jepit biasa akan licin dan berbahaya.</li>
        <li><strong>Kacamata Hitam & Topi:</strong> Matahari Nusa Tenggara sangat menyengat. Lindungi mata dan kepala Anda.</li>
        <li><strong>Powerbank Kapasitas Besar:</strong> Listrik di kapal kadang terbatas atau hanya menyala di malam hari.</li>
        <li><strong>Uang Tunai Pecahan Kecil:</strong> Untuk tips awak kapal atau membeli kelapa muda di Pink Beach.</li>
      </ul>
    `
  }
];

export default function GuidePage() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  // --- TAMPILAN DETAIL GUIDE (READING MODE) ---
  if (selectedGuide) {
    return (
      <div className="animate-in slide-in-from-right-4 duration-500 min-h-screen bg-white pb-20">
         
         {/* Hero Image Full Width */}
         <div className="relative h-72 md:h-96 w-full group">
            <img src={selectedGuide.image_url} alt={selectedGuide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <button 
              onClick={() => setSelectedGuide(null)}
              className="absolute top-6 left-6 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition flex items-center gap-2 pr-4 border border-white/20"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-bold">Back</span>
            </button>

            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-4xl w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-cyan-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {selectedGuide.category}
                </span>
                <span className="text-sm font-medium text-gray-300 flex items-center gap-1">
                  <Clock size={14} /> {selectedGuide.read_time}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-sm font-serif">
                {selectedGuide.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-200 border-t border-white/20 pt-4 mt-4 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">
                    {selectedGuide.author.charAt(0)}
                  </div>
                  <span>{selectedGuide.author}</span>
                </div>
                <span className="flex items-center gap-1.5 opacity-80"><Calendar size={16}/> {selectedGuide.date}</span>
              </div>
            </div>
         </div>

         {/* Content Body */}
         <div className="max-w-3xl mx-auto px-6 py-12">
           <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-10 italic">
             "{selectedGuide.excerpt}"
           </p>
           
           {/* Render HTML Content dengan aman untuk Dummy Data */}
           <div 
             className="prose prose-cyan prose-lg text-gray-800 leading-loose text-justify"
             dangerouslySetInnerHTML={{ __html: selectedGuide.content }}
           />

           {/* Share Section */}
           <div className="mt-16 pt-8 border-t border-gray-100">
             <div className="flex flex-col md:flex-row items-center justify-between gap-4">
               <h4 className="font-bold text-gray-900 flex items-center gap-2">
                 <Share2 size={18} /> Share this article
               </h4>
               <div className="flex gap-2">
                 <button className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"><Facebook size={20}/></button>
                 <button className="p-3 bg-sky-50 text-sky-500 rounded-full hover:bg-sky-100 transition"><Twitter size={20}/></button>
                 <button className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition"><Linkedin size={20}/></button>
               </div>
             </div>
           </div>
         </div>
      </div>
    );
  }

  // --- TAMPILAN LIST GUIDE (GRID) ---
  return (
    <div className="animate-in fade-in duration-500 p-6 pb-32 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-10 text-center md:text-left relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-900 flex items-center justify-center md:justify-start gap-3 relative z-10">
          <BookOpen className="text-cyan-600" size={32} /> Travel Guides
        </h2>
        <p className="text-gray-500 mt-3 text-lg max-w-2xl relative z-10">
          Temukan tips eksklusif, panduan lokal, dan rahasia tersembunyi untuk petualangan laut terbaikmu.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GUIDES_DATA.map((guide, idx) => (
          <div 
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-cyan-100/50 border border-gray-100 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full relative"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={guide.image_url} 
                alt={guide.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold text-cyan-800 rounded-lg shadow-sm border border-cyan-50">
                {guide.category}
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <Calendar size={12} />
                <span>{guide.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{guide.author}</span>
              </div>

              <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-snug">
                {guide.title}
              </h3>
              
              <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                {guide.excerpt}
              </p>
              
              {/* Footer Card */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                  <Clock size={14} />
                  <span>{guide.read_time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-cyan-600 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}