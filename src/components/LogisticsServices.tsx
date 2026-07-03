import React, { useState } from 'react';
import { Truck, Navigation, Package, Home, ArrowRight, Search, CheckCircle, Clock } from 'lucide-react';

interface LogisticsServicesProps {
  onQuoteRequest: () => void;
}

export default function LogisticsServices({ onQuoteRequest }: LogisticsServicesProps) {
  // Tracker State
  const [trackingNumber, setTrackingNumber] = useState('WHL-7392-MW');
  const [foundStatus, setFoundStatus] = useState<any | null>({
    code: 'WHL-7392-MW',
    status: 'In Transit',
    currentLocation: 'Zomba Transit Hub',
    origin: 'Lilongwe Headquarters',
    destination: 'Blantyre Delivery Point',
    weight: '4.5 kg',
    carrier: 'WHL Van MW-081',
    estDelivery: 'Tomorrow, 4:00 PM',
    steps: [
      { title: 'Parcel Dispatched from Lilongwe Hub', time: 'Today, 8:30 AM', location: 'Lilongwe Headquarters', done: true },
      { title: 'Arrived at Dedza Inspection Checkpoint', time: 'Today, 11:15 AM', location: 'Dedza District', done: true },
      { title: 'In Transit to Zomba Hub', time: 'Today, 2:45 PM', location: 'Zomba District', done: true },
      { title: 'Out for Delivery / Last Mile Dispatch', time: 'Scheduled', location: 'Blantyre Delivery Point', done: false }
    ]
  });
  const [searched, setSearched] = useState(true);

  // Estimator State
  const [originCity, setOriginCity] = useState('Lilongwe');
  const [destCity, setDestCity] = useState('Blantyre');
  const [weightKg, setWeightKg] = useState(2);
  const [estimatedPrice, setEstimatedPrice] = useState(3800); // MWK

  // Quick Tracker Search
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setSearched(true);
    // Generate an authentic status path dynamically based on tracking number
    const randNum = Math.floor(Math.random() * 3);
    
    if (randNum === 0) {
      setFoundStatus({
        code: trackingNumber.toUpperCase(),
        status: 'Delivered',
        currentLocation: 'Blantyre Client Address',
        origin: 'Lilongwe Depot',
        destination: 'Blantyre Residence',
        weight: `${weightKg || 3} kg`,
        carrier: 'WHL Express MW-224',
        estDelivery: 'Delivered',
        steps: [
          { title: 'Package Dispatched', time: '2 Days Ago', location: 'Lilongwe Depot', done: true },
          { title: 'Sorting Center Clearance', time: '1 Day Ago', location: 'Salima Hub', done: true },
          { title: 'Out for Delivery', time: 'Today, 9:00 AM', location: 'Blantyre Center', done: true },
          { title: 'Successfully Delivered', time: 'Today, 11:30 AM', location: 'Blantyre Residence', done: true }
        ]
      });
    } else if (randNum === 1) {
      setFoundStatus({
        code: trackingNumber.toUpperCase(),
        status: 'In Transit',
        currentLocation: 'Ntcheu Transit Hub',
        origin: 'Mzuzu Depot',
        destination: 'Zomba Depot',
        weight: `${weightKg || 12} kg`,
        carrier: 'WHL Cargo MW-455',
        estDelivery: 'Today, 6:00 PM',
        steps: [
          { title: 'WHL Cargo Loaded & Inspected', time: 'Yesterday, 4:00 PM', location: 'Mzuzu Depot', done: true },
          { title: 'Departed Northern Region', time: 'Today, 6:00 AM', location: 'Kasungu District', done: true },
          { title: 'Mid-route Sorting', time: 'Today, 12:30 PM', location: 'Ntcheu Transit Hub', done: true },
          { title: 'Arrival at Zomba Office', time: 'Estimated', location: 'Zomba Depot', done: false }
        ]
      });
    } else {
      setFoundStatus({
        code: trackingNumber.toUpperCase(),
        status: 'Processing',
        currentLocation: 'Lilongwe Depot',
        origin: 'Lilongwe Depot',
        destination: 'Mzuzu Branch Office',
        weight: `1.2 kg`,
        carrier: 'Awaiting Carrier Assignment',
        estDelivery: 'In 3 Days',
        steps: [
          { title: 'Order Submitted & Paid', time: 'Today, 1:15 PM', location: 'Lilongwe Depot', done: true },
          { title: 'Awaiting Logistics Carrier Scheduling', time: 'In Progress', location: 'Lilongwe Depot', done: false }
        ]
      });
    }
  };

  // Quick Price Estimator Calculation
  const handleEstimateCalculate = () => {
    let basePrice = 2500; // base MWK
    if (originCity !== destCity) {
      basePrice += 1800; // intercity surcharge
    }
    basePrice += weightKg * 600; // scale based on weight
    setEstimatedPrice(basePrice);
  };

  const logisticsServices = [
    {
      icon: Navigation,
      title: 'Express Inter-City Courier',
      desc: 'Same-day and next-day scheduled document, envelope, and parcel courier services linking Lilongwe, Blantyre, Mzuzu, Zomba, and lakeside regions.'
    },
    {
      icon: Truck,
      title: 'Heavy Freight & Bulk Cargo',
      desc: 'High-payload commercial transport fleet of flatbeds and closed box-trucks, handling bulk industrial imports, agricultural produce, and solar batteries.'
    },
    {
      icon: Package,
      title: 'Corporate Warehousing',
      desc: 'Temperature-controlled, secure modern warehouse facilities in Lilongwe & Blantyre offering short-term, long-term inventory storage and distribution.'
    },
    {
      icon: Home,
      title: 'E-commerce & Last-Mile',
      desc: 'Seamless direct delivery for online merchants, digital retailers, and cash-on-delivery logistics. We match physical stores with domestic shipping.'
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8 lg:px-12">
        
        {/* Header section */}
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
            WHL Logistics & Express
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Reliable Nationwide Courier & Cargo
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            Linking communities and powering business supply chains. WHL Logistics provides fully trackable, safe, and expedited deliveries across every district in Malawi.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {logisticsServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-800 transition group">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl inline-block group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white">{service.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{service.desc}</p>
                </div>
                <button 
                  onClick={onQuoteRequest}
                  className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 font-semibold mt-6 group-hover:translate-x-1 transition duration-200"
                >
                  Book Courier Service <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Tracker Widget & Courier rate estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Shipment Tracker (Left side) */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Live Delivery Radar</span>
                <h3 className="text-2xl font-bold text-white mt-1">Interactive Package Tracker</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Type your logistics tracking ID code to verify real-time transport logs. (Sample ID: WHL-7392-MW)
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleTrackSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. WHL-7392-MW"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                >
                  Locate
                </button>
              </form>
            </div>

            {/* Tracker Details Results */}
            {searched && foundStatus && (
              <div className="mt-6 bg-neutral-900 border border-neutral-850 rounded-2xl p-4 md:p-6 space-y-6">
                
                {/* Upper stats summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-neutral-800 pb-4 text-xs">
                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[9px]">Tracking ID</span>
                    <span className="text-white font-bold tracking-wider font-mono">{foundStatus.code}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[9px]">Delivery Status</span>
                    <span className={`font-bold inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${
                      foundStatus.status === 'Delivered' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : foundStatus.status === 'In Transit' 
                        ? 'bg-blue-500/10 text-blue-500' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      <Clock className="w-3 h-3" /> {foundStatus.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[9px]">Courier Vehicle</span>
                    <span className="text-white font-bold">{foundStatus.carrier}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[9px]">Est. Arrival</span>
                    <span className="text-white font-bold text-blue-500">{foundStatus.estDelivery}</span>
                  </div>
                </div>

                {/* Tracking Progress Steps */}
                <div className="space-y-6">
                  {foundStatus.steps.map((step: any, i: number) => (
                    <div key={i} className="flex gap-4 relative">
                      {/* Connection Line */}
                      {i < foundStatus.steps.length - 1 && (
                        <div className={`absolute left-3 top-6 w-0.5 h-12 ${step.done ? 'bg-blue-600' : 'bg-neutral-800'}`} />
                      )}
                      {/* Circle Dot Icon */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.done 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-neutral-800 text-neutral-600 border border-neutral-700'
                      }`}>
                        {step.done ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-neutral-600" />}
                      </div>
                      {/* Step Details */}
                      <div>
                        <h4 className={`text-xs font-bold ${step.done ? 'text-white' : 'text-neutral-500'}`}>
                          {step.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1">
                          <span>{step.time}</span>
                          <span>•</span>
                          <span className="text-blue-500">{step.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* Courier Rate Estimator (Right side) */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Calculator</span>
                <h3 className="text-2xl font-bold text-white mt-1">Courier Rate Estimator</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Choose origin, destination, and weight to calculate delivery cost estimation.
                </p>
              </div>

              <div className="space-y-4">
                {/* Origin Selection */}
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-400 mb-1.5 block">Origin City</label>
                  <select
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>Lilongwe</option>
                    <option>Blantyre</option>
                    <option>Mzuzu</option>
                    <option>Zomba</option>
                    <option>Mangochi</option>
                  </select>
                </div>

                {/* Destination Selection */}
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-400 mb-1.5 block">Destination City</label>
                  <select
                    value={destCity}
                    onChange={(e) => setDestCity(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>Blantyre</option>
                    <option>Lilongwe</option>
                    <option>Mzuzu</option>
                    <option>Zomba</option>
                    <option>Mangochi</option>
                  </select>
                </div>

                {/* Weight Input slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-neutral-400 mb-1.5">
                    <span>Package Weight</span>
                    <span className="text-blue-500 font-extrabold">{weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Price Output */}
            <div className="mt-8 pt-6 border-t border-neutral-900 space-y-4">
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase font-bold block">Estimated Delivery cost</span>
                  <span className="text-lg font-black text-blue-500 mt-0.5 inline-block">
                    MWK {(estimatedPrice || 3800).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleEstimateCalculate}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs text-white font-bold rounded-lg transition"
                >
                  Recalculate
                </button>
              </div>

              <button
                onClick={onQuoteRequest}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                Book This Shipment
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
