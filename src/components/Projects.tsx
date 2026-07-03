import { useState } from 'react';
import { LayoutGrid, Info, Calendar, MapPin, Gauge } from 'lucide-react';

interface ProjectsProps {
  projects: any[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedFilter, setSelectedCategory] = useState<string>('All');
  const [activeDetail, setActiveDetail] = useState<any | null>(null);

  const categories = ['All', 'Solar Clean Energy', 'Industrial Wiring', 'Logistics Infrastructure'];

  const filteredProjects = projects.filter((p) => {
    return selectedFilter === 'All' || p.category === selectedFilter;
  });

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8 lg:px-12">
        
        {/* Title and Intro */}
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-4">
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
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-neutral-950 border border-neutral-900 rounded-3xl">
            <LayoutGrid className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
            <p className="text-neutral-500">No projects to display in this category yet.</p>
          </div>
        ) : (
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
                        {p.details?.map((detail: string, index: number) => (
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
        )}

      </div>
    </div>
  );
}
