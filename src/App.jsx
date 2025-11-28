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

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    // 1. Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // 2. Fetch Wishlist IDs (jika user login)
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

  // Handler untuk pindah ke Detail
  const handleBeachClick = (beach) => {
    setSelectedBeach(beach);
    setView('detail');
    window.scrollTo(0,0);
  };

  // Handler global untuk Wishlist Toggle
  const handleToggleWishlist = async (beachId) => {
    if (!user) return alert("Sign in to save beaches!");
    
    const isWishlisted = wishlistIds.includes(beachId);
    if (isWishlisted) {
      // Optimistic update
      setWishlistIds(prev => prev.filter(id => id !== beachId));
      await supabase.from('wishlists').delete().match({ user_id: user.id, beach_id: beachId });
    } else {
      // Optimistic update
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
      case 'profile': return <ProfilePage user={user} wishlistCount={wishlistIds.length} />;
      case 'about': return <AboutPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 font-sans text-gray-800">
      <DesktopNavbar currentPage={view} onNavigate={setView} user={user} />
      
      <main className="max-w-6xl mx-auto pt-4 md:pt-0">
        {renderPage()}
      </main>

      {view !== 'detail' && (
        <MobileNavbar currentPage={view} onNavigate={setView} />
      )}
    </div>
  );
}