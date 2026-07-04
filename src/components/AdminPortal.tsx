import React, { useState, useCallback } from 'react';
import { 
  ShoppingBag, 
  FileText, 
  CheckCircle, 
  Eye, 
  X, 
  ArrowLeft,
  Package,
  Plus,
  Trash2,
  Edit2,
  LayoutGrid,
  MessageSquareQuote,
  Users,
  Download,
  Loader2,
  Landmark,
  ExternalLink
} from 'lucide-react';
import { uploadFile } from '../lib/supabase';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: any[];
  quotes: any[];
  loans: any[];
  certificates: any[];
  onAddCert: (cert: any) => void;
  onRemoveCert: (id: string) => void;
  onEditCert: (cert: any) => void;
  onUpdateOrderStatus: (id: string, status: string) => void;
  onUpdateQuoteStatus: (id: string, status: string) => void;
  onUpdateLoanStatus: (id: string, status: string) => void;
  products: any[];
  onAddProduct: (p: any) => void;
  onRemoveProduct: (id: string) => void;
  projects: any[];
  onAddProject: (p: any) => void;
  onRemoveProject: (id: string) => void;
  testimonials: any[];
  onApproveTestimonial: (id: string) => void;
  onRemoveTestimonial: (id: string) => void;
  leadership: any[];
  onAddLeadership: (m: any) => void;
  onRemoveLeadership: (id: string) => void;
}

/**
 * Reusable Image Upload Component for the Admin Forms
 */
const ImageUploadField = ({ onUpload, label, folder, value }: { onUpload: (url: string) => void, label: string, folder: string, value: string }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadFile(file, 'whl-assets', folder);
    setUploading(false);

    if (url) onUpload(url);
    else alert('Upload failed. Please ensure your Supabase bucket "whl-assets" is created and public.');
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-bold text-neutral-500">{label}</label>
      <div className="flex gap-2">
        <div className="relative h-11 bg-black border border-neutral-800 rounded-xl overflow-hidden group hover:border-blue-500 transition-all flex items-center px-3 shrink-0">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          ) : (
            <>
              <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <Plus className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            </>
          )}
        </div>
        <input 
          type="text" 
          placeholder="Or paste URL here..."
          value={value}
          onChange={(e) => onUpload(e.target.value)}
          className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  );
};

