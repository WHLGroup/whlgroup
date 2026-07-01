import { useState, useMemo } from 'react';
import { X, Search, Zap, Truck, Landmark, Package, LayoutGrid, ArrowRight } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, setActiveTab }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  const searchableItems = [
    // Services
    { title: 'Solar Power Installations', category: 'Electrical', tab: 'electrical', icon: Zap },
    { title: 'Industrial Wiring & Maintenance', category: 'Electrical', tab: 'electrical', icon: Zap },
    { title: 'Diesel Generator Support', category: 'Electrical', tab: 'electrical', icon: Zap },
    { title: 'Express Courier Deliveries', category: 'Logistics', tab: 'logistics', icon: Truck },
    { title: 'Cargo Freight & Transport', category: 'Logistics', tab: 'logistics', icon: Truck },
    { title: 'Corporate Warehousing', category: 'Logistics', tab: 'logistics', icon: Truck },
    { title: 'Personal & Payday Loans', category: 'Microfinance', tab: 'microfinance', icon: Landmark },
    { title: 'SME Business Capital', category: 'Microfinance', tab: 'microfinance', icon: Landmark },
    { title: 'Financial Advisory', category: 'Microfinance', tab: 'microfinance', icon: Landmark },
    // Shop Items
    { title: 'Solar Panels (450W Monocrystalline)', category: 'Shop', tab: 'shop', icon: Package },
    { title: 'Lithium LiFePO4 Batteries', category: 'Shop', tab: 'shop', icon: Package },
    { title: 'Hybrid Smart Inverters', category: 'Shop', tab: 'shop', icon: Package },
    { title: 'Industrial Protective Gear', category: 'Shop', tab: 'shop', icon: Package },
    // Projects
    { title: 'Kanengo Solar Plant Case Study', category: 'Projects', tab: 'projects', icon: LayoutGrid },
    { title: 'Airport Power Infrastructure', category: 'Projects', tab: 'projects', icon: LayoutGrid },
  ];

  const results = useMemo(() => {
    if (!query) return [];
    return searchableItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-4 md:p-8 animate-fade-in">
      {/* Top Search Bar */}
      <div className="max-w-3xl mx-auto w-full flex items-center gap-4 border-b border-neutral-800 pb-6 shrink-0">
        <Search className="w-6 h-6 text-blue-500" />
        <input 
          autoFocus
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services, products, or projects..."
          className="flex-1 bg-transparent text-xl md:text-3xl font-bold text-white outline-none placeholder:text-neutral-700"
        />
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Results Area */}
      <div className="max-w-3xl mx-auto w-full flex-1 overflow-y-auto py-8 custom-scrollbar">
        {query ? (
          <div className="space-y-8">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {results.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => {
                        setActiveTab(item.tab);
                        onClose();
                      }}
                      className="group flex items-center gap-4 p-4 bg-neutral-900/50 hover:bg-blue-600/10 border border-neutral-800 hover:border-blue-500/50 rounded-2xl cursor-pointer transition-all animate-slide-up"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="p-3 bg-neutral-900 rounded-xl text-neutral-500 group-hover:text-blue-500 transition">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-blue-500 tracking-widest">{item.category}</span>
                        <h4 className="text-white font-bold group-hover:text-blue-400 transition">{item.title}</h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                <p className="text-neutral-500">No matches found for "<span className="text-white">{query}</span>"</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h5 className="text-[10px] uppercase font-black text-neutral-500 tracking-[0.2em]">Suggested Searches</h5>
            <div className="flex flex-wrap gap-2">
              {['Solar', 'Loans', 'Express Courier', 'Case Studies', 'Batteries'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:border-blue-500 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
