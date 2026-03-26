import { Product, ShippingZone } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Premium Vanilla Paste',
    description: 'Premium Vanilla Paste with intense vanilla flavour and plenty vanilla seeds, made from single origin vanilla beans though an alcohol free method.',
   ingredients: " Ingredients: Natural fresh pressed vanilla beans (100g/l), (palm free) Glycerin (50%), water, Xanthan Gum (0.4%).",
    image: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/IMG_2678.PNG',
    category: 'Signature Collection',
    notes: ['Vanilla', 'Paste', 'Natural'],
    sizes: [
      { label: 'OutOfStock', price: 'n/a',  weightKg: 1.7},
      // { label: '100ml', price: 11.8,  weightKg: 1.7 },
      // { label: '200ml', price: 23.4,  weightKg: 1.7}
    ]
  },
  {
    id: 'p2',
    name: 'Vanilla Extract - alcohol free',
    description: 'Dark brown fragrant Vanilla Extract made from whole vanilla pods through an alcohol free method.',
    ingredients: "Ingredients: Infused fresh vanilla pods (100g/l), (palm free) Glycerin (50%), water.",
    image: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/IMG_2120.PNG',
    category: 'Floral',
     notes: ['Vanilla', 'Extract', 'Natural'],
    sizes: [
      // { label: '50ml', price: 5,  weightKg: 1.7 },
      // { label: '100ml', price: 10,  weightKg: 1.7 },
      // { label: '200ml', price: 19.7, weightKg: 1.7}
    ]
  },
  {
    id: 'p3',
    name: 'Bourbon (Planifolia) - Vanilla beans',
    description: 'Dark brown oily Grade A Planifolia Vanilla beans, from the renowned farms of Papua New Guinea.',
    image: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/IMG_1833.PNG',
    category: 'Nature',
     notes: ['Vanilla', 'Beans', 'Natural'],
    sizes: [
      { label: '5 beans', price: 4, weightKg: 1.7},
      { label: '10 beans', price: 8,  weightKg: 1.7 },
      { label: '20 beans', price: 16,  weightKg: 1.7 }
    ]
  },
  // {
  //   id: 'p4',
  //   name: 'Golden Amber',
  //   description: 'A radiant composition of golden amber, frankincense, and myrrh.',
  //   image: 'https://picsum.photos/600/800?random=4',
  //   category: 'Resin',
  //   notes: ['Amber', 'Frankincense', 'Myrrh'],
  //   sizes: [
  //     { label: '50ml', price: 210, weightKg: 0.6 },
  //     { label: '100ml', price: 380, weightKg: 1.1 },
  //     { label: '200ml', price: 650, weightKg: 2.0 }
  //   ]
  // },
  // {
  //   id: 'p5',
  //   name: 'Saffron Silk',
  //   description: 'Luxurious saffron threads woven into a creamy vanilla and sandalwood base.',
  //   image: '',
  //   category: 'Spicy',
  //   notes: ['Saffron', 'Vanilla', 'Sandalwood'],
  //   sizes: [
  //     { label: '50ml', price: 195, weightKg: 0.45 },
  //     { label: '100ml', price: 350, weightKg: 0.8 },
  //     { label: '200ml', price: 600, weightKg: 1.5 }
  //   ]
  // },
  // {
  //   id: 'p6',
  //   name: 'Omani Silver',
  //   description: 'Fresh citrus top notes inspired by the coast of Oman, settling into a woody base.',
  //   image: 'https://picsum.photos/600/800?random=6',
  //   category: 'Fresh',
  //   notes: ['Lime', 'Frankincense', 'Cedar'],
  //   sizes: [
  //     { label: '50ml', price: 130, weightKg: 0.5 },
  //     { label: '100ml', price: 240, weightKg: 0.9 },
  //     { label: '200ml', price: 420, weightKg: 1.7 }
  //   ]
  // },
];

export const SHIPPING_ZONES: Record<string, ShippingZone[]> = {
  // Domestic: Oman
  'OM': [
    { id: 'om_std', name: 'استلام من مكتب جيناكم', baseRate: 1.5, ratePerKg: 0, estimatedDays: '1-3 business days' },
    { id: 'om_exp', name: 'توصيل إلى المنزل', baseRate: 2, ratePerKg: 0, estimatedDays: '1-3 business day' },
  ],
  // GCC Neighbors
  'AE': [
    { id: 'gcc_fedex', name: 'FedEx Regional Economy', baseRate: 20, ratePerKg: 5, estimatedDays: '3-5 business days' },
    { id: 'gcc_dhl', name: 'DHL Express', baseRate: 25, ratePerKg: 6, estimatedDays: '2-3 business days' },
  ],
  'SA': [
    { id: 'gcc_fedex', name: 'FedEx Regional Economy', baseRate: 20, ratePerKg: 0, estimatedDays: '3-5 business days' },
    { id: 'gcc_dhl', name: 'DHL Express', baseRate: 25, ratePerKg: 0, estimatedDays: '2-3 business days' },
  ],
  'KW': [
    { id: 'gcc_fedex', name: 'FedEx Regional Economy', baseRate: 22, ratePerKg: 0, estimatedDays: '3-5 business days' },
    { id: 'gcc_dhl', name: 'DHL Express', baseRate: 28, ratePerKg: 0, estimatedDays: '2-3 business days' },
  ],
  'QA': [
    { id: 'gcc_fedex', name: 'FedEx Regional Economy', baseRate: 22, ratePerKg: 0, estimatedDays: '3-5 business days' },
    { id: 'gcc_dhl', name: 'DHL Express', baseRate: 28, ratePerKg: 0, estimatedDays: '2-3 business days' },
  ],
  'BH': [
    { id: 'gcc_fedex', name: 'FedEx Regional Economy', baseRate: 20, ratePerKg: 0, estimatedDays: '3-5 business days' },
    { id: 'gcc_dhl', name: 'DHL Express', baseRate: 25, ratePerKg: 0, estimatedDays: '2-3 business days' },
  ],
  // Rest of World
  'GLOBAL': [
    { id: 'gl_std', name: 'International Standard Post', baseRate: 30, ratePerKg: 0, estimatedDays: '12-20 business days' },
    { id: 'gl_fedex', name: 'FedEx International Priority', baseRate: 55, ratePerKg: 0, estimatedDays: '4-6 business days' },
    { id: 'gl_dhl', name: 'DHL Express Worldwide', baseRate: 60, ratePerKg: 0, estimatedDays: '3-5 business days' },
  ]
};

export const COUNTRIES = [
  // Home
  { code: 'OM', name: 'Oman' },
  
  // GCC
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'QA', name: 'Qatar' },
  { code: 'BH', name: 'Bahrain' },
  
  // Other Arab & Islamic Countries
  { code: 'DZ', name: 'Algeria' },
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'TD', name: 'Chad' },
  { code: 'KM', name: 'Comoros' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'EG', name: 'Egypt' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GN', name: 'Guinea' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LY', name: 'Libya' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MA', name: 'Morocco' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PS', name: 'Palestine' },
  { code: 'SN', name: 'Senegal' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SO', name: 'Somalia' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SY', name: 'Syria' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'YE', name: 'Yemen' },

  // Rest of World
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
];


