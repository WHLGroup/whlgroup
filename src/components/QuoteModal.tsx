import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Shield, Send, CheckCircle } from 'lucide-react';
import { getFlagFromCode } from '../utils/flags';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuoteSubmit: (quote: any) => void;
}

export default function QuoteModal({ isOpen, onClose, onQuoteSubmit }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<'electrical' | 'logistics' | 'microfinance' | ''>('');
  const districts = [
    'Balaka', 'Blantyre', 'Chikwawa', 'Chiradzulu', 'Chitipa', 'Dedza', 'Dowa', 'Karonga', 
    'Kasungu', 'Likoma', 'Lilongwe', 'Machinga', 'Mangochi', 'Mchinji', 'Mulanje', 'Mwanza', 
    'Mzimba', 'Neno', 'Nkhata Bay', 'Nkhotakota', 'Nsanje', 'Ntcheu', 'Ntchisi', 'Phalombe', 
    'Rumphi', 'Salima', 'Thyolo', 'Zomba'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+',
    company: '',
    location: 'Blantyre',
    idNumber: '',
    employmentNumber: '',
    witnessName: '',
    witnessPhone: '+',
    // Electrical specifics
    electricalType: 'Solar Installation',
    energyNeed: 'Residential (3kW - 5kW)',
    propertySize: '',
    // Logistics specifics
    logisticsType: 'Express Courier',
    weight: '',
    origin: 'Blantyre',
    destination: 'Lilongwe',
    // Microfinance specifics
    loanType: 'Personal Loan',
    loanAmount: '100000',
    duration: '6 Months',
    additionalDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelect = (type: 'electrical' | 'logistics' | 'microfinance') => {
    setServiceType(type);
    setStep(2);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) {
      if (step === 2) {
        setServiceType('');
      }
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onQuoteSubmit({
        id: `QT-${Math.floor(100 + Math.random() * 900)}`,
        customer: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: serviceType === 'electrical' ? 'Electrical' : serviceType === 'logistics' ? 'Logistics' : 'Microfinance',
        date: new Date().toLocaleString(),
        status: 'New'
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setServiceType('');
    setFormData({
      name: '',
      email: '',
      phone: '+',
      company: '',
      location: 'Blantyre',
      idNumber: '',
      employmentNumber: '',
      witnessName: '',
      witnessPhone: '+',
      electricalType: 'Solar Installation',
      energyNeed: 'Residential (3kW - 5kW)',
      propertySize: '',
      logisticsType: 'Express Courier',
      weight: '',
      origin: 'Blantyre',
      destination: 'Lilongwe',
      loanType: 'Personal Loan',
      loanAmount: '100000',
      duration: '6 Months',
      additionalDetails: ''
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl w-[95vw] overflow-hidden border bg-neutral-900 border-neutral-800 rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute p-2 transition-colors rounded-full top-4 right-4 text-neutral-400 hover:text-white hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        {!submitted && (
          <div className="h-1 bg-neutral-800">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        <div className="p-4 md:p-10 h-[80dvh] overflow-y-auto custom-scrollbar">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center p-3 mb-6 bg-blue-500/10 text-blue-500 rounded-full">
                <CheckCircle className="w-16 h-16 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quote Request Submitted!</h3>
              <p className="text-neutral-400 max-w-md mx-auto mb-6">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. One of our specialists from WHL GROUP will contact you within 2-4 hours with a customized proposal.
              </p>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 max-w-sm mx-auto mb-8 text-left text-sm text-neutral-400">
                <div className="flex justify-between border-b border-neutral-800 pb-2 mb-2">
                  <span>Reference ID:</span>
                  <span className="text-blue-500 font-mono">WHL-Q-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Type:</span>
                  <span className="text-white capitalize">{serviceType} Services</span>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">WHL GROUP</span>
                <h2 className="text-2xl font-bold text-white mt-1">Request a Custom Quote</h2>
                <p className="text-sm text-neutral-400 mt-1">
                  {step === 1 && 'Select the service sector you want to inquire about.'}
                  {step === 2 && `Provide specific details for your ${serviceType} request.`}
                  {step === 3 && 'Enter your contact credentials to finalize the request.'}
                </p>
              </div>

              {/* Step 1: Select Service Type */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div
                    onClick={() => handleServiceSelect('electrical')}
                    className="p-6 bg-neutral-950 hover:bg-blue-950/20 border border-neutral-800 hover:border-blue-500/50 rounded-2xl cursor-pointer transition group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      ⚡
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">Electrical Services</h3>
                    <p className="text-xs text-neutral-400 mt-2">
                      Solar power installations, industrial power audits, wiring, backup generator systems, and expert engineering.
                    </p>
                  </div>

                  <div
                    onClick={() => handleServiceSelect('logistics')}
                    className="p-6 bg-neutral-950 hover:bg-blue-950/20 border border-neutral-800 hover:border-blue-500/50 rounded-2xl cursor-pointer transition group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      🚚
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">Logistics & Courier</h3>
                    <p className="text-xs text-neutral-400 mt-2">
                      Express courier parcel deliveries and nationwide cargo freight.
                    </p>
                  </div>

                  <div
                    onClick={() => handleServiceSelect('microfinance')}
                    className="p-6 bg-neutral-950 hover:bg-blue-950/20 border border-neutral-800 hover:border-blue-500/50 rounded-2xl cursor-pointer transition group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      🏦
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">Microfinance</h3>
                    <p className="text-xs text-neutral-400 mt-2">
                      Fast payday, personal, and business loans for growth.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Service Details */}
              {step === 2 && serviceType === 'electrical' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Category</label>
                      <select
                        name="electricalType"
                        value={formData.electricalType}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      >
                        <option>Solar Installation</option>
                        <option>Industrial Wiring & Cabling</option>
                        <option>Generator Sales & Support</option>
                        <option>Power Quality Audit</option>
                        <option>Preventative Maintenance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Energy Need / Scale</label>
                      <select
                        name="energyNeed"
                        value={formData.energyNeed}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      >
                        <option>Residential (3kW - 5kW)</option>
                        <option>Commercial Office (10kW - 50kW)</option>
                        <option>Industrial Plant (100kW+)</option>
                        <option>Backup Battery Storage Only</option>
                        <option>Custom Engineering Consult</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Property Size or Description</label>
                    <input
                      type="text"
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleChange}
                      placeholder="e.g. 4 Bedroom House, Warehouse Facility, Retail Store"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Additional Instructions</label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Share details about roof type, current electric bill, or any specifications..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 2 && serviceType === 'logistics' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Service Selection</label>
                      <select
                        name="logisticsType"
                        value={formData.logisticsType}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      >
                        <option>Express Courier (Documents/Envelopes)</option>
                        <option>Parcel Delivery (Box packages)</option>
                        <option>Full Truck Load (FTL) Cargo</option>
                        <option>Warehousing & Storage Space</option>
                        <option>Last Mile Retail Logistics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Estimated Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Origin City (Malawi)</label>
                      <select
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      >
                        <option>Lilongwe</option>
                        <option>Blantyre</option>
                        <option>Mzuzu</option>
                        <option>Zomba</option>
                        <option>Mangochi</option>
                        <option>Kasungu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Destination City</label>
                      <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      >
                        <option>Blantyre</option>
                        <option>Lilongwe</option>
                        <option>Mzuzu</option>
                        <option>Zomba</option>
                        <option>Mangochi</option>
                        <option>Salima</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Item Description / Instructions</label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe what items you are shipping, dimensions, fragility, or warehousing terms..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 2 && serviceType === 'microfinance' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Loan Category</label>
                      <select
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      >
                        <option>Personal Loan</option>
                        <option>Payday Loan (Salaried)</option>
                        <option>SME Business Growth Loan</option>
                        <option>Emergency Cash Advance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Requested Amount (MWK)</label>
                      <input
                        type="number"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder="e.g. 500000"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">National ID Number</label>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        placeholder="ID Card Number"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Employment No. (If Salaried)</label>
                      <input
                        type="text"
                        name="employmentNumber"
                        value={formData.employmentNumber}
                        onChange={handleChange}
                        placeholder="Employee Code"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Repayment Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                    >
                      <option>1 Month (Quick Bridge)</option>
                      <option>3 Months</option>
                      <option>6 Months</option>
                      <option>12 Months</option>
                      <option>24 Months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Purpose of Loan / Additional Notes</label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Share details about what you need the funds for or your employer details..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact Credentials */}
              {step === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Banda"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Phone Number *</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 z-10 flex items-center gap-2 pointer-events-none">
                          <span className="text-lg leading-none">{getFlagFromCode(formData.phone)}</span>
                          <div className="w-px h-4 bg-neutral-800" />
                        </div>
                        <input
                          type="text"
                          name="phone"
                          required
                          pattern="^\+.*"
                          title="Phone number must start with a country code (e.g. +265)"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+265..."
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-16 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm font-mono tracking-wider"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Company Name (Optional)</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="WHL Enterprise"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">District (Malawi) *</label>
                      <select
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      >
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Witness Full Name *</label>
                      <input
                        type="text"
                        name="witnessName"
                        required
                        value={formData.witnessName}
                        onChange={handleChange}
                        placeholder="Witness Name"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Witness Phone Contact *</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 z-10 flex items-center gap-2 pointer-events-none">
                        <span className="text-lg leading-none">{getFlagFromCode(formData.witnessPhone)}</span>
                        <div className="w-px h-4 bg-neutral-800" />
                      </div>
                      <input
                        type="text"
                        name="witnessPhone"
                        required
                        pattern="^\+.*"
                        title="Phone number must start with a country code (e.g. +265)"
                        value={formData.witnessPhone}
                        onChange={handleChange}
                        placeholder="+265..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-16 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm font-mono tracking-wider"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                    <Shield className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Your data is protected and secured. We never share details with external parties.</span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  serviceType ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-500/20"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
