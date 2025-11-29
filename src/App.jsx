import { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import BeachDetailPage from './pages/BeachDetailPage';
import MobileNavbar from './components/layout/MobileNavbar';
import DesktopNavbar from './components/layout/DesktopNavbar';
import SplashScreen from './components/layout/SplashScreen';
import PWABadge from './PWABadge';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Fungsi untuk refresh profil (dipanggil saat awal load atau setelah edit profil)
  const fetchUserProfile = async (userId) => {
    if (!userId) {
      setUserProfile(null);
      return;
    }
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) setUserProfile(data);
  };

  useEffect(() => {
    // --- LOGIKA SPLASH SCREEN ---
    // Tampilkan splash screen selama 2.5 detik
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    // 1. Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchUserProfile(currentUser.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchUserProfile(currentUser.id);
      else setUserProfile(null);
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 2. Fetch Wishlist IDs
    const fetchWishlist = async () => {
      if (!user) {
        setWishlistIds([]);
        return;
      }
      const { data } = await supabase
        .from('wishlists')
        .select('beach_id')
        .eq('user_id', user.id);
      
      if (data) {
        setWishlistIds(data.map(item => item.beach_id));
      }
    };
    fetchWishlist();
  }, [user]);

  const handleBeachClick = (beach) => {
    setSelectedBeach(beach);
    setView('detail');
    window.scrollTo(0,0);
  };

  const handleToggleWishlist = async (beachId) => {
    if (!user) return alert("Sign in to save beaches!");
    
    const isWishlisted = wishlistIds.includes(beachId);
    if (isWishlisted) {
      setWishlistIds(prev => prev.filter(id => id !== beachId));
      await supabase.from('wishlists').delete().match({ user_id: user.id, beach_id: beachId });
    } else {
      setWishlistIds(prev => [...prev, beachId]);
      await supabase.from('wishlists').insert({ user_id: user.id, beach_id: beachId });
    }
  };

  const renderPage = () => {
    if (view === 'detail' && selectedBeach) {
      return (
        <BeachDetailPage 
          beach={selectedBeach} 
          onBack={() => setView('home')} 
          user={user}
          isWishlisted={wishlistIds.includes(selectedBeach.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      );
    }
    
    switch(view) {
      case 'home': 
        return <HomePage 
          onNavigate={setView} 
          onDetail={handleBeachClick} 
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />;
      case 'guide': return <GuidePage />;
      case 'wishlist': 
        return <WishlistPage 
          user={user} 
          onDetail={handleBeachClick} 
          onNavigate={setView}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />;
      case 'profile': 
        return <ProfilePage 
          user={user} 
          wishlistCount={wishlistIds.length} 
          onProfileUpdate={() => fetchUserProfile(user.id)}
        />;
      case 'about': 
        return <AboutPage onNavigate={setView} />;
      default: return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="relative min-h-screen font-sans text-gray-800 overflow-hidden animate-in fade-in duration-700">
      
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 bg-cyan-50">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <DesktopNavbar currentPage={view} onNavigate={setView} user={user} profile={userProfile} />
      
      <main className="max-w-6xl mx-auto pt-4 md:pt-0 relative z-10">
        {renderPage()}
      </main>

      {view !== 'detail' && (
        <MobileNavbar currentPage={view} onNavigate={setView} />
      )}

      <PWABadge />
    </div>
  );
}