import { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onQuoteClick: () => void;
  onSearchClick: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onCartClick,
  onQuoteClick,
  onSearchClick
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [elecDropdownOpen, setElecDropdownOpen] = useState(false);
  const [logDropdownOpen, setLogDropdownOpen] = useState(false);
  const [microDropdownOpen, setMicroDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'About Us', value: 'about' },
    { label: 'Electrical Services', value: 'electrical', dropdown: true },
    { label: 'Logistics Services', value: 'logistics', dropdown: true },
    { label: 'Microfinance', value: 'microfinance', dropdown: true },
    { label: 'Shop', value: 'shop' },
    { label: 'Projects', value: 'projects' },
    { label: 'Contact Us', value: 'contact' }
  ];

  const handleNavClick = (tabValue: string) => {
    setActiveTab(tabValue);
    setIsOpen(false);
    setElecDropdownOpen(false);
    setLogDropdownOpen(false);
    setMicroDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition duration-300">
              <span className="text-xl font-bold italic">⚡</span>
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur opacity-30 animate-pulse group-hover:opacity-50" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white leading-none">
                WHL <span className="text-blue-500">GROUP</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              if (item.dropdown) {
                const isElectrical = item.value === 'electrical';
                const isLogistics = item.value === 'logistics';
                const isMicro = item.value === 'microfinance';

                const isOpenDropdown = isElectrical ? elecDropdownOpen : isLogistics ? logDropdownOpen : microDropdownOpen;
                const setOpenDropdown = isElectrical ? setElecDropdownOpen : isLogistics ? setLogDropdownOpen : setMicroDropdownOpen;

                return (
                  <div
                    key={item.value}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(true)}
                    onMouseLeave={() => setOpenDropdown(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.value)}
                      className={`flex items-center gap-1 py-2 text-sm font-semibold transition duration-200 cursor-pointer ${
                        activeTab === item.value 
                          ? 'text-blue-500' 
                          : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpenDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpenDropdown && (
                      <div className="absolute top-full left-0 w-64 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-2.5 mt-0 animate-fade-in z-50">
                        {isElectrical && (
                          <>
                            <button onClick={() => handleNavClick('electrical')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">☀️ Solar Power Installations</div>
                              <span className="text-xs text-neutral-400">Smart off-grid & hybrid solar</span>
                            </button>
                            <button onClick={() => handleNavClick('electrical')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">🔌 Domestic & Industrial Wiring</div>
                              <span className="text-xs text-neutral-400">Certified electrical solutions</span>
                            </button>
                            <button onClick={() => handleNavClick('electrical')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">⚙️ Generator Sales & Maintenance</div>
                              <span className="text-xs text-neutral-400">Reliable backup power support</span>
                            </button>
                          </>
                        )}
                        {isLogistics && (
                          <>
                            <button onClick={() => handleNavClick('logistics')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">📦 Express Courier Deliveries</div>
                              <span className="text-xs text-neutral-400">Fast, safe nationwide parcel courier</span>
                            </button>
                            <button onClick={() => handleNavClick('logistics')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">🚛 Cargo Freight Services</div>
                              <span className="text-xs text-neutral-400">Heavy equipment & bulk hauling</span>
                            </button>
                            <button onClick={() => handleNavClick('logistics')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">🏬 Warehousing & Supply Chain</div>
                              <span className="text-xs text-neutral-400">Secure storage hubs in major cities</span>
                            </button>
                          </>
                        )}
                        {isMicro && (
                          <>
                            <button onClick={() => handleNavClick('microfinance')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">🏦 Personal & Payday Loans</div>
                              <span className="text-xs text-neutral-400">Fast cash for life emergencies</span>
                            </button>
                            <button onClick={() => handleNavClick('microfinance')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">📈 SME Business Capital</div>
                              <span className="text-xs text-neutral-400">Growth funding for entrepreneurs</span>
                            </button>
                            <button onClick={() => handleNavClick('microfinance')} className="w-full text-left p-2.5 hover:bg-neutral-900 rounded-lg text-sm text-neutral-300 hover:text-white transition">
                              <div className="font-bold text-white flex items-center gap-1.5">🛡️ Financial Advisory</div>
                              <span className="text-xs text-neutral-400">Smart debt management support</span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activeTab === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className="relative py-2 text-sm font-semibold transition duration-200 cursor-pointer text-neutral-300 hover:text-white"
                >
                  <span className={isActive ? 'text-blue-500 font-bold' : ''}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl transition hover:border-neutral-700"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-neutral-300 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl transition duration-200 hover:border-neutral-700"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border border-neutral-900 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Get A Quote CTA */}
            <button
              onClick={onQuoteClick}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition duration-200"
            >
              Get A Quote
            </button>
          </div>

          {/* Mobile Actions and Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Search on Mobile */}
            <button
              onClick={onSearchClick}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl"
            >
              <Search className="w-5 h-5" />
            </button>
            {/* Cart on Mobile */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-neutral-300 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border border-neutral-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl transition"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-neutral-900 bg-neutral-950 px-4 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
                  activeTab === item.value
                    ? 'bg-blue-600/10 text-blue-500 border-l-4 border-blue-500'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-900">
            <button
              onClick={() => {
                setIsOpen(false);
                onQuoteClick();
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white rounded-xl shadow-lg shadow-blue-500/20 text-center transition"
            >
              Get A Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