export const UI_TRANSLATIONS = {
  en: {
    nav: {
      shopAll: 'SHOP ALL',
      newArrivals: 'NEW ARRIVALS',
      ourStory: 'OUR STORY',
      gifts: 'GIFTS',
      subtitle: 'Luxury Ingredients'
    },
    hero: {
      limited: 'LIMITED EDITION',
      title: 'The Essence of',
      titleItalic: 'Elegance',
      description: 'Discover Vanilla Oman Unique Collection. A collection of carefully selected high-class products crafted with care.',
      cta: 'Explore Collection'
    },
    products: {
      title: 'Curated Products',
      subtitle: 'Each scent is a journey, meticulously blended to evoke memories and emotions.',
      addToCart: 'Add to Cart',
    },
    features: {
      authentic: 'Authentic Ingredients',
      authenticDesc: 'Sourced directly from sustainable farms in Papua New Guiena and Indonesia.',
      shipping: 'Global Shipping',
      shippingDesc: 'Fast, reliable shipping to over 100 countries with real-time tracking.',
      concierge: 'Product Concierge',
      conciergeDesc: 'Expert guidance to help you find your signature Product.'
    },
    footer: {
      description: 'Redefining luxury through the art of perfumery. Experience the timeless elegance of our handcrafted scents.',
      support: 'Support',
      legal: 'Legal',
      rights: 'All rights reserved.',
      links: {
        shipping: 'Shipping Policy',
        returns: 'Returns & Exchanges',
        faq: 'FAQ',
        contact: 'Contact Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      }
    },
    cart: {
      title: 'Your Selection',
      empty: 'Your cart is empty.',
      continue: 'Continue Shopping',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      checkout: 'Checkout',
      shippingEstimator: 'Shipping Estimator',
      destination: 'Destination Country',
      calculating: 'Calculating best rates...',
      enterDest: 'Enter destination to see rates.',
      fastest: 'FASTEST',
      update: 'Update',
      calculatedAbove: 'Calculated above'
    },
    
    checkout: {
      title: 'Secure Checkout',
      details: 'Shipping Details',
      payment: 'Payment Method',
      payWith: 'Pay with',
      processing: 'Processing Payment...',
      success: 'Order Confirmed',
      successMsg: 'Thank you for your order. It has been successfull',
      backToStore: 'Back to Store',
      total: 'Total to Pay',
      methods: {
        thawani: 'Thawani Pay',
        paylater: 'Pay Later',
        card: 'Credit Card',
        transfer: 'Bank Transfer'
      },
      fields: {
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone Number (Oman)',
        address: 'Delivery Address',
        city: 'City',
        cardNum: 'Card Number',
        expiry: 'MM/YY',
        cvv: 'CVV',
        thawaniId: 'Thawani ID / Phone'
      },
      actions: {
        continue: 'Continue to Payment',
        pay: 'Confirm Order'
      }
    }
  },
  ar: {
    nav: {
      shopAll: 'تسوق الكل',
      newArrivals: 'وصل حديثاً',
      ourStory: 'قصتنا',
      gifts: 'هدايا',
      subtitle: 'منتجات فاخرة'
    },
    hero: {
      limited: 'إصدارات محدودة',
      title: 'فانيلا',
      titleItalic: 'عمان',
      description: 'اكتشف مجموعة فانيلا عمان الباهرة. مجموعة من المنتجات النادرة المصنوعة بعناية',
      cta: 'اكتشف المجموعة'
    },
    products: {
      title: 'منتجات مختارة',
      subtitle: 'كل منتج هو رحلة، ممزوجة بدقة حاملة في طياتها تجارب كثيرة.',
      addToCart: 'أضف إلى السلة',
    },
    features: {
      authentic: 'مكونات أصلية',
      authenticDesc: 'مصدرها مباشرة من مزارع مستدامة في بابوا نيو جيني وأندونيسيا.',
      shipping: 'شحن عالمي',
      shippingDesc: 'شحن سريع وموثوق لأكثر من 100 دولة مع تتبع فوري.',
      concierge: 'مستشار المنتجات',
      conciergeDesc: 'توجيه خبير لمساعدتك في العثور على منتجك المميز.'
    },
    footer: {
      description: 'إعادة تعريف الفخامة من خلال فن الفانيلا. جرب الأناقة الباهرة لمنتجاتنا المصنوعة بأيدي مهرة.',
      support: 'الدعم',
      legal: 'قانوني',
      rights: 'جميع الحقوق محفوظة.',
      links: {
        shipping: 'سياسة الشحن',
        returns: 'الإرجاع والاستبدال',
        faq: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      }
    },
    cart: {
      title: 'مشترياتك',
      empty: 'سلة التسوق فارغة.',
      continue: 'متابعة التسوق',
      subtotal: 'المجموع الفرعي',
      shipping: 'الشحن',
      total: 'المجموع',
      checkout: 'اطلب',
      shippingEstimator: 'حاسبة الشحن',
      destination: 'وجهة الشحن',
      calculating: 'جاري حساب أفضل الأسعار...',
      enterDest: 'اختر الوجهة لرؤية الأسعار.',
      fastest: 'الأسرع',
      update: 'تحديث',
      calculatedAbove: 'تم حسابه أعلاه'
    },
        checkout: {
      title: 'دفع آمن',
      details: 'تفاصيل الشحن',
      payment: 'طريقة الدفع',
      payWith: 'ادفع بواسطة',
      processing: 'جاري معالجة الدفع...',
      success: 'تم تأكيد الطلب',
      successMsg: 'شكراً لطلبك. تم إرسال تأكيد إلى بريدك الإلكتروني.',
      backToStore: 'العودة للمتجر',
      total: 'المبلغ الإجمالي',
      methods: {
        thawani: 'ثواني',
        card: 'بطاقة ائتمان',
        paylater: 'الدفع لاحقاً',
        transfer: 'تحويل بنكي'
      },
      fields: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        address: 'عنوان التوصيل',
        city: 'المدينة',
        cardNum: 'رقم البطاقة',
        expiry: 'تاريخ الانتهاء',
        cvv: 'رمز التحقق',
        thawaniId: 'رقم ثواني / الهاتف'
      },
      actions: {
        continue: 'متابعة الطلب',
        pay: 'اطلب'
      }
    }
  }
};
