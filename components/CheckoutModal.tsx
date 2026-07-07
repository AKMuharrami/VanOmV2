import React, { useState, useEffect } from 'react';
import { X, Check, CreditCard, Smartphone, Building2, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { UI_TRANSLATIONS } from '../constants';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  lang?: 'en' | 'ar';
  cartItems: CartItem[];
}

type CheckoutStep = 'details' | 'payment' | 'processing' | 'success';
type PaymentMethod = 'thawani' | 'omannet' | 'card' | 'paylater' | 'transfer';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  totalAmount, 
  lang = 'en',
  cartItems
}) => {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paylater');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });
  const [adimage, setadimage] = useState<string | ArrayBuffer | null>(undefined);
  const [apimage, setapimage] = useState<string | null>(undefined);

  const t = UI_TRANSLATIONS[lang].checkout;
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (isOpen) {
      setStep('details');
    }
  }, [isOpen]);

  const loginn = async () => {
    let dataa = {
      phone: formData.phone, 
      image: apimage, 
      sum: JSON.stringify(cartItems), 
      gml1: formData.address, 
      gml2: formData.city, 
      hnum: formData.name, 
      total: totalAmount
    };

    const API_URL = "https://aaa-omega-cyan.vercel.app";
    const res = await fetch(`${API_URL}/fnov/vo/vo/v2`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(dataa),
    });

    if (res.status !== 200) {
      throw new Error('Error during the checkout process');
    }
  };

  const handleProcessPayment = async () => {
    try {
      setStep('processing');
      loginn(); // fire and forget as in the original code, or await it
      // handleredirect() - not defined in user's code, skipping
      setTimeout(()=> {
        setStep('success')
      }, 3000)
    } catch (e) {
      console.error(e);
      // Alert.alert('Error', e.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-stone-900/60 backdrop-blur-sm" 
          onClick={onClose}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          
          {/* Header */}
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold-600" />
              {t.title}
            </h3>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-6">
            {/* Step 1: Details */}
            {step === 'details' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h4 className="font-bold text-stone-800 mb-4">{t.details}</h4>
                <div className="grid grid-cols-1 gap-4">
                  <input 
                    type="text" 
                    placeholder={t.fields.name}
                    className="w-full border border-stone-300 p-3 rounded-md focus:ring-1 focus:ring-gold-500 focus:border-gold-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="email" 
                      placeholder={t.fields.email}
                      className="w-full border border-stone-300 p-3 rounded-md focus:ring-1 focus:ring-gold-500 outline-none"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                      type="tel" 
                      placeholder={t.fields.phone}
                      className="w-full border border-stone-300 p-3 rounded-md focus:ring-1 focus:ring-gold-500 outline-none"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder={t.fields.address}
                    className="w-full border border-stone-300 p-3 rounded-md focus:ring-1 focus:ring-gold-500 outline-none"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder={t.fields.city}
                    className="w-full border border-stone-300 p-3 rounded-md focus:ring-1 focus:ring-gold-500 outline-none"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={() => setStep('payment')} className="w-full sm:w-auto">
                    {t.actions.continue} {isRtl ? <ArrowLeft className="mr-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center mb-2">
                  <button onClick={() => setStep('details')} className="text-sm text-stone-500 hover:text-stone-900 flex items-center">
                    {isRtl ? <ArrowRight className="ml-1 w-3 h-3" /> : <ArrowLeft className="mr-1 w-3 h-3" />} {t.details}
                  </button>
                  <span className="font-bold text-lg text-stone-900">{t.total}: {totalAmount.toFixed(3)} OMR</span>
                </div>

                <h4 className="font-bold text-stone-800">{t.payment}</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  {/* Credit Card Option (Disabled) */}
                  <div 
                    className="p-4 border rounded-lg flex items-center gap-4 transition-all border-stone-200 bg-stone-50 opacity-60 cursor-not-allowed"
                  >
                    <div className="bg-stone-200 p-2 rounded-full">
                      <CreditCard className="w-6 h-6 text-stone-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-stone-500">{t.methods.card}</p>
                    </div>
                  </div>

                  {/* Pay Later Option */}
                  <div 
                    onClick={() => setPaymentMethod('paylater')}
                    className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'paylater' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-stone-200 hover:border-green-300'}`}
                  >
                    <div className="bg-green-100 p-2 rounded-full">
                      <Check className="w-6 h-6 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-stone-900">{t.methods.paylater}</p>
                    </div>
                    {paymentMethod === 'paylater' && <Check className="w-5 h-5 text-green-600" />}
                  </div>

                  {/* Phone Transfer Option */}
                  <div 
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'transfer' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-stone-200 hover:border-blue-300'}`}
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Smartphone className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-stone-900">{t.methods.transfer || "Phone Transfer"}</p>
                    </div>
                    {paymentMethod === 'transfer' && <Check className="w-5 h-5 text-blue-600" />}
                  </div>
                </div>

                {/* Simulated Input Fields based on method */}
                <div className="mt-4 p-4 bg-stone-50 rounded-md border border-stone-100">
                  {paymentMethod === 'paylater' && (
                     <div className="space-y-3">
                        <p className="text-sm text-stone-600">{isRtl ? 'سيتم الدفع لاحقاً عند التوصيل.' : 'You can pay later upon delivery.'}</p>
                     </div>
                  )}
                  {paymentMethod === 'card' && (
                     <div className="space-y-3 opacity-50 pointer-events-none">
                        <p className="text-sm text-red-500 mb-2 font-medium">{isRtl ? 'عذراً، الدفع بالبطاقة غير متاح حالياً.' : 'Sorry, card payment is currently down.'}</p>
                        <input type="text" placeholder={t.fields.cardNum} className="w-full border border-stone-300 p-2 rounded bg-white" disabled />
                        <div className="grid grid-cols-2 gap-3">
                           <input type="text" placeholder={t.fields.expiry} className="w-full border border-stone-300 p-2 rounded bg-white" disabled />
                           <input type="text" placeholder={t.fields.cvv} className="w-full border border-stone-300 p-2 rounded bg-white" disabled />
                        </div>
                     </div>
                  )}
                  {paymentMethod === 'transfer' && (
                     <div style={{marginRight:'auto', marginLeft:'auto', display:'flex', flexDirection:'column', alignItems:'center'}}>
                         <label htmlFor="Name" style={{color:'black', fontSize:'125%'}}>تحويل إلى </label>
                         <br></br>
                                <input id='Name' type="text" disabled value='96338791' name="Name" className="w-full border border-stone-300 p-2 rounded bg-white" />
                                <br></br>
                                   <h3>صورة الإيصال</h3>
                                   {adimage && <img width={200} height={200} src={adimage as string} alt='' style={{objectFit:'contain', marginBottom:'5%'}} />}
                    <input
        type="file"
        placeholder='Image'
        accept='image/*'
        name="myImage"
        // Event handler to capture file selection and update the state
        onChange={ async (e)=>{
          if (e.target.files && e.target.files[0]) {
            console.log(e.target.files)
            const data = new FileReader()
            data.addEventListener('load',()=>{
              setadimage(data.result)
              if (typeof data.result === 'string') {
                setapimage(data.result.split(',')[1])
              }
            })
            data.readAsDataURL(e.target.files[0])
          }
        }}
      />    
 </div>
                  )}
                </div>

                <Button onClick={handleProcessPayment} className="w-full py-4 text-lg">
                  {t.actions.pay} {totalAmount.toFixed(3)} OMR
                </Button>
              </div>
            )}

            {/* Step 3: Processing */}
            {step === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
                <div className="w-16 h-16 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin"></div>
                <p className="text-stone-600 font-medium animate-pulse">{t.processing}</p>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 'success' && (
              <div className="py-8 flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-300 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-stone-900">{t.success}</h4>
                <p className="text-stone-500 max-w-xs">{t.successMsg}</p>
                <div className="pt-6 w-full">
                  <Button onClick={onClose} variant="outline" className="w-full">
                    {t.backToStore}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
