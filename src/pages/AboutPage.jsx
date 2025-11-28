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
    </div>
  );
}