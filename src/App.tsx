import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ElectricalServices from './components/ElectricalServices';
import LogisticsServices from './components/LogisticsServices';
import Microfinance from './components/Microfinance';
import Shop from './components/Shop';
import Projects from './components/Projects';
import ContactUs from './components/ContactUs';
import QuoteModal from './components/QuoteModal';
import CartDrawer, { CartItem } from './components/CartDrawer';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import SearchOverlay from './components/SearchOverlay';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'prod-solar-450w',
      name: 'WHL MaxPower Monocrystalline Solar Panel (450W)',
      price: 189.99,
      image: 'https://images.pexels.com/photos/19895871/pexels-photo-19895871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      quantity: 1
    },
    {
      id: 'prod-safe-hardhat',
      name: 'WHL Industrial Protective Hard-Hat (White)',
      price: 19.99,
      image: 'https://images.pexels.com/photos/8986038/pexels-photo-8986038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Live Data State for Admin
  const [orders, setOrders] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([
    {
      id: 'cert-1',
      title: 'MERA Electrical Installation License',
      type: 'Class A',
      issued: '2025-01-10',
      expiry: '2026-01-10',
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/3862612/pexels-photo-3862612.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
    },
    {
      id: 'cert-2',
      title: 'MRA Tax Compliance Certificate',
      type: 'Corporate Tax',
      issued: '2025-01-01',
      expiry: '2026-01-01',
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/7359566/pexels-photo-7359566.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
    },
    {
      id: 'cert-3',
      title: 'CRIPC Business Registration',
      type: 'Intellectual Property',
      issued: '2024-05-15',
      expiry: '2029-05-15',
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/8986038/pexels-photo-8986038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
    },
    {
      id: 'cert-4',
      title: 'NICC Communications License',
      type: 'Electronic Security',
      issued: '2025-02-20',
      expiry: '2027-02-20',
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/34526423/pexels-photo-34526423.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
    },
    {
      id: 'cert-5',
      title: 'RBM Financial Services Authority',
      type: 'Microfinance License',
      issued: '2024-11-05',
      expiry: '2026-11-05',
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/6169129/pexels-photo-6169129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'
    }
  ]);

  const handleAddCertificate = (cert: any) => {
    setCertificates(prev => [cert, ...prev]);
  };

  const handleRemoveCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  const handleEditCertificate = (updatedCert: any) => {
    setCertificates(prev => prev.map(c => c.id === updatedCert.id ? updatedCert : c));
  };

  const handleAddOrder = (order: any) => {
    setOrders(prev => [order, ...prev]);
  };

  const handleAddQuote = (quote: any) => {
    setQuotes(prev => [quote, ...prev]);
  };

  // Auto-scroll to top upon tab changing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Cart operations
  const handleAddToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === newItem.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      {/* Sticky Header and Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onQuoteClick={() => setIsQuoteOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Page Rendering */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Hero
            onExploreServices={() => setActiveTab('electrical')}
            onShopNow={() => setActiveTab('shop')}
          />
        )}
        {activeTab === 'about' && <AboutUs certificates={certificates} />}
        {activeTab === 'electrical' && (
          <ElectricalServices onQuoteRequest={() => setIsQuoteOpen(true)} />
        )}
        {activeTab === 'logistics' && (
          <LogisticsServices onQuoteRequest={() => setIsQuoteOpen(true)} />
        )}
        {activeTab === 'microfinance' && (
          <Microfinance onQuoteRequest={() => setIsQuoteOpen(true)} />
        )}
        {activeTab === 'shop' && (
          <Shop onAddToCart={handleAddToCart} cart={cart} />
        )}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'contact' && (
          <ContactUs onQuoteRequest={() => setIsQuoteOpen(true)} />
        )}
      </main>

      {/* Persistent Multi-section Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onQuoteRequest={() => setIsQuoteOpen(true)} 
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Modals & Sliding Drawers */}
      <AdminPortal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        orders={orders}
        quotes={quotes}
        certificates={certificates}
        onAddCert={handleAddCertificate}
        onRemoveCert={handleRemoveCertificate}
        onEditCert={handleEditCertificate}
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        setActiveTab={setActiveTab}
      />
      
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        onQuoteSubmit={handleAddQuote}
      />
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderComplete={handleAddOrder}
      />

    </div>
  );
}
