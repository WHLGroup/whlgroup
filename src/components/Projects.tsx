import { useState } from 'react';
import { LayoutGrid, Info, Calendar, MapPin, Gauge } from 'lucide-react';

export default function Projects() {
  const [selectedFilter, setSelectedCategory] = useState<string>('All');
  const [activeDetail, setActiveDetail] = useState<any | null>(null);

  const categories = ['All', 'Solar Clean Energy', 'Industrial Wiring', 'Logistics Infrastructure'];

  const projects = [
    {
      id: 'proj-solar-grid',
      title: 'Kanengo Commercial Solar Plant',
      category: 'Solar Clean Energy',
      location: 'Kanengo Industrial Area, Lilongwe',
      metrics: '250 kWp Installed Solar Output',
      date: 'June 2025',
      image: 'https://images.pexels.com/photos/35105460/pexels-photo-35105460.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
      description: 'Fully customized solar canopy structure spanning 1,200 sqm. Integrated hybrid intelligent controllers, LiFePO4 batteries, and remote cloud management system to sustain peak manufacturing capacity during grid outages.',
      details: [
        'Supplies 65% of the factory base load',
        'Saves ~80,000 kg of carbon emissions annually',
        '24/7 smart system logging connected with WHL Cloud'
      ]
    },
    {
      id: 'proj-milling-wiring',
      title: 'Industrial Mill Factory Electrification',
      category: 'Industrial Wiring',
      location: 'Makata Industrial Site, Blantyre',
      metrics: 'Three-Phase Balanced Grid System',
      date: 'April 2025',
      image: 'https://images.pexels.com/photos/28265032/pexels-photo-28265032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
      description: 'Comprehensive installation of high-voltage industrial panels, automatic phase balancing busbars, and lightning arrestor defense nets for heavy-duty grain milling machines.',
      details: [
        'Installed 1,500m of fire-resistant shielded cabling',
        'Certified SANS compliance for full plant safety',
        'Completed on schedule in exactly 45 business days'
      ]
    },
    {
      id: 'proj-depot-logistics',
      title: 'WHL Central Logistics Hub & Terminal',
      category: 'Logistics Infrastructure',
      location: 'Area 47 Bypass, Lilongwe',
      metrics: '4,000 sqm Temperature Control Facility',
      date: 'October 2024',
      image: 'https://images.pexels.com/photos/10268770/pexels-photo-10268770.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
      description: 'Establishment of WHL GROUP flagship cold-chain shipping terminal and courier distribution depot, linking cross-docking operations for commercial retail products.',
      details: [
        'Equipped with 24-hour smart security guard details',
        'Fully backup powered by off-grid WHL Solar + 150kVA Generator',
        'Processes up to 10,000 courier items daily'
      ]
    },
    {
      id: 'proj-limbe-solar',
      title: 'Limbe Executive Corporate Offices Solar',
      category: 'Solar Clean Energy',
      location: 'Limbe Center, Blantyre',
      metrics: '45 kWp Smart Solar Grid Tie',
      date: 'March 2025',
      image: 'https://images.pexels.com/photos/19895871/pexels-photo-19895871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
      description: 'Rooftop off-grid solar deployment for major corporate building. Features hybrid battery storage capable of operating the offices for 3 consecutive cloudy days.',
      details: [
        '98% operational uptime recorded since commission',
        'Saves the enterprise over 12 million MWK on electric bills',
        'Aesthetic low-profile design integration'
      ]
    },
    {
      id: 'proj-airport-power',
      title: 'Mzuzu Airport Backup Power Systems',
      category: 'Industrial Wiring',
      location: 'Mzuzu Airport District',
      metrics: 'Dual 250kVA Backup Generator Grid',
      date: 'January 2025',
      image: 'https://images.pexels.com/photos/7359566/pexels-photo-7359566.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
      description: 'Engineered automatic switchboard (ATS) systems connecting dual synced diesel generators, safeguarding continuous power for main runway lighting and ATC radio nets.',
      details: [
        'Under 3 seconds transfer times during outage events',
        'Sealed soundproof acoustic canopy protection',
        'Comprehensive 10,000 hours performance certification'
      ]
    },
    {
      id: 'proj-lake-logistics',
      title: 'Mangochi Lakeside Distribution Network',
      category: 'Logistics Infrastructure',
      location: 'Mangochi District Lake Ports',
      metrics: 'Next-Day Courier Fleet Logistics',
      date: 'November 2024',
      image: 'https://images.pexels.com/photos/6169135/pexels-photo-6169135.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
      description: 'Extended courier routes and scheduled cargo distributions to lake tourism and retail outlets, providing same-day medical & general equipment parcel delivery.',
      details: [
        'Supports over 150 lake resorts and retail stores',
        'Full GPS coordinates tracking integration',
        'Eco-efficient delivery vehicle utilization'
      ]
    }
  ];

  const filteredProjects = projects.filter((p) => {
    return selectedFilter === 'All' || p.category === selectedFilter;
  });

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
            Project Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Completed Endeavors
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Take a look at how we are building today and powering tomorrow. WHL GROUP has executed high-end solar infrastructure projects, massive warehouse grids, and complex wiring contracts.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveDetail(null);
              }}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition duration-300 ${
                selectedFilter === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/15'
                  : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div 
              key={p.id} 
              className="bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden hover:border-neutral-800 transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Media banner */}
                <div className="relative aspect-video overflow-hidden bg-neutral-900">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-blue-500 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-neutral-800 backdrop-blur-md">
                    {p.category}
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 space-y-4">
                  <div className="flex gap-2.5 items-center text-xs text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{p.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-tight">
                    {p.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Expand detail card footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveDetail(activeDetail?.id === p.id ? null : p)}
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition border border-neutral-850"
                >
                  <LayoutGrid className="w-4 h-4" /> 
                  {activeDetail?.id === p.id ? 'Hide Details' : 'View Performance Metrics'}
                </button>
              </div>

              {/* Extra Accordion Detail overlay */}
              {activeDetail?.id === p.id && (
                <div className="px-6 pb-6 pt-2 border-t border-neutral-900 bg-neutral-950 text-xs text-neutral-300 space-y-3.5 animate-fade-in">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-neutral-900 pb-2">
                    <Gauge className="w-4 h-4" />
                    <span>{p.metrics}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-bold text-neutral-400">Key achievements:</span>
                    <ul className="space-y-1">
                      {p.details.map((detail, index) => (
                        <li key={index} className="flex gap-2 items-center">
                          <span className="text-blue-500 text-sm">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-2 border-t border-neutral-900">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Completed: {p.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Certified Audit</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
