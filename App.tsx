import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS, UI_TRANSLATIONS } from './constants';
import { Product, CartItem, ProductSize } from './types';
import { ShoppingBag, Menu, User, Search, Star, Globe } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { AIChat } from './components/AIChat';
import { Button } from './components/Button';

// useEffect(() => {
//   setTimeout(()=> {
//         window.location.href = "/ar"

//     }, 5000)
// })
// Individual Product Card with Size State
const ProductCard: React.FC<{ 
  product: Product; 
  onAddToCart: (p: Product, size: ProductSize) => void; 
  t: any; 
  isRtl: boolean 
}> = ({ product, onAddToCart, t, isRtl }) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 mb-4">
        <img 
          src={product.image} 
          
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{objectFit:'contain'}}
        />
        <button 
          onClick={() => onAddToCart(product, selectedSize)}
          className="absolute bottom-0 left-0 right-0 bg-stone-900/90 text-white py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium"
        >
          {t.products.addToCart} - {selectedSize.price} Omr
        </button>
        <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-stone-900`}>
          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
          4.9
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gold-600 font-bold tracking-widest uppercase mb-1">{product.category}</p>
        <h4 className="font-serif text-xl font-bold text-stone-900 mb-2 group-hover:text-gold-700 transition-colors">{product.name}</h4>
        <p className="text-stone-500 text-sm mb-3 line-clamp-2 px-4">{product.description}</p>
        
        {/* Size Selector */}
        <div className="flex justify-center gap-2 mb-3">
          {product.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-1 text-xs border transition-colors ${
                selectedSize.label === size.label 
                  ? 'border-gold-600 bg-gold-50 text-gold-800 font-medium' 
                  : 'border-stone-200 text-stone-500 hover:border-gold-300'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {product.notes.slice(0, 3).map((note, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-stone-100 text-stone-600 rounded-sm">
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Storefront Component
const Storefront: React.FC<{ lang: 'en' | 'ar' }> = ({ lang }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const addToCart = (product: Product, size: ProductSize) => {
    setCart(prev => {
      // Create a unique ID for this product + size combination
      const cartItemId = `${product.id}-${size.label}`;
      const existing = prev.find(p => p.cartItemId === cartItemId);
      
      if (existing) {
        return prev.map(p => p.cartItemId === cartItemId ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, cartItemId }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

   const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-stone-50 text-stone-800 selection:bg-gold-200 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-600">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="font-serif text-2xl font-bold tracking-widest text-stone-900">VANILLA OM</h1>
                <span className="text-[10px] tracking-[0.3em] text-gold-600 uppercase">{t.nav.subtitle}</span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 rtl:space-x-reverse items-center">
              {/* <a href="#" className="text-sm font-medium hover:text-gold-600 transition-colors">{t.nav.shopAll}</a> */}
              {/* <a href="#" className="text-sm font-medium hover:text-gold-600 transition-colors">{t.nav.newArrivals}</a> */}
              <a href="#" className="text-sm font-medium hover:text-gold-600 transition-colors">{t.nav.ourStory}</a>
              <a href="#" className="text-sm font-medium hover:text-gold-600 transition-colors">{t.nav.gifts}</a>
            </div>

            {/* Icons */}
            <div className={`flex items-center gap-4 ${isRtl ? 'mr-6' : 'ml-6'}`}>
              {/* Language Switcher */}
              <Link 
                to={lang === 'en' ? '/ar' : '/'} 
                className="p-2 hover:text-gold-600 transition-colors flex items-center gap-1 text-xs font-bold uppercase"
              >
                {lang === 'en' ? 'AR' : 'EN'}
              </Link>

              <button className="p-2 hover:text-gold-600 transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              {/* <button className="p-2 hover:text-gold-600 transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </button> */}
              <button 
                className="p-2 hover:text-gold-600 transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gold-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-base font-medium hover:bg-stone-50">{t.nav.shopAll}</a>
              <a href="#" className="block px-3 py-2 text-base font-medium hover:bg-stone-50">{t.nav.newArrivals}</a>
              <a href="#" className="block px-3 py-2 text-base font-medium hover:bg-stone-50">{t.nav.ourStory}</a>
              <Link to={lang === 'en' ? '/ar' : '/'} className="block px-3 py-2 text-base font-medium hover:bg-stone-50 text-gold-600">
                {lang === 'en' ? 'العربية' : 'English'}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/322E8E4A-9D18-4D18-B5D2-D8EB91E2DDD6.JPG" 
            alt="Luxury Perfume" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4" style={{backgroundColor:'rgba(250 250 250 .9)'}}>
          {/* <span className="text-gold-300 tracking-[0.2em] mb-4 text-sm font-medium animate-fade-in-up">{t.hero.limited}</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight max-w-4xl animate-fade-in-up delay-100" style={{color:'white'}}>
            {t.hero.title} <br/><span className="italic text-gold-200" style={{color:'#D2A939'}}>{t.hero.titleItalic}</span>
          </h2> */}
          <p className="text-stone-300 max-w-lg mb-10 text-lg font-light animate-fade-in-up delay-200" style={{color:'black', backgroundColor:'white',}} >
            {t.hero.description}
          </p>
          <Button  onClick={scrollToProducts} size="lg" variant="secondary" className="animate-fade-in-up delay-300">
            {t.hero.cta}
          </Button>
        </div>
      </section>

      {/* Product Section */}
      <main ref={productsSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">{t.products.title}</h3>
          <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            {t.products.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
              t={t}
              isRtl={isRtl}
            />
          ))}
        </div>
      </main>

      {/* Features Banner */}
      <section className="bg-stone-900 text-gold-100 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border border-gold-900/30 bg-stone-800/50">
            <h4 className="font-serif text-xl mb-2">{t.features.authentic}</h4>
            <p className="text-stone-400 text-sm">{t.features.authenticDesc}</p>
          </div>
          <div className="p-6 border border-gold-900/30 bg-stone-800/50">
            <h4 className="font-serif text-xl mb-2">{t.features.shipping}</h4>
            <p className="text-stone-400 text-sm">{t.features.shippingDesc}</p>
          </div>
          <div className="p-6 border border-gold-900/30 bg-stone-800/50">
            <h4 className="font-serif text-xl mb-2">{t.features.concierge}</h4>
            <p className="text-stone-400 text-sm">{t.features.conciergeDesc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h5 className="font-serif font-bold text-lg mb-4">VANILLA OM</h5>
            <p className="text-stone-500 text-sm max-w-xs">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h6 className="font-bold text-sm uppercase tracking-wider mb-4">{t.footer.support}</h6>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li><a href="#" className="hover:text-gold-600">{t.footer.links.shipping}</a></li>
              <li><a href="#" className="hover:text-gold-600">{t.footer.links.returns}</a></li>
              <li><a href="#" className="hover:text-gold-600">{t.footer.links.faq}</a></li>
              <li><a href="#" className="hover:text-gold-600">{t.footer.links.contact}</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm uppercase tracking-wider mb-4">{t.footer.legal}</h6>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li><a href="#" className="hover:text-gold-600">{t.footer.links.privacy}</a></li>
              <li><a href="#" className="hover:text-gold-600">{t.footer.links.terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-100 text-center text-stone-400 text-xs">
          © {new Date().getFullYear()} Vanilla OM. {t.footer.rights}
        </div>
      </footer>

      {/* Components */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        lang={lang}
      />
      
      <AIChat lang={lang} />
    </div>
  );
};

// Router Container
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Storefront lang="en" />} />
        <Route path="/ar" element={<Storefront lang="ar" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;