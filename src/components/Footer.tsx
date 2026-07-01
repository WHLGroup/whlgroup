import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onQuoteRequest: () => void;
  onAdminClick: () => void;
}

export default function Footer({ setActiveTab, onQuoteRequest, onAdminClick }: FooterProps) {
  const handleLinkClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white text-base font-bold italic">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white leading-none">
                  WHL <span className="text-blue-500">GROUP</span>
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Professional certified electrical systems, smart clean solar installations, expedited logistics courier deliveries, and comprehensive engineering support across Malawi.
            </p>
            <div className="flex gap-2 text-xs text-neutral-500 bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-850/50 inline-flex items-center">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Certified ISO Safety Standard Compliance</span>
            </div>
          </div>

          {/* Sectors Links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm uppercase text-neutral-300 tracking-wider">Company Sectors</h4>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <button onClick={() => handleLinkClick('electrical')} className="hover:text-blue-500 text-left transition">
                Solar Grid Design & Sizing
              </button>
              <button onClick={() => handleLinkClick('electrical')} className="hover:text-blue-500 text-left transition">
                Commercial Power Wiring
              </button>
              <button onClick={() => handleLinkClick('logistics')} className="hover:text-blue-500 text-left transition">
                Express Courier Services
              </button>
              <button onClick={() => handleLinkClick('logistics')} className="hover:text-blue-500 text-left transition">
                Bulk Cargo & Freight Transport
              </button>
              <button onClick={() => handleLinkClick('shop')} className="hover:text-blue-500 text-left transition">
                WHL Retail Equipment Shop
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm uppercase text-neutral-300 tracking-wider">Useful Connections</h4>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <button onClick={() => handleLinkClick('about')} className="hover:text-blue-500 text-left transition">
                Who We Are (Our Story)
              </button>
              <button onClick={() => handleLinkClick('projects')} className="hover:text-blue-500 text-left transition">
                Completed Case Studies
              </button>
              <button onClick={onQuoteRequest} className="hover:text-blue-500 text-left transition">
                Submit Sizing Schedulers
              </button>
              <button onClick={() => handleLinkClick('contact')} className="hover:text-blue-500 text-left transition">
                Get In Touch Support
              </button>
              <span className="text-[10px] text-neutral-500">Working hours: 07:30 - 17:00</span>
            </div>
          </div>

          {/* Malawi Central Branch Contacts */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm uppercase text-neutral-300 tracking-wider">Central HQ Branch</h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Plot 47/312, Kanengo Bypass, Lilongwe, Malawi</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-white font-bold">0991 807 100 / 0884 985 461</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>info@whlgroup.mw</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower row details and copyrights */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <span>© 2026 WHL GROUP. All Rights Reserved.</span>
          <div className="flex gap-4">
            <span onClick={onAdminClick} className="hover:text-neutral-400 cursor-pointer">Management Portal</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">SANS Regulatory Sizing</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">MERA Certified Licences</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
