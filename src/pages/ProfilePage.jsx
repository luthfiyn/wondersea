import { useState } from 'react';
import { LogOut, User, Mail, Heart, BookOpen } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

export default function ProfilePage({ user, wishlistCount }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) alert(result.error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-cyan-100 p-8 mt-8 animate-in zoom-in-95">
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.id}`} className="w-full h-full rounded-full border-4 border-cyan-50" alt="Profile" />
            <div className="absolute bottom-0 right-0 bg-green-400 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Traveler</h2>
          <p className="text-gray-500 text-sm font-mono mt-1">ID: {user.id.substring(0,8)}...</p>
        </div>

        <div className="space-y-3">
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 text-gray-700">
            <div className="flex items-center gap-3">
              <Heart size={20} className="text-red-500" />
              <span>Saved Destinations</span>
            </div>
            <span className="font-bold text-gray-900">{wishlistCount}</span>
          </div>
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 text-gray-700">
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-cyan-600" />
              <span>Guides Read</span>
            </div>
            <span className="font-bold text-gray-900">0</span>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-bold mt-8">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-cyan-100 p-8 mt-8 animate-in zoom-in-95">
      <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">{isLogin ? 'Welcome Back' : 'Join WonderSea'}</h2>
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200" placeholder="hello@example.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200" placeholder="••••••••" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700 transition disabled:opacity-50">
          {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-600 font-bold hover:underline">{isLogin ? 'Sign Up' : 'Sign In'}</button>
      </p>
    </div>
  );
}