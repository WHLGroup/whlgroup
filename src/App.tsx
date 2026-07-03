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
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import { supabase } from './lib/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Central Dynamic Data State
  const [orders, setOrders] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]); 
  const [projects, setProjects] = useState<any[]>([]);
  const [leadership, setLeadership] = useState<any[]>([]); 
  const [testimonials, setTestimonials] = useState<any[]>([]); 
  const [certificates, setCertificates] = useState<any[]>([]); 

  // Initial Fetch from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: prods } = await supabase.from('products').select('*');
      if (prods) setProducts(prods);
      
      const { data: projs } = await supabase.from('projects').select('*');
      if (projs) setProjects(projs);

      const { data: leads } = await supabase.from('leadership').select('*');
      if (leads) setLeadership(leads);

      const { data: tests } = await supabase.from('testimonials').select('*');
      if (tests) setTestimonials(tests);

      const { data: certs } = await supabase.from('certificates').select('*');
      if (certs) setCertificates(certs);

      const { data: ords } = await supabase.from('orders').select('*');
      if (ords) setOrders(ords);

      const { data: qts } = await supabase.from('quotes').select('*');
      if (qts) setQuotes(qts);
    };
    fetchData();
  }, []);

  // Real-Time Content Handlers using Supabase
  const handleAddProduct = async (p: any) => {
    const { error } = await supabase.from('products').insert([p]);
    if (!error) setProducts(prev => [p, ...prev]);
  };
  const handleRemoveProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(prev => prev.filter(p => p.id !== id));
  };
  
  const handleAddProject = async (p: any) => {
    const { error } = await supabase.from('projects').insert([p]);
    if (!error) setProjects(prev => [p, ...prev]);
  };
  const handleRemoveProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleAddLeadership = async (m: any) => {
    const { error } = await supabase.from('leadership').insert([m]);
    if (!error) setLeadership(prev => [m, ...prev]);
  };
  const handleRemoveLeadership = async (id: string) => {
    const { error } = await supabase.from('leadership').delete().eq('id', id);
    if (!error) setLeadership(prev => prev.filter(m => m.id !== id));
  };

  const handleAddTestimonial = async (t: any) => {
    const { error } = await supabase.from('testimonials').insert([t]);
    if (!error) setTestimonials(prev => [t, ...prev]);
  };
  const handleApproveTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').update({ approved: true }).eq('id', id);
    if (!error) setTestimonials(prev => prev.map(t => t.id === id ? {...t, approved: true} : t));
  };
  const handleRemoveTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const handleAddCertificate = async (cert: any) => {
    const { error } = await supabase.from('certificates').insert([cert]);
    if (!error) setCertificates(prev => [cert, ...prev]);
  };
  const handleRemoveCertificate = async (id: string) => {
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (!error) setCertificates(prev => prev.filter(c => c.id !== id));
  };
  const handleEditCertificate = async (updatedCert: any) => {
    const { error } = await supabase.from('certificates').update(updatedCert).eq('id', updatedCert.id);
    if (!error) setCertificates(prev => prev.map(c => c.id === updatedCert.id ? updatedCert : c));
  };

  const handleAddOrder = async (order: any) => {
    const { error } = await supabase.from('orders').insert([order]);
    if (!error) setOrders(prev => [order, ...prev]);
  };
  const handleAddQuote = async (quote: any) => {
    const { error } = await supabase.from('quotes').insert([quote]);
    if (!error) setQuotes(prev => [quote, ...prev]);
  };
  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (!error) setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };
  const handleUpdateQuoteStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('quotes').update({ status }).eq('id', id);
    if (!error) setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  // Auto-scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Hidden Keyboard Listener for Admin Access
  useEffect(() => {
    let keys = '';
    const secret = 'whladmin';
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Check for Ctrl + Alt + A shortcut
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(true);
        return;
      }

      // 2. Check for "whladmin" typing sequence
      keys += e.key.toLowerCase();
      if (keys.length > 20) keys = keys.substring(keys.length - 20);
      if (keys.endsWith(secret)) {
        setIsAdminOpen(true);
        keys = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onQuoteClick={() => setIsQuoteOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        currentUser={currentUser}
        onAccountClick={() => {
          if (currentUser) setIsDashboardOpen(true);
          else setIsAuthOpen(true);
        }}
      />

      <main className="flex-1">
        {isDashboardOpen && currentUser ? (
          <UserDashboard 
            user={currentUser} 
            orders={orders} 
            onLogout={() => {
              setCurrentUser(null);
              setIsDashboardOpen(false);
            }} 
            onContinueShopping={() => setIsDashboardOpen(false)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <Hero
                onExploreServices={() => setActiveTab('electrical')}
                onShopNow={() => setActiveTab('shop')}
              />
            )}
        {activeTab === 'about' && (
          <AboutUs 
            certificates={certificates} 
            testimonials={testimonials} 
            onAddTestimonial={handleAddTestimonial}
            leadership={leadership}
          />
        )}
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
          <Shop onAddToCart={handleAddToCart} cart={cart} products={products} />
        )}
        {activeTab === 'projects' && (
          <Projects projects={projects} />
        )}
        {activeTab === 'contact' && (
          <ContactUs onQuoteRequest={() => setIsQuoteOpen(true)} />
        )}
          </>
        )}
      </main>

      <Footer 
        setActiveTab={setActiveTab} 
        onQuoteRequest={() => setIsQuoteOpen(true)} 
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Admin Portal Modal */}
      <AdminPortal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        orders={orders}
        quotes={quotes}
        certificates={certificates}
        onAddCert={handleAddCertificate}
        onRemoveCert={handleRemoveCertificate}
        onEditCert={handleEditCertificate}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateQuoteStatus={handleUpdateQuoteStatus}
        products={products}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
        projects={projects}
        onAddProject={handleAddProject}
        onRemoveProject={handleRemoveProject}
        testimonials={testimonials}
        onApproveTestimonial={handleApproveTestimonial}
        onRemoveTestimonial={handleRemoveTestimonial}
        leadership={leadership}
        onAddLeadership={handleAddLeadership}
        onRemoveLeadership={handleRemoveLeadership}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
          setIsDashboardOpen(true);
        }}
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
