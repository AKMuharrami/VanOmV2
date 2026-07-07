import React, { useState } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem, ShippingRate } from '../types';
import { Button } from './Button';
import { ShippingCalculator } from './ShippingCalculator';
import { UI_TRANSLATIONS } from '../constants';
import { CheckoutModal } from './CheckoutModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  lang?: 'en' | 'ar';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  lang = 'en'
}) => {
  const [selectedShipping, setSelectedShipping] = React.useState<ShippingRate | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang].cart;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.selectedSize?.price) || 0;
    return sum + (price * item.quantity);
  }, 0);
  
  const shippingCost = selectedShipping ? (Number(selectedShipping.price) || 0) : 0;
  const total = subtotal + shippingCost;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 ${lang === 'ar' ? 'left-0' : 'right-0'} max-w-md w-full flex`}>
        <div className="h-full w-full bg-white shadow-xl flex flex-col transform transition-transform duration-500 font-sans">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
            <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              {t.title}
            </h2>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-900">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                <ShoppingBag className="w-12 h-12 opacity-20" />
                <p>{t.empty}</p>
                <Button onClick={onClose} variant="secondary">{t.continue}</Button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4">
                      <div className="w-20 h-24 bg-stone-50 flex items-center justify-center p-2 rounded-md border border-stone-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-stone-900 font-serif truncate">{item.name}</h4>
                            <span className="text-xs bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded whitespace-nowrap">{item.selectedSize.label}</span>
                          </div>
                          <p className="text-sm text-stone-500">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-white">
                            <button 
                              onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-stone-50 text-stone-600 active:bg-stone-100 transition-colors"
                            >-</button>
                            <span className="w-8 text-center text-sm font-bold text-stone-900">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-stone-50 text-stone-600 active:bg-stone-100 transition-colors"
                            >+</button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold">{Number(item.selectedSize.price).toFixed(3)} OMR</span>
                            <button onClick={() => onRemoveItem(item.cartItemId)} className="p-2 sm:p-1.5 text-stone-400 hover:text-red-500 rounded-md hover:bg-stone-100 active:bg-stone-200 transition-colors">
                              <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Estimator Section */}
                <div className="mt-8 pt-8 border-t border-stone-100">
                   <ShippingCalculator 
                     cartItems={cartItems} 
                     onSelectRate={setSelectedShipping}
                     selectedRateId={selectedShipping?.id}
                     lang={lang}
                   />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-stone-100 bg-stone-50 p-6 space-y-4">
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span>{subtotal.toFixed(3)} OMR</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.shipping}</span>
                  <span>{selectedShipping ? `${shippingCost.toFixed(3)} OMR` : t.calculatedAbove}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>{t.total}</span>
                  <span>{total.toFixed(3)} OMR</span>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={() => setIsCheckoutOpen(true)}>
                {t.checkout}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        totalAmount={total}
        lang={lang}
        cartItems={cartItems}
      />
    </div>
  );
};
