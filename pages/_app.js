import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
          .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
          }, function(err) {
            console.log('Service Worker registration failed:', err);
          });
      });
    }
  }, []);
  return <Component {...pageProps} />
}
