import { useState, useEffect } from 'react';
import { LogOut, User, Mail, Heart, Camera, Save, Loader2, ChevronRight } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

export default function ProfilePage({ user, wishlistCount, onProfileUpdate, onNavigate }) {
  // --- Auth States (Untuk Login/Register) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // --- Profile Data States (Untuk Edit Profil) ---
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 1. Fetch Profile Data saat User Login/Component Load
  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      
      const { user: sessionUser } = await supabase.auth.getSession().then(({ data }) => data.session || {});
      const currentUser = user || sessionUser;

      if (currentUser) {
        const { data, error } = await supabase
          .from('profiles')
          .select(`full_name, avatar_url`)
          .eq('id', currentUser.id)
          .single();

        if (!ignore && data) {
          setFullName(data.full_name || '');
          setAvatarUrl(data.avatar_url || null);
        }
      }
      setLoading(false);
    }

    if (user) getProfile();
    return () => { ignore = true; };
  }, [user]);

  // 2. Fungsi Update Profile (Simpan Nama & Foto)
  async function updateProfile() {
    try {
      setLoading(true);

      if (!user) throw new Error("User tidak ditemukan.");

      const updates = {
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
      
      alert('Profile updated successfully!');
      
      if (onProfileUpdate) onProfileUpdate(); 

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // 3. Fungsi Upload Avatar (Upload & Auto-Save)
  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Pilih gambar terlebih dahulu.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // A. Upload ke Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // B. Dapatkan URL Publik
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const newAvatarUrl = data.publicUrl;
  
      setAvatarUrl(newAvatarUrl); 

      // C. Simpan URL ke Database (Auto-Save)
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({ 
            id: user.id, 
            avatar_url: newAvatarUrl,
            full_name: fullName, 
            updated_at: new Date()
        });

      if (updateError) throw updateError;
      
      // Refresh Navbar
      if (onProfileUpdate) onProfileUpdate();

    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  // --- Handlers Auth (Login/Logout) ---
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) alert(result.error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // TAMPILAN: JIKA SUDAH LOGIN
  if (user) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-cyan-100 p-8 mt-8 animate-in zoom-in-95 pb-24">
        <div className="text-center mb-8 relative">
          
          {/* Avatar Area */}
          <div className="relative w-32 h-32 mx-auto mb-4 group">
            <img 
              src={avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${user.id}`} 
              className="w-full h-full rounded-full border-4 border-cyan-50 object-cover shadow-md" 
              alt="Profile" 
            />
            {/* Overlay Kamera saat Hover */}
            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
              {uploading ? <Loader2 className="animate-spin" /> : <Camera size={24} />}
              <span className="text-xs font-medium mt-1">{uploading ? 'Uploading' : 'Change'}</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Edit Display Name */}
          <div className="mb-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Display Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              className="text-2xl font-bold text-gray-800 text-center w-full border-b border-transparent hover:border-cyan-200 focus:border-cyan-500 focus:outline-none bg-transparent py-1 transition-colors placeholder-gray-300"
            />
          </div>
          <p className="text-gray-500 text-xs font-mono">{user.email}</p>
        </div>

        {/* Statistik & Tombol Aksi */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('wishlist')}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 text-gray-700 hover:bg-cyan-50 hover:text-cyan-800 transition-all cursor-pointer group border border-transparent hover:border-cyan-100 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow text-red-500">
                 <Heart size={20} className="fill-red-500" />
              </div>
              <span className="font-medium">Saved Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 group-hover:text-cyan-700">{wishlistCount}</span>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-cyan-500" />
            </div>
          </button>

          {/* Save Button */}
          <button 
            onClick={updateProfile} 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition font-bold shadow-lg shadow-cyan-200 mt-6 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} 
            {loading ? 'Saving...' : 'Save Changes'}
          </button>

          {/* Logout Button */}
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-red-500 hover:bg-red-50 transition font-medium text-sm mt-2 active:scale-[0.98]">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    );
  }

  // TAMPILAN: JIKA BELUM LOGIN 
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
        <button type="submit" disabled={authLoading} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700 transition disabled:opacity-50">
          {authLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-600 font-bold hover:underline">{isLogin ? 'Sign Up' : 'Sign In'}</button>
      </p>
    </div>
  );
}