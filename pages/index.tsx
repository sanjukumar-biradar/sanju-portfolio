import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';

import { ParticleBackground } from '@/components/ParticleBackground';
import { CursorGlow } from '@/components/CursorGlow';
import { WelcomeAssistant } from '@/components/WelcomeAssistant';
import { Navigation } from '@/components/Navigation';
import { LoginModal } from '@/components/LoginModal';
import { ShoppingCartComponent } from '@/components/ShoppingCart';
import { AdminDashboard } from '@/components/AdminDashboard';
import { UserDashboard } from '@/components/UserDashboard';
import { Footer } from '@/components/Footer';
import { ToastContainer, toast } from '@/components/Toast';
import { LiveClock } from '@/components/LiveClock';

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { StoreSection } from '@/components/sections/StoreSection';
import { ContactSection } from '@/components/sections/ContactSection';

import { useAuth } from '@/hooks/useAuth';
import { Product, CartItem, UserData } from '@/types';

export default function Home() {
  const { user, login, logout } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [view, setView] = useState<'home' | 'dashboard'>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'skills', 'store', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((section: string) => {
    if (section === 'dashboard') {
      setView('dashboard');
      return;
    }
    setView('home');
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLogin = useCallback((userData: UserData) => {
    login(userData);
    setView('dashboard');
    toast.success(`Welcome back, ${userData.name}!`);
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
    setView('home');
    toast.info('Logged out successfully');
  }, [logout]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`Added another ${product.name} to cart`);
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item) toast.info(`${item.name} removed from cart`);
      return prev.filter(item => item.id !== id);
    });
  }, []);

  const openUserLogin = useCallback(() => {
    setLoginType('user');
    setLoginModalOpen(true);
  }, []);

  const openAdminLogin = useCallback(() => {
    setLoginType('admin');
    setLoginModalOpen(true);
  }, []);

  return (
    <>
      <Head>
        <title>Sanjukumar | Full-Stack Developer</title>
        <meta name="description" content="Professional developer portfolio - Websites, AI Tools, Apps, Games & more" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
        <ParticleBackground />
        <CursorGlow />
        <LiveClock />
        <ToastContainer />

        <WelcomeAssistant onComplete={() => setShowWelcome(false)} />

        <Navigation
          user={user}
          onLoginClick={openUserLogin}
          onAdminClick={openAdminLogin}
          onCartClick={() => setCartOpen(true)}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLogin={handleLogin}
          type={loginType}
        />

        <AnimatePresence>
          {cartOpen && (
            <ShoppingCartComponent
              cart={cart}
              onClose={() => setCartOpen(false)}
              onRemove={removeFromCart}
            />
          )}
        </AnimatePresence>

        {view === 'dashboard' && user?.role === 'admin' && (
          <AdminDashboard onLogout={handleLogout} />
        )}

        {view === 'dashboard' && user?.role === 'user' && (
          <UserDashboard user={user} onLogout={handleLogout} />
        )}

        {view === 'home' && (
          <main>
            <HeroSection onNavigate={handleNavigate} />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <SkillsSection />
            <StoreSection onAddToCart={addToCart} />
            <ContactSection />
            <Footer />
          </main>
        )}
      </div>
    </>
  );
}