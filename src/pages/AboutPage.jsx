import { Compass } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12 animate-in fade-in px-4 pb-24">
      <div className="bg-cyan-600 w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white mb-6 rotate-3 shadow-lg">
         <Compass size={40} />
      </div>
      <h2 className="text-3xl font-bold text-cyan-900 mb-4">About WonderSea</h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        WonderSea is your ultimate companion for exploring the maritime wonders of the Indonesian archipelago. 
        From the pristine pink beaches of Komodo to the underwater paradises of Raja Ampat, we help you discover, rate, and save your next tropical getaway.
      </p>
      <div className="grid grid-cols-3 gap-4 text-center">
         <div className="p-4 bg-white rounded-xl shadow-sm">
           <h3 className="font-bold text-2xl text-cyan-600">17k+</h3>
           <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Islands</p>
         </div>
         <div className="p-4 bg-white rounded-xl shadow-sm">
           <h3 className="font-bold text-2xl text-cyan-600">5k+</h3>
           <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Beaches</p>
         </div>
         <div className="p-4 bg-white rounded-xl shadow-sm">
           <h3 className="font-bold text-2xl text-cyan-600">100%</h3>
           <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Tropical</p>
         </div>
      </div>
    </div>
  );
}