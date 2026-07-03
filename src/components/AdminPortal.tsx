import { useState } from 'react';
import { 
  ShoppingBag, 
  FileText, 
  CheckCircle, 
  Search, 
  Eye, 
  X, 
  ArrowLeft,
  Package,
  Download,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: any[];
  quotes: any[];
  certificates: any[];
  onAddCert: (cert: any) => void;
  onRemoveCert: (id: string) => void;
  onEditCert: (cert: any) => void;
  onUpdateOrderStatus: (id: string, status: string) => void;
  onUpdateQuoteStatus: (id: string, status: string) => void;
}

export default function AdminPortal({ 
  isOpen, onClose, orders, quotes, certificates, onAddCert, onRemoveCert, onEditCert, onUpdateOrderStatus, onUpdateQuoteStatus 
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'inventory' | 'certificates'>('orders');
  const [newCert, setNewCert] = useState({ title: '', type: '', issued: '', expiry: '', imageUrl: '' });
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple secure password for WHL GROUP Management
    if (password === 'WHL2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Management Credentials');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    onClose();
  };

  // Login Screen UI
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl animate-scale-up">
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center italic font-bold text-2xl mx-auto shadow-lg shadow-blue-500/20">⚡</div>
            <div>
              <h2 className="text-2xl font-black text-white">Management Portal</h2>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mt-1">Authorized WHL Staff Only</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Access Password</label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
              {error && <p className="text-red-500 text-[10px] mt-2 font-bold">{error}</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-blue-500/20"
            >
              Sign In to Dashboard
            </button>
            
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-3 text-neutral-500 hover:text-white text-xs font-bold transition"
            >
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }





  return (
    <div className="fixed inset-0 z-[60] bg-neutral-950 flex flex-col md:flex-row overflow-hidden text-white">
      
      {/* Sidebar - Responsive (Hidden on mobile, or toggleable) */}
      <div className="w-full md:w-64 bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center italic font-bold">⚡</div>
            <span className="font-black text-sm tracking-widest">WHL ADMIN</span>
          </div>
          <button onClick={onClose} className="md:hidden p-2 text-neutral-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders & POP
          </button>
          <button 
            onClick={() => setActiveTab('quotes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${activeTab === 'quotes' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <FileText className="w-4 h-4" /> Service Quotes
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <Package className="w-4 h-4" /> Shop Inventory
          </button>
          <button 
            onClick={() => setActiveTab('certificates')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${activeTab === 'certificates' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            <CheckCircle className="w-4 h-4" /> MERA Certs
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-neutral-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition">
            <ArrowLeft className="w-4 h-4" /> Exit Portal
          </button>
        </div>
      </div>

      {/* Main Content Area - Scroll Responsive */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-black">
        
        {/* Top Header Stats */}
        <header className="p-6 md:p-8 bg-neutral-900/50 border-b border-neutral-900 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">Management Dashboard</h2>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mt-1">WHL GROUP OPERATIONS HUB</p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-center min-w-[100px]">
                <span className="text-blue-500 block font-black text-lg">12</span>
                <span className="text-[10px] text-neutral-500 uppercase font-bold">New Orders</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-center min-w-[100px]">
                <span className="text-emerald-500 block font-black text-lg">5</span>
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Unverified POP</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Body - THIS SECTION SCROLLS */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 min-h-0 custom-scrollbar">
          
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-bold">Recent Orders & Bank Payments</h3>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="text" 
                    placeholder="Search Order ID or Customer..."
                    className="bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 w-full md:w-64"
                  />
                </div>
              </div>

              {/* Table Wrapper for Horizontal Scroll on Mobile */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-x-auto shadow-2xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-neutral-900 bg-neutral-900/30">
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Order ID</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Customer</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Amount</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Verification</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-900/40 transition">
                        <td className="px-6 py-4 font-mono font-bold text-blue-500">{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{order.customer}</div>
                          <div className="text-[10px] text-neutral-500">{order.date}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-white leading-none">${order.total.toFixed(2)}</div>
                          <div className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">MK {(order.total * 2500).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${order.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-blue-500 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-bold">Incoming Service Quotes</h3>
              </div>

              {quotes.length === 0 ? (
                <div className="text-center py-20 bg-neutral-950 border border-neutral-900 rounded-2xl">
                  <FileText className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                  <p className="text-neutral-500 text-sm">No new quotes requested yet.</p>
                </div>
              ) : (
                <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-x-auto shadow-2xl">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-neutral-900 bg-neutral-900/30">
                        <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">ID</th>
                        <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Customer</th>
                        <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Sector</th>
                        <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Status</th>
                        <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {quotes.map((q) => (
                        <tr key={q.id} className="hover:bg-neutral-900/40 transition">
                          <td className="px-6 py-4 font-mono font-bold text-blue-500">{q.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{q.customer}</div>
                            <div className="text-[10px] text-neutral-500">{q.email}</div>
                          </td>
                          <td className="px-6 py-4 font-bold text-white">{q.service}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${q.status === 'Processed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                              {q.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => onUpdateQuoteStatus(q.id, 'Processed')}
                              className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-blue-500 transition"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-bold">Regulatory Compliance Certificates</h3>
                <button 
                  onClick={() => {
                    setEditingCertId(null);
                    setNewCert({ title: '', type: '', issued: '', expiry: '', imageUrl: '' });
                    setIsAddingCert(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Cert
                </button>
              </div>

              {isAddingCert && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 animate-slide-up max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-center mb-6 sticky top-0 bg-neutral-900 py-2 z-10 border-b border-neutral-800 pb-2">
                    <h4 className="font-bold text-sm">{editingCertId ? 'Edit Certification' : 'Create Certification Record'}</h4>
                    <button onClick={() => setIsAddingCert(false)} className="text-neutral-500 hover:text-white"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" placeholder="Certificate Title" 
                      value={newCert.title} onChange={(e) => setNewCert({...newCert, title: e.target.value})}
                      className="bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500"
                    />
                    <input 
                      type="text" placeholder="Class / Type" 
                      value={newCert.type} onChange={(e) => setNewCert({...newCert, type: e.target.value})}
                      className="bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500"
                    />
                    <input 
                      type="date" placeholder="Issue Date" 
                      value={newCert.issued} onChange={(e) => setNewCert({...newCert, issued: e.target.value})}
                      className="bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500"
                    />
                    <input 
                      type="date" placeholder="Expiry Date" 
                      value={newCert.expiry} onChange={(e) => setNewCert({...newCert, expiry: e.target.value})}
                      className="bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500"
                    />
                    <div className="md:col-span-2">
                      <input 
                        type="text" placeholder="Image URL (MERA Cert Image)" 
                        value={newCert.imageUrl} onChange={(e) => setNewCert({...newCert, imageUrl: e.target.value})}
                        className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (editingCertId) {
                        onEditCert({...newCert, id: editingCertId, status: 'Active'});
                      } else {
                        onAddCert({...newCert, id: Date.now().toString(), status: 'Active'});
                      }
                      setIsAddingCert(false);
                      setEditingCertId(null);
                      setNewCert({ title: '', type: '', issued: '', expiry: '', imageUrl: '' });
                    }}
                    className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition"
                  >
                    {editingCertId ? 'Update Certificate' : 'Save Certificate'}
                  </button>
                </div>
              )}

              <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-x-auto shadow-2xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-neutral-900 bg-neutral-900/30">
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Title</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Class</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Expiry</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Status</th>
                      <th className="px-6 py-4 font-bold text-neutral-400 uppercase text-[10px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {certificates.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-900/40 transition">
                        <td className="px-6 py-4 font-bold text-white">{c.title}</td>
                        <td className="px-6 py-4 text-neutral-400 text-xs">{c.type}</td>
                        <td className="px-6 py-4 text-neutral-400 text-xs">{c.expiry}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase">
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setEditingCertId(c.id);
                                setNewCert({ title: c.title, type: c.type, issued: c.issued, expiry: c.expiry, imageUrl: c.imageUrl });
                                setIsAddingCert(true);
                              }}
                              className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-blue-500 transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => onRemoveCert(c.id)}
                              className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-red-500 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Side-Overlay - Scroll Responsive */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[70] md:relative md:inset-auto md:w-[400px] bg-neutral-900 border-l border-neutral-800 flex flex-col overflow-hidden animate-slide-left shadow-2xl">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between shrink-0">
            <h3 className="text-lg font-bold">Order Verification</h3>
            <button onClick={() => setSelectedOrder(null)} className="p-2 text-neutral-400 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500">Bank Details Provided</span>
                <div className="mt-2 p-4 bg-black border border-neutral-800 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Method:</span>
                    <span className="text-white font-bold">{selectedOrder.method}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Conf. Code:</span>
                    <span className="text-emerald-500 font-mono font-bold">{selectedOrder.confCode}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-neutral-900 pt-2 mt-1">
                    <span className="text-neutral-500">Total Amount:</span>
                    <div className="text-right">
                      <span className="text-white font-bold block">${selectedOrder.total.toFixed(2)}</span>
                      <span className="text-[10px] text-neutral-400 font-bold block">MK {(selectedOrder.total * 2500).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500">Proof of Payment (POP)</span>
                <div className="mt-2 relative rounded-xl overflow-hidden border border-neutral-800 aspect-video">
                  <img src={selectedOrder.popUrl} alt="POP Receipt" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <button className="p-3 bg-blue-600 rounded-xl text-white shadow-lg">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button className="w-full mt-2 py-2 text-[10px] font-bold uppercase text-blue-500 hover:text-blue-400 transition">
                  Open in New Tab
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-neutral-500">Items Purchased</span>
                {selectedOrder.items.map((item: string, i: number) => (
                  <div key={i} className="flex gap-3 text-xs p-3 bg-neutral-950 border border-neutral-900 rounded-lg">
                    <Package className="w-4 h-4 text-neutral-600" />
                    <span className="text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-neutral-800 bg-neutral-900 shrink-0 space-y-3">
            <button 
              onClick={() => {
                onUpdateOrderStatus(selectedOrder.id, 'Verified');
                setSelectedOrder(null);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Approve & Mark as Paid
            </button>
            <button 
              onClick={() => {
                onUpdateOrderStatus(selectedOrder.id, 'Issue Flagged');
                setSelectedOrder(null);
              }}
              className="w-full py-3 border border-neutral-800 hover:bg-neutral-850 text-neutral-400 font-bold text-xs rounded-xl transition"
            >
              Flag for Issues
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
