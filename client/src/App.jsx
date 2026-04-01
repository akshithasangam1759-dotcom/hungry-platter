import { Suspense, lazy, useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppBtn from './components/WhatsAppBtn';
import introVideo from './assets/hungry platter.mp4';
import GoldenBackground from './components/GoldenBackground';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Reserve = lazy(() => import('./pages/Reserve'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FindUs = lazy(() => import('./pages/FindUs'));
const Admin = lazy(() => import('./pages/Admin'));
const Profile = lazy(() => import('./pages/Profile'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16
    }}>
      <div style={{ fontSize: 32, animation: 'pulse 1.5s infinite' }}>🍽️</div>
      <div className="spinner" />
    </div>
  );
}

function SplashScreen({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setTimeout(onFinish, 3000);
      });
      video.onended = () => {
        setTimeout(onFinish, 500);
      };
      setTimeout(() => {
        if (video && !video.ended) onFinish();
      }, 10000);
    }
  }, []);

  return (
    <div style={{
      width: '220px',
      height: '220px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '3px solid rgba(212,168,85,0.5)',
      boxShadow: '0 0 80px rgba(212,168,85,0.25)',
      background: '#0d0d0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <video
        ref={videoRef}
        src={introVideo}
        muted
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hiding, setHiding] = useState(false);

  const handleFinish = () => {
    setHiding(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  return (
    <ThemeProvider>
      <GoldenBackground />
      <AuthProvider>
        <CartProvider>
          {showSplash && (
            <div style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#0d0d0d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: hiding ? 0 : 1,
              transition: 'opacity 0.8s ease',
              pointerEvents: hiding ? 'none' : 'all',
            }}>
              <SplashScreen onFinish={handleFinish} />
            </div>
          )}
          <ScrollToTop />
          <Navbar />
          <CartDrawer />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reserve" element={<Reserve />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/find-us" element={<FindUs />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
                  <div style={{ fontSize: 64 }}>🍽️</div>
                  <h2>Page Not Found</h2>
                  <a href="/" className="btn btn-primary" style={{ marginTop: 8 }}>Back to Home</a>
                </div>
              } />
            </Routes>
          </Suspense>
          <Footer />
          <WhatsAppBtn />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}