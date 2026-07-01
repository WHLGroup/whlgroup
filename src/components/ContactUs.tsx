import { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface ContactUsProps {
  onQuoteRequest: () => void;
}

export default function ContactUs({ onQuoteRequest }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Electrical Inquiry',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const offices = [
    {
      city: 'Lilongwe (Headquarters)',
      address: 'Plot 47/312, Kanengo Bypass road, Lilongwe, Malawi',
      phone: '0991 807 100',
      email: 'hq.ll@whlgroup.mw'
    },
    {
      city: 'Blantyre (Southern Depot)',
      address: 'Makata Industrial Area, Sector 12, Blantyre, Malawi',
      phone: '0884 985 461',
      email: 'bt.depot@whlgroup.mw'
    },
    {
      city: 'Mzuzu (Northern Branch)',
      address: 'Airport Junction Road, Mzuzu, Malawi',
      phone: '0991 807 100',
      email: 'mz.branch@whlgroup.mw'
    }
  ];

  const faqs = [
    {
      q: 'Do you offer product warranty on solar panels and batteries?',
      a: 'Yes, absolutely. We source directly from tier-1 manufacturers. Our premium solar panels come with a 25-year performance warranty, and our lithium battery storage solutions carry a 3 to 5-year replacement warranty.'
    },
    {
      q: 'What is your inter-city delivery coverage timeline for courier parcels?',
      a: 'WHL Express courier routes between Lilongwe and Blantyre operate daily. Next-day delivery is guaranteed for documents and standard boxes under 30kg. For remote districts, delivery takes 48-72 hours.'
    },
    {
      q: 'Can I pay for retail items on delivery?',
      a: 'Yes, WHL Retail supports cash on delivery (CoD) and mobile money payments (Airtel Money, TNM Mpamba) upon verified parcel delivery at your selected destination.'
    },
    {
      q: 'Are your electrical installations certified by Regulatory authorities?',
      a: 'All our engineering works, wiring programs, and solar installations are fully compliant with MERA (Malawi Energy Regulatory Authority) guidelines and SANS electrical installation standards.'
    }
  ];

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'Electrical Inquiry', message: '' });
    }, 1200);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            How Can We Assist You?
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Have a project in mind, need courier transport rates, or purchasing hardware parts? Reach out to WHL GROUP. Our engineering and delivery terminals are ready to serve you.
          </p>
        </div>

        {/* Contact offices details and interactive map panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Physical Address Details list */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Our Physical Branches</h3>
            <div className="space-y-4">
              {offices.map((office, idx) => (
                <div key={idx} className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5 space-y-3 hover:border-neutral-850 transition">
                  <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
                    <h4 className="font-extrabold text-sm text-blue-500">{office.city}</h4>
                    <span className="text-[10px] text-neutral-500 font-bold uppercase">Malawi Branch</span>
                  </div>
                  
                  <div className="space-y-2 text-xs text-neutral-400">
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="font-bold text-white">{office.phone}</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="hover:text-white transition">{office.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Node diagram representation (Right side) */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[460px]">
            <div className="mb-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Node Grid</span>
              <h3 className="text-xl font-bold text-white">WHL Malawi Distribution Map</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Visualizing our engineering team bases and shipping routes across Lilongwe, Blantyre, and Mzuzu nodes.
              </p>
            </div>

            {/* Styled Map Graphic in SVG */}
            <div className="bg-neutral-900 rounded-2xl p-6 relative flex items-center justify-center border border-neutral-850 overflow-hidden flex-1">
              
              {/* Fake Background Roads/Grid lines */}
              <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-10 select-none pointer-events-none">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border-r border-neutral-500 h-full" />
                ))}
              </div>

              {/* Central Map Illustration with pins */}
              <div className="relative w-full max-w-[280px] h-[280px] flex items-center justify-center">
                
                {/* SVG Route lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none text-blue-500" viewBox="0 0 280 280">
                  {/* Route Northern Mzuzu -> Central Lilongwe */}
                  <line x1="140" y1="50" x2="110" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                  {/* Route Central Lilongwe -> Southern Blantyre */}
                  <line x1="110" y1="130" x2="170" y2="230" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                </svg>

                {/* Node: Mzuzu */}
                <div className="absolute top-[50px] left-[140px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20 border border-blue-500">
                    <span className="h-3 w-3 rounded-full bg-blue-500 animate-ping absolute" />
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold text-white bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800 mt-1">
                    Mzuzu Depot
                  </span>
                </div>

                {/* Node: Lilongwe */}
                <div className="absolute top-[130px] left-[110px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/30 border-2 border-blue-500">
                    <span className="h-4 w-4 rounded-full bg-blue-500 animate-ping absolute" />
                    <span className="h-3 w-3 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold text-white bg-neutral-950 px-2 py-0.5 rounded border border-neutral-850 mt-1">
                    Lilongwe HQ
                  </span>
                </div>

                {/* Node: Blantyre */}
                <div className="absolute top-[230px] left-[170px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20 border border-blue-500">
                    <span className="h-3 w-3 rounded-full bg-blue-500 animate-ping absolute" />
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold text-white bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800 mt-1">
                    Blantyre Depot
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Contact messages form and quick FAQs grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Message Form (Left) */}
          <div className="lg:col-span-6 bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-4">Send a Direct Message</h3>
            
            {sentSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Your communication has been securely sent. One of our service managers from WHL GROUP will reply shortly.
                </p>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-xs text-white rounded-lg hover:bg-neutral-850 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@domain.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase mb-1.5 block">Phone Contact</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0991 807 100"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase mb-1.5 block">Sector Focus</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Electrical Sizing & Engineering</option>
                      <option>Express Courier & Freight Solutions</option>
                      <option>WHL Retail Store Orders</option>
                      <option>Careers & Corporate Partners</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase mb-1.5 block">Detailed Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    placeholder="Provide details about your query..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 transition duration-300"
                >
                  {isSending ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick FAQs Accordion (Right) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex justify-between items-center font-bold text-xs sm:text-sm text-white hover:bg-neutral-900/50 transition duration-200"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 border-t border-neutral-900 bg-neutral-950/80 text-xs text-neutral-400 leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-blue-900/10 to-transparent p-5 rounded-2xl border border-blue-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
              <div>
                <h4 className="font-bold text-sm">Need a specialized proposal?</h4>
                <p className="text-xs text-neutral-400">Request detailed technical budgets through our builder.</p>
              </div>
              <button
                onClick={onQuoteRequest}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white rounded-lg shadow transition"
              >
                Get Sizing Quote
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
