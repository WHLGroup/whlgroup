import { useState } from 'react';
import { Landmark, Wallet, Banknote, ShieldCheck, ArrowRight, Info, Calculator, Percent } from 'lucide-react';

interface MicrofinanceProps {
  onQuoteRequest: () => void;
}

export default function Microfinance({ onQuoteRequest }: MicrofinanceProps) {
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState(100000); // MWK
  const [duration, setDuration] = useState(3); // Months
  const interestRate = 0.05; // 5% flat for mock example

  const monthlyRepayment = (loanAmount + (loanAmount * interestRate * duration)) / duration;
  const totalRepayment = monthlyRepayment * duration;

  const loanProducts = [
    {
      icon: Wallet,
      title: 'Payday Loans',
      desc: 'Quick cash bridge for salaried employees. Get funded within 2 hours to handle emergencies before your next paycheck.',
      features: ['2-hour processing', 'No collateral for civil servants', 'Flexible repayments']
    },
    {
      icon: Landmark,
      title: 'Personal Loans',
      desc: 'Structured loans for major life events, home improvements, or school fees. Competitive rates with longer tenures.',
      features: ['Up to 24 months tenure', 'Competitive interest rates', 'Fast-track approval']
    },
    {
      icon: Banknote,
      title: 'SME Business Loans',
      desc: 'Empowering Malawian entrepreneurs. Growth capital for stock purchase, equipment, or operational expansion.',
      features: ['Business growth focus', 'Customized grace periods', 'Financial advisory included']
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
            WHL Financial Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Accessible Credit for Growth
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            WHL Microfinance provides fast, reliable, and ethical financial solutions to individuals and businesses across Malawi. We bridge the gap between your dreams and your reality.
          </p>
        </div>

        {/* Loan Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loanProducts.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div key={idx} className="bg-neutral-950 border border-neutral-900 rounded-3xl p-8 space-y-6 hover:border-blue-500/30 transition-all group">
                <div className="p-4 bg-blue-600/10 text-blue-500 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{product.desc}</p>
                </div>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-neutral-300 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onQuoteRequest}
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Loan Calculator */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Controls */}
            <div className="p-8 md:p-12 space-y-8 bg-neutral-900/30">
              <div>
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <Calculator className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Loan Estimator</span>
                </div>
                <h3 className="text-2xl font-bold">Calculate Your Loan</h3>
                <p className="text-xs text-neutral-500 mt-1">Adjust the sliders to see your estimated monthly repayment.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-400">
                    <span>Desired Loan Amount</span>
                    <span className="text-blue-500 text-sm">MWK {loanAmount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="50000" max="5000000" step="50000" 
                    value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-400">
                    <span>Repayment Duration</span>
                    <span className="text-blue-500 text-sm">{duration} Months</span>
                  </div>
                  <input 
                    type="range" min="1" max="24" step="1" 
                    value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-[10px] text-neutral-400">
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Final interest rates and terms depend on your financial assessment and employment status.</span>
              </div>
            </div>

            {/* Right: Results */}
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-8 bg-blue-600/5 border-l border-neutral-900">
              <div className="space-y-6">
                <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Estimated Monthly Pay</span>
                    <span className="text-3xl font-black text-white">MWK {Math.round(monthlyRepayment).toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <Percent className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-800">
                    <span className="text-[9px] uppercase font-bold text-neutral-500 block">Interest Rate</span>
                    <span className="text-sm font-bold">5% Flat / Month</span>
                  </div>
                  <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-800">
                    <span className="text-[9px] uppercase font-bold text-neutral-500 block">Total Repayment</span>
                    <span className="text-sm font-bold">MWK {Math.round(totalRepayment).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={onQuoteRequest}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition shadow-xl shadow-blue-600/20"
              >
                Start Loan Application
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
