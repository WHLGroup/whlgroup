import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderComplete: (order: any) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderComplete
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'complete'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lilongwe'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'USD',
    popFile: null as File | null,
    confirmationCode: ''
  });
  const [isOrdering, setIsOrdering] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);
    // Simulate payment verification
    setTimeout(() => {
      onOrderComplete({
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-MW`,
        customer: shippingInfo.name,
        date: new Date().toLocaleString(),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'Pending Verification',
        method: `${paymentInfo.method} (${paymentInfo.method === 'USD' ? 'Ecobank' : 'NBM'})`,
        confCode: paymentInfo.confirmationCode,
        popUrl: 'https://images.pexels.com/photos/7363099/pexels-photo-7363099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        items: cart.map(i => `${i.name} (${i.quantity}x)`)
      });
      setIsOrdering(false);
      setCheckoutStep('complete');
    }, 2000);
  };

  const handleSuccessClose = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md h-full bg-neutral-900 text-white shadow-2xl flex flex-col z-10 border-l border-neutral-800 animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">Your Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Steps */}
        {checkoutStep === 'cart' && (
          <>
            {/* Scrollable Cart List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4 text-neutral-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Your cart is empty</h3>
                  <p className="text-sm text-neutral-500 max-w-xs mt-1">
                    Check out our online shop to add electrical wiring, solar panels, and quality items to your cart.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-neutral-950 border border-neutral-800 rounded-xl relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-neutral-900 border border-neutral-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate text-white">{item.name}</h4>
                      <p className="text-xs text-blue-500 mt-0.5">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-neutral-900 rounded-lg border border-neutral-800 p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2.5 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-neutral-950 border-t border-neutral-800 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Tax & Duties</span>
                    <span className="text-emerald-500">Free</span>
                  </div>
                  <div className="h-px bg-neutral-800 my-2" />
                  <div className="flex justify-between text-base font-bold text-white">
                    <span>Total Estimated</span>
                    <span className="text-blue-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition duration-300"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {checkoutStep === 'shipping' && (
          <form onSubmit={handleShippingSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0">
              <h3 className="text-lg font-bold text-white mb-2">Delivery Information</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Enter your details to confirm your retail electrical purchase. WHL Logistics will deliver directly to your address.
              </p>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  placeholder="e.g. Peter Phiri"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">Phone Number</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  placeholder="e.g. 0991 807 100"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">City (Malawi)</label>
                <select
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                >
                  <option>Lilongwe</option>
                  <option>Blantyre</option>
                  <option>Mzuzu</option>
                  <option>Zomba</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">Delivery Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  placeholder="e.g. Area 47, Sector 2, Lilongwe"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                />
              </div>
            </div>

            {/* Sticky Shipping Action Buttons */}
            <div className="p-6 bg-neutral-950 border-t border-neutral-900 space-y-3">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition duration-300"
              >
                Continue to Payment <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full py-2.5 text-sm text-neutral-400 hover:text-white text-center transition"
              >
                Go back to Cart
              </button>
            </div>
          </form>
        )}

        {checkoutStep === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
              <h3 className="text-lg font-bold text-white">Secure Bank Payment</h3>
              <p className="text-xs text-neutral-400">
                Please transfer the total amount to one of our accounts below and upload your Proof of Payment (POP).
              </p>

              <div className="space-y-3">
                <div 
                  onClick={() => setPaymentInfo({...paymentInfo, method: 'USD'})}
                  className={`p-4 rounded-xl border cursor-pointer transition ${paymentInfo.method === 'USD' ? 'bg-blue-600/10 border-blue-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-blue-500">USD ACCOUNT (Ecobank)</span>
                    {paymentInfo.method === 'USD' && <CheckCircle className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="text-sm font-mono text-white">5423419986098</div>
                  <div className="text-[10px] text-neutral-500 mt-1 uppercase">Ecobank Malawi | WHL GROUP</div>
                </div>

                <div 
                  onClick={() => setPaymentInfo({...paymentInfo, method: 'MK'})}
                  className={`p-4 rounded-xl border cursor-pointer transition ${paymentInfo.method === 'MK' ? 'bg-blue-600/10 border-blue-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-500">LOCAL MK ACCOUNT (NBM)</span>
                    {paymentInfo.method === 'MK' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <div className="text-sm font-mono text-white">10156438795</div>
                  <div className="text-[10px] text-neutral-500 mt-1 uppercase">National Bank of Malawi | WHL GROUP</div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">Upload Proof of Payment (POP)</label>
                  <div className="relative group">
                    <input
                      type="file"
                      required
                      accept="image/*,.pdf"
                      onChange={(e) => setPaymentInfo({...paymentInfo, popFile: e.target.files ? e.target.files[0] : null})}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-neutral-950 border border-dashed border-neutral-800 group-hover:border-blue-500 rounded-xl px-4 py-6 text-center transition">
                      <div className="text-blue-500 mb-2 flex justify-center">
                        <Plus className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-neutral-400">
                        {paymentInfo.popFile ? paymentInfo.popFile.name : 'Click to select or drag POP file here'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">Payment Confirmation Code</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.confirmationCode}
                    onChange={(e) => setPaymentInfo({...paymentInfo, confirmationCode: e.target.value})}
                    placeholder="Enter transaction/reference code"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition text-sm"
                  />
                  <p className="text-[10px] text-neutral-500 mt-2">
                    Provide the unique reference code from your bank notification to complete verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-neutral-950 border-t border-neutral-900 space-y-3">
              <button
                type="submit"
                disabled={isOrdering}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition duration-300"
              >
                {isOrdering ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  <>
                    Confirm & Complete Order
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep('shipping')}
                className="w-full py-2.5 text-sm text-neutral-400 hover:text-white text-center transition"
              >
                Back to Shipping
              </button>
            </div>
          </form>
        )}

        {checkoutStep === 'complete' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
            <p className="text-neutral-400 max-w-sm text-sm mb-6">
              Thank you for shopping with WHL GROUP. Your order of <span className="text-white font-semibold">{cart.length} item(s)</span> was successfully placed.
            </p>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 w-full text-left space-y-2 mb-8 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Recipient:</span>
                <span className="text-white font-medium">{shippingInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span className="text-white font-medium">{shippingInfo.address}, {shippingInfo.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Method:</span>
                <span className="text-white font-medium">Bank Transfer (POP Verified)</span>
              </div>
            </div>
            <button
              onClick={handleSuccessClose}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-500/20"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
