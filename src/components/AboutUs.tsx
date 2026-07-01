import { useState } from 'react';
import { Award, Eye, Heart, Target, ChevronLeft, ChevronRight, MessageSquareQuote, X } from 'lucide-react';

interface AboutUsProps {
  certificates: any[];
}

export default function AboutUs({ certificates }: AboutUsProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [viewingCert, setViewingCert] = useState<any | null>(null);

  const values = [
    {
      icon: Award,
      title: 'Engineering Rigor',
      desc: 'Our electrical engineers hold top SANS & IEC safety certifications, providing robust designs built to endure and exceed safety margins.'
    },
    {
      icon: Target,
      title: 'Sustainable Ecology',
      desc: 'WHL is dedicated to powering Malawian communities with premium solar energy, off-setting carbon prints, and reducing load shade issues.'
    },
    {
      icon: Heart,
      title: 'Reliable Logistics',
      desc: 'Every parcel counts. We combine GPS satellite tracking with structured delivery runs to guarantee safe cargo courier transfers.'
    },
    {
      icon: Eye,
      title: 'Uncompromised Integrity',
      desc: 'Transparent pricing, direct client reporting, and Cash-On-Delivery options for retail shopping guarantee absolute peace of mind.'
    }
  ];

  const testimonials = [
    {
      quote: "We commissioned WHL Group to install our hybrid solar array at our manufacturing warehouse in Kanengo. The results have been stellar! Load shedding is a thing of the past, and their team remains on standby for support 24/7.",
      author: "Gift Mwale",
      role: "Operations Director, Lilongwe Milling",
      project: "250kWp Solar Plant"
    },
    {
      quote: "WHL Logistics handles our e-commerce distributions between Blantyre and Mzuzu. Their courier rates are extremely competitive, and the parcel tracker widget gives our retail buyers complete clarity. Highly recommended!",
      author: "Alinafe Phiri",
      role: "E-Commerce Founder, ChicMalawi Store",
      project: "Express Courier Deliveries"
    },
    {
      quote: "Excellent power diagnostic auditing! WHL identified thermal hot-spots in our main electrical switches before any failure occurred. Their safety audit report saved us millions of Kwacha in prospective factory down-times.",
      author: "Chancy Chirwa",
      role: "Plant Engineering Lead, Makata Beverages",
      project: "Power Quality Audit"
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Core Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
              Corporate Overview
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Pioneering Electrical & Logistics Infrastructure
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded" />
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-medium">
              Established in Malawi, WHL GROUP has rapidly evolved into a market-leading multi-sector enterprise. We merge elite electrical engineering practices, robust solar power configurations, and structured nationwide logistics.
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Our multidisciplinary team works tirelessly to bridge utility gaps across the nation. By providing reliable off-grid solar equipment, safe wiring procedures, express courier operations, and direct retail shopping access, we serve as the vital gear driving Malawian commerce forward.
            </p>
          </div>

          <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-850">
            <img
              src="https://images.pexels.com/photos/19895871/pexels-photo-19895871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600"
              alt="WHL Professional Teamwork"
              className="w-full h-full object-cover"
            />
            {/* Overlay Grid badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 flex gap-4 items-center">
              <span className="text-4xl">🇲🇼</span>
              <div>
                <h4 className="font-bold text-sm">WHL Malawi Headquarters</h4>
                <p className="text-xs text-neutral-400">Serving Central, Southern & Northern Regions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values grid */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">How We Operate</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Our Foundations of Excellence</h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              WHL GROUP operations are anchored upon reliable commitments, elite training standards, and ecological stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 space-y-4 hover:border-neutral-800 transition duration-300">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl inline-block">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-white">{val.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 font-bold">WHL Leadership</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">The Brains Behind the Power</h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Our directors combine years of international engineering experience and localized logistics mastery to drive success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                name: 'Kondwani Banda',
                role: 'Chief Executive Officer',
                image: 'https://images.pexels.com/photos/8986038/pexels-photo-8986038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                bio: '15+ years managing utility setups. Pioneer in domestic solar installation regulations.'
              },
              {
                name: 'Dr. Tamara Phiri',
                role: 'Director of Solar Engineering',
                image: 'https://images.pexels.com/photos/34526423/pexels-photo-34526423.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                bio: 'Doctorate in Renewable Power Grids. Oversees high-voltage design & battery certifications.'
              },
              {
                name: 'George Kumwenda',
                role: 'Head of Logistics & Supply Chain',
                image: 'https://images.pexels.com/photos/6169129/pexels-photo-6169129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                bio: 'Courier and freight logistics veteran. Developed WHL next-day inter-city cargo transit lanes.'
              }
            ].map((member, i) => (
              <div key={i} className="bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden group hover:border-neutral-800 transition">
                <div className="aspect-square bg-neutral-900 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-extrabold text-lg text-white group-hover:text-blue-500 transition">{member.name}</h4>
                  <span className="text-xs uppercase tracking-wider font-extrabold text-blue-500 block">{member.role}</span>
                  <p className="text-xs text-neutral-400 leading-relaxed pt-2 border-t border-neutral-900 mt-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Customer Testimonials Carousel slider */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-6 left-6 text-blue-500/10">
            <MessageSquareQuote className="w-24 h-24" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 text-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Client Reviews</span>
            <h3 className="text-2xl sm:text-3xl font-bold">Trusted by Malawian Enterprises</h3>
            
            {/* Active Testimonial quote content */}
            <div className="space-y-4 pt-6 min-h-[160px] flex flex-col justify-center">
              <p className="text-base sm:text-lg text-neutral-300 italic leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div>
                <h4 className="font-extrabold text-white">{testimonials[activeTestimonial].author}</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {testimonials[activeTestimonial].role} • <span className="text-blue-500">{testimonials[activeTestimonial].project}</span>
                </p>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex justify-center items-center gap-4 pt-4">
              <button
                onClick={handlePrevTestimonial}
                className="p-2.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === idx ? 'w-6 bg-blue-500' : 'w-2 bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextTestimonial}
                className="p-2.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Regulatory & MERA Certifications section */}
        <div className="space-y-12 pb-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Verification</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Regulatory Compliance</h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              WHL GROUP is a fully compliant enterprise, licensed and regulated by MERA, MRA, CRIPC, NICC, and the Reserve Bank of Malawi (RBM).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div 
                key={cert.id} 
                onClick={() => setViewingCert(cert)}
                className="bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden cursor-pointer group hover:border-blue-500/50 transition-all"
              >
                <div className="aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                  <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-blue-500">{cert.type}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                      {cert.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition">{cert.title}</h4>
                  <div className="pt-2 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-500">
                    <span>Issued: {cert.issued}</span>
                    <span>Expires: {cert.expiry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {viewingCert && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
            <button 
              onClick={() => setViewingCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-neutral-800 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 aspect-[4/5] lg:aspect-auto bg-neutral-900">
                <img src={viewingCert.imageUrl} alt="Full Certificate" className="w-full h-full object-contain" />
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase font-extrabold text-blue-500 tracking-widest">MERA CERTIFIED</span>
                  <h3 className="text-2xl font-black text-white mt-1 leading-tight">{viewingCert.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Licence Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-bold text-white uppercase tracking-wider">{viewingCert.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 text-center">
                      <span className="text-[9px] uppercase font-bold text-neutral-500 block">Issued</span>
                      <span className="text-xs font-bold text-white">{viewingCert.issued}</span>
                    </div>
                    <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 text-center">
                      <span className="text-[9px] uppercase font-bold text-neutral-500 block">Expiry</span>
                      <span className="text-xs font-bold text-white">{viewingCert.expiry}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  This document serves as proof that WHL GROUP has been verified and cleared for {viewingCert.title} by the Malawi Energy Regulatory Authority.
                </p>

                <button 
                  onClick={() => setViewingCert(null)}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition shadow-xl shadow-blue-600/20 mt-auto"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
