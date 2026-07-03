import { Package, Truck, CheckCircle, Clock, LogOut, ShoppingCart, User, Settings, Landmark } from 'lucide-react';

interface UserDashboardProps {
  user: any;
  orders: any[];
  onLogout: () => void;
  onContinueShopping: () => void;
}

export default function UserDashboard({ user, orders, onLogout, onContinueShopping }: UserDashboardProps) {
  // Filter orders for THIS specific customer (mocked by user name)
  const myOrders = orders.filter(o => o.customer === user.name);

  return (
    <div className="min-h-screen bg-black text-white py-16 animate-fade-in">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center italic font-black text-3xl shadow-xl shadow-blue-600/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500 font-bold uppercase tracking-wider">
                <span>WHL Premium Client</span>
                <span className="w-1 h-1 bg-neutral-800 rounded-full" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={onContinueShopping}
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-2xl text-xs font-bold transition border border-neutral-800"
             >
               <ShoppingCart className="w-4 h-4" /> Shop More
             </button>
             <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl text-xs font-bold transition border border-red-500/10"
             >
               <LogOut className="w-4 h-4" /> Sign Out
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-4 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-600/20">
                <Package className="w-4 h-4" /> My Orders
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-4 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-2xl text-xs font-black uppercase tracking-wider transition">
                <Landmark className="w-4 h-4" /> Payment History
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-4 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-2xl text-xs font-black uppercase tracking-wider transition">
                <User className="w-4 h-4" /> Account Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-4 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-2xl text-xs font-black uppercase tracking-wider transition">
                <Settings className="w-4 h-4" /> Notifications
              </button>
            </div>
            
            <div className="bg-blue-600/5 border border-blue-500/10 rounded-3xl p-6 space-y-4">
              <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Support Node</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-medium">Need help with your solar installation or tracking a courier? Our engineers are on standby.</p>
              <button className="text-xs font-bold text-white hover:underline">Chat with Support</button>
            </div>
          </div>

          {/* Main Display Area */}
          <div className="lg:col-span-9 space-y-8">
            <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
               Track Your Shipments
               <span className="h-px flex-1 bg-neutral-900" />
            </h3>

            {myOrders.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 border-dashed rounded-[2.5rem] py-24 text-center">
                 <Package className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                 <h4 className="text-lg font-bold text-neutral-400">No active orders found.</h4>
                 <p className="text-xs text-neutral-600 mt-2">Items you purchase in the shop will appear here for tracking.</p>
                 <button 
                  onClick={onContinueShopping}
                  className="mt-8 px-8 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                 >
                   Browse Shop
                 </button>
              </div>
            ) : (
              <div className="space-y-6">
                {myOrders.map(order => (
                  <div key={order.id} className="bg-neutral-900 border border-neutral-800 rounded-[2rem] overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all group">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/10">Order {order.id}</span>
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10' : 'bg-amber-500/10 text-amber-500 border-amber-500/10'}`}>
                             {order.status}
                           </span>
                        </div>
                        <h4 className="text-sm font-bold text-neutral-400">Order Placed: <span className="text-white">{order.date}</span></h4>
                        <div className="pt-2">
                           <span className="text-[10px] text-neutral-500 font-bold uppercase block mb-2">Inventory List:</span>
                           <div className="flex flex-wrap gap-2">
                              {order.items.map((item: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-black rounded-lg text-[10px] font-medium text-neutral-300 border border-neutral-800">
                                  {item}
                                </span>
                              ))}
                           </div>
                        </div>
                      </div>
                      
                      <div className="md:text-right flex flex-col justify-between items-start md:items-end gap-6">
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 font-bold uppercase block tracking-widest">Total Transaction</span>
                          <span className="text-2xl font-black text-white">${order.total}</span>
                        </div>
                        <div className="flex gap-2">
                           <div className={`p-4 rounded-2xl border ${order.status === 'Verified' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-neutral-950 border-neutral-800'} flex items-center gap-4`}>
                              <div className={`p-2 rounded-xl ${order.status === 'Verified' ? 'bg-emerald-500 text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                                <Truck className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                <span className="text-[9px] font-black uppercase text-neutral-500 block">Current Stage</span>
                                <span className="text-xs font-bold text-white">{order.status === 'Verified' ? 'Out for Delivery' : 'Awaiting Bank POP Verification'}</span>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual Progress Bar */}
                    <div className="h-1.5 bg-neutral-950 flex">
                       <div className={`h-full bg-emerald-500 transition-all duration-1000 ${order.status === 'Verified' ? 'w-2/3' : 'w-1/3'}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-4">
                  <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl inline-block"><Clock className="w-6 h-6" /></div>
                  <h4 className="font-bold">Estimated Delivery</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">Most electrical items are delivered within 48-72 hours via WHL Express across all 28 Malawian districts.</p>
               </div>
               <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-4">
                  <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl inline-block"><CheckCircle className="w-6 h-6" /></div>
                  <h4 className="font-bold">Verified Partners</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">Your data and payments are secured. WHL GROUP is fully regulated by MERA, RBM, and MRA.</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