export default function AdminPortal({ 
  isOpen, onClose, 
  orders = [], quotes = [], loans = [], certificates = [], onAddCert, onRemoveCert, onEditCert, onUpdateOrderStatus, onUpdateQuoteStatus, onUpdateLoanStatus,
  products = [], onAddProduct, onRemoveProduct,
  projects = [], onAddProject, onRemoveProject,
  testimonials = [], onApproveTestimonial, onRemoveTestimonial,
  leadership = [], onAddLeadership, onRemoveLeadership
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'loans' | 'inventory' | 'certificates' | 'projects' | 'feedback' | 'leadership'>('orders');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Form States
  const [newCert, setNewCert] = useState({ title: '', type: '', issued: '', expiry: '', imageUrl: '' });
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Solar Power', price: 0, image: '', description: '' });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category: 'Solar Clean Energy', location: '', date: '', image: '', description: '' });
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', image: '', bio: '' });
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'WHL2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect Management Password');
      setPassword('');
    }
  };

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setPassword('');
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-3xl animate-scale-up">
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center italic font-bold text-2xl mx-auto shadow-lg shadow-blue-500/20">⚡</div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">WHL Portal</h2>
            <p className="text-[10px] text-neutral-500 uppercase font-black tracking-[0.2em]">Authorized Access Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-4 text-center text-sm text-white focus:border-blue-500 outline-none transition-all"
              />
              {loginError && <p className="text-red-500 text-[10px] font-bold text-center animate-pulse uppercase tracking-wider">{loginError}</p>}
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition shadow-xl shadow-blue-600/20">Access Dashboard</button>
            <button type="button" onClick={onClose} className="w-full py-2 text-neutral-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition">Cancel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-neutral-950 flex flex-col md:flex-row overflow-hidden text-white animate-fade-in">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-neutral-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center italic font-bold shadow-lg">⚡</div>
          <span className="font-black text-sm tracking-widest uppercase">WHL Ops</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'orders', label: 'Orders & POP', icon: ShoppingBag },
            { id: 'loans', label: 'Loan Desk', icon: Landmark },
            { id: 'quotes', label: 'Service Quotes', icon: FileText },
            { id: 'inventory', label: 'Shop Inventory', icon: Package },
            { id: 'projects', label: 'Projects Hub', icon: LayoutGrid },
            { id: 'leadership', label: 'Team Leaders', icon: Users },
            { id: 'certificates', label: 'Compliance', icon: CheckCircle },
            { id: 'feedback', label: 'User Feedback', icon: MessageSquareQuote },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-800'}`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition duration-300">
            <ArrowLeft className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-black">
        <div className="flex-1 overflow-y-auto p-6 md:p-10 min-h-0 custom-scrollbar space-y-10">
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-black uppercase tracking-widest text-white">Client Orders</h3>
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-neutral-800/50 border-b border-neutral-800">
                    <tr><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">Order ID</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">Customer</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500 text-center">Verify</th></tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/50">
                    {orders.length === 0 ? (
                       <tr><td colSpan={3} className="px-6 py-20 text-center text-neutral-600 font-bold">No active orders.</td></tr>
                    ) : (
                      orders.map(o => (
                        <tr key={o.id} className="hover:bg-blue-600/5 transition-colors group">
                          <td className="px-6 py-4 font-mono font-bold text-blue-500">{o.id}</td>
                          <td className="px-6 py-4 font-bold text-neutral-200">{o.customer}</td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => setSelectedOrder(o)} className="p-2.5 bg-neutral-800 group-hover:bg-blue-600 rounded-xl transition-all transform group-hover:scale-110">
                              <Eye className="w-4 h-4 text-white" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* QUOTES TAB */}
          {activeTab === 'quotes' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-black uppercase tracking-widest text-white">Service Inquiries</h3>
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-neutral-800/50 border-b border-neutral-800">
                    <tr><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">ID</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">Customer</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">Sector</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500 text-center">Action</th></tr>
                  </thead>
                  <tbody>
                    {quotes.length === 0 ? (
                       <tr><td colSpan={4} className="px-6 py-20 text-center text-neutral-600 font-bold italic">Inquiry log is currently empty.</td></tr>
                    ) : (
                      quotes.map(q => (
                        <tr key={q.id} className="hover:bg-blue-600/5 transition-colors border-b border-neutral-800/50">
                          <td className="px-6 py-4 font-mono font-bold text-blue-500">{q.id}</td>
                          <td className="px-6 py-4 text-white font-bold">{q.customer}</td>
                          <td className="px-6 py-4 text-neutral-400 font-medium">{q.service}</td>
                          <td className="px-6 py-4 text-center"><button onClick={() => onUpdateQuoteStatus(q.id, 'Processed')} className="px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all">Process</button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LOANS TAB */}
          {activeTab === 'loans' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h3 className="text-xl font-black uppercase tracking-widest text-white">Loan Management Desk</h3>
                    <p className="text-xs text-neutral-500 font-bold uppercase mt-1">Pending, Approved & Active Credits</p>
                 </div>
                 <a 
                  href="https://docs.google.com/spreadsheets/d/1R6Re_5CvkqrsiRyC9fGEBdoxGZ0ab-GqohCTqta8ZJo/edit?gid=0#gid=0"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl group"
                 >
                   <ExternalLink className="w-4 h-4 text-blue-500" />
                   View Master Google Sheet
                 </a>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-neutral-800/50 border-b border-neutral-800">
                      <tr><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">Applicant</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">ID / Employment</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">Amount</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500">Status</th><th className="px-6 py-5 text-[10px] uppercase font-bold text-neutral-500 text-center">Approve</th></tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/50">
                      {loans.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-20 text-center text-neutral-600 font-bold italic">No active loan requests.</td></tr>
                      ) : (
                        loans.map(ln => (
                          <tr key={ln.id} className="hover:bg-blue-600/5 transition-colors">
                            <td className="px-6 py-4 font-bold text-white">{ln.customer}</td>
                            <td className="px-6 py-4 text-neutral-400 text-xs">{ln.details?.idNumber || 'N/A'}</td>
                            <td className="px-6 py-4 font-black text-emerald-500">MWK {ln.details?.loanAmount?.toLocaleString()}</td>
                            <td className="px-6 py-4">
                               <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${ln.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : ln.status === 'Active' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                  {ln.status}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                               {ln.status === 'New' && (
                                 <button 
                                  onClick={() => onUpdateLoanStatus(ln.id, 'Approved')}
                                  className="px-4 py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                 >
                                   Approve
                                 </button>
                               )}
                               {ln.status === 'Approved' && (
                                 <button 
                                  onClick={() => onUpdateLoanStatus(ln.id, 'Active')}
                                  className="px-4 py-2 bg-emerald-600 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-700 transition-all shadow-lg"
                                 >
                                   Disburse
                                 </button>
                               )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                 </table>
              </div>
            </div>
          )}

          {/* INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-widest text-white">Shop Stock</h3>
                <button onClick={() => setIsAddingProduct(true)} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg transition-all"><Plus className="w-4 h-4" /> Add Item</button>
              </div>
              {isAddingProduct && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 animate-slide-up shadow-2xl">
                   <div className="flex justify-between items-center"><h4 className="font-bold text-sm uppercase text-blue-500">New Product</h4><button onClick={() => setIsAddingProduct(false)}><X className="w-4 h-4" /></button></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                     <input type="number" placeholder="Price (USD)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                     <ImageUploadField label="Product Image" folder="shop" value={newProduct.image} onUpload={(url) => setNewProduct({...newProduct, image: url})} />
                     <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none h-[48px] self-end">
                        <option>Solar Power</option><option>Wiring & Cables</option><option>Power Accessories</option><option>Safety Gear</option>
                     </select>
                     <div className="md:col-span-2">
                        <textarea placeholder="Product Description..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-2xl px-5 py-4 text-xs text-white h-32 outline-none resize-none" />
                     </div>
                   </div>
                   <button onClick={() => {onAddProduct({...newProduct, id: Date.now().toString()}); setIsAddingProduct(false);}} className="w-full py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase shadow-xl transition-all">Save Product</button>
                </div>
              )}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <tbody>
                    {products.length === 0 ? (
                       <tr><td colSpan={2} className="px-6 py-20 text-center text-neutral-600 font-bold italic">Retail shop is currently empty.</td></tr>
                    ) : (
                      products.map(p => (
                        <tr key={p.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{p.name}</td>
                          <td className="px-6 py-4 text-right"><button onClick={() => onRemoveProduct(p.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-widest text-white">Projects Hub</h3>
                <button onClick={() => setIsAddingProject(true)} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg transition-all"><Plus className="w-4 h-4" /> Add Case Study</button>
              </div>
              {isAddingProject && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 animate-slide-up shadow-2xl">
                   <div className="flex justify-between items-center"><h4 className="font-bold text-sm uppercase text-blue-500">New Portfolio Listing</h4><button onClick={() => setIsAddingProject(false)}><X className="w-4 h-4" /></button></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                      <input type="text" placeholder="Location" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                      <ImageUploadField label="Case Study Cover" folder="projects" value={newProject.image} onUpload={(url) => setNewProject({...newProject, image: url})} />
                      <input type="text" placeholder="Date (e.g. June 2026)" value={newProject.date} onChange={e => setNewProject({...newProject, date: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white outline-none self-end h-[48px]" />
                      <div className="md:col-span-2">
                        <textarea placeholder="Technical Project Summary & Impact..." value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-2xl px-5 py-4 text-xs text-white h-32 outline-none resize-none focus:border-blue-500" />
                      </div>
                   </div>
                   <button onClick={() => {onAddProject({...newProject, id: Date.now().toString()}); setIsAddingProject(false); setNewProject({ title: '', category: 'Solar Clean Energy', location: '', date: '', image: '', description: '' });}} className="w-full py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase shadow-xl transition-all">Publish Project</button>
                </div>
              )}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <tbody>
                    {projects.length === 0 ? (
                       <tr><td colSpan={2} className="px-6 py-20 text-center text-neutral-600 font-bold">No projects added yet.</td></tr>
                    ) : (
                      projects.map(p => (
                        <tr key={p.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{p.title}</td>
                          <td className="px-6 py-4 text-right"><button onClick={() => onRemoveProject(p.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* COMPLIANCE TAB */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-widest text-white">Compliance Certs</h3>
                <button onClick={() => { setEditingCertId(null); setNewCert({ title: '', type: '', issued: '', expiry: '', imageUrl: '' }); setIsAddingCert(true); }} className="px-5 py-2.5 bg-blue-600 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg"><Plus className="w-4 h-4" /> Add Cert</button>
              </div>
              {isAddingCert && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 animate-slide-up shadow-2xl">
                   <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm uppercase text-blue-500">{editingCertId ? 'Update Cert' : 'New Compliance Record'}</h4>
                      <button onClick={() => setIsAddingCert(false)}><X className="w-4 h-4" /></button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input type="text" placeholder="Title" value={newCert.title} onChange={e => setNewCert({...newCert, title: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                      <input type="text" placeholder="Type" value={newCert.type} onChange={e => setNewCert({...newCert, type: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                      <input type="date" value={newCert.issued} onChange={e => setNewCert({...newCert, issued: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                      <input type="date" value={newCert.expiry} onChange={e => setNewCert({...newCert, expiry: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white focus:border-blue-500 outline-none" />
                      <div className="md:col-span-2">
                        <ImageUploadField 
                          label="Official License Image" 
                          folder="certificates" 
                          value={newCert.imageUrl} 
                          onUpload={(url) => setNewCert({...newCert, imageUrl: url})} 
                        />
                        <p className="text-[9px] text-neutral-600 mt-1 italic">Suggested: /images/certificates/filename.jpg</p>
                      </div>
                   </div>
                   <button onClick={() => { if (editingCertId) { onEditCert({...newCert, id: editingCertId, status: 'Active'}); } else { onAddCert({...newCert, id: Date.now().toString(), status: 'Active'}); } setIsAddingCert(false); setEditingCertId(null); setNewCert({ title: '', type: '', issued: '', expiry: '', imageUrl: '' }); }} className="w-full py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-blue-600/30">Save Compliance</button>
                </div>
              )}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <tbody>
                    {certificates.map(c => (
                      <tr key={c.id} className="hover:bg-blue-600/5 transition-colors border-b border-neutral-800/50">
                        <td className="px-6 py-4 font-bold text-white">{c.title}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                             <button onClick={() => { setEditingCertId(c.id); setNewCert({ title: c.title, type: c.type, issued: c.issued, expiry: c.expiry, imageUrl: c.imageUrl }); setIsAddingCert(true); }} className="p-2 bg-neutral-800 hover:bg-blue-600 rounded-xl transition-all"><Edit2 className="w-4 h-4 text-white" /></button>
                             <button onClick={() => onRemoveCert(c.id)} className="p-2 bg-neutral-800 hover:bg-red-500 rounded-xl transition-all"><Trash2 className="w-4 h-4 text-white" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-black uppercase tracking-widest text-white">User Testimonials</h3>
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-neutral-800/50 border-b border-neutral-800"><tr className="tracking-widest font-black text-neutral-500 text-[10px] uppercase"><th className="px-6 py-5">User</th><th className="px-6 py-5 text-center">Action</th></tr></thead>
                   <tbody className="divide-y divide-neutral-800/50">
                    {testimonials.map(t => (
                      <tr key={t.id} className="hover:bg-blue-600/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{t.author}</td>
                        <td className="px-6 py-4 text-center"><div className="flex justify-center gap-3">{!t.approved && <button onClick={() => onApproveTestimonial(t.id)} className="px-4 py-2 bg-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest">Publish</button>}<button onClick={() => onRemoveTestimonial(t.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LEADERSHIP TAB */}
          {activeTab === 'leadership' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-widest text-white">WHL Board</h3>
                <button onClick={() => setIsAddingMember(true)} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all"><Plus className="w-4 h-4" /> Add Leader</button>
              </div>
              {isAddingMember && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 shadow-2xl">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input type="text" placeholder="Full Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white outline-none focus:border-blue-500" />
                      <input type="text" placeholder="Role" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} className="bg-black border border-neutral-800 rounded-2xl px-5 py-3 text-xs text-white outline-none focus:border-blue-500" />
                      <ImageUploadField label="Leader Portrait" folder="team" value={newMember.image} onUpload={(url) => setNewMember({...newMember, image: url})} />
                      <div className="md:col-span-2"><textarea placeholder="Professional Bio & Background..." value={newMember.bio} onChange={e => setNewMember({...newMember, bio: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-2xl px-5 py-4 text-xs text-white h-32 resize-none outline-none focus:border-blue-500" /></div>
                   </div>
                   <button onClick={() => {onAddLeadership({...newMember, id: Date.now().toString()}); setIsAddingMember(false); setNewMember({ name: '', role: '', image: '', bio: '' });}} className="w-full py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all">Commit to Board</button>
                </div>
              )}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <tbody>
                    {leadership.map(m => (
                      <tr key={m.id} className="hover:bg-blue-600/5 transition-colors border-b border-neutral-800/50">
                        <td className="px-6 py-4 font-bold text-white">{m.name}</td>
                        <td className="px-6 py-4 text-right"><button onClick={() => onRemoveLeadership(m.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Order Side-Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[70] md:relative md:inset-auto md:w-[500px] bg-neutral-900 border-l border-neutral-800 flex flex-col overflow-hidden animate-slide-left shadow-3xl">
           <div className="p-8 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-widest">Verification Desk</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-neutral-800 rounded-full transition-all"><X className="w-6 h-6" /></button>
           </div>
           <div className="flex-1 overflow-y-auto p-8 space-y-8 min-h-0 custom-scrollbar">
              <div className="p-6 bg-black border border-neutral-800 rounded-3xl space-y-4 shadow-inner">
                <div className="flex justify-between font-black text-blue-500 text-sm uppercase tracking-widest border-b border-neutral-900 pb-3"><span>Reference:</span><span>{selectedOrder.confCode}</span></div>
                <div className="flex justify-between text-xs text-neutral-400 font-bold uppercase tracking-wider"><span>Payment Method:</span><span className="text-white">{selectedOrder.method}</span></div>
                <div className="flex justify-between text-xs text-neutral-400 font-bold uppercase tracking-wider"><span>Order Value:</span><span className="text-emerald-500 font-black">${selectedOrder.total}</span></div>
              </div>
              <div className="space-y-3">
                 <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] ml-2">Bank Proof Image</span>
                 <div className="rounded-3xl overflow-hidden border-2 border-neutral-800 aspect-video shadow-2xl group relative"><img src={selectedOrder.popUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                 <button className="w-full py-3 text-[10px] font-black uppercase text-blue-500 hover:tracking-[0.2em] transition-all flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Download Official POP</button>
              </div>
           </div>
           <div className="p-8 border-t border-neutral-800 bg-neutral-900/50 space-y-3">
              <button onClick={() => {onUpdateOrderStatus(selectedOrder.id, 'Verified'); setSelectedOrder(null);}} className="w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all">Verify & Approve Transaction</button>
              <button onClick={() => setSelectedOrder(null)} className="w-full py-4 text-neutral-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Hold for Review</button>
           </div>
        </div>
      )}
    </div>
  );
}
