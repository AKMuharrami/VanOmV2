import React, { useState, useEffect } from 'react';
import { SHIPPING_ZONES, COUNTRIES, UI_TRANSLATIONS } from '../constants';
import { ShippingRate, CartItem } from '../types';
import { Truck, Plane, Package } from 'lucide-react';
import { Button } from './Button';

interface ShippingCalculatorProps {
  cartItems: CartItem[];
  onSelectRate?: (rate: ShippingRate) => void;
  selectedRateId?: string;
  lang?: 'en' | 'ar';
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ 
  cartItems, 
  onSelectRate,
  selectedRateId,
  lang = 'en'
}) => {
  const [country, setCountry] = useState('OM');
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const t = UI_TRANSLATIONS[lang].cart;

  const calculateRates = React.useCallback(() => {
    setIsCalculating(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Calculate total weight based on selected sizes safely to prevent NaN
      const totalWeight = cartItems.reduce((sum, item) => {
        const weight = Number(item.selectedSize?.weightKg) || 0;
        return sum + (weight * item.quantity);
      }, 0);

      const zones = SHIPPING_ZONES[country] || SHIPPING_ZONES['GLOBAL'] || [];
      
      const calculatedRates: ShippingRate[] = zones.map(zone => {
        let carrierName = 'Courier';
        if (zone.id.includes('dhl')) carrierName = 'DHL';
        else if (zone.id.includes('fedex')) carrierName = 'FedEx';
        else if (zone.id.includes('std')) carrierName = 'Standard Post';
        
        const baseRate = Number(zone.baseRate) || 0;
        const ratePerKg = Number(zone.ratePerKg) || 0;
        
        return {
          id: zone.id,
          carrier: carrierName,
          serviceName: zone.name,
          price: baseRate + (ratePerKg * totalWeight),
          currency: 'OMR',
          estimatedDelivery: zone.estimatedDays
        };
      });

      setRates(calculatedRates);
      setIsCalculating(false);
    }, 600);
  }, [cartItems, country]);

  // Recalculate when cart items change significantly or manually triggered
  useEffect(() => {
    if (cartItems.length > 0) {
      calculateRates();
    }
  }, [cartItems.length, calculateRates]);

  if (cartItems.length === 0) return null;

  return (
    <div className="bg-white p-6 border border-stone-200 shadow-sm rounded-none">
      <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
        <Truck className="w-5 h-5 text-gold-600" />
        {t.shippingEstimator}
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-bold text-stone-500 mb-2">{t.destination}</label>
        <div className="flex gap-2">
          <select 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            className="flex-1 border border-stone-300 p-2 focus:ring-1 focus:ring-gold-500 focus:outline-none bg-stone-50"
          >
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          <Button onClick={calculateRates} variant="outline" size="sm">
            {t.update}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {isCalculating ? (
          <div className="text-center py-4 text-stone-400">{t.calculating}</div>
        ) : rates.length > 0 ? (
          rates.map((rate) => (
            <div 
              key={rate.id}
              onClick={() => onSelectRate && onSelectRate(rate)}
              className={`
                relative p-4 border transition-all cursor-pointer group hover:border-gold-400
                ${selectedRateId === rate.id ? 'border-gold-600 bg-gold-50' : 'border-stone-200'}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  {rate.price > 10 ? <Plane className="w-4 h-4 text-stone-400" /> : <Package className="w-4 h-4 text-stone-400" />}
                  <span className="font-bold text-stone-800">{rate.serviceName}</span>
                </div>
                <span className="font-serif font-bold text-lg">{rate.price.toFixed(3)} OMR</span>
              </div>
              <div className="text-sm text-stone-500 flex justify-between">
                <span>{rate.estimatedDelivery}</span>
                {rate.price > 15 && <span className="text-xs text-gold-600 font-bold bg-gold-100 px-2 py-0.5 rounded">{t.fastest}</span>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-stone-500 italic">{t.enterDest}</p>
        )}
      </div>
    </div>
  );
};