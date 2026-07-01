import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Eye, Check, X, Shield, Star, ShoppingCart } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface ShopProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  cart: CartItem[];
}

export default function Shop({ onAddToCart, cart }: ShopProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Quick View Modal
  const [quickViewProduct, setQuickViewModal] = useState<any | null>(null);

  // Cart animation success overlay
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const categories = ['All', 'Solar Power', 'Wiring & Cables', 'Power Accessories', 'Safety Gear'];

  const products = [
    {
      id: 'prod-solar-450w',
      name: 'WHL MaxPower Monocrystalline Solar Panel (450W)',
      category: 'Solar Power',
      price: 189.99,
      image: 'https://images.pexels.com/photos/19895871/pexels-photo-19895871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'High-efficiency Tier 1 monocrystalline panel with tempered anti-reflective glass. Designed to maximize solar yield under high temperature and overcast environments.',
      rating: 4.9,
      reviews: 42,
      specs: ['Cell Type: Monocrystalline', 'Max Power: 450W', 'Dimensions: 2094 x 1038 x 35 mm', 'Weight: 23.5 kg']
    },
    {
      id: 'prod-batt-100ah',
      name: 'LiFePO4 Lithium Backup Battery (12.8V 100Ah)',
      category: 'Solar Power',
      price: 349.99,
      image: 'https://images.pexels.com/photos/33379360/pexels-photo-33379360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'Advanced Lithium Iron Phosphate (LiFePO4) deep-cycle storage cell with integrated Smart BMS control. Supports up to 4500 charge-discharge cycles.',
      rating: 4.8,
      reviews: 31,
      specs: ['Voltage: 12.8V', 'Capacity: 100Ah', 'Cycle Life: 4000+ at 80% DoD', 'BMS: Integrated Auto Protection']
    },
    {
      id: 'prod-inv-5kw',
      name: 'Smart Hybrid Solar Inverter (5kW Pure Sine)',
      category: 'Solar Power',
      price: 599.99,
      image: 'https://images.pexels.com/photos/28265032/pexels-photo-28265032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'Pure sine wave intelligent hybrid controller and inverter. Connects with dual solar trackers, mains power, and diesel generator networks.',
      rating: 5.0,
      reviews: 18,
      specs: ['Output: Pure Sine Wave', 'Capacity: 5kW / 5000W', 'Max VOC: 500VDC', 'Communication: WiFi Built-in']
    },
    {
      id: 'prod-cable-100m',
      name: 'Twin-Core Heavy Duty Cable Reel (2.5mm² 100m)',
      category: 'Wiring & Cables',
      price: 79.99,
      image: 'https://images.pexels.com/photos/3862612/pexels-photo-3862612.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'SANS certified heavy-duty copper electrical cable. Insulated in flexible, chemical-resistant outer PVC protective sheath for building and indoor networks.',
      rating: 4.7,
      reviews: 55,
      specs: ['Conductor: 99.9% Pure Copper', 'Gauge: 2.5mm²', 'Length: 100 meters', 'Certification: SANS 1507 approved']
    },
    {
      id: 'prod-breaker-pack',
      name: 'Multi-Breaker Safe distribution Board Panel',
      category: 'Power Accessories',
      price: 119.99,
      image: 'https://images.pexels.com/photos/7359566/pexels-photo-7359566.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'Fully pre-wired distribution board box housing 8 core surge protectors and automated smart earth leakage breakers for house & business safety.',
      rating: 4.8,
      reviews: 14,
      specs: ['Housing: Heavy Polycarbonate IP65', 'Load: 63A main switch', 'Earth Leakage: Integrated sensitive relay', 'Circuit paths: 12-way ready']
    },
    {
      id: 'prod-smartmeter',
      name: 'Digital Prepaid Power Monitoring Smart-Meter',
      category: 'Power Accessories',
      price: 49.99,
      image: 'https://images.pexels.com/photos/34526423/pexels-photo-34526423.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'Intelligent digital power meter featuring real-time voltage tracking, smart remote tariff monitoring, and automated safety cut-off relays.',
      rating: 4.6,
      reviews: 29,
      specs: ['Display: LCD Digital Backlit', 'Max Current: 80A', 'Accuracy: Class 1.0', 'Mounting: Standard DIN Rail']
    },
    {
      id: 'prod-safe-hardhat',
      name: 'WHL Industrial Protective Hard-Hat (White)',
      category: 'Safety Gear',
      price: 19.99,
      image: 'https://images.pexels.com/photos/8986038/pexels-photo-8986038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'Heavy duty, premium lightweight high-density polyethylene protective hardhat featuring comfortable 6-point suspension band and sweatband cushion.',
      rating: 4.9,
      reviews: 64,
      specs: ['Material: HDPE High Density', 'Suspension: 6-Point ratchet lock', 'Standard: ANSI Z89.1 certified', 'Color: Elite White']
    },
    {
      id: 'prod-box-rugged',
      name: 'WHL Heavy-Duty Sealed Logistics Transit Box',
      category: 'Power Accessories',
      price: 34.99,
      image: 'https://images.pexels.com/photos/7363099/pexels-photo-7363099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
      description: 'Extremely durable, weatherproof storage case equipped with shock absorbent custom foam. Designed to pack sensitive electronic gadgets during transport.',
      rating: 4.8,
      reviews: 21,
      specs: ['Structure: Impact resistant resin', 'Latches: Double-throw toggle locks', 'Volume: 18 Liters capacity', 'Waterproof rating: IP67 dust/water seal']
    }
  ];

  // Filters & Search handling
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const handleAddToCartClick = (item: any) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });

    // Show temporary success card banner
    setAddedItemName(item.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2500);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 relative">
      
      {/* Toast Feedback popup */}
      {addedItemName && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-emerald-500 rounded-2xl p-4 flex items-center gap-3 shadow-xl max-w-sm animate-slide-up">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Item Added to Cart</h4>
            <p className="text-[10px] text-neutral-400 truncate max-w-[200px] mt-0.5">{addedItemName}</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
            Online Shopping Portal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in">
            WHL Retail Shop
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Get high quality certified electrical fixtures, backup power solar panels, battery packs, inverters, and professional safety gear with nationwide delivery.
          </p>
        </div>

        {/* Filter Toolbar controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-neutral-950 border border-neutral-900 rounded-2xl p-4 md:p-6 mb-10">
          
          {/* Left search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solar panels, cables, accessories..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Right Sorting selectors */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-900 border border-neutral-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="featured">Featured Standard</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Categories Pills bar */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid cards */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-neutral-950 border border-neutral-900 rounded-3xl">
            <h3 className="text-lg font-bold text-neutral-300">No items matched your filters</h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto mt-1">
              Try adjusting your spelling or selecting a different category pill.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((prod) => {
              const inCart = cart.find(c => c.id === prod.id);
              return (
                <div 
                  key={prod.id} 
                  className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-neutral-800 transition-all duration-300 shadow-xl shadow-black/40"
                >
                  
                  {/* Card Header Media */}
                  <div className="relative aspect-square bg-neutral-900 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    
                    {/* Floating Action buttons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition duration-300">
                      <button
                        onClick={() => setQuickViewModal(prod)}
                        className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAddToCartClick(prod)}
                        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-lg shadow-blue-500/20"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>

                    <span className="absolute top-3 left-3 bg-blue-600/90 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md text-white backdrop-blur-sm">
                      {prod.category}
                    </span>
                  </div>

                  {/* Card Content details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                          <span className="font-bold text-white">{prod.rating}</span>
                          <span>({prod.reviews})</span>
                        </div>
                        <span>SANS Approved</span>
                      </div>

                      <h3 className="font-extrabold text-sm text-neutral-100 group-hover:text-blue-400 transition duration-200 line-clamp-2 min-h-[40px]">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-neutral-500 font-bold uppercase">Estimated retail</span>
                        <span className="text-base font-black text-white">${prod.price.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCartClick(prod)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition ${
                          inCart 
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added ({inCart.quantity})
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Product Modal popup */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
            
            {/* Close */}
            <button
              onClick={() => setQuickViewModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
              {/* Product Media image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-850">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info description list */}
              <div className="flex flex-col justify-between space-y-6 text-sm">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 px-2 py-0.5 rounded bg-blue-500/10 inline-block">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {quickViewProduct.name}
                  </h3>
                  
                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
                    <span className="font-bold text-white text-sm">{quickViewProduct.rating}</span>
                    <span>({quickViewProduct.reviews} customer reviews)</span>
                  </div>

                  <p className="text-neutral-300 leading-relaxed text-xs">
                    {quickViewProduct.description}
                  </p>

                  {/* Tech specs checklist */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-500 block">Product Tech Specs:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-neutral-400">
                      {quickViewProduct.specs.map((spec: string, index: number) => (
                        <div key={index} className="flex items-center gap-1.5">
                          <span className="text-blue-500">•</span>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Order block */}
                <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-neutral-500 font-bold uppercase">Estimated value</span>
                    <span className="text-2xl font-black text-white">${quickViewProduct.price.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleAddToCartClick(quickViewProduct);
                        setQuickViewModal(null);
                      }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 px-3 bg-neutral-900 border border-neutral-850 rounded-xl">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span>12m Warranty</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
