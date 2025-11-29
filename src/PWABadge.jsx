import { useRegisterSW } from 'virtual:pwa-register/react';
import { Wifi, RefreshCw, X, DownloadCloud } from 'lucide-react';

function PWABadge() {
  const period = 60 * 60 * 1000;
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target;
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  if (!offlineReady && !needRefresh) return null;

  return (
    <div
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] max-w-[90vw] md:max-w-sm w-full animate-in slide-in-from-bottom-4 duration-500"
      role="alert"
      aria-labelledby="toast-message"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-900/10 border border-cyan-100 p-4 flex gap-4 items-start">
        
        {/* Ikon Indikator */}
        <div className={`p-3 rounded-xl flex-shrink-0 ${needRefresh ? 'bg-cyan-100 text-cyan-600' : 'bg-green-100 text-green-600'}`}>
          {needRefresh ? <RefreshCw size={24} className="animate-spin-slow" /> : <Wifi size={24} />}
        </div>

        {/* Konten Teks */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">
            {needRefresh ? 'Update Tersedia' : 'Offline Ready'}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 mb-3 leading-relaxed">
            {needRefresh
              ? 'Versi baru WonderSea tersedia. Muat ulang untuk fitur terbaru.'
              : 'Aplikasi telah diunduh dan siap digunakan tanpa internet.'}
          </p>

          {/* Tombol Aksi */}
          <div className="flex gap-2">
            {needRefresh && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs md:text-sm font-bold rounded-lg transition shadow-md shadow-cyan-200 active:scale-95"
                onClick={() => updateServiceWorker(true)}
              >
                <DownloadCloud size={16} />
                Reload
              </button>
            )}
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs md:text-sm font-bold rounded-lg transition active:scale-95"
              onClick={close}
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Tombol Close Pojok */}
        <button 
          onClick={close}
          className="text-gray-300 hover:text-gray-500 transition -mt-1 -mr-1 p-1 rounded-full hover:bg-gray-50"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default PWABadge;

/**
 * Register periodic sync check
 */
function registerPeriodicSync(period, swUrl, r) {
  if (period <= 0) return;
  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return;
    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    });
    if (resp?.status === 200) await r.update();
  }, period);
}