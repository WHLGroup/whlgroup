import { Shield, Headphones, Truck, MapPin, Tag, ArrowRight, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onShopNow: () => void;
}

export default function Hero({ onExploreServices, onShopNow }: HeroProps) {
  const trustBadges = [
    { icon: Shield, title: 'Certified', desc: 'Professionals' },
    { icon: Headphones, title: 'Reliable', desc: 'Support' },
    { icon: Truck, title: 'Fast', desc: 'Deliveries' },
    { icon: MapPin, title: 'Nationwide', desc: 'Service' },
    { icon: Tag, title: 'Affordable', desc: 'Pricing' }
  ];

  const metrics = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '1000+', label: 'Happy Clients' },
    { value: '24/7', label: 'Customer Support' }
  ];

  return (
    <section className="relative min-h-[calc(100dvh-80px)] flex flex-col justify-between bg-black overflow-hidden select-none">
      
      {/* Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/whl-hero-composite.jpg"
          alt="WHL Group Industrial Landscape"
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/50" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          
          {/* Subheading */}
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-blue-500 block animate-fade-in">
            Building Today, Powering Tomorrow
          </span>

          {/* Heading */}
          <div className="space-y-2 animate-slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
              WHL <span className="text-blue-500">GROUP</span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-200 tracking-tight leading-[1.15]">
              Powering Malawi,
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-200 tracking-tight leading-[1.15]">
              Connecting Opportunities.
            </h2>
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-lg font-medium animate-fade-in">
            Professional electrical solutions, solar installations, logistics courier services, online shopping and nationwide engineering support.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in">
            <button
              onClick={onExploreServices}
              className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:translate-x-1"
            >
              Explore Services <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onShopNow}
              className="flex items-center gap-2 px-6 py-3.5 border border-white hover:bg-white hover:text-black text-white font-bold rounded-xl transition duration-300"
            >
              Shop Now <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Trust Badges Panel (Exactly matching the layout in image) */}
        <div className="mt-16 md:mt-24 bg-black/40 backdrop-blur-md border border-neutral-900 rounded-2xl p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3 border-r last:border-r-0 border-neutral-900 pr-4 last:pr-0"
              >
                <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-500">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">{badge.title}</span>
                  <span className="text-xs text-neutral-400 font-medium">{badge.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats / Key Metrics Footer Row (Matching bottom part of the image) */}
      <div className="relative z-10 bg-neutral-950/90 border-t border-neutral-900 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left divide-y md:divide-y-0 lg:divide-x divide-neutral-900">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col md:pl-8 first:pl-0 pt-6 md:pt-0 first:pt-0">
                <span className="text-3xl md:text-4xl font-extrabold text-blue-500 tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs md:text-sm text-neutral-400 font-semibold mt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
