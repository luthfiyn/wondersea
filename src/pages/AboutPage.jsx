import { BookOpen, Map, Heart, Github, Award, } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="space-y-10 pb-32 pt-8 px-6 max-w-3xl mx-auto animate-slide-up">
      
      {/* 1. Header Section */}
      <div className="text-center space-y-4">
        <div className="relative inline-block mb-2">
            <div className="absolute inset-0 bg-cyan-300 blur-2xl opacity-40 rounded-full transform scale-90"></div>
            <img 
              src="/icon.png" 
              alt="WonderSea Logo" 
              className="relative w-28 h-28 mx-auto object-contain animate-float"
            />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-cyan-900 tracking-tight">WonderSea</h1>
          <p className="text-cyan-600/80 font-medium text-lg mt-1">Jelajahi Bahari Indonesia</p>
        </div>
      </div>

      {/* 2. Mission Card */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-cyan-100 shadow-sm text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-300"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <Award className="text-yellow-500" size={24} /> Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          Indonesia adalah negara kepulauan terbesar di dunia, namun banyak surga pesisirnya yang masih tersembunyi.
          <br/><br/>
          <strong>Wondersea</strong> hadir untuk menjembatani para traveller dengan keindahan maritim Nusantara. 
          Kami membantu Anda menemukan pantai impian, berbagi pengalaman, dan menjaga kelestarian alam lewat panduan wisata yang bertanggung jawab.
        </p>
      </div>

      {/* 3. Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          icon={Map} 
          title="Explore" 
          desc="Temukan pantai tersembunyi di 34 provinsi." 
          color="bg-blue-50 text-blue-600"
          delay="100ms"
          onClick={() => onNavigate('home')} // Navigasi ke Home
        />
        <FeatureCard 
          icon={BookOpen} 
          title="Guides" 
          desc="Tips perjalanan & panduan lokal terbaik." 
          color="bg-teal-50 text-teal-600"
          delay="200ms"
          onClick={() => onNavigate('guide')} // Navigasi ke Guide
        />
        <FeatureCard 
          icon={Heart} 
          title="Wishlist" 
          desc="Simpan destinasi impianmu di satu tempat." 
          color="bg-rose-50 text-rose-500"
          delay="300ms"
          onClick={() => onNavigate('wishlist')} // Navigasi ke Wishlist
        />
      </div>

      {/* 4. Footer / Credits */}
      <div className="text-center pt-8 border-t border-cyan-100/50">
        <p className="text-gray-400 text-sm mb-4">Built with Love </p>
        <div className="flex justify-center gap-3">
            <a 
              href="https://github.com/luthfiyn" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
                <Github size={18} /> My GitHub
            </a>
        </div>
        <p className="text-gray-300 text-xs mt-6 font-mono">Version 1.0.0 (Beta)</p>
      </div>

    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color, delay, onClick }) {
  return (
    <div 
        onClick={onClick}
        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all hover:-translate-y-1 animate-slide-up opacity-0 cursor-pointer active:scale-95"
        style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className={`p-3 rounded-xl mb-3 ${color}`}>
        <Icon size={24} />
      </div>
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 leading-snug">{desc}</p>
    </div>
  );
}