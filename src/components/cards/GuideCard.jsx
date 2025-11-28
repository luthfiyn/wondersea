import { Calendar } from 'lucide-react';

export default function GuideCard({ guide, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cyan-50 cursor-pointer hover:shadow-md transition flex flex-col md:flex-row h-full"
    >
      <div className="md:w-2/5 h-48 md:h-auto relative">
        <img src={guide.image_url} alt={guide.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-xs font-bold text-cyan-700 rounded-md">
          {guide.category}
        </div>
      </div>
      <div className="p-5 md:w-3/5 flex flex-col">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{guide.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">{guide.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
          <Calendar size={14} />
          <span>{guide.readTime}</span>
          <span className="mx-1">•</span>
          <span className="text-cyan-600 font-medium">Read More</span>
        </div>
      </div>
    </div>
  );
}