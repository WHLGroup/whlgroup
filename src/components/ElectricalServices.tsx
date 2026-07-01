import { useState } from 'react';
import { Sun, ShieldAlert, Cpu, Zap, HelpCircle, ArrowRight, Gauge, CheckCircle2 } from 'lucide-react';

interface ElectricalServicesProps {
  onQuoteRequest: () => void;
}

export default function ElectricalServices({ onQuoteRequest }: ElectricalServicesProps) {
  const [activeTab, setActiveTab] = useState<'solar' | 'wiring' | 'generator' | 'power-audit'>('solar');
  
  // Solar Calculator State
  const [monthlyBill, setMonthlyBill] = useState(150); // USD
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');

  // Calculator calculations
  const calculatedCapacity = Math.round((monthlyBill / 30) * 1.5 * 10) / 10; // kW
  const calculatedPanels = Math.ceil((calculatedCapacity * 1000) / 450); // 450W panels
  const calculatedStorage = Math.round(calculatedCapacity * 2.4 * 10) / 10; // kWh storage
  const estimatedCost = Math.round(calculatedCapacity * 1400); // USD
  const paybackYears = propertyType === 'residential' ? 4.5 : 3.8;
  const co2Offset = Math.round(calculatedCapacity * 1.2 * 100) / 100; // tons/year

  const serviceTabs = [
    {
      id: 'solar',
      title: 'Solar & Clean Energy',
      icon: Sun,
      description: 'Custom engineered off-grid, hybrid, and grid-tied solar systems designed to secure uninterrupted power for Malawian households and enterprises.',
      benefits: [
        'Premium tier-1 monocrystalline panels with 25-year warranty',
        'Intelligent lithium-ion battery banks (LiFePO4) for long lifecycle',
        'Remote cloud-based power monitoring dashboards',
        'Expert sizing and structural rooftop mounting certificates'
      ]
    },
    {
      id: 'wiring',
      title: 'Wiring & Power Distribution',
      icon: Zap,
      description: 'SANS & IEC compliant electrical wiring, distribution board engineering, and robust infrastructure upgrades for residential, commercial, and industrial facilities.',
      benefits: [
        'Certified high-capacity industrial busbars & cable trays',
        'Comprehensive phase balancing and circuit loading tuning',
        'Lightning protection & earthing grounding grid setups',
        'Certificates of Compliance (CoC) and structural safety inspections'
      ]
    },
    {
      id: 'generator',
      title: 'Generators & Backup Power',
      icon: Cpu,
      description: 'Supply, professional deployment, and preventive upkeep of industrial and auxiliary diesel generators from 10kVA to 1250kVA.',
      benefits: [
        'Automatic Transfer Switch (ATS) configuration for seamless power transfer',
        'Soundproof acoustic enclosures and low-vibration chassis design',
        'Fuel management systems with real-time digital alert triggers',
        '24/7 emergency repair support with original manufacturer components'
      ]
    },
    {
      id: 'power-audit',
      title: 'Power Quality Auditing',
      icon: Gauge,
      description: 'Comprehensive diagnostic screening, thermal imaging, and load logging analysis to detect power quality disruptions, harmonics, and energy inefficiencies.',
      benefits: [
        'Power factor correction (PFC) grid installation to lower utility costs',
        'Infrared thermal scanning of breakers & transformers to locate hot-spots',
        'Voltage surge suppression systems and UPS network architecture',
        'Full operational analysis reporting with optimization action items'
      ]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
            WHL Electrical Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Advanced Power Solutions for Malawi
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            From professional solar grid designs to industrial plant wiring, WHL GROUP ensures resilient, efficient, and SANS-certified electrical infrastructure for every sector.
          </p>
        </div>

        {/* Tab Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* Tab Selection */}
          <div className="lg:col-span-4 space-y-3">
            {serviceTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 border ${
                    isSelected
                      ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-500/5'
                      : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800'
                  }`}
                >
                  <div className={`p-3 rounded-xl transition duration-300 ${isSelected ? 'bg-blue-600 text-white' : 'bg-neutral-900 text-neutral-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">{tab.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Learn more</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="lg:col-span-8 bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-10">
            {serviceTabs.map((tab) => {
              if (tab.id !== activeTab) return null;
              const Icon = tab.icon;
              return (
                <div key={tab.id} className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-4 border-b border-neutral-900 pb-6">
                    <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-white">{tab.title}</h3>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mt-0.5">WHL Engineering Standard</p>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                    {tab.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-sm uppercase font-bold text-blue-500 tracking-wider">Key Capability Highlights:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tab.benefits.map((benefit, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-neutral-300 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-900 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <ShieldAlert className="w-4 h-4 text-blue-500" />
                      <span>SANS & IEC Electrical Standard Regulatory Compliance</span>
                    </div>
                    <button
                      onClick={onQuoteRequest}
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/10 transition-all hover:translate-x-1"
                    >
                      Book Professional Consult <ArrowRight className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Solar System Sizing Calculator Widget */}
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 md:p-12 relative overflow-hidden">
          
          {/* Subtle Sun Icon Glow */}
          <div className="absolute top-0 right-0 p-8 text-blue-500/5 select-none pointer-events-none">
            <Sun className="w-96 h-96 animate-spin" style={{ animationDuration: '40s' }} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Interactive Solar Tool</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Solar Sizing Estimator</h3>
                <p className="text-xs text-neutral-400 mt-2">
                  Determine your approximate clean energy requirements, pricing range, and payback schedules for installations across Malawi.
                </p>
              </div>

              {/* Property Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Installation Objective</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPropertyType('residential')}
                    className={`py-3 rounded-xl font-bold text-xs transition border ${
                      propertyType === 'residential'
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    🏡 Home Residential
                  </button>
                  <button
                    onClick={() => setPropertyType('commercial')}
                    className={`py-3 rounded-xl font-bold text-xs transition border ${
                      propertyType === 'commercial'
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    🏢 Corporate Business
                  </button>
                </div>
              </div>

              {/* Average Monthly Energy Cost Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase text-neutral-400">
                  <span>Estimated Electricity Bill</span>
                  <span className="text-blue-500 text-sm font-extrabold">${monthlyBill} USD / month</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="1500"
                  step="10"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>$30 USD</span>
                  <span>$1500+ USD</span>
                </div>
              </div>

              <div className="flex gap-2 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-xs text-neutral-400">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>We size batteries & solar controllers specifically to manage the load shading patterns in Malawi.</span>
              </div>
            </div>

            {/* Right side: Calculations Output */}
            <div className="lg:col-span-7 bg-neutral-950/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Recommended System</span>
                
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="text-xs text-neutral-400">Solar Array Capacity:</span>
                    <span className="text-sm font-extrabold text-white">{calculatedCapacity} kWp</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="text-xs text-neutral-400">Solar Panels (450W):</span>
                    <span className="text-sm font-extrabold text-white">~ {calculatedPanels} units</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="text-xs text-neutral-400">Li-Ion Storage Power:</span>
                    <span className="text-sm font-extrabold text-white">{calculatedStorage} kWh</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Estimated Cost Range:</span>
                    <span className="text-sm font-extrabold text-blue-500">${estimatedCost.toLocaleString()} - ${(estimatedCost * 1.25).toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:border-l border-neutral-950 md:pl-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Environmental & Financial Impact</span>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 text-center">
                      <span className="text-lg font-black text-emerald-500 block">{paybackYears} yrs</span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold block mt-1">Average Payback</span>
                    </div>
                    <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 text-center">
                      <span className="text-lg font-black text-blue-500 block">{co2Offset} tons</span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold block mt-1">CO₂ Offset / Year</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onQuoteRequest}
                  className="w-full py-3 mt-6 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 text-center transition"
                >
                  Request Detailed Engineering Design
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
