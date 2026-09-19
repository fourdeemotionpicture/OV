/* ==========================================================================
   OV™ — ORIGINAL VERSION | MINIMAL LUXURY STREETWEAR INTERACTIVE ENGINE
   ========================================================================== */

// Global State
const DEFAULT_PRODUCTS = [
  {
    id: 'ov-tee-grace-beige',
    name: 'OV™ "GRACE" 240 GSM Oversized Heavyweight Tee — Dune Beige',
    baseName: 'Grace Oversized Tee',
    price: 999,
    originalPrice: 2999,
    type: 'tee',
    brand: 'OV™ FEMME',
    badge: 'DROP 01 · 67% OFF',
    stock: 25,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    reviews: [
      { author: 'Ananya S.', rating: 5, date: '2 days ago', title: 'Perfection in fabric & fit', comment: 'The 240 GSM weight feels incredibly premium and soft. The back floral print with Grace is so empowering!' },
      { author: 'Meera K.', rating: 5, date: '1 week ago', title: 'Best oversized tee I own', comment: 'Drape is immaculate. Exactly the luxury streetwear aesthetic I was hunting for.' }
    ],
    rating: 4.9,
    image: 'images/product_beige_front_model.jpg',
    gallery: [
      'images/product_beige_front_model.jpg',
      'images/product_beige_back_model.jpg',
      'images/product_beige_front_flat.jpg',
      'images/product_beige_back_flat.jpg'
    ],
    fit: 'Oversized Boxy Drop-Shoulder',
    fabric: '240 GSM Luxury Combed Compact Cotton',
    neck: '1.25" High-Density Ribbed Collar',
    color: 'Dune Beige',
    desc: 'Grace Is Her Greatest Strength. 240 GSM heavyweight combed compact cotton cut in an intentional drop-shoulder oversized silhouette. Features signature minimal front script and high-density photographic floral muse back graphic: "Quiet. Unbreakable. Limitless."',
    isUpcoming: false
  },
  {
    id: 'ov-tee-noir-black',
    name: 'OV™ "NOIR" 280 GSM Boxy Heavyweight Tee — Washed Black',
    baseName: 'Noir Boxy Fit Tee',
    price: 1199,
    originalPrice: 3499,
    type: 'tee',
    brand: 'OV™ BLACK LABEL',
    badge: 'DROP 02 · ANTIGRAVITY',
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: [
      { author: 'Rohan M.', rating: 5, date: '3 days ago', title: 'Insane 280 GSM structure', comment: 'The collar does not bacon, and the boxy drop sits perfectly on the shoulders. Heavy streetwear at its best.' },
      { author: 'Kabir V.', rating: 5, date: '2 weeks ago', title: 'Mineral wash is top tier', comment: 'The washed black enzyme finish looks like vintage luxury designer tier.' }
    ],
    rating: 4.95,
    image: 'images/antigravity_tshirts_float.jpg',
    gallery: [
      'images/antigravity_tshirts_float.jpg',
      'images/antigravity_showcase.jpg',
      'images/model_runway.jpg'
    ],
    fit: 'Architectural Boxy Fit with Vertical Sleeve Drape',
    fabric: '280 GSM Extreme Heavyweight Interlock Cotton',
    neck: 'Double-Needle Reinforced High Crew',
    color: 'Washed Black',
    desc: 'The Antigravity Edition. 280 GSM interlock ring-spun cotton treated with vintage mineral enzyme wash. Engineered with strict vertical sleeve drops and structural weight that never collapses.',
    isUpcoming: false
  }
];

const STATE = {
  products: (() => {
    const saved = localStorage.getItem('ov_custom_products_v5') || 
                  localStorage.getItem('ov_custom_products_v3') || 
                  localStorage.getItem('ov_custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch(e) {}
    }
    try {
      localStorage.setItem('ov_custom_products_v5', JSON.stringify(DEFAULT_PRODUCTS));
    } catch(e) {}
    return DEFAULT_PRODUCTS;
  })(),
  slides: (() => {
    const DEFAULT_SLIDES = [
      {
        image: 'images/model_sunglasses.jpg',
        position: 'right 20% top 0%',
        overlay: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        eyebrow: 'FESTIVE SPECIFICATION',
        title: 'DIWALI DROP',
        desc: 'Discover statement pieces that blend elegance with individuality. Designed for the modern muse.',
        btnText: 'SHOP NOW',
        btnAction: 'shop',
        layout: 'layout-split',
        isLogoGraphic: true,
        scriptTitle: ''
      },
      {
        image: 'images/model2.jpg',
        position: 'right 20% top 0%',
        overlay: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        eyebrow: 'FESTIVE SPECIFICATION',
        title: 'ELEVATE YOUR STYLE',
        scriptTitle: 'Define Your Story',
        desc: 'Timeless elegance. Modern sophistication. Crafted for the woman who inspires.',
        btnText: 'EXPLORE COLLECTION',
        btnAction: 'shop',
        layout: 'layout-split',
        isLogoGraphic: false,
        vFeatures: [
          { num: '01', title: 'PREMIUM QUALITY', desc: 'Double-combed heavy cotton' },
          { num: '02', title: 'MODERN DESIGNS', desc: 'Designed for the modern muse' },
          { num: '03', title: 'TIMELESS ELEGANCE', desc: 'Crafted to outlast trends' }
        ]
      },
      {
        image: 'images/diwali_banner.png',
        position: 'right 20% center',
        overlay: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        eyebrow: 'ORIGINAL FIT',
        title: 'BLACK LABEL',
        scriptTitle: 'Original Never Copies',
        desc: 'French Terry Sweats & Heavyweight Hoodies Engineered to Outlast Trends.',
        btnText: 'VIEW ESSENTIALS',
        btnAction: 'shop',
        layout: 'layout-split',
        isLogoGraphic: false,
        vFeatures: [
          { num: '04', title: 'HEAVY WEIGHT', desc: '450 GSM Organic French Terry' },
          { num: '05', title: 'MINIMAL LUXURY', desc: 'Designed for daily comfort' }
        ]
      }
    ];

    let list = null;
    try {
      const saved = localStorage.getItem('ov_custom_slides');
      if (saved) list = JSON.parse(saved);
    } catch(e) {}

    if (!list || !Array.isArray(list) || list.length === 0) {
      list = DEFAULT_SLIDES;
    } else {
      // Auto-migrate any outdated references to model3.jpg to official diwali_banner.png
      list.forEach(s => {
        if (s.image && s.image.includes('model3.jpg')) {
          s.image = 'images/diwali_banner.png';
          s.position = 'right 20% center';
        }
      });
    }
    localStorage.setItem('ov_custom_slides', JSON.stringify(list));
    return list;
  })(),
  logo: JSON.parse(localStorage.getItem('ov_custom_logo')) || {
    letters: 'OV',
    subtext: 'ORIGINAL VERSION',
    image: 'images/logo_transparent.png'
  },
  cart: JSON.parse(localStorage.getItem('ov_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('ov_wishlist')) || [],
  user: JSON.parse(localStorage.getItem('ov_user')) || null,
  walletBalance: 1200,
  loyaltyPoints: 450,
  appliedCoupon: null,
  activeColor: 'white',
  activeSize: 'M',
  quantity: 1,
  activeProduct: null,
  currentRoute: 'home',
  filters: {
    search: '',
    category: [],
    brand: '',
    size: '',
    priceMax: 6000
  },
  orders: JSON.parse(localStorage.getItem('ov_orders')) || [
    {
      orderId: 'OV-98172',
      date: '2026-07-10',
      items: [{ name: 'OV™ Heavyweight Tee - Onyx', qty: 1, price: 2499, color: 'White', size: 'L' }],
      total: 2499,
      status: 'shipped',
      trackingStep: 3,
      address: '24, Khader Nawaz Khan Road, Nungambakkam, Chennai - 600006'
    }
  ],
  heroBanners: (() => {
    try {
      const saved = localStorage.getItem('ov_hero_banners_v2') || localStorage.getItem('ov_hero_banners');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {}
    
    // Check legacy single hero banner
    let legacyBanner = null;
    try {
      const legacy = localStorage.getItem('ov_hero_banner');
      if (legacy) legacyBanner = JSON.parse(legacy);
    } catch(e) {}

    const firstBanner = (legacyBanner && legacyBanner.image) ? legacyBanner : {
      id: 'banner-grace-drop',
      image: 'images/product_beige_front_model.jpg',
      posX: 50,
      posY: 10,
      tag: 'NEW SEASON 2026 // LUXURY STREETWEAR',
      title: 'OVERSIZED HEAVYWEIGHT ESSENTIALS',
      desc: 'Engineered in 240 & 280 GSM combed compact cotton. Designed for an immaculate architectural boxy drape that never collapses.',
      btn1Text: 'SHOP ALL PIECES →',
      btn2Text: 'VIEW BESTSELLERS ↓'
    };

    return [
      firstBanner,
      {
        id: 'banner-noir-drop',
        image: 'images/antigravity_tshirts_float.jpg',
        posX: 50,
        posY: 25,
        tag: 'DROP 02 // BLACK LABEL EDITION',
        title: 'ARCHITECTURAL BOXY FIT 280 GSM',
        desc: 'Extreme heavyweight interlock structure with vintage mineral enzyme wash and zero-bacon bound collar.',
        btn1Text: 'EXPLORE DROP 02 →',
        btn2Text: 'VIEW THE LOOKBOOK ↓'
      }
    ];
  })(),
  get heroBanner() {
    return (this.heroBanners && this.heroBanners.length > 0) ? this.heroBanners[0] : null;
  },
  spotlights: (() => {
    try {
      const saved = localStorage.getItem('ov_spotlights');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [
      {
        id: 1,
        image: 'images/product_beige_front_model.jpg',
        title: 'OVERSIZED "GRACE" DUNE BEIGE',
        price: '₹999'
      },
      {
        id: 2,
        image: 'images/antigravity_tshirts_float.jpg',
        title: 'BOXY "NOIR" WASHED BLACK',
        price: '₹1,199'
      }
    ];
  })(),
  brandStory: (() => {
    try {
      const saved = localStorage.getItem('ov_brand_story');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      image: 'images/antigravity_showcase.jpg',
      badge: 'BORN IN TIRUPUR · 100% COMBED COTTON',
      title: 'STREETWEAR WITH ARCHITECTURAL SUBSTANCE',
      desc: 'Most modern t-shirts lose their shape after two washes or feel thin and clingy. At OV™, we rejected fast-fashion synthetics to engineer heavyweight cotton streetwear crafted with intention.'
    };
  })()
};

// SVG templates for icons and garments
const SVGS = {
  tee: (color = '#ffffff', stroke = '#000000') => `
    <svg viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <path d="M95 20 L120 8 C130 24 170 24 180 8 L205 20 L235 55 L210 90 L195 78 L195 320 L105 320 L105 78 L90 90 L65 55 Z" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
    </svg>`,
  hoodie: (color = '#111111', stroke = '#333333') => `
    <svg viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <path d="M150 4 C120 4 100 22 96 42 L70 30 L40 62 L64 96 L84 84 L84 320 L216 320 L216 84 L236 96 L260 62 L230 30 L204 42 C200 22 180 4 150 4 Z" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
      <path d="M118 40 Q150 70 182 40" stroke="${stroke}" stroke-width="1.4" fill="none"/>
      <circle cx="150" cy="150" r="3" fill="${stroke}"/>
    </svg>`,
  pants: (color = '#222222', stroke = '#444444') => `
    <svg viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <path d="M100 10 L200 10 L206 130 L235 320 L190 320 L160 150 L140 150 L110 320 L65 320 L94 130 Z" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
      <path d="M100 10 L200 10 L200 30 L100 30 Z" fill="${stroke}" opacity=".3"/>
    </svg>`,
  cap: (color = '#111111', stroke = '#333333') => `
    <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <path d="M60 140 C60 90 100 55 150 55 C200 55 240 90 240 140 Z" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
      <path d="M60 140 C40 145 20 150 4 152 C40 165 60 158 68 150 Z" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
      <path d="M150 55 L150 30" stroke="${stroke}" stroke-width="1.4"/>
    </svg>`,
  bag: (color = '#cccccc', stroke = '#888888') => `
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <path d="M70 100 L230 100 L245 280 L55 280 Z" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
      <path d="M110 100 C110 65 130 45 150 45 C170 45 190 65 190 100" stroke="${stroke}" stroke-width="1.5" fill="none"/>
    </svg>`
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  STATE.activeProduct = STATE.products[0];

  try { setupOpeningLoader(); } catch(e) { console.error("Loader Error: ", e); }
  try { setupCustomCursor(); } catch(e) { console.error("Cursor Error: ", e); }
  try { setupNavigation(); } catch(e) { console.error("Nav Error: ", e); }
  try { setupAnnouncements(); } catch(e) { console.error("Announce Error: ", e); }
  try { setupThreeJSReveal(); } catch(e) { console.error("ThreeJS Error: ", e); }
  try { setupLenisScroll(); } catch(e) { console.error("Lenis Error: ", e); }
  try { setupGSAPAnimations(); } catch(e) { console.error("GSAP Error: ", e); }
  try { setupEcommerce(); } catch(e) { console.error("Ecommerce Error: ", e); }
  try { setupSizeGuide(); } catch(e) { console.error("SizeGuide Error: ", e); }
  try { setupProductZoom(); } catch(e) { console.error("Zoom Error: ", e); }
  try { setupAccordions(); } catch(e) { console.error("Accordions Error: ", e); }
  try { renderHeroSlider(); } catch(e) { console.error("Slider Render Error: ", e); }
  try { renderLogoMarks(); } catch(e) { console.error("Logo Render Error: ", e); }
  try { setupPincodeChecker(); } catch(e) { console.error("Pincode Error: ", e); }
  try { setupCatalogSearchAndFilters(); } catch(e) { console.error("Filters Error: ", e); }

  // Render initial feeds
  try { initBannerDragEngine(); } catch(e) { console.error("Banner Drag Error: ", e); }
  try { renderStorefrontMedia(); } catch(e) { console.error("Storefront Media Error: ", e); }
  try { renderHomePageProducts(); } catch(e) { console.error("Homepage Products Error: ", e); }
  try { renderLookbookMarquee(); } catch(e) { console.error("Lookbook Marquee Error: ", e); }
  try { renderShopCatalog(); } catch(e) { console.error("Shop Catalog Error: ", e); }
  try { renderFeaturedGrid('featured-products-grid', STATE.products); } catch(e) { console.error(e); }
  try { updateCartBadge(); } catch(e) { console.error(e); }
  try { updateWishlistBadge(); } catch(e) { console.error(e); }

  // Fetch remote settings (slides, brand logo, custom products, etc.) to ensure 100% cross-browser consistency
  fetch('/api/settings')
    .then(r => r.json())
    .then(res => {
      if (res && res.success && res.data) {
        let rerenderSlider = false;
        const hasLocalSlides = !!localStorage.getItem('ov_custom_slides');
        if (Array.isArray(res.data.hero_slides) && res.data.hero_slides.length > 0) {
          if (!hasLocalSlides || res.data.custom_hero_slides_saved) {
            STATE.slides = res.data.hero_slides;
            try { localStorage.setItem('ov_custom_slides', JSON.stringify(STATE.slides)); } catch(e) {}
            rerenderSlider = true;
          }
        }
        const hasLocalLogo = !!localStorage.getItem('ov_custom_logo');
        if (res.data.brand_logo && (!hasLocalLogo || res.data.custom_brand_logo_saved)) {
          STATE.logo = res.data.brand_logo;
          try { localStorage.setItem('ov_custom_logo', JSON.stringify(STATE.logo)); } catch(e) {}
          renderLogoMarks();
        }
        if (rerenderSlider) {
          renderHeroSlider();
        }
        // Sync custom products from remote server if present
        if (Array.isArray(res.data.custom_products) && res.data.custom_products.length > 0) {
          const hasLocalProd = !!localStorage.getItem('ov_custom_products_v5');
          if (!hasLocalProd || res.data.custom_products_saved) {
            STATE.products = res.data.custom_products;
            try { localStorage.setItem('ov_custom_products_v5', JSON.stringify(STATE.products)); } catch(e) {}
            try { renderHomePageProducts(); } catch(e) {}
            try { renderLookbookMarquee(); } catch(e) {}
            try { renderShopCatalog(); } catch(e) {}
            try { renderFeaturedGrid('featured-products-grid', STATE.products); } catch(e) {}
            try { renderAdminDashboard(); } catch(e) {}
          }
        }
        // Sync custom hero banners from remote server if present
        if (Array.isArray(res.data.hero_banners) && res.data.hero_banners.length > 0) {
          const hasLocalBanners = !!localStorage.getItem('ov_hero_banners_v2');
          if (!hasLocalBanners || res.data.custom_hero_banners_saved) {
            STATE.heroBanners = res.data.hero_banners;
            try { localStorage.setItem('ov_hero_banners_v2', JSON.stringify(STATE.heroBanners)); } catch(e) {}
            try { renderStorefrontMedia(); } catch(e) {}
          }
        }
      }
    })
    .catch(() => {});

  // SPA Route Path/Hash check on boot
  try {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const hash = window.location.hash.replace('#', '');
    if (path === 'admin' || hash === 'admin') {
      setTimeout(() => navigateTo('admin'), 500);
    } else if (path === 'shop' || hash === 'shop') {
      setTimeout(() => navigateTo('shop'), 500);
    }
  } catch(e) {
    console.error("Routing Error: ", e);
  }
});

/* ==========================================================================
   1. Opening Loader Animation
   ========================================================================== */
function setupOpeningLoader() {
  const loader = document.getElementById('opening-loader');
  const body = document.body;

  body.classList.add('no-scroll');

  setTimeout(() => {
    loader.classList.add('loaded');
    body.classList.remove('no-scroll');
  }, 3200);
}

/* ==========================================================================
   2. Custom Cursor Follower
   ========================================================================== */
function setupCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';

  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.12 });
  });

  const interactives = 'a, button, .swatch, .size-btn, input, select, textarea, [onclick], .collection-card, .brand-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    }
  });
}

/* ==========================================================================
   3. Navigation, Page Switching (SPA router)
   ========================================================================== */
function setupNavigation() {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');

    if (currentScroll <= 0) {
      header.classList.remove('hide');
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
      header.classList.add('hide');
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
      header.classList.remove('hide');
    }
    lastScroll = currentScroll;
  });

  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileNavItems.forEach(n => n.classList.remove('active'));
      const target = item.getAttribute('data-route');
      item.classList.add('active');

      if (target === 'home') navigateTo('home');
      else if (target === 'shop') navigateTo('shop');
      else if (target === 'cart') toggleDrawer('cart-drawer');
      else if (target === 'wishlist') toggleDrawer('wishlist-drawer');
      else if (target === 'profile') {
        if (STATE.user) {
          openModal('profile-modal');
          renderProfileDetails();
        } else {
          openModal('auth-modal');
        }
      }
    });
  });
}

function navigateTo(route, productId = null) {
  const routes = document.querySelectorAll('.page-route');
  routes.forEach(r => r.classList.remove('active'));

  window.scrollTo({ top: 0, behavior: 'instant' });
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }

  if (route === 'home') {
    document.getElementById('home-page').classList.add('active');
    STATE.currentRoute = 'home';
  } else if (route === 'shop') {
    document.getElementById('shop-page').classList.add('active');
    STATE.currentRoute = 'shop';
    renderShopCatalog();
  } else if (route === 'product') {
    document.getElementById('product-page').classList.add('active');
    STATE.currentRoute = 'product';
    const prod = productId ? STATE.products.find(p => p.id === productId) : (STATE.activeProduct || STATE.products[0]);
    if (prod) {
      STATE.activeProduct = prod;
      renderProductDetailPage(prod);
    }
  } else if (route === 'admin') {
    document.getElementById('admin-page').classList.add('active');
    STATE.currentRoute = 'admin';
    checkAdminAuth();
  }

  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(n => {
    if (n.getAttribute('data-route') === route) n.classList.add('active');
    else n.classList.remove('active');
  });
}

/* ==========================================================================
   4. Announcement Rotator
   ========================================================================== */
function setupAnnouncements() {
  const slider = document.querySelector('.announcement-slider');
  const items = document.querySelectorAll('.announcement-item');
  let current = 0;

  if (slider && items.length > 0) {
    setInterval(() => {
      current = (current + 1) % items.length;
      slider.style.transform = `translateY(-${current * 32}px)`;
    }, 4000);
  }
}

/* ==========================================================================
   5. Hero Full-Bleed Slider (Iconic India Style)
   ========================================================================== */
function setupHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        changeSlide(i);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.slider-dot');

  // Change Slide Action
  function changeSlide(index) {
    if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');

    // Slide transition motion for luxury editorial overlay texts
    if (slides[currentSlide]) {
      const activeContent = slides[currentSlide].querySelector('.hero-slide-content');
      if (activeContent) {
        gsap.fromTo(activeContent, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
        );
      }
    }
  }

  // Next / Prev triggers
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      changeSlide(currentSlide - 1);
      resetAutoPlay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      changeSlide(currentSlide + 1);
      resetAutoPlay();
    });
  }

  // Auto cycling
  function startAutoPlay() {
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1);
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
  }

  changeSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   6. True Three.js WebGL 3D Virtual Atelier Engine
   ========================================================================== */
let studio3D = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  tshirtGroup: null,
  frontMesh: null,
  backMesh: null,
  pedestal: null,
  ringMesh: null,
  particles: null,
  lights: {
    spot: null,
    rim1: null,
    rim2: null,
    ambient: null
  },
  currentDrop: 'grace',
  isWireframe: false,
  textures: {}
};

function setupThreeJSReveal() {
  initThreeJSStudio();
}

function initThreeJSStudio() {
  const canvas = document.getElementById('threejs-webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 650;

  // 1. Scene
  studio3D.scene = new THREE.Scene();
  studio3D.scene.background = new THREE.Color(0x0c0c0e);
  studio3D.scene.fog = new THREE.FogExp2(0x0c0c0e, 0.035);

  // 2. Camera
  studio3D.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  studio3D.camera.position.set(0, 0.4, 5.2);

  // 3. Renderer
  studio3D.renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  studio3D.renderer.setSize(width, height);
  studio3D.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  studio3D.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  studio3D.renderer.toneMappingExposure = 1.1;
  studio3D.renderer.shadowMap.enabled = true;
  studio3D.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 4. OrbitControls
  if (typeof THREE.OrbitControls !== 'undefined') {
    studio3D.controls = new THREE.OrbitControls(studio3D.camera, canvas);
    studio3D.controls.enableDamping = true;
    studio3D.controls.dampingFactor = 0.05;
    studio3D.controls.minDistance = 3.0;
    studio3D.controls.maxDistance = 8.5;
    studio3D.controls.maxPolarAngle = Math.PI / 2 + 0.15;
    studio3D.controls.autoRotate = true;
    studio3D.controls.autoRotateSpeed = 1.0;
    studio3D.controls.target.set(0, 0.3, 0);
  }

  // 5. Lighting Setup
  studio3D.lights.ambient = new THREE.AmbientLight(0xffffff, 1.4);
  studio3D.scene.add(studio3D.lights.ambient);

  studio3D.lights.spot = new THREE.SpotLight(0xfff3e0, 3.8);
  studio3D.lights.spot.position.set(2, 6, 4);
  studio3D.lights.spot.angle = Math.PI / 4;
  studio3D.lights.spot.penumbra = 0.6;
  studio3D.lights.spot.castShadow = true;
  studio3D.scene.add(studio3D.lights.spot);

  studio3D.lights.rim1 = new THREE.DirectionalLight(0xb8975a, 2.2);
  studio3D.lights.rim1.position.set(-4, 3, -3);
  studio3D.scene.add(studio3D.lights.rim1);

  studio3D.lights.rim2 = new THREE.DirectionalLight(0x7090ff, 1.4);
  studio3D.lights.rim2.position.set(4, 2, -2);
  studio3D.scene.add(studio3D.lights.rim2);

  // 6. Texture Loader
  const textureLoader = new THREE.TextureLoader();
  studio3D.textures = {
    graceFront: textureLoader.load('images/product_beige_front_flat.jpg'),
    graceBack: textureLoader.load('images/product_beige_back_flat.jpg'),
    noirFloat: textureLoader.load('images/antigravity_tshirts_float.jpg'),
    noirShowcase: textureLoader.load('images/antigravity_showcase.jpg')
  };

  // 7. Architectural Pedestal
  const pedestalGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.4, 48);
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x141418,
    roughness: 0.7,
    metalness: 0.3
  });
  studio3D.pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
  studio3D.pedestal.position.set(0, -1.8, 0);
  studio3D.pedestal.receiveShadow = true;
  studio3D.scene.add(studio3D.pedestal);

  // Pedestal Glowing Rim Ring
  const ringGeo = new THREE.TorusGeometry(2.22, 0.025, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xb8975a,
    emissive: 0xb8975a,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8
  });
  studio3D.ringMesh = new THREE.Mesh(ringGeo, ringMat);
  studio3D.ringMesh.rotation.x = Math.PI / 2;
  studio3D.ringMesh.position.set(0, -1.6, 0);
  studio3D.scene.add(studio3D.ringMesh);

  // 8. Procedural 3D Streetwear Garment Group
  studio3D.tshirtGroup = new THREE.Group();
  studio3D.tshirtGroup.position.set(0, 0.3, 0);

  // Front Panel
  const frontGeo = new THREE.PlaneGeometry(2.1, 2.6, 16, 16);
  // Give subtle boxy curve
  const pos = frontGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = Math.cos((x / 1.05) * (Math.PI / 3)) * 0.15 - 0.1;
    pos.setZ(i, z);
  }
  frontGeo.computeVertexNormals();

  const frontMat = new THREE.MeshStandardMaterial({
    map: studio3D.textures.graceFront,
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.FrontSide
  });
  studio3D.frontMesh = new THREE.Mesh(frontGeo, frontMat);
  studio3D.frontMesh.position.set(0, 0, 0.08);
  studio3D.frontMesh.castShadow = true;
  studio3D.tshirtGroup.add(studio3D.frontMesh);

  // Back Panel
  const backGeo = new THREE.PlaneGeometry(2.1, 2.6, 16, 16);
  const backPos = backGeo.attributes.position;
  for (let i = 0; i < backPos.count; i++) {
    const x = backPos.getX(i);
    const z = -Math.cos((x / 1.05) * (Math.PI / 3)) * 0.15 + 0.1;
    backPos.setZ(i, z);
  }
  backGeo.computeVertexNormals();

  const backMat = new THREE.MeshStandardMaterial({
    map: studio3D.textures.graceBack,
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.BackSide
  });
  studio3D.backMesh = new THREE.Mesh(backGeo, backMat);
  studio3D.backMesh.position.set(0, 0, -0.08);
  studio3D.tshirtGroup.add(studio3D.backMesh);

  // Architectural Hanger Bar
  const hangerGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.2, 16);
  const hangerMat = new THREE.MeshStandardMaterial({
    color: 0x222226,
    metalness: 0.85,
    roughness: 0.2
  });
  const hanger = new THREE.Mesh(hangerGeo, hangerMat);
  hanger.rotation.z = Math.PI / 2;
  hanger.position.set(0, 1.34, 0);
  studio3D.tshirtGroup.add(hanger);

  studio3D.scene.add(studio3D.tshirtGroup);

  // 9. Floating Atmosphere Dust Particles
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 8;
    particlePositions[i + 1] = (Math.random() - 0.5) * 6;
    particlePositions[i + 2] = (Math.random() - 0.5) * 8;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xb8975a,
    size: 0.035,
    transparent: true,
    opacity: 0.55
  });
  studio3D.particles = new THREE.Points(particleGeo, particleMat);
  studio3D.scene.add(studio3D.particles);

  // 10. Responsive resize
  window.addEventListener('resize', onStudioResize);

  // 11. Animation Render Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    if (studio3D.controls) {
      studio3D.controls.update();
    }

    // Subtle breathing/floating motion
    if (studio3D.tshirtGroup) {
      studio3D.tshirtGroup.position.y = 0.3 + Math.sin(elapsed * 1.5) * 0.06;
    }

    // Particles slow drift
    if (studio3D.particles) {
      studio3D.particles.rotation.y = elapsed * 0.02;
    }

    studio3D.renderer.render(studio3D.scene, studio3D.camera);
  }
  animate();
}

function onStudioResize() {
  const canvas = document.getElementById('threejs-webgl-canvas');
  if (!canvas || !studio3D.renderer || !studio3D.camera) return;
  const container = canvas.parentElement;
  const w = container.clientWidth || 800;
  const h = container.clientHeight || 650;
  studio3D.camera.aspect = w / h;
  studio3D.camera.updateProjectionMatrix();
  studio3D.renderer.setSize(w, h);
}

function switch3DStudioDrop(drop) {
  studio3D.currentDrop = drop;
  const btnGrace = document.getElementById('studio-btn-grace');
  const btnNoir = document.getElementById('studio-btn-noir');
  const specsTag = document.getElementById('studio-specs-drop-tag');
  const specsName = document.getElementById('studio-specs-name');
  const specsPrice = document.getElementById('studio-specs-price');

  if (drop === 'grace') {
    if (btnGrace) { btnGrace.classList.add('gold', 'active'); }
    if (btnNoir) { btnNoir.classList.remove('gold', 'active'); }
    if (studio3D.frontMesh) studio3D.frontMesh.material.map = studio3D.textures.graceFront;
    if (studio3D.backMesh) studio3D.backMesh.material.map = studio3D.textures.graceBack;
    if (studio3D.ringMesh) studio3D.ringMesh.material.color.setHex(0xb8975a);
    if (specsTag) specsTag.textContent = 'DROP 01 · IN STOCK';
    if (specsName) specsName.textContent = 'GRACE DUNE BEIGE';
    if (specsPrice) specsPrice.innerHTML = '₹999 <span style="font-size:0.8rem; text-decoration:line-through; opacity:0.5; margin-left:6px;">₹2,999</span>';
    set3DStudioLight('golden');
  } else {
    if (btnNoir) { btnNoir.classList.add('gold', 'active'); }
    if (btnGrace) { btnGrace.classList.remove('gold', 'active'); }
    if (studio3D.frontMesh) studio3D.frontMesh.material.map = studio3D.textures.noirFloat;
    if (studio3D.backMesh) studio3D.backMesh.material.map = studio3D.textures.noirShowcase;
    if (studio3D.ringMesh) studio3D.ringMesh.material.color.setHex(0x555566);
    if (specsTag) specsTag.textContent = 'DROP 02 · ANTIGRAVITY';
    if (specsName) specsName.textContent = 'NOIR WASHED BLACK';
    if (specsPrice) specsPrice.innerHTML = '₹1,199 <span style="font-size:0.8rem; text-decoration:line-through; opacity:0.5; margin-left:6px;">₹3,499</span>';
    set3DStudioLight('noir');
  }
  if (studio3D.frontMesh) studio3D.frontMesh.material.needsUpdate = true;
  if (studio3D.backMesh) studio3D.backMesh.material.needsUpdate = true;
}

function set3DStudioCamera(angle) {
  if (!studio3D.camera || !studio3D.controls) return;
  const btns = ['cam-angle-front', 'cam-angle-back', 'cam-angle-iso', 'cam-angle-collar'];
  btns.forEach(b => {
    const el = document.getElementById(b);
    if (el) el.classList.remove('active');
  });
  const activeEl = document.getElementById(`cam-angle-${angle}`);
  if (activeEl) activeEl.classList.add('active');

  studio3D.controls.autoRotate = false;

  let targetPos = { x: 0, y: 0.4, z: 5.2 };
  if (angle === 'front') targetPos = { x: 0, y: 0.4, z: 5.2 };
  if (angle === 'back') targetPos = { x: 0, y: 0.4, z: -5.2 };
  if (angle === 'iso') targetPos = { x: 3.6, y: 2.2, z: 3.8 };
  if (angle === 'collar') targetPos = { x: 0, y: 1.4, z: 2.4 };

  if (typeof gsap !== 'undefined') {
    gsap.to(studio3D.camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => studio3D.controls.update()
    });
  } else {
    studio3D.camera.position.set(targetPos.x, targetPos.y, targetPos.z);
    studio3D.controls.update();
  }
}

function set3DStudioLight(mode) {
  const btns = ['light-mode-studio', 'light-mode-noir', 'light-mode-golden'];
  btns.forEach(b => {
    const el = document.getElementById(b);
    if (el) el.classList.remove('active');
  });
  const activeEl = document.getElementById(`light-mode-${mode}`);
  if (activeEl) activeEl.classList.add('active');

  if (!studio3D.lights.spot) return;

  if (mode === 'studio') {
    studio3D.scene.background.setHex(0x111114);
    studio3D.lights.spot.color.setHex(0xffffff);
    studio3D.lights.spot.intensity = 4.2;
    studio3D.lights.rim1.color.setHex(0xffffff);
    studio3D.lights.rim2.color.setHex(0xcccccc);
    studio3D.lights.ambient.intensity = 1.8;
  } else if (mode === 'noir') {
    studio3D.scene.background.setHex(0x08080a);
    studio3D.lights.spot.color.setHex(0xe6f0ff);
    studio3D.lights.spot.intensity = 3.0;
    studio3D.lights.rim1.color.setHex(0x6080ff);
    studio3D.lights.rim2.color.setHex(0xb8975a);
    studio3D.lights.ambient.intensity = 0.9;
  } else if (mode === 'golden') {
    studio3D.scene.background.setHex(0x0e0d0c);
    studio3D.lights.spot.color.setHex(0xffebc2);
    studio3D.lights.spot.intensity = 3.6;
    studio3D.lights.rim1.color.setHex(0xd4af37);
    studio3D.lights.rim2.color.setHex(0xff9944);
    studio3D.lights.ambient.intensity = 1.4;
  }
}

function toggle3DWireframe() {
  studio3D.isWireframe = !studio3D.isWireframe;
  const btn = document.getElementById('wireframe-toggle-btn');
  if (btn) {
    btn.textContent = studio3D.isWireframe ? 'Wireframe: ON' : 'Wireframe: OFF';
    if (studio3D.isWireframe) btn.classList.add('active');
    else btn.classList.remove('active');
  }
  if (studio3D.frontMesh) studio3D.frontMesh.material.wireframe = studio3D.isWireframe;
  if (studio3D.backMesh) studio3D.backMesh.material.wireframe = studio3D.isWireframe;
}

function quickAddToCartFromStudio() {
  const prodId = studio3D.currentDrop === 'grace' ? 'ov-tee-grace-beige' : 'ov-tee-noir-black';
  const prod = STATE.products.find(p => p.id === prodId) || STATE.products[0];
  addToCart(prod, 'M', 1);
  toggleDrawer('cart-drawer');
  showNotification(`ADDED ${prod.baseName.toUpperCase()} (SIZE M) TO BAG`);
}

/* ==========================================================================
   Interactive Standard E-Commerce Product Card & Quick Actions
   ========================================================================== */
const selectedCardSizes = {
  'ov-tee-grace-beige': 'M',
  'ov-tee-noir-black': 'M'
};

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const navHeight = 70;
  const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

function selectCardSize(prodId, size, btn) {
  selectedCardSizes[prodId] = size;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.card-size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function addCardProductToBag(prodId, btn) {
  const size = selectedCardSizes[prodId] || 'M';
  const prod = STATE.products.find(p => p.id === prodId) || (prodId === 'ov-tee-noir-black' ? STATE.products[1] : STATE.products[0]);
  if (!prod) return;

  addToCart(prod, size, 1);
  toggleDrawer('cart-drawer');
  showNotification(`ADDED ${prod.baseName.toUpperCase()} (SIZE ${size}) TO BAG`);

  if (btn) {
    const origText = btn.textContent;
    btn.textContent = '✓ ADDED';
    setTimeout(() => { btn.textContent = origText; }, 1400);
  }
}

function openTrackOrderModal() {
  const container = document.getElementById('track-order-modal-body');
  if (container) {
    container.innerHTML = `
      <div style="padding: 10px 0;">
        <div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px;">TRACK YOUR DISPATCH & AWB</div>
        <p style="font-size: 0.82rem; color: var(--medium-gray); margin-bottom: 20px; line-height: 1.5;">
          Enter your <strong>OV Order Number</strong> (e.g. <code>OV-10006</code>) to fetch live Shiprocket courier status, tracking scans, and expected delivery date.
        </p>
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <input type="text" id="manual-track-order-number" placeholder="ENTER ORDER # (e.g. OV-10006)" class="auth-input" style="flex: 1; text-transform: uppercase; padding: 12px 16px;">
          <button class="luxury-btn gold-btn" style="padding: 0 24px; font-size: 0.75rem;" onclick="const val = document.getElementById('manual-track-order-number').value.trim(); if(val) trackSpecificOrder(val); else showNotification('PLEASE ENTER AN ORDER NUMBER');">
            TRACK
          </button>
        </div>
        <div style="font-size: 0.75rem; color: #888;">
          💡 Need assistance? Contact our central dispatch desk at <strong>support@originalversion.in</strong>
        </div>
      </div>
    `;
  }
  openModal('track-order-modal');
}

/* ==========================================================================
   7. Lenis Smooth Scroll Setup
   ========================================================================== */
let lenis = null;
function setupLenisScroll() {
  // Disabled Lenis Smooth Scroll to prevent mouse wheel lockout.
  // Browser handles scrolling natively, which is 100% reliable.
}

/* ==========================================================================
   8. GSAP Scroll Trigger Animations
   ========================================================================== */
function setupGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Word-by-word Story Section Reveal
  const storyHeading = document.querySelector('.story-heading');
  if (storyHeading) {
    const text = storyHeading.innerText;
    storyHeading.innerHTML = '';
    
    const words = text.split(/\s+/);
    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'story-word';
      span.innerText = word + ' ';
      storyHeading.appendChild(span);
    });

    gsap.to('.story-word', {
      scrollTrigger: {
        trigger: '.story-section',
        start: 'top 75%',
        end: 'bottom 50%',
        scrub: true,
      },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      color: '#000000',
      duration: 1
    });
  }

  // Fabric Macro Zoom Scroll
  const fabricBg = document.querySelector('.fabric-zoom-bg');
  if (fabricBg) {
    gsap.to(fabricBg, {
      scrollTrigger: {
        trigger: '.fabric-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      scale: 1.05,
      yPercent: 10,
      ease: "none"
    });
  }

  // Craftsmanship Timeline Scroller
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 70%',
      end: 'bottom 40%',
      onEnter: () => {
        item.classList.add('active');
        updateTimelineProgress(index);
      },
      onLeaveBack: () => {
        item.classList.remove('active');
        updateTimelineProgress(index - 1);
      }
    });
  });

  // Staggered fade-ins for brands grid
  gsap.from('.brand-card', {
    scrollTrigger: {
      trigger: '.brands-section',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
  });

  // Staggered fade-ins for offers portal cards
  gsap.from('.promo-card', {
    scrollTrigger: {
      trigger: '.promo-portal-section',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    stagger: 0.12,
    duration: 0.8,
    ease: "power3.out"
  });
}

function updateTimelineProgress(activeIndex) {
  const progressBar = document.querySelector('.timeline-progress');
  if (!progressBar) return;
  const items = document.querySelectorAll('.timeline-item');
  
  if (activeIndex < 0) {
    progressBar.style.height = '0%';
    return;
  }
  
  const percentage = (activeIndex / (items.length - 1)) * 100;
  progressBar.style.height = `${percentage}%`;
}

/* ==========================================================================
   9. E-Commerce Core Logic (Cart, Wishlist, Coupons, Wallet, Checkout)
   ========================================================================== */
function setupEcommerce() {
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      if (!STATE.activeProduct) return;
      addToCart(STATE.activeProduct.id, STATE.activeColor, STATE.activeSize, STATE.quantity);
      toggleDrawer('cart-drawer');
    });
  }

  const wishlistBtn = document.getElementById('detail-wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (!STATE.activeProduct) return;
      toggleWishlist(STATE.activeProduct.id);
      wishlistBtn.classList.toggle('active');
    });
  }

  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.activeSize = btn.getAttribute('data-size');
    });
  });

  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyVal = document.getElementById('qty-value');

  if (qtyMinus && qtyPlus && qtyVal) {
    qtyMinus.addEventListener('click', () => {
      if (STATE.quantity > 1) {
        STATE.quantity--;
        qtyVal.value = STATE.quantity;
      }
    });

    qtyPlus.addEventListener('click', () => {
      STATE.quantity++;
      qtyVal.value = STATE.quantity;
    });
  }
}

function addToCart(productOrId, arg1, arg2, arg3) {
  const prodId = (typeof productOrId === 'object' && productOrId) ? productOrId.id : productOrId;
  const item = STATE.products.find(p => p.id === prodId);
  if (!item) return;

  let color = item.color || 'Standard';
  let size = 'M';
  let qty = 1;

  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    color = arg1;
    size = arg2;
    qty = typeof arg3 === 'number' ? arg3 : 1;
  } else if (typeof arg1 === 'string' && typeof arg2 === 'number') {
    size = arg1;
    qty = arg2;
  } else if (typeof arg1 === 'string') {
    size = arg1;
  }

  const existingItemIndex = STATE.cart.findIndex(i => i.id === item.id && i.size === size);

  if (existingItemIndex > -1) {
    STATE.cart[existingItemIndex].qty += qty;
  } else {
    STATE.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.type,
      color: color,
      size: size,
      qty: qty
    });
  }

  localStorage.setItem('ov_cart', JSON.stringify(STATE.cart));
  updateCartBadge();
  renderCartDrawer();
  showNotification('ADDED TO BAG');
}

function removeFromCart(productId, color, size) {
  STATE.cart = STATE.cart.filter(item => !(item.id === productId && item.color === color && item.size === size));
  localStorage.setItem('ov_cart', JSON.stringify(STATE.cart));
  updateCartBadge();
  renderCartDrawer();
  showNotification('REMOVED FROM BAG');
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.bag-count');
  const totalItems = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(b => {
    b.textContent = totalItems;
    b.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

function toggleWishlist(productId) {
  const index = STATE.wishlist.indexOf(productId);
  if (index > -1) {
    STATE.wishlist.splice(index, 1);
    showNotification('REMOVED FROM WISHLIST');
  } else {
    STATE.wishlist.push(productId);
    showNotification('ADDED TO WISHLIST');
  }
  localStorage.setItem('ov_wishlist', JSON.stringify(STATE.wishlist));
  updateWishlistBadge();
  renderWishlistDrawer();
}

function updateWishlistBadge() {
  const heartIcon = document.getElementById('wishlist-nav-btn');
  if (heartIcon) {
    heartIcon.style.color = STATE.wishlist.length > 0 ? '#b8975a' : 'inherit';
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  container.innerHTML = '';
  
  if (STATE.cart.length === 0) {
    container.innerHTML = `<div style="text-align: center; margin-top: 80px; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.15em;">BAG IS EMPTY</div>`;
    updateCartSummary();
    return;
  }

  STATE.cart.forEach(item => {
    const itemCard = document.createElement('div');
    itemCard.className = 'cart-item';
    const productObj = STATE.products.find(p => p.id === item.id);
    const imgUrl = productObj ? productObj.image : 'images/model1.jpg';
    itemCard.innerHTML = `
      <div class="cart-item-visual" style="padding:0;">
        <img src="${imgUrl}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size} / Color: ${item.color}</div>
        <div class="cart-item-price-row">
          <div class="cart-item-qty">QTY: ${item.qty} × ₹${item.price.toLocaleString('en-IN')}</div>
          <span class="cart-item-remove" onclick="removeFromCart('${item.id}', '${item.color}', '${item.size}')">REMOVE</span>
        </div>
      </div>
    `;
    container.appendChild(itemCard);
  });

  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.12);
  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 150;
  
  let discount = 0;
  if (STATE.appliedCoupon) {
    if (STATE.appliedCoupon.type === 'percent') {
      discount = Math.round(subtotal * (STATE.appliedCoupon.value / 100));
    } else {
      discount = STATE.appliedCoupon.value;
    }
  }

  const grandTotal = subtotal + tax + shipping - discount;

  const rowSubtotal = document.getElementById('cart-subtotal');
  const rowShipping = document.getElementById('cart-shipping');
  const rowTax = document.getElementById('cart-tax');
  const rowDiscount = document.getElementById('cart-discount-row');
  const txtDiscount = document.getElementById('cart-discount-value');
  const rowTotal = document.getElementById('cart-total');

  if (rowSubtotal) rowSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (rowShipping) rowShipping.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (rowTax) rowTax.textContent = `₹${tax.toLocaleString('en-IN')}`;
  if (rowTotal) rowTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  if (STATE.appliedCoupon && rowDiscount && txtDiscount) {
    rowDiscount.style.display = 'flex';
    txtDiscount.textContent = `- ₹${discount.toLocaleString('en-IN')}`;
  } else if (rowDiscount) {
    rowDiscount.style.display = 'none';
  }
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  container.innerHTML = '';
  
  if (STATE.wishlist.length === 0) {
    container.innerHTML = `<div style="text-align: center; margin-top: 80px; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.15em;">WISHLIST IS EMPTY</div>`;
    return;
  }

  STATE.wishlist.forEach(id => {
    const item = STATE.products.find(p => p.id === id);
    if (!item) return;

    const itemCard = document.createElement('div');
    itemCard.className = 'cart-item';
    itemCard.innerHTML = `
      <div class="cart-item-visual" style="padding:0;">
        <img src="${item.image}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">₹${item.price.toLocaleString('en-IN')}</div>
        <div class="cart-item-price-row" style="margin-top: 15px;">
          <span class="cart-item-remove" style="text-decoration: none; color: black; font-weight: 600;" onclick="wishlistToCart('${item.id}')">ADD TO BAG</span>
          <span class="cart-item-remove" onclick="toggleWishlist('${item.id}')">REMOVE</span>
        </div>
      </div>
    `;
    container.appendChild(itemCard);
  });
}

function wishlistToCart(productId) {
  addToCart(productId, 'White', 'M', 1);
  toggleWishlist(productId);
}

function applyPromoCoupon() {
  const input = document.getElementById('checkout-coupon-input');
  if (!input) return;
  const val = input.value.trim().toUpperCase();

  if (val === 'WELCOME500') {
    STATE.appliedCoupon = { code: 'WELCOME500', type: 'fixed', value: 500 };
    showNotification('COUPON APPLIED: WELCOME500 (-₹500)');
  } else if (val === 'ORIGINAL10') {
    STATE.appliedCoupon = { code: 'ORIGINAL10', type: 'percent', value: 10 };
    showNotification('COUPON APPLIED: ORIGINAL10 (-10%)');
  } else {
    showNotification('INVALID COUPON CODE');
    STATE.appliedCoupon = null;
  }

  updateCartSummary();
  renderCheckoutSummary();
}

/* ==========================================================================
   10. Delivery Pincode Lookup (India Metro Logic)
   ========================================================================== */
function setupPincodeChecker() {
  const pincodeBtn = document.getElementById('check-pincode-btn');
  const pincodeInput = document.getElementById('checkout-pincode-input');
  const resultDiv = document.getElementById('pincode-check-result');

  if (!pincodeBtn || !pincodeInput || !resultDiv) return;

  pincodeBtn.addEventListener('click', () => {
    const code = pincodeInput.value.trim();

    if (!/^\d{6}$/.test(code)) {
      resultDiv.className = 'pincode-result error';
      resultDiv.style.display = 'block';
      resultDiv.textContent = 'PLEASE ENTER A VALID 6-DIGIT INDIAN PINCODE (e.g. 600006)';
      return;
    }

    // Metro Area Prefix Checking (Chennai, Bangalore, Mumbai, Delhi, etc.)
    const isMetro = ['600', '560', '400', '110', '700', '500'].some(prefix => code.startsWith(prefix));
    const isRemote = ['799', '190', '744'].some(prefix => code.startsWith(prefix));

    resultDiv.className = 'pincode-result success';
    resultDiv.style.display = 'block';

    if (isMetro) {
      resultDiv.innerHTML = `EXPRESS DELIVERY AVAILABLE<br>• Estimated Delivery: <strong>2 Days (Metro Fast-track)</strong><br>• Cash on Delivery (COD) Available`;
    } else if (isRemote) {
      resultDiv.innerHTML = `STANDARD DELIVERY AVAILABLE<br>• Estimated Delivery: <strong>7-9 Days (Remote Location)</strong><br>• Prepaid Orders Only (COD Not Available)`;
    } else {
      resultDiv.innerHTML = `STANDARD SHIPPING AVAILABLE<br>• Estimated Delivery: <strong>4-5 Days</strong><br>• Cash on Delivery (COD) Available`;
    }
  });
}

/* ==========================================================================
   11. Smart Catalog Search & Filter Engine (Iconic India Style Sidebar)
   ========================================================================== */
function setupCatalogSearchAndFilters() {
  const searchInput = document.getElementById('catalog-search-bar');
  const priceSlider = document.getElementById('catalog-price-slider');
  const priceValueText = document.getElementById('catalog-price-slider-value');
  const activeBrandText = document.getElementById('catalog-active-brand-indicator');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.filters.search = e.target.value.trim();
      filterCatalogProducts();
    });
  }

  if (priceSlider && priceValueText) {
    priceSlider.addEventListener('input', (e) => {
      STATE.filters.priceMax = parseInt(e.target.value);
      priceValueText.textContent = `₹${STATE.filters.priceMax.toLocaleString('en-IN')}`;
      filterCatalogProducts();
    });
  }
}

// Brand Segment routing from Home Grid
function routeAndFilterByBrand(brandName) {
  STATE.filters.brand = brandName;
  
  // Show active indicator on shop catalog
  const activeBrandText = document.getElementById('catalog-active-brand-indicator');
  const wrapperIndicator = document.getElementById('catalog-brand-indicator-wrapper');
  if (activeBrandText && wrapperIndicator) {
    activeBrandText.textContent = brandName.toUpperCase();
    wrapperIndicator.style.display = 'flex';
  }

  navigateTo('shop');
  filterCatalogProducts();
}

function clearBrandFilter() {
  STATE.filters.brand = '';
  const wrapperIndicator = document.getElementById('catalog-brand-indicator-wrapper');
  if (wrapperIndicator) wrapperIndicator.style.display = 'none';
  filterCatalogProducts();
}

// Toggles individual filters in sidebar (Categories and Sizes)
function toggleSidebarFilterCheckbox(element, type, value) {
  if (type === 'category') {
    if (element.checked) {
      STATE.filters.category.push(value);
    } else {
      STATE.filters.category = STATE.filters.category.filter(v => v !== value);
    }
  }
  filterCatalogProducts();
}

function toggleSidebarFilterSize(element, sizeValue) {
  const sizeBtns = document.querySelectorAll('.catalog-filter-size-btn');
  
  if (element.classList.contains('active')) {
    element.classList.remove('active');
    STATE.filters.size = '';
  } else {
    sizeBtns.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    STATE.filters.size = sizeValue;
  }
  
  filterCatalogProducts();
}

function filterCatalogProducts() {
  let filtered = [...STATE.products];

  // 1. Brand check
  if (STATE.filters.brand) {
    filtered = filtered.filter(p => p.brand === STATE.filters.brand);
  }

  // 2. Search check
  if (STATE.filters.search) {
    const q = STATE.filters.search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }

  // 3. Category checkboxes
  if (STATE.filters.category.length > 0) {
    filtered = filtered.filter(p => STATE.filters.category.includes(p.type));
  }

  // 4. Size check
  if (STATE.filters.size) {
    filtered = filtered.filter(p => p.sizes.includes(STATE.filters.size) || p.sizes.includes('O/S'));
  }

  // 5. Price check
  filtered = filtered.filter(p => p.price <= STATE.filters.priceMax);

  renderProductGrid('shop-catalog-grid', filtered);
  
  // Update result count
  const countText = document.getElementById('catalog-items-found-count');
  if (countText) {
    countText.textContent = `${filtered.length} ORIGINALS FOUND`;
  }
}

// Render dynamic grid for Shop Catalog
function renderShopCatalog() {
  // Clear search filters
  const searchInput = document.getElementById('catalog-search-bar');
  if (searchInput) searchInput.value = '';
  STATE.filters.search = '';

  filterCatalogProducts();
}

/* ==========================================================================
   12. Size Guide & Smart Size Recommendation Engine
   ========================================================================== */
function setupSizeGuide() {
  const heightInput = document.getElementById('user-height');
  const weightInput = document.getElementById('user-weight');
  const getRecommendBtn = document.getElementById('get-size-recommend');
  const resultText = document.getElementById('recommend-size-result');

  if (getRecommendBtn && resultText) {
    getRecommendBtn.addEventListener('click', () => {
      const height = parseFloat(heightInput.value);
      const weight = parseFloat(weightInput.value);

      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultText.style.display = 'block';
        resultText.style.color = '#a03c3c';
        resultText.textContent = 'PLEASE ENTER VALID DETAILS';
        return;
      }

      let size = 'M';
      if (height < 165) {
        size = weight < 60 ? 'XS' : 'S';
      } else if (height >= 165 && height < 178) {
        size = weight < 70 ? 'S' : (weight < 82 ? 'M' : 'L');
      } else {
        size = weight < 80 ? 'L' : (weight < 95 ? 'XL' : 'XXL');
      }

      resultText.style.display = 'block';
      resultText.style.color = '#000';
      resultText.innerHTML = `WE RECOMMEND SIZE <strong>${size}</strong> FOR A COMFORTABLE BOXY FIT.`;
    });
  }
}

/* ==========================================================================
   13. PDP Interactive Zoom & Visual controls
   ========================================================================== */
function setupProductZoom() {
  const mainImageContainer = document.querySelector('.gallery-main');
  const zoomOverlay = document.querySelector('.zoom-overlay');

  if (mainImageContainer && zoomOverlay) {
    mainImageContainer.addEventListener('mousemove', (e) => {
      const rect = mainImageContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      zoomOverlay.style.backgroundPosition = `${x}% ${y}%`;
    });
  }
}

/* ==========================================================================
   14. Product detail accordions
   ========================================================================== */
function setupAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(h => {
    h.addEventListener('click', () => {
      const item = h.parentElement;
      item.classList.toggle('active');
    });
  });
}

/* ==========================================================================
   15. Profile and Auth Mock Implementation
   ========================================================================== */
function simulateOTP() {
  const emailInput = document.getElementById('auth-email-input');
  if (!emailInput || !emailInput.value) {
    showNotification('PLEASE ENTER EMAIL ADDRESS');
    return;
  }

  const otpInput = document.getElementById('auth-otp-input-field');
  const otpTitle = document.getElementById('auth-otp-title');
  if (otpInput && otpTitle) {
    otpInput.style.display = 'block';
    otpTitle.textContent = 'CHECK YOUR EMAIL FOR 4-DIGIT OTP';
    showNotification('OTP SENT TO ' + emailInput.value.toUpperCase());
  }
}

function handleLoginSubmit() {
  const emailInput = document.getElementById('auth-email-input');
  if (!emailInput.value) return;

  const username = emailInput.value.split('@')[0].toUpperCase();
  STATE.user = {
    username: username,
    email: emailInput.value.toLowerCase(),
    joinedDate: '2026-07-17'
  };

  localStorage.setItem('ov_user', JSON.stringify(STATE.user));
  closeModal('auth-modal');
  showNotification('WELCOME BACK, ' + username);
  renderProfileDetails();
}

function handleLogout() {
  STATE.user = null;
  localStorage.removeItem('ov_user');
  closeModal('profile-modal');
  showNotification('LOGGED OUT SUCCESSFUL');
}

function renderProfileDetails() {
  if (!STATE.user) return;
  const userNameText = document.getElementById('profile-name-text');
  const userEmailText = document.getElementById('profile-email-text');
  const walletAmountText = document.getElementById('profile-wallet-balance');
  const loyaltyPointsText = document.getElementById('profile-loyalty-points');

  if (userNameText) userNameText.textContent = STATE.user.username;
  if (userEmailText) userEmailText.textContent = STATE.user.email;
  if (walletAmountText) walletAmountText.textContent = `₹${STATE.walletBalance}`;
  if (loyaltyPointsText) loyaltyPointsText.textContent = `${STATE.loyaltyPoints} PTS`;

  renderOrderHistoryTable();
}

function renderOrderHistoryTable() {
  const table = document.getElementById('profile-orders-list');
  if (!table) return;

  table.innerHTML = '';
  if (STATE.orders.length === 0) {
    table.innerHTML = `<div style="text-align: center; padding: 20px; opacity: 0.5;">NO ORDERS PLACED YET</div>`;
    return;
  }

  STATE.orders.forEach(order => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.borderBottom = '1px solid rgba(0,0,0,0.06)';
    row.style.padding = '15px 0';
    row.innerHTML = `
      <div>
        <div style="font-weight:600; font-size: 0.9rem;">${order.orderId}</div>
        <div style="font-size:0.75rem; color: #777;">${order.date} · ${order.items[0].name}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight:600;">₹${order.total.toLocaleString('en-IN')}</div>
        <div style="font-size:0.75rem; display: flex; gap: 10px; justify-content: flex-end;">
          <span style="color:#b8975a; cursor:pointer;" onclick="trackSpecificOrder('${order.orderId}')">TRACK</span>
          <span style="text-decoration:underline; cursor:pointer;" onclick="downloadPdfInvoice('${order.orderId}')">PDF</span>
        </div>
      </div>
    `;
    table.appendChild(row);
  });
}

/* ==========================================================================
   16. Checkout flow and Payment Simulation
   ========================================================================== */
function startCheckout() {
  if (STATE.cart.length === 0) {
    showNotification('YOUR BAG IS EMPTY');
    return;
  }
  toggleDrawer('cart-drawer');
  openModal('checkout-modal');
  renderCheckoutSummary();
}

function selectPaymentMethod(element, name) {
  const cards = document.querySelectorAll('.payment-option-card');
  cards.forEach(c => c.classList.remove('active'));
  element.classList.add('active');
  STATE.paymentMethod = name;
}

async function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-list');
  if (!container) return;

  container.innerHTML = '';
  STATE.cart.forEach(item => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.marginBottom = '12px';
    row.innerHTML = `
      <div style="font-size: 0.85rem;">${item.name} (${item.size || 'M'}) × ${item.qty}</div>
      <div style="font-size: 0.85rem; font-weight: 500;">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
    `;
    container.appendChild(row);
  });

  const pincodeInput = document.getElementById('checkout-pincode-input');
  const pincode = pincodeInput ? pincodeInput.value.trim() : '';

  // Calculate quote via Server API
  try {
    const itemsPayload = STATE.cart.map(i => ({
      variant_id: i.variant_id || (i.size ? `var-grace-${i.size.toLowerCase()}` : 'var-grace-m'),
      quantity: i.qty
    }));

    const res = await fetch('/api/checkout/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: itemsPayload,
        coupon_code: STATE.appliedCoupon ? (STATE.appliedCoupon.code || STATE.appliedCoupon) : null,
        payment_method: STATE.paymentMethod || 'UPI',
        shipping_pincode: pincode
      })
    });

    const quoteData = await res.json();
    if (quoteData.success && quoteData.data) {
      const q = quoteData.data;
      document.getElementById('checkout-subtotal').textContent = `₹${q.subtotal.toLocaleString('en-IN')}`;
      document.getElementById('checkout-tax').textContent = `₹0 (INCL.)`;
      document.getElementById('checkout-shipping').textContent = q.shipping_fee === 0 ? 'FREE' : `₹${q.shipping_fee}`;
      document.getElementById('checkout-total').textContent = `₹${q.total_amount.toLocaleString('en-IN')}`;

      const rowDiscount = document.getElementById('checkout-discount-row');
      const valDiscount = document.getElementById('checkout-discount-value');
      if (q.discount_amount > 0 && rowDiscount && valDiscount) {
        rowDiscount.style.display = 'flex';
        valDiscount.textContent = `- ₹${q.discount_amount.toLocaleString('en-IN')}`;
      } else if (rowDiscount) {
        rowDiscount.style.display = 'none';
      }
      return;
    }
  } catch (e) {
    console.warn('[Checkout] Fallback to local calculation:', e.message);
  }

  // Fallback if API fails
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  let discount = 0;
  if (STATE.appliedCoupon) {
    discount = STATE.appliedCoupon.type === 'percent' ? Math.round(subtotal * (STATE.appliedCoupon.value / 100)) : (STATE.appliedCoupon.value || 0);
  }
  const grandTotal = Math.max(0, subtotal + shipping - discount);

  document.getElementById('checkout-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('checkout-tax').textContent = `₹0 (INCL.)`;
  document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('checkout-total').textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
}

async function handleCheckoutPincodeChange(pincode) {
  const msgEl = document.getElementById('checkout-pincode-msg');
  if (!msgEl) return;

  if (!/^\d{6}$/.test(pincode)) {
    msgEl.style.display = 'none';
    return;
  }

  msgEl.style.display = 'block';
  msgEl.style.color = 'var(--medium-gray)';
  msgEl.textContent = 'Verifying delivery serviceability via Shiprocket...';

  try {
    const res = await fetch(`/api/shipping/serviceability?pincode=${pincode}`);
    const data = await res.json();

    if (data.success && data.data?.serviceable) {
      const topCourier = data.data.couriers?.[0];
      msgEl.style.color = '#127938';
      msgEl.innerHTML = `<strong>Express Delivery Available</strong> via ${topCourier ? topCourier.name : 'Shiprocket'} (${topCourier ? topCourier.estimated_days : '2-3 Days'})`;
      renderCheckoutSummary();
    } else {
      msgEl.style.color = '#cf222e';
      msgEl.textContent = 'Serviceability restricted for this pincode.';
    }
  } catch (err) {
    msgEl.style.color = '#127938';
    msgEl.textContent = 'Express Delivery Available across India';
  }
}

async function completeCheckoutOrder() {
  const nameInput = document.getElementById('checkout-name-input');
  const phoneInput = document.getElementById('checkout-phone-input');
  const emailInput = document.getElementById('checkout-email-input');
  const addressInput = document.getElementById('checkout-address-input');
  const cityInput = document.getElementById('checkout-city-input');
  const stateInput = document.getElementById('checkout-state-input');
  const pincodeInput = document.getElementById('checkout-pincode-input');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const city = cityInput ? cityInput.value.trim() : '';
  const state = stateInput ? stateInput.value.trim() : '';
  const pincode = pincodeInput ? pincodeInput.value.trim() : '';

  if (!name || !phone || !email || !address || !city || !state || !pincode) {
    showNotification('PLEASE COMPLETE ALL DELIVERY FIELDS');
    return;
  }

  if (phone.replace(/[^0-9]/g, '').length < 10) {
    showNotification('PLEASE PROVIDE A VALID 10-DIGIT MOBILE NUMBER');
    return;
  }

  if (!/^\d{6}$/.test(pincode)) {
    showNotification('PLEASE PROVIDE A VALID 6-DIGIT PINCODE');
    return;
  }

  const itemsPayload = STATE.cart.map(i => ({
    variant_id: i.variant_id || (i.size ? `var-grace-${i.size.toLowerCase()}` : 'var-grace-m'),
    quantity: i.qty
  }));

  const paymentMethod = STATE.paymentMethod || 'UPI';

  showNotification('VERIFYING & CREATING YOUR ORDER...');

  try {
    // 1. Get server-verified quote first (never trust client prices)
    const quoteRes = await fetch('/api/checkout/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: itemsPayload,
        coupon_code: STATE.appliedCoupon ? (STATE.appliedCoupon.code || STATE.appliedCoupon) : null,
        payment_method: paymentMethod
      })
    });
    const quoteJson = await quoteRes.json();
    const verifiedTotal = quoteJson.success && quoteJson.data ? quoteJson.data.total_amount : 999;

    // Track checkout attempt for abandoned cart recovery
    fetch('/api/checkout/abandoned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        customer_email: email,
        customer_phone: phone,
        customer_name: name,
        items: itemsPayload,
        subtotal: verifiedTotal
      })
    }).catch(() => {});

    // 2. If Prepaid UPI / Card, create payment order first with server-verified total
    let paymentId = null;
    if (paymentMethod === 'UPI' || paymentMethod === 'STRIPE') {
      const payRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: verifiedTotal,
          customer_email: email,
          customer_phone: phone
        })
      });
      const payData = await payRes.json();
      if (payData.success) {
        paymentId = payData.data.order_id;
      }
    }

    // 2. Persist order to database API
    const orderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name, phone, email },
        shipping_address: {
          address_line1: address,
          city,
          state,
          pincode,
          country: 'India'
        },
        items: itemsPayload,
        payment_method: paymentMethod,
        coupon_code: STATE.appliedCoupon ? (STATE.appliedCoupon.code || STATE.appliedCoupon) : null,
        payment_id: paymentId
      })
    });

    const orderJson = await orderRes.json();
    if (!orderJson.success) {
      showNotification(orderJson.message || 'ORDER CREATION FAILED');
      return;
    }

    const createdOrder = orderJson.data;

    // Add to local state for customer profile
    STATE.orders.unshift({
      orderId: createdOrder.order_number,
      date: new Date().toISOString().split('T')[0],
      items: [...STATE.cart],
      total: createdOrder.total_amount,
      status: createdOrder.order_status,
      trackingStep: 2,
      address: `${address}, ${city}, ${state} - ${pincode}`
    });
    localStorage.setItem('ov_orders', JSON.stringify(STATE.orders));

    STATE.loyaltyPoints += Math.round(createdOrder.total_amount * 0.05);

    // Empty cart
    STATE.cart = [];
    localStorage.removeItem('ov_cart');
    updateCartBadge();
    renderCartDrawer();
    STATE.appliedCoupon = null;

    closeModal('checkout-modal');
    showNotification('ORDER PLACED SUCCESSFULLY: ' + createdOrder.order_number);

    setTimeout(() => {
      trackSpecificOrder(createdOrder.order_number);
    }, 1000);

  } catch (err) {
    console.error('[Checkout Error]', err);
    showNotification('ERROR PROCESSING ORDER. PLEASE TRY AGAIN.');
  }
}

/* ==========================================================================
   17. Order tracking live status (Connected to Real Shiprocket API)
   ========================================================================== */
async function trackSpecificOrder(orderNumber) {
  const container = document.getElementById('track-order-modal-body');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align:center; padding:30px;">
      <div style="font-size:1.1rem; font-weight:600; margin-bottom:8px;">RETRIEVING LIVE SHIPMENT STATUS...</div>
      <div style="font-size:0.8rem; color:var(--medium-gray);">Querying Central Logistics Engine & Shiprocket Scans</div>
    </div>
  `;
  openModal('track-order-modal');

  try {
    const res = await fetch(`/api/orders/track?order_number=${orderNumber}`);
    const data = await res.json();

    if (data.success && data.data) {
      const o = data.data;
      const ship = o.shipment;

      let stepNum = 1;
      if (o.order_status === 'PROCESSING') stepNum = 2;
      if (o.order_status === 'READY_TO_SHIP' || o.shipment_status === 'AWB_ASSIGNED') stepNum = 3;
      if (o.order_status === 'SHIPPED' || o.order_status === 'IN_TRANSIT') stepNum = 4;
      if (o.order_status === 'OUT_FOR_DELIVERY') stepNum = 5;
      if (o.order_status === 'DELIVERED') stepNum = 6;

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
          <div>
            <div style="font-size: 1.1rem; font-weight:700; letter-spacing:0.1em;">ORDER: ${o.order_number}</div>
            <div style="font-size: 0.8rem; color:#777; margin-top:3px;">PLACED ON: ${new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
          <span class="admin-badge admin-badge-success">${o.order_status}</span>
        </div>

        <div class="tracking-steps" style="margin-bottom:30px;">
          <div class="tracking-step-item ${stepNum >= 1 ? 'completed' : ''}">
            <div class="tracking-step-dot">1</div>
            <div class="tracking-step-label">Placed</div>
          </div>
          <div class="tracking-step-item ${stepNum >= 2 ? 'completed' : ''}">
            <div class="tracking-step-dot">2</div>
            <div class="tracking-step-label">Verified</div>
          </div>
          <div class="tracking-step-item ${stepNum >= 3 ? 'completed' : ''}">
            <div class="tracking-step-dot">3</div>
            <div class="tracking-step-label">AWB Assigned</div>
          </div>
          <div class="tracking-step-item ${stepNum >= 4 ? 'completed' : ''}">
            <div class="tracking-step-dot">4</div>
            <div class="tracking-step-label">In Transit</div>
          </div>
          <div class="tracking-step-item ${stepNum >= 5 ? 'completed' : ''}">
            <div class="tracking-step-dot">5</div>
            <div class="tracking-step-label">Out Delivery</div>
          </div>
          <div class="tracking-step-item ${stepNum >= 6 ? 'completed' : ''}">
            <div class="tracking-step-dot">6</div>
            <div class="tracking-step-label">Delivered</div>
          </div>
        </div>

        ${ship ? `
          <div style="background:#fafafa; border:1px solid var(--border-color); padding:18px; margin-bottom:25px;">
            <div style="font-size:0.75rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--medium-gray); margin-bottom:8px;">LOGISTICS & AWB COURIER</div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.95rem; font-weight:600;">${ship.courier_name || 'Express Courier'}</div>
                <div style="font-size:0.8rem; color:var(--dark-gray); margin-top:2px;">AWB: <strong>${ship.awb_code || 'Pending'}</strong></div>
              </div>
              ${ship.tracking_url ? `
                <a href="${ship.tracking_url}" target="_blank" class="luxury-btn outline-gold-btn" style="padding:8px 14px; font-size:0.65rem; text-decoration:none;">SHIPROCKET LIVE SCAN ↗</a>
              ` : ''}
            </div>
          </div>
        ` : `
          <div style="background:#fafafa; border:1px solid var(--border-color); padding:14px; margin-bottom:20px; font-size:0.8rem; color:var(--medium-gray);">
            Order verified. Central fulfillment warehouse is preparing your garment for courier dispatch.
          </div>
        `}

        <div style="border-top: 1px solid rgba(0,0,0,0.06); padding-top: 18px;">
          <div style="font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing:0.1em; margin-bottom: 12px;">ACTIVITY TIMELINE</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${(o.timeline || []).map(t => `
              <div style="display:flex; gap:14px; font-size:0.8rem;">
                <span style="color:var(--medium-gray); min-width:85px; font-size:0.75rem;">${new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span>${t.message}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 25px; padding-top:15px; border-top:1px solid rgba(0,0,0,0.06); display:flex; gap:10px; justify-content:flex-end;">
          <button class="luxury-btn outline-gold-btn" onclick="openCustomerReturnModal('${o.order_number}')" style="padding:8px 14px; font-size:0.65rem;">REQUEST RETURN / EXCHANGE</button>
          <button class="luxury-btn secondary" onclick="closeModal('track-order-modal')" style="padding:8px 14px; font-size:0.65rem;">CLOSE</button>
        </div>
      `;
      return;
    }
  } catch (err) {
    console.warn('[Track Order API] Falling back to local state:', err);
  }

  // Fallback if network issue
  const localOrder = STATE.orders.find(o => o.orderId === orderNumber);
  if (localOrder) {
    container.innerHTML = `
      <div style="font-size: 1rem; font-weight:600; margin-bottom: 5px;">ORDER ID: ${localOrder.orderId}</div>
      <div style="font-size: 0.8rem; color:#777; margin-bottom: 25px;">STATUS: ${localOrder.status.toUpperCase()}</div>
      <div style="font-size:0.85rem; color:#444;">Your order has been recorded in the central database.</div>
    `;
  }
}

/* ==========================================================================
   18. jsPDF Minimal Invoice Generation
   ========================================================================== */
function downloadPdfInvoice(orderId) {
  const order = STATE.orders.find(o => o.orderId === orderId);
  if (!order) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const fontHeading = 'Helvetica';
  const colorDark = '#111111';
  const colorGray = '#777777';

  doc.setFont(fontHeading, 'bold');
  doc.setFontSize(22);
  doc.setTextColor(colorDark);
  doc.text('OV™ — ORIGINAL VERSION', 20, 25);

  doc.setFontSize(9);
  doc.setFont(fontHeading, 'normal');
  doc.setTextColor(colorGray);
  doc.text('MINIMAL LUXURY STREETWEAR', 20, 30);
  doc.text('support@ovstreetwear.com', 20, 34);

  doc.setFont(fontHeading, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colorDark);
  doc.text('TAX INVOICE', 140, 25);

  doc.setFont(fontHeading, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colorGray);
  doc.text(`INVOICE NO: ${order.orderId}`, 140, 30);
  doc.text(`DATE: ${order.date}`, 140, 34);
  doc.text('STATUS: PAID', 140, 38);

  doc.setDrawColor(220, 220, 220);
  doc.line(20, 48, 190, 48);

  doc.setFont(fontHeading, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colorDark);
  doc.text('BILLED TO:', 20, 56);
  
  doc.setFont(fontHeading, 'normal');
  doc.setTextColor(colorGray);
  doc.text(STATE.user ? STATE.user.username : 'GUEST ORIGINAL', 20, 61);
  doc.text(STATE.user ? STATE.user.email : 'guest@ov.com', 20, 65);
  doc.text(order.address || 'OV CUSTOMER LOGISTICS CENTRE', 20, 69, { maxWidth: 100 });

  doc.line(20, 80, 190, 80);
  doc.setFont(fontHeading, 'bold');
  doc.setTextColor(colorDark);
  doc.text('PRODUCT DESCRIPTION', 20, 85);
  doc.text('QTY', 120, 85);
  doc.text('PRICE', 145, 85);
  doc.text('TOTAL', 170, 85);
  doc.line(20, 89, 190, 89);

  let currentY = 96;
  doc.setFont(fontHeading, 'normal');
  doc.setTextColor(colorGray);

  order.items.forEach(item => {
    doc.text(item.name.toUpperCase(), 20, currentY);
    doc.text(`Size: ${item.size || 'M'} / Color: ${item.color || 'White'}`, 20, currentY + 4);
    doc.text(`${item.qty}`, 120, currentY);
    doc.text(`INR ${item.price.toLocaleString('en-IN')}`, 145, currentY);
    doc.text(`INR ${(item.price * item.qty).toLocaleString('en-IN')}`, 170, currentY);
    currentY += 15;
  });

  doc.line(20, currentY - 5, 190, currentY - 5);
  
  doc.text('SUBTOTAL:', 130, currentY + 2);
  doc.text(`INR ${order.total.toLocaleString('en-IN')}`, 170, currentY + 2);

  doc.setFont(fontHeading, 'bold');
  doc.setTextColor(colorDark);
  doc.text('TOTAL AMOUNT PAID:', 110, currentY + 9);
  doc.text(`INR ${order.total.toLocaleString('en-IN')}`, 170, currentY + 9);

  doc.setFont(fontHeading, 'italic');
  doc.setFontSize(8);
  doc.setTextColor(colorGray);
  doc.text('Thank you for being an Original. Crafted to create identity.', 20, 270);

  doc.save(`OV-INVOICE-${order.orderId}.pdf`);
  showNotification('INVOICE PDF DOWNLOADED');
}

/* ==========================================================================
   19. Reviews Engine & Form submission
   ========================================================================== */
function submitReviewFromUser() {
  const nameInput = document.getElementById('review-author-name');
  const titleInput = document.getElementById('review-title-input');
  const bodyInput = document.getElementById('review-body-input');
  const ratingInput = document.getElementById('review-star-rating');

  if (!nameInput.value || !bodyInput.value) {
    showNotification('NAME AND REVIEW CONTENT REQUIRED');
    return;
  }

  const rating = parseInt(ratingInput.value) || 5;

  const newReview = {
    author: nameInput.value,
    date: 'Just Now',
    rating: rating,
    title: titleInput.value || 'Excellent Quality',
    body: bodyInput.value
  };

  if (STATE.activeProduct) {
    if (!STATE.activeProduct.reviews) STATE.activeProduct.reviews = [];
    STATE.activeProduct.reviews.unshift(newReview);
    renderReviewsSection(STATE.activeProduct);
  }

  nameInput.value = '';
  titleInput.value = '';
  bodyInput.value = '';
  
  closeModal('write-review-modal');
  showNotification('REVIEW SUBMITTED FOR REVIEW');
}

function renderReviewsSection(product) {
  const listContainer = document.getElementById('pdp-reviews-list-container');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  const defaultReviews = [
    { author: 'ADITHYA K.', date: '12 July 2026', rating: 5, title: 'Unmatched Fabric Quality', body: 'The 280 GSM cotton feels extremely premium. It has weight but is breathable. Best boxy oversized tee in my collection.' },
    { author: 'SARATH R.', date: '05 July 2026', rating: 5, title: 'Apple-like Design Minimalist Feel', body: 'Love the uppercase design on the tags and packaging. Fits perfectly, definitely recommend sizing down if you want a regular fit.' }
  ];

  const allReviews = (product.reviews || []).concat(defaultReviews);

  allReviews.forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    let starsStr = '';
    for(let i=0; i<5; i++) {
      starsStr += i < r.rating ? '★' : '☆';
    }

    card.innerHTML = `
      <div class="review-header">
        <div class="review-author">${r.author.toUpperCase()}</div>
        <div class="review-date">${r.date}</div>
      </div>
      <div class="review-stars">${starsStr}</div>
      <div class="review-title">${r.title.toUpperCase()}</div>
      <div class="review-body">${r.body}</div>
    `;
    listContainer.appendChild(card);
  });
}

/* ==========================================================================
   20. Helper Utilities (Drawers, Modals, Lists grids, Notifications)
   ========================================================================== */
function toggleDrawer(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  if (id === 'cart-drawer') renderCartDrawer();
  if (id === 'wishlist-drawer') renderWishlistDrawer();
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}

function renderProductGrid(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  
  if (productList.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 0; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.15em;">NO ITEMS MATCH CURRENT FILTER SELECTION</div>`;
    return;
  }

  productList.forEach(p => {
    const card = document.createElement('div');
    const isUpcoming = p.isUpcoming || false;
    card.className = `collection-card ${isUpcoming ? 'upcoming-card' : ''}`;
    card.setAttribute('onclick', `navigateTo('product', '${p.id}')`);

    // Badge Render logic
    let badgeHTML = '';
    if (isUpcoming) {
      badgeHTML = `<span class="card-badge upcoming">UPCOMING</span>`;
    } else if (p.badge) {
      const cls = p.badge === 'SALE' || p.badge.includes('OFF') ? 'sale' : '';
      badgeHTML = `<span class="card-badge ${cls}">${p.badge}</span>`;
    }

    // Pricing Render logic (Outlet styling with discounts)
    let pricingHTML = `<span class="card-price">₹${p.price.toLocaleString('en-IN')}</span>`;
    if (p.originalPrice > p.price) {
      const percent = Math.round((1 - p.price / p.originalPrice) * 100);
      pricingHTML = `
        <span class="card-price">₹${p.price.toLocaleString('en-IN')}</span>
        <span class="card-price crossed">₹${p.originalPrice.toLocaleString('en-IN')}</span>
        <span class="card-price discount-percent">(${percent}% OFF)</span>
      `;
    }

    // Size Preview logic
    const sizesRowStr = (p.sizes || []).map(s => `<span class="card-size-item">${s}</span>`).join('');

    card.innerHTML = `
      <div class="card-badge-container">${badgeHTML}</div>
      <div class="collection-card-visual" style="padding:0;">
        <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.8s var(--ease-premium);">
        <div class="card-sizes-overlay" onclick="event.stopPropagation();">
          <span class="card-size-label">SIZES:</span>
          <div class="card-sizes-row">${sizesRowStr}</div>
        </div>
      </div>
      <div class="card-info-wrap">
        <span class="card-label-type">${p.brand}</span>
        <h3 class="card-title-heading">${p.name.toUpperCase()}</h3>
        <div class="card-price-row">${pricingHTML}</div>
        <div class="card-stars-badge">★★★★★ <span style="font-size:0.75rem; color:#777; font-weight:normal;">(${p.rating})</span></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderHomePageProducts() {
  const container = document.getElementById('homepage-products-grid');
  if (!container) return;

  if (!Array.isArray(STATE.products) || STATE.products.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--medium-gray);">NO PRODUCTS AVAILABLE</div>';
    return;
  }

  container.innerHTML = STATE.products.map(p => {
    const primaryImg = p.image || (p.gallery && p.gallery[0]) || 'images/product_beige_front_model.jpg';
    const secondaryImg = (p.gallery && p.gallery.length > 1) ? p.gallery[1] : primaryImg;
    const sizes = Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes : ['S', 'M', 'L', 'XL'];
    const activeSize = (typeof selectedCardSizes !== 'undefined' && selectedCardSizes[p.id]) || sizes[0] || 'M';

    // Badge pills
    let badgeHTML = '';
    if (p.badge) {
      const isGold = p.badge.toUpperCase().includes('BEST') || p.badge.includes('01');
      badgeHTML += `<span class="product-badge-pill ${isGold ? 'gold' : 'dark'}">${p.badge}</span>`;
    }
    if (p.originalPrice > p.price) {
      const pct = Math.round((1 - p.price / p.originalPrice) * 100);
      badgeHTML += `<span class="product-badge-pill discount">${pct}% OFF</span>`;
    }

    const sizesHTML = sizes.map(s => `
      <button type="button" class="card-size-btn ${s === activeSize ? 'active' : ''}" onclick="selectCardSize('${p.id}', '${s}', this)">${s}</button>
    `).join('');

    const reviewsCount = (p.reviews && p.reviews.length > 0) ? p.reviews.length * 71 : 142;
    const isWishlisted = Array.isArray(STATE.wishlist) && STATE.wishlist.includes(p.id);

    return `
      <div class="standard-product-card" id="card-prod-${p.id}">
        <div class="product-card-visual" onclick="navigateTo('product', '${p.id}')">
          ${badgeHTML}
          <button class="product-card-wishlist ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${p.id}');" title="Save to Wishlist" style="${isWishlisted ? 'color: var(--gold-accent);' : ''}">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <img src="${primaryImg}" alt="${p.name} Front" class="product-img-primary" onerror="this.src='images/product_beige_front_model.jpg'">
          <img src="${secondaryImg}" alt="${p.name} Back / Angle" class="product-img-secondary" onerror="this.src='images/product_beige_back_model.jpg'">
        </div>

        <div class="product-card-details">
          <div class="product-card-brand">${p.brand} · ${p.fabric || '240 GSM'}</div>
          <h3 class="product-card-title" onclick="navigateTo('product', '${p.id}')">
            ${p.name}
          </h3>
          <div class="product-card-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-val">${p.rating || 4.9}</span>
            <span class="reviews-count">(${reviewsCount} reviews)</span>
          </div>
          <div class="product-card-pricing">
            <span class="current-price">₹${p.price.toLocaleString('en-IN')}</span>
            ${p.originalPrice > p.price ? `
              <span class="original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
              <span class="save-badge">SAVE ₹${(p.originalPrice - p.price).toLocaleString('en-IN')}</span>
            ` : ''}
          </div>

          <!-- Size Selector -->
          <div class="product-card-sizes" data-prod="${p.id}">
            <span class="size-label">SIZE:</span>
            ${sizesHTML}
          </div>

          <div class="product-card-actions">
            <button type="button" class="luxury-btn gold-btn card-add-bag-btn" onclick="addCardProductToBag('${p.id}', this)">
              ADD TO BAG
            </button>
            <button type="button" class="luxury-btn outline-btn card-quick-btn" onclick="navigateTo('product', '${p.id}')">
              QUICK VIEW
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderLookbookMarquee() {
  const track = document.getElementById('editorial-marquee-track');
  if (!track) return;

  const items = [];
  if (Array.isArray(STATE.products)) {
    STATE.products.forEach(p => {
      const gallery = (p.gallery && p.gallery.length > 0) ? p.gallery : [p.image];
      gallery.forEach((imgSrc, idx) => {
        items.push({
          img: imgSrc,
          label: `${p.baseName || p.name} · ANGLE ${idx + 1}`
        });
      });
    });
  }

  const stockEditorial = [
    { img: 'images/model_sunglasses.jpg', label: 'EDITORIAL ATELIER' },
    { img: 'images/model2.jpg', label: 'OV™ STUDIO ARCHITECTURE' },
    { img: 'images/model5.jpg', label: 'STREETWEAR DRAPE' }
  ];
  const allItems = [...items, ...stockEditorial];
  const loopItems = [...allItems, ...allItems];

  track.innerHTML = loopItems.map(item => `
    <div class="editorial-card">
      <img src="${item.img}" alt="${item.label}" onerror="this.src='images/product_beige_front_model.jpg'">
      <div class="editorial-card-label">${item.label.toUpperCase()}</div>
    </div>
  `).join('');
}

function renderFeaturedGrid(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  productList.slice(0, 4).forEach(p => {
    const gridItem = document.createElement('div');
    gridItem.style.position = 'relative';
    gridItem.style.cursor = 'pointer';
    gridItem.setAttribute('onclick', `navigateTo('product', '${p.id}')`);

    let priceHTML = `<span style="color: black;">₹${p.price.toLocaleString('en-IN')}</span>`;
    if (p.originalPrice > p.price) {
      priceHTML = `<span style="color: var(--red-discount); font-weight:600;">₹${p.price.toLocaleString('en-IN')}</span> <span style="text-decoration:line-through; opacity:0.4; margin-left:5px;">₹${p.originalPrice.toLocaleString('en-IN')}</span>`;
    }

    gridItem.innerHTML = `
      <div style="background-color: var(--light-gray); aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); position: relative; overflow: hidden; margin-bottom: 15px;">
        <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div style="font-size:0.7rem; letter-spacing:0.1em; color:#777; text-transform:uppercase; margin-bottom:3px;">${p.brand}</div>
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">
        <div style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:70%;">${p.baseName}</div>
        <div>${priceHTML}</div>
      </div>
    `;
    container.appendChild(gridItem);
  });
}

function renderProductDetailPage(product) {
  document.getElementById('pdp-brand-text').textContent = product.brand;
  document.getElementById('pdp-product-name').textContent = product.name;
  
  const priceContainer = document.getElementById('pdp-price-container');
  if (product.originalPrice > product.price) {
    const pct = Math.round((1 - product.price / product.originalPrice) * 100);
    const savings = product.originalPrice - product.price;
    priceContainer.innerHTML = `
      <span class="product-price original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
      <span class="product-price sale">₹${product.price.toLocaleString('en-IN')}</span>
      <span style="color:var(--red-discount); font-weight:bold; font-size:1.1rem; margin-left:10px;">(${pct}% OFF)</span>
      <div style="font-size: 0.85rem; color: #16a34a; font-weight: 700; margin-top: 8px; letter-spacing: 0.05em;">YOU SAVE: ₹${savings.toLocaleString('en-IN')} (${pct}% OFF)</div>
    `;
  } else {
    priceContainer.innerHTML = `<span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>`;
  }

  // Material & specs description
  const pdpMaterialDesc = document.getElementById('pdp-material-desc');
  if (pdpMaterialDesc) {
    pdpMaterialDesc.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; font-size: 0.82rem; color: #111; letter-spacing: 0.05em;">
        <span><strong>FIT:</strong> ${product.fit || 'Oversize'}</span> &bull;
        <span><strong>FABRIC:</strong> ${product.fabric || '240 GSM'}</span> &bull;
        <span><strong>NECK:</strong> ${product.neck || 'Round Neck'}</span> &bull;
        <span><strong>COLOUR:</strong> ${product.color || 'Beige'}</span>
      </div>
      <p style="color: #666; line-height: 1.6; font-size: 0.88rem;">${product.desc || 'Grace Is Her Greatest Strength. 240 GSM heavyweight combed cotton cut in a relaxed drop-shoulder oversized silhouette.'}</p>
    `;
  }
  
  const stockText = document.getElementById('pdp-stock-text');
  if (product.stock > 0 && product.stock <= 5) {
    stockText.style.display = 'flex';
    document.getElementById('pdp-stock-count').textContent = `ONLY ${product.stock} PIECES LEFT IN STOCK`;
  } else {
    stockText.style.display = 'none';
  }

  const mainImageContainer = document.getElementById('pdp-main-image-container');
  if (mainImageContainer) {
    mainImageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;" id="pdp-main-image-el">`;
  }

  const zoomOverlay = document.querySelector('.zoom-overlay');
  if (zoomOverlay) {
    zoomOverlay.style.backgroundImage = `url('${product.image}')`;
  }

  // Render Thumbnails (using all 4 uploaded product photos)
  const thumbsContainer = document.getElementById('pdp-thumbs-container');
  if (thumbsContainer) {
    const galleryList = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.image];
    thumbsContainer.innerHTML = galleryList.map((imgSrc, idx) => `
      <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchPdpThumb(this, '${imgSrc}')">
        <img src="${imgSrc}" style="width:100%; height:100%; object-fit:contain;">
      </div>
    `).join('');
  }

  // Size buttons generation
  const sizeSelectContainer = document.querySelector('#product-page .size-buttons');
  if (sizeSelectContainer) {
    sizeSelectContainer.innerHTML = '';
    product.sizes.forEach((s, idx) => {
      const btn = document.createElement('button');
      btn.className = `size-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('data-size', s);
      btn.textContent = s;
      btn.addEventListener('click', () => {
        document.querySelectorAll('#product-page .size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.activeSize = s;
      });
      sizeSelectContainer.appendChild(btn);
    });
    STATE.activeSize = product.sizes[0];
  }

  // Add to Cart Button state
  const atbBtn = document.getElementById('add-to-cart-btn');
  if (atbBtn) {
    if (product.isUpcoming) {
      atbBtn.textContent = 'NOTIFY ME ON DROP';
      atbBtn.classList.add('secondary');
      atbBtn.onclick = (e) => {
        e.preventDefault();
        showNotification(`WE WILL NOTIFY YOU WHEN ${product.name} DROPS!`);
      };
    } else {
      atbBtn.textContent = `ADD TO BAG — ₹${product.price.toLocaleString('en-IN')}`;
      atbBtn.classList.remove('secondary');
      atbBtn.onclick = (e) => {
        e.preventDefault();
        addToCart(product.id, STATE.activeSize, STATE.quantity);
      };
    }
  }

  STATE.quantity = 1;
  document.getElementById('qty-value').value = 1;

  STATE.activeColor = 'White';
  
  const wishlistBtn = document.getElementById('detail-wishlist-btn');
  if (wishlistBtn) {
    if (STATE.wishlist.includes(product.id)) wishlistBtn.classList.add('active');
    else wishlistBtn.classList.remove('active');
  }

  // Clear Pincode inputs
  const pincodeResult = document.getElementById('pincode-check-result');
  const pincodeInput = document.getElementById('checkout-pincode-input');
  if (pincodeResult) pincodeResult.style.display = 'none';
  if (pincodeInput) pincodeInput.value = '';

  // PDP Entrance motion
  gsap.fromTo('.product-gallery', 
    { opacity: 0, x: -30 }, 
    { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
  );
  gsap.fromTo('.product-info-column > *', 
    { opacity: 0, y: 15 }, 
    { opacity: 1, y: 0, stagger: 0.06, duration: 0.8, ease: "power2.out" }
  );

  renderFbtBundle(product);
  renderReviewsSection(product);
}

function switchPdpThumb(element, imageSrc) {
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  element.classList.add('active');

  const mainImageContainer = document.getElementById('pdp-main-image-container');
  if (mainImageContainer) {
    mainImageContainer.innerHTML = `<img src="${imageSrc}" style="width:100%; height:100%; object-fit:contain;" id="pdp-main-image-el">`;
  }

  const zoomOverlay = document.querySelector('.zoom-overlay');
  if (zoomOverlay) {
    zoomOverlay.style.backgroundImage = `url('${imageSrc}')`;
  }
}

function renderFbtBundle(product) {
  const companion = STATE.products.find(p => p.id !== product.id) || STATE.products[1];
  const container = document.getElementById('fbt-bundle-container');
  if (!container) return;

  const bundleTotal = product.price + companion.price;

  container.innerHTML = `
    <div class="fbt-products">
      <div class="fbt-item">
        <div class="fbt-item-visual" style="padding:0;">
          <img src="${product.image}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="fbt-item-name">${product.name}</div>
        <div class="fbt-item-price">₹${product.price.toLocaleString('en-IN')}</div>
      </div>
      <div class="fbt-plus">+</div>
      <div class="fbt-item">
        <div class="fbt-item-visual" style="padding:0;">
          <img src="${companion.image}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="fbt-item-name">${companion.name}</div>
        <div class="fbt-item-price">₹${companion.price.toLocaleString('en-IN')}</div>
      </div>
    </div>
    <div class="fbt-checkout-card">
      <div style="font-size: 0.85rem; color:#777; text-transform:uppercase; letter-spacing:0.05em;">BUNDLE PRICE:</div>
      <div class="fbt-total-price">₹${bundleTotal.toLocaleString('en-IN')}</div>
      <button class="luxury-btn" onclick="addFbtBundleToCart('${product.id}', '${companion.id}')">ADD BUNDLE TO BAG</button>
    </div>
  `;
}

function addFbtBundleToCart(id1, id2) {
  addToCart(id1, 'White', 'M', 1);
  addToCart(id2, 'Black', 'M', 1);
  toggleDrawer('cart-drawer');
}

function showNotification(message) {
  let container = document.getElementById('ov-notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ov-notification-container';
    container.style.position = 'fixed';
    container.style.top = '100px';
    container.style.right = '40px';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    document.body.appendChild(container);
  }

  const notification = document.createElement('div');
  notification.style.backgroundColor = 'black';
  notification.style.color = 'white';
  notification.style.padding = '15px 30px';
  notification.style.fontSize = '0.75rem';
  notification.style.letterSpacing = '0.2em';
  notification.style.textTransform = 'uppercase';
  notification.style.border = '1px solid rgba(255,255,255,0.2)';
  notification.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
  notification.style.transform = 'translateX(100px)';
  notification.style.opacity = '0';
  notification.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  notification.textContent = message;

  container.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    notification.style.transform = 'translateX(100px)';
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3500);
}

/* ==========================================================================
   21. Active Promotions & Offers Portal
   ========================================================================== */
function copyAndApplyPromo(code) {
  navigator.clipboard.writeText(code).then(() => {
    STATE.appliedCoupon = (code === 'WELCOME500') 
      ? { code: 'WELCOME500', type: 'fixed', value: 500 }
      : (code === 'DIWALI20')
      ? { code: 'DIWALI20', type: 'percent', value: 20 }
      : { code: 'ORIGINAL10', type: 'percent', value: 10 };
    updateCartSummary();
    renderCheckoutSummary();
    showNotification(`COUPON ${code} COPIED & APPLIED!`);
  }).catch(() => {
    STATE.appliedCoupon = (code === 'WELCOME500') 
      ? { code: 'WELCOME500', type: 'fixed', value: 500 }
      : (code === 'DIWALI20')
      ? { code: 'DIWALI20', type: 'percent', value: 20 }
      : { code: 'ORIGINAL10', type: 'percent', value: 10 };
    updateCartSummary();
    renderCheckoutSummary();
    showNotification(`COUPON ${code} APPLIED!`);
  });
}

/* ==========================================================================
   22. Dynamic Hero Slider & Logo Rendering
   ========================================================================== */
function renderHeroSlider() {
  const wrapper = document.querySelector('.hero-slider-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  STATE.slides.forEach((slide, i) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `hero-slide ${i === 0 ? 'active' : ''}`;

    let innerHTML = `
      <div class="hero-slide-bg" style="background-image: url('${slide.image}'); background-position: ${slide.position || 'center center'};"></div>
      <div class="hero-slide-overlay" style="background: ${slide.overlay || 'rgba(0,0,0,0.5)'};"></div>
      <div class="hero-slide-content ${slide.layout || ''}">
    `;

    if (slide.layout === 'layout-split') {
      innerHTML += `
        <div class="slide-left-panel">
      `;

      if (slide.isLogoGraphic) {
        const heroLogoSrc = (STATE.logo && STATE.logo.image && STATE.logo.image !== 'images/logo_transparent.png') ? STATE.logo.image : 'images/logo_white.png';
        innerHTML += `
          <div class="large-logo-graphic logo-container-render-large">
            <img src="${heroLogoSrc}" alt="OV™ — ORIGINAL VERSION" class="logo-uploaded-img-large" style="max-height: 220px; width: auto; object-fit: contain; margin-bottom: 25px;">
          </div>
        `;
      } else {
        innerHTML += `
          <div class="slide-title-wrap">
            <span class="eyebrow" style="color: var(--gold-accent); margin-bottom: 10px;">${slide.eyebrow || ''}</span>
            <h1 class="slide-large-title">${slide.title || ''}</h1>
            ${slide.scriptTitle ? `<h2 class="slide-script-title">${slide.scriptTitle}</h2>` : ''}
          </div>
        `;
      }

      innerHTML += `
          <p class="slide-editorial-desc">${slide.desc || ''}</p>
          <button class="luxury-btn ${slide.isLogoGraphic ? 'gold-btn' : 'outline-gold-btn'}" onclick="navigateTo('${slide.btnAction || 'shop'}')">${slide.btnText || 'SHOP COLLECTION'} <span style="margin-left: 10px;">→</span></button>
          
          ${slide.isLogoGraphic ? `
            <div class="slide-features-row">
              <div class="feature-icon-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span>PREMIUM QUALITY</span>
              </div>
              <div class="feature-icon-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>TIMELESS DESIGNS</span>
              </div>
              <div class="feature-icon-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span>MADE FOR YOU</span>
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="slide-right-panel ${!slide.isLogoGraphic ? 'justify-end' : ''}">
          ${slide.isLogoGraphic ? `
            <div class="watch-collection-btn" onclick="navigateTo('shop')">
              <div class="play-icon-circle">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span>WATCH COLLECTION</span>
            </div>
          ` : `
            <div class="vertical-features-list">
              ${(slide.vFeatures || []).map(f => `
                <div class="v-feature-item">
                  <div class="v-feature-num">${f.num}</div>
                  <div class="v-feature-text">
                    <h4>${f.title}</h4>
                    <p>${f.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    } else {
      innerHTML += `
        <h1 class="hero-slide-title">${slide.title || ''}</h1>
        <p class="hero-slide-desc">${slide.desc || ''}</p>
        <button class="luxury-btn" onclick="navigateTo('${slide.btnAction || 'shop'}')">${slide.btnText || 'SHOP NOW'}</button>
      `;
    }

    innerHTML += `
      </div>
    `;

    slideDiv.innerHTML = innerHTML;
    wrapper.appendChild(slideDiv);
  });

  setupHeroSlider();
}

function renderLogoMarks() {
  const letters = STATE.logo.letters || 'OV';
  const subtext = STATE.logo.subtext || 'ORIGINAL VERSION';
  const image = (STATE.logo && STATE.logo.image) ? STATE.logo.image : 'images/logo_transparent.png';

  // 1. Update standard header logo (Light/White Navigation Bar)
  const headerContainer = document.querySelector('.logo-container');
  if (headerContainer) {
    let img = headerContainer.querySelector('.logo-uploaded-img');
    const svg = headerContainer.querySelector('.logo-svg');
    if (!img) {
      img = document.createElement('img');
      img.className = 'logo-uploaded-img';
      img.style.height = '32px';
      img.style.width = 'auto';
      img.style.objectFit = 'contain';
      const link = headerContainer.querySelector('a');
      if (link) link.appendChild(img);
      else headerContainer.appendChild(img);
    }
    img.src = (image === 'images/logo_white.png' || image === 'images/logo_transparent.png') ? 'images/logo_transparent.png' : image;
    img.style.display = 'block';
    if (svg) svg.style.display = 'none';
  }

  // 2. Update loader container (Dark Intro Screen)
  const loaderContainer = document.querySelector('.loader-logo-container');
  if (loaderContainer) {
    let img = loaderContainer.querySelector('.logo-uploaded-img-loader');
    const svg = loaderContainer.querySelector('.logo-svg');
    if (!img) {
      img = document.createElement('img');
      img.className = 'logo-uploaded-img-loader';
      img.style.maxHeight = '160px';
      img.style.width = 'auto';
      img.style.objectFit = 'contain';
      loaderContainer.appendChild(img);
    }
    img.src = (image === 'images/logo_transparent.png') ? 'images/logo_white.png' : image;
    img.style.display = 'block';
    if (svg) svg.style.display = 'none';
  }

  // 3. Update footer container (Dark Luxury Footer)
  const footerContainer = document.querySelector('.footer-brand');
  if (footerContainer) {
    let img = footerContainer.querySelector('.logo-uploaded-img-footer');
    const svg = footerContainer.querySelector('.logo-svg');
    if (!img) {
      img = document.createElement('img');
      img.className = 'logo-uploaded-img-footer';
      img.style.maxHeight = '72px';
      img.style.width = 'auto';
      img.style.objectFit = 'contain';
      img.style.marginBottom = '25px';
      footerContainer.insertBefore(img, footerContainer.firstChild);
    }
    img.src = (image === 'images/logo_transparent.png') ? 'images/logo_white.png' : image;
    img.style.display = 'block';
    if (svg) svg.style.display = 'none';
  }

  // 4. Update large hero slide logo graphics
  document.querySelectorAll('.logo-container-render-large').forEach(container => {
    let img = container.querySelector('.logo-uploaded-img-large');
    const svg = container.querySelector('.logo-svg-large');
    if (!img) {
      img = document.createElement('img');
      img.className = 'logo-uploaded-img-large';
      img.style.maxHeight = '220px';
      img.style.width = 'auto';
      img.style.objectFit = 'contain';
      img.style.marginBottom = '25px';
      container.appendChild(img);
    }
    img.src = (image === 'images/logo_transparent.png') ? 'images/logo_white.png' : image;
    img.style.display = 'block';
    if (svg) svg.style.display = 'none';
  });
}

/* ==========================================================================
   23. Admin Dashboard & Portal Manager (Shopify-Style Executive Console)
   ========================================================================== */

function getAdminAuthHeader() {
  const token = localStorage.getItem('ov_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

async function handleAdminLogin(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('admin-login-email');
  const passInput = document.getElementById('admin-login-password');
  const errEl = document.getElementById('admin-login-error');

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passInput ? passInput.value : '';

  if (errEl) errEl.style.display = 'none';

  try {
    const res = await fetch('/api/auth/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch (parseErr) {
      if (errEl) {
        errEl.textContent = `Server error (${res.status}). Please verify API status.`;
        errEl.style.display = 'block';
      }
      return;
    }

    if (!data.success) {
      if (errEl) {
        errEl.textContent = data.message || 'Invalid credentials';
        errEl.style.display = 'block';
      }
      return;
    }

    // Save session
    localStorage.setItem('ov_admin_token', data.data.token);
    localStorage.setItem('ov_admin_user', JSON.stringify(data.data.user));

    showAdminBoard(data.data.user);
    showNotification('LOGGED IN AS ' + data.data.user.role);
    initAdminDashboard();

  } catch (err) {
    if (errEl) {
      errEl.textContent = 'Connection error. Please try again.';
      errEl.style.display = 'block';
    }
  }
}

function handleAdminLogout() {
  localStorage.removeItem('ov_admin_token');
  localStorage.removeItem('ov_admin_user');
  fetch('/api/auth/logout').catch(() => {});

  const barrier = document.getElementById('admin-login-barrier');
  const board = document.getElementById('admin-dashboard-view');
  if (barrier) barrier.style.display = 'block';
  if (board) board.style.display = 'none';

  showNotification('ADMIN SESSION TERMINATED');
}

async function checkAdminAuth() {
  const token = localStorage.getItem('ov_admin_token');
  const cachedUser = JSON.parse(localStorage.getItem('ov_admin_user') || 'null');

  const barrier = document.getElementById('admin-login-barrier');
  const board = document.getElementById('admin-dashboard-view');

  if (!token) {
    if (barrier) barrier.style.display = 'block';
    if (board) board.style.display = 'none';
    return;
  }

  try {
    const res = await fetch('/api/auth/verify', {
      headers: getAdminAuthHeader()
    });
    const data = await res.json();

    if (data.success && data.data?.user) {
      showAdminBoard(data.data.user);
      initAdminDashboard();
    } else {
      if (barrier) barrier.style.display = 'block';
      if (board) board.style.display = 'none';
    }
  } catch (err) {
    // If offline or dev fallback, use cached user
    if (cachedUser) {
      showAdminBoard(cachedUser);
      initAdminDashboard();
    } else {
      if (barrier) barrier.style.display = 'block';
      if (board) board.style.display = 'none';
    }
  }
}

function showAdminBoard(user) {
  const barrier = document.getElementById('admin-login-barrier');
  const board = document.getElementById('admin-dashboard-view');
  if (barrier) barrier.style.display = 'none';
  if (board) board.style.display = 'block';

  const badge = document.getElementById('admin-user-badge');
  const emailEl = document.getElementById('admin-user-email');
  if (badge) badge.textContent = `${user.role}`;
  if (emailEl) emailEl.textContent = user.email;
}

function switchAdminTab(tabId) {
  const buttons = document.querySelectorAll('.admin-tab-btn');
  buttons.forEach(btn => {
    const isActive = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isActive);
    btn.style.borderLeft = '';
    btn.style.color = '';
  });

  const panels = document.querySelectorAll('.admin-panel');
  panels.forEach(panel => {
    if (panel.id === tabId) {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  });

  // Lazy tab loaders
  if (tabId === 'metrics-tab') loadAdminMetrics();
  if (tabId === 'orders-tab') loadAdminOrders();
  if (tabId === 'inventory-tab') loadAdminInventory();
  if (tabId === 'customers-tab') loadAdminCustomers();
  if (tabId === 'payments-tab') loadAdminPayments();
  if (tabId === 'returns-tab') loadAdminReturns();
  if (tabId === 'abandoned-tab') loadAdminAbandoned();
  if (tabId === 'coupons-tab') loadAdminCoupons();
  if (tabId === 'users-tab') loadAdminUsers();
  if (tabId === 'audit-tab') loadAdminAuditLogs();
  if (tabId === 'health-tab') loadAdminHealth();
  if (tabId === 'slides-tab' || tabId === 'products-tab' || tabId === 'logo-tab') renderAdminDashboard();
}

function initAdminDashboard() {
  loadAdminMetrics();
  loadAdminOrders();
  renderAdminDashboard();
}

// 1. METRICS LOADER
async function loadAdminMetrics() {
  try {
    const res = await fetch('/api/admin/metrics', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && json.data) {
      const m = json.data;
      const netSalesEl = document.getElementById('metric-net-sales');
      const totalOrdersEl = document.getElementById('metric-total-orders');
      const unfulfilledEl = document.getElementById('metric-unfulfilled-orders');
      const unitsSoldEl = document.getElementById('metric-units-sold');
      const aovEl = document.getElementById('metric-aov');

      if (netSalesEl) netSalesEl.textContent = `₹${m.net_sales.toLocaleString('en-IN')}`;
      if (totalOrdersEl) totalOrdersEl.textContent = m.total_orders;
      if (unfulfilledEl) unfulfilledEl.textContent = `${m.unfulfilled_orders} Pending Fulfillment`;
      if (unitsSoldEl) unitsSoldEl.textContent = m.units_sold;
      if (aovEl) aovEl.textContent = `₹${m.average_order_value.toLocaleString('en-IN')}`;

      // Low Stock List
      const lowStockContainer = document.getElementById('admin-low-stock-list');
      if (lowStockContainer) {
        if (!m.low_stock_items || m.low_stock_items.length === 0) {
          lowStockContainer.innerHTML = '<span style="color:#127938;">All sizes and color variants are sufficiently stocked above minimum thresholds.</span>';
        } else {
          lowStockContainer.innerHTML = m.low_stock_items.map(item => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
              <div>
                <strong>${item.sku}</strong> — ${item.product_title} (${item.size})
              </div>
              <span class="admin-badge ${item.stock_quantity === 0 ? 'admin-badge-danger' : 'admin-badge-warning'}">
                ${item.stock_quantity === 0 ? 'OUT OF STOCK' : `LOW STOCK: ${item.stock_quantity} LEFT`}
              </span>
            </div>
          `).join('');
        }
      }
    }
  } catch (err) {
    console.warn('[Admin Metrics] Error loading metrics:', err);
  }
}

// 2. ORDERS MANAGEMENT
STATE.adminOrders = [];
STATE.adminOrderFilter = 'ALL';

async function loadAdminOrders() {
  const tbody = document.getElementById('admin-orders-table-body');
  if (tbody) tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:30px; color:#888;">Fetching orders from database...</td></tr>';

  try {
    const res = await fetch('/api/orders', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      STATE.adminOrders = json.data;
      renderAdminOrdersTable();
    }
  } catch (err) {
    console.warn('[Admin Orders] Error loading orders:', err);
    if (tbody) tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:30px; color:#cf222e;">Failed to load orders. Check network connection.</td></tr>';
  }
}

function setOrderFilter(filter) {
  STATE.adminOrderFilter = filter;
  const btns = document.querySelectorAll('.admin-filter-btn');
  btns.forEach(b => {
    if (b.getAttribute('data-filter') === filter) b.classList.add('active');
    else b.classList.remove('active');
  });
  renderAdminOrdersTable();
}

function filterOrdersTable() {
  renderAdminOrdersTable();
}

function renderAdminOrdersTable() {
  const tbody = document.getElementById('admin-orders-table-body');
  if (!tbody) return;

  const searchInput = document.getElementById('admin-order-search');
  const q = searchInput ? searchInput.value.trim().toLowerCase() : '';

  let orders = [...STATE.adminOrders];

  if (STATE.adminOrderFilter !== 'ALL') {
    orders = orders.filter(o => o.order_status === STATE.adminOrderFilter);
  }

  if (q) {
    orders = orders.filter(o =>
      o.order_number.toLowerCase().includes(q) ||
      (o.customer && o.customer.name.toLowerCase().includes(q)) ||
      (o.customer && o.customer.phone.includes(q))
    );
  }

  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:30px; color:#888;">No orders matching current filter.</td></tr>';
    return;
  }

  tbody.innerHTML = orders.map(o => {
    const isPaid = o.payment_status === 'PAID';
    const totalItems = o.items?.reduce((s, i) => s + i.quantity, 0) || 1;
    const dateStr = new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    let statusBadge = 'admin-badge-warning';
    if (o.order_status === 'DELIVERED') statusBadge = 'admin-badge-success';
    if (o.order_status === 'READY_TO_SHIP') statusBadge = 'admin-badge-info';
    if (o.order_status === 'SHIPPED') statusBadge = 'admin-badge-purple';
    if (o.order_status === 'CANCELLED' || o.order_status === 'RTO') statusBadge = 'admin-badge-danger';

    return `
      <tr>
        <td><strong>${o.order_number}</strong></td>
        <td>${dateStr}</td>
        <td>
          <div style="font-weight:600;">${o.customer?.name || 'Customer'}</div>
          <div style="font-size:0.75rem; color:var(--medium-gray);">${o.customer?.phone || ''}</div>
        </td>
        <td>${totalItems} Pc</td>
        <td><strong>₹${(o.total_amount || 0).toLocaleString('en-IN')}</strong></td>
        <td>
          <span class="admin-badge ${isPaid ? 'admin-badge-success' : 'admin-badge-warning'}">
            ${o.payment_method} (${o.payment_status})
          </span>
        </td>
        <td><span class="admin-badge ${statusBadge}">${o.order_status}</span></td>
        <td><span class="admin-badge admin-badge-dark">${o.shipment_status || 'UNFULFILLED'}</span></td>
        <td>
          <button class="luxury-btn outline-gold-btn" onclick="openOrderFulfillmentModal('${o.order_number}')" style="padding:6px 12px; font-size:0.6rem;">
            FULFILL
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// 3. ORDER FULFILLMENT MODAL (Shiprocket One-Click Console)
async function openOrderFulfillmentModal(orderNumber) {
  const order = STATE.adminOrders.find(o => o.order_number === orderNumber);
  if (!order) return;

  const container = document.getElementById('admin-order-modal-body');
  const title = document.getElementById('order-modal-title');
  if (title) title.textContent = `FULFILLMENT — ${order.order_number}`;

  container.innerHTML = `
    <!-- Top Customer Details -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; padding-bottom:20px; border-bottom:1px solid var(--border-color); margin-bottom:20px;">
      <div>
        <div class="admin-kpi-label">SHIPPING DESTINATION</div>
        <div style="font-weight:600; font-size:0.95rem;">${order.customer?.name}</div>
        <div style="font-size:0.8rem; color:var(--dark-gray); line-height:1.5; margin-top:4px;">
          ${order.shipping_address?.address_line1}<br>
          ${order.shipping_address?.city}, ${order.shipping_address?.state} — <strong>${order.shipping_address?.pincode}</strong>
        </div>
        <div style="font-size:0.8rem; color:var(--medium-gray); margin-top:6px;">
          Phone: ${order.customer?.phone} | Email: ${order.customer?.email}
        </div>
      </div>
      <div>
        <div class="admin-kpi-label">ORDER SUMMARY</div>
        <div style="font-size:0.85rem; line-height:1.6;">
          Total Amount: <strong>₹${order.total_amount?.toLocaleString('en-IN')}</strong><br>
          Payment: <span class="admin-badge ${order.payment_status === 'PAID' ? 'admin-badge-success' : 'admin-badge-warning'}">${order.payment_method} (${order.payment_status})</span><br>
          Current Order Status: <span class="admin-badge admin-badge-info">${order.order_status}</span>
        </div>
      </div>
    </div>

    <!-- Items List -->
    <div style="margin-bottom:25px;">
      <div class="admin-kpi-label" style="margin-bottom:10px;">ORDERED GARMENTS</div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${order.items?.map(i => `
          <div style="display:flex; justify-content:space-between; padding:10px 14px; background:#fafafa; border:1px solid var(--border-color); font-size:0.8rem;">
            <span><strong>${i.product_title}</strong> (Size: ${i.size}) × ${i.quantity}</span>
            <span>₹${i.total_price?.toLocaleString('en-IN')}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 1-Click Shiprocket Logistics Actions -->
    <div style="margin-bottom:25px;">
      <div class="admin-kpi-label" style="margin-bottom:12px;">SHIPROCKET AUTOMATED LOGISTICS PIPELINE</div>
      
      <!-- Step 1: Assign Courier & AWB -->
      <div class="admin-fulfillment-step ${order.shipment_status !== 'UNFULFILLED' ? 'completed' : ''}">
        <div class="admin-fulfillment-step-num">1</div>
        <div style="flex:1;">
          <div style="font-weight:600; font-size:0.85rem;">ASSIGN COURIER & GENERATE AWB</div>
          <div style="font-size:0.75rem; color:var(--medium-gray); margin-top:2px;">
            Pushes manifest to Shiprocket API and reserves courier slot (Delhivery / Bluedart Express).
          </div>
          <div style="margin-top:10px; display:flex; gap:10px;">
            <button class="luxury-btn gold-btn" onclick="executeAssignAWB('${order.order_number}')" style="padding:8px 14px; font-size:0.65rem;">
              AUTO-ASSIGN SHIPROCKET AWB
            </button>
          </div>
        </div>
      </div>

      <!-- Step 2: Schedule Courier Pickup -->
      <div class="admin-fulfillment-step ${order.shipment_status === 'PICKUP_SCHEDULED' || order.order_status === 'SHIPPED' ? 'completed' : ''}">
        <div class="admin-fulfillment-step-num">2</div>
        <div style="flex:1;">
          <div style="font-weight:600; font-size:0.85rem;">SCHEDULE WAREHOUSE PICKUP</div>
          <div style="font-size:0.75rem; color:var(--medium-gray); margin-top:2px;">
            Notifies courier driver to collect package from OV Central Hub (PIN: 600006).
          </div>
          <div style="margin-top:10px; display:flex; gap:10px; align-items:center;">
            <input type="date" id="order-pickup-date-input" class="auth-input" value="${new Date(Date.now() + 86400000).toISOString().slice(0, 10)}" style="border:1px solid var(--border-color); padding:6px 10px; font-size:0.75rem;">
            <button class="luxury-btn secondary" onclick="executeSchedulePickup('${order.order_number}')" style="padding:8px 14px; font-size:0.65rem;">
              SCHEDULE PICKUP
            </button>
          </div>
        </div>
      </div>

      <!-- Step 3: Print Shipping Label -->
      <div class="admin-fulfillment-step">
        <div class="admin-fulfillment-step-num">3</div>
        <div style="flex:1;">
          <div style="font-weight:600; font-size:0.85rem;">OFFICIAL SHIPPING LABEL</div>
          <div style="font-size:0.75rem; color:var(--medium-gray); margin-top:2px;">
            Generate ready-to-print barcode label for garment package exterior.
          </div>
          <div style="margin-top:10px;">
            <button class="luxury-btn outline-gold-btn" onclick="executePrintLabel('${order.order_number}')" style="padding:8px 14px; font-size:0.65rem;">
              PRINT SHIPPING LABEL (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Manual Status Override -->
    <div style="border-top:1px solid var(--border-color); padding-top:18px; display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; gap:10px; align-items:center;">
        <label style="font-size:0.75rem; font-weight:700;">UPDATE STATUS:</label>
        <select id="modal-order-status-select" class="auth-input" style="border:1px solid var(--border-color); padding:6px 12px; font-size:0.75rem;">
          <option value="PROCESSING" ${order.order_status === 'PROCESSING' ? 'selected' : ''}>PROCESSING</option>
          <option value="READY_TO_SHIP" ${order.order_status === 'READY_TO_SHIP' ? 'selected' : ''}>READY_TO_SHIP</option>
          <option value="SHIPPED" ${order.order_status === 'SHIPPED' ? 'selected' : ''}>SHIPPED</option>
          <option value="DELIVERED" ${order.order_status === 'DELIVERED' ? 'selected' : ''}>DELIVERED</option>
          <option value="CANCELLED" ${order.order_status === 'CANCELLED' ? 'selected' : ''}>CANCELLED</option>
          <option value="NDR" ${order.order_status === 'NDR' ? 'selected' : ''}>NDR (ISSUE)</option>
          <option value="RTO" ${order.order_status === 'RTO' ? 'selected' : ''}>RTO</option>
        </select>
        <button class="luxury-btn secondary" onclick="executeManualStatusUpdate('${order.order_number}')" style="padding:6px 12px; font-size:0.65rem;">
          UPDATE
        </button>
      </div>
      <button class="luxury-btn secondary" onclick="closeAdminModal('admin-order-modal')" style="padding:8px 16px; font-size:0.65rem;">
        CLOSE
      </button>
    </div>
  `;

  openAdminModal('admin-order-modal');
}

async function executeAssignAWB(orderNumber) {
  showNotification('ASSIGNING SHIPROCKET AWB...');
  try {
    const res = await fetch('/api/shipping/assign-awb', {
      method: 'POST',
      headers: getAdminAuthHeader(),
      body: JSON.stringify({ order_id: orderNumber })
    });
    const json = await res.json();
    if (json.success) {
      showNotification(`AWB ASSIGNED: ${json.data.shipment.awb_code} (${json.data.shipment.courier_name})`);
      await loadAdminOrders();
      openOrderFulfillmentModal(orderNumber);
    } else {
      showNotification(json.message || 'FAILED TO ASSIGN AWB');
    }
  } catch (err) {
    showNotification('NETWORK ERROR ASSIGNING AWB');
  }
}

async function executeSchedulePickup(orderNumber) {
  const dateInput = document.getElementById('order-pickup-date-input');
  const pickupDate = dateInput ? dateInput.value : null;

  showNotification('SCHEDULING COURIER PICKUP...');
  try {
    const res = await fetch('/api/shipping/schedule-pickup', {
      method: 'POST',
      headers: getAdminAuthHeader(),
      body: JSON.stringify({ order_id: orderNumber, pickup_date: pickupDate })
    });
    const json = await res.json();
    if (json.success) {
      showNotification(json.data?.message || 'PICKUP CONFIRMED');
      await loadAdminOrders();
      openOrderFulfillmentModal(orderNumber);
    } else {
      showNotification(json.message || 'FAILED TO SCHEDULE PICKUP');
    }
  } catch (err) {
    showNotification('NETWORK ERROR SCHEDULING PICKUP');
  }
}

async function executePrintLabel(orderNumber) {
  showNotification('GENERATING LABEL...');
  try {
    const res = await fetch(`/api/shipping/label?order_id=${orderNumber}`, {
      headers: getAdminAuthHeader()
    });
    const json = await res.json();
    if (json.success && json.data?.label_url) {
      window.open(json.data.label_url, '_blank');
    } else {
      showNotification(json.message || 'FAILED TO GENERATE LABEL');
    }
  } catch (err) {
    showNotification('ERROR RETRIEVING LABEL');
  }
}

async function executeManualStatusUpdate(orderNumber) {
  const select = document.getElementById('modal-order-status-select');
  const status = select ? select.value : 'PROCESSING';

  try {
    const res = await fetch(`/api/orders/${orderNumber}`, {
      method: 'PUT',
      headers: getAdminAuthHeader(),
      body: JSON.stringify({ order_status: status })
    });
    const json = await res.json();
    if (json.success) {
      showNotification(`STATUS UPDATED: ${status}`);
      await loadAdminOrders();
      openOrderFulfillmentModal(orderNumber);
    }
  } catch (err) {
    showNotification('FAILED TO UPDATE STATUS');
  }
}

// 4. INVENTORY STOCK MATRIX LOADER
async function loadAdminInventory() {
  const tbody = document.getElementById('admin-inventory-table-body');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#888;">Loading variant stock levels...</td></tr>';

  try {
    const res = await fetch('/api/products');
    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      const rows = [];
      json.data.forEach(prod => {
        (prod.variants || []).forEach(v => {
          rows.push(`
            <tr>
              <td><strong>${prod.title}</strong></td>
              <td><code>${v.sku}</code></td>
              <td>${v.color || 'Dune Beige'}</td>
              <td><strong>${v.size}</strong></td>
              <td>₹${v.price}</td>
              <td>
                <span class="admin-badge ${v.stock_quantity <= 5 ? (v.stock_quantity === 0 ? 'admin-badge-danger' : 'admin-badge-warning') : 'admin-badge-success'}">
                  ${v.stock_quantity} Units
                </span>
              </td>
              <td>
                <div style="display:flex; gap:6px; align-items:center;">
                  <button class="admin-stepper-btn" onclick="adjustVariantStock('${v.id}', -1)">-</button>
                  <button class="admin-stepper-btn" onclick="adjustVariantStock('${v.id}', 1)">+</button>
                  <button class="admin-stepper-btn" onclick="adjustVariantStock('${v.id}', 10)" style="width:36px; font-size:0.7rem;">+10</button>
                </div>
              </td>
            </tr>
          `);
        });
      });

      tbody.innerHTML = rows.join('') || '<tr><td colspan="7" style="text-align:center;">No variants found.</td></tr>';
    }
  } catch (err) {
    console.warn('[Admin Inventory] Error:', err);
  }
}

async function adjustVariantStock(variantId, delta) {
  try {
    const res = await fetch('/api/inventory/adjust', {
      method: 'POST',
      headers: getAdminAuthHeader(),
      body: JSON.stringify({ variant_id: variantId, delta: delta, reason: 'Admin UI Adjust' })
    });
    const json = await res.json();
    if (json.success) {
      showNotification(`STOCK UPDATED: ${json.data.sku} (${json.data.stock_quantity} Left)`);
      loadAdminInventory();
      loadAdminMetrics();
    }
  } catch (err) {
    showNotification('FAILED TO ADJUST INVENTORY');
  }
}

// 5. SHIPROCKET SERVICEABILITY TESTER
async function testCourierRates() {
  const pinInput = document.getElementById('shipping-test-pincode');
  const resultsEl = document.getElementById('shipping-test-results');
  const pin = pinInput ? pinInput.value.trim() : '';

  if (!/^\d{6}$/.test(pin)) {
    alert('Please enter a valid 6-digit Indian PIN code');
    return;
  }

  resultsEl.innerHTML = '<span style="color:var(--medium-gray);">Checking Shiprocket courier APIs...</span>';

  try {
    const res = await fetch(`/api/shipping/serviceability?pincode=${pin}`);
    const json = await res.json();

    if (json.success && json.data?.serviceable) {
      const couriers = json.data.couriers || [];
      resultsEl.innerHTML = `
        <div style="color:#127938; font-weight:600; margin-bottom:10px;">PINCODE ${pin} IS SERVICEABLE</div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${couriers.map(c => `
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:white; border:1px solid var(--border-color); font-size:0.75rem;">
              <span><strong>${c.name}</strong> (${c.estimated_days})</span>
              <span>₹${c.rate}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      resultsEl.innerHTML = `<span style="color:#cf222e;">Not serviceable: ${json.data?.message || 'Invalid or remote PIN code'}</span>`;
    }
  } catch (err) {
    resultsEl.innerHTML = '<span style="color:#cf222e;">Error querying courier serviceability.</span>';
  }
}

// 6. RETURNS & EXCHANGES
async function loadAdminReturns() {
  const tbody = document.getElementById('admin-returns-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/returns', { headers: getAdminAuthHeader() });
    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      if (json.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:30px; color:#888;">No active return/exchange requests.</td></tr>';
        return;
      }

      tbody.innerHTML = json.data.map(r => `
        <tr>
          <td><code>${r.id}</code></td>
          <td><strong>${r.order_number}</strong></td>
          <td>${r.customer_name}</td>
          <td><span class="admin-badge admin-badge-purple">${r.type}</span></td>
          <td>${r.reason}</td>
          <td><span class="admin-badge ${r.status === 'APPROVED' ? 'admin-badge-success' : 'admin-badge-warning'}">${r.status}</span></td>
          <td>${r.reverse_awb ? `<strong>${r.reverse_awb}</strong>` : '—'}</td>
          <td>
            ${r.status === 'REQUESTED' ? `
              <div style="display:flex; gap:6px;">
                <button class="luxury-btn gold-btn" onclick="updateReturnStatus('${r.id}', 'APPROVED')" style="padding:4px 8px; font-size:0.6rem;">APPROVE</button>
                <button class="luxury-btn secondary" onclick="updateReturnStatus('${r.id}', 'REJECTED')" style="padding:4px 8px; font-size:0.6rem;">REJECT</button>
              </div>
            ` : `<span style="color:var(--medium-gray); font-size:0.75rem;">Resolved</span>`}
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.warn('[Admin Returns] Error:', err);
  }
}

async function updateReturnStatus(returnId, status) {
  try {
    const res = await fetch(`/api/returns/${returnId}`, {
      method: 'PUT',
      headers: getAdminAuthHeader(),
      body: JSON.stringify({ status })
    });
    const json = await res.json();
    if (json.success) {
      showNotification(`RETURN ${status}: ${returnId}`);
      loadAdminReturns();
    }
  } catch (err) {
    showNotification('FAILED TO UPDATE RETURN STATUS');
  }
}

// 7. COUPONS MANAGEMENT
async function loadAdminCoupons() {
  const tbody = document.getElementById('admin-coupons-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/coupons', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      tbody.innerHTML = json.data.map(c => `
        <tr>
          <td><strong>${c.code}</strong></td>
          <td>${c.discount_type === 'PERCENTAGE' ? `${c.discount_value}% OFF` : `₹${c.discount_value} FLAT`}</td>
          <td>₹${c.min_order_amount || 0}</td>
          <td>${c.max_discount ? `₹${c.max_discount}` : 'No Cap'}</td>
          <td>${c.expires_at ? new Date(c.expires_at).toLocaleDateString() : 'Never'}</td>
          <td><span class="admin-badge ${c.is_active ? 'admin-badge-success' : 'admin-badge-danger'}">${c.is_active ? 'ACTIVE' : 'EXPIRED'}</span></td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.warn('[Admin Coupons] Error:', err);
  }
}

function openNewCouponForm() {
  const form = document.getElementById('admin-coupon-form');
  if (form) form.reset();
  openAdminModal('admin-coupon-modal');
}

async function saveCouponForm(e) {
  if (e) e.preventDefault();
  const code = document.getElementById('coupon-form-code').value.trim();
  const type = document.getElementById('coupon-form-type').value;
  const val = document.getElementById('coupon-form-val').value;
  const min = document.getElementById('coupon-form-min').value;
  const max = document.getElementById('coupon-form-max').value;

  try {
    const res = await fetch('/api/admin/coupons', {
      method: 'POST',
      headers: getAdminAuthHeader(),
      body: JSON.stringify({
        code,
        discount_type: type,
        discount_value: val,
        min_order_amount: min,
        max_discount: max
      })
    });
    const json = await res.json();
    if (json.success) {
      showNotification(`COUPON ${code} CREATED`);
      closeAdminModal('admin-coupon-modal');
      loadAdminCoupons();
    }
  } catch (err) {
    showNotification('FAILED TO CREATE COUPON');
  }
}

// 8. SECURITY AUDIT LOGS
async function loadAdminAuditLogs() {
  const tbody = document.getElementById('admin-audit-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/audit-logs', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      tbody.innerHTML = json.data.map(l => `
        <tr>
          <td style="font-size:0.75rem; color:var(--medium-gray);">${new Date(l.timestamp).toLocaleString('en-IN')}</td>
          <td><strong>${l.user_name || 'System'}</strong></td>
          <td><span class="admin-badge admin-badge-dark">${l.action}</span></td>
          <td>${l.resource_type}: ${l.resource_id}</td>
          <td><code>${l.ip_address || '127.0.0.1'}</code></td>
          <td style="font-size:0.75rem; color:#555; max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
            ${typeof l.details === 'object' ? JSON.stringify(l.details) : l.details}
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.warn('[Admin Audit Logs] Error:', err);
  }
}

// 9. CUSTOMERS DIRECTORY
async function loadAdminCustomers() {
  const tbody = document.getElementById('admin-customers-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/customers', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      if (json.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px; color:#888;">No customer profiles recorded yet.</td></tr>';
        return;
      }
      tbody.innerHTML = json.data.map(c => `
        <tr>
          <td><strong>${c.name}</strong></td>
          <td>${c.phone}<br><span style="font-size:0.75rem; color:var(--medium-gray);">${c.email || 'No email'}</span></td>
          <td>${c.total_orders || 1} Orders</td>
          <td><strong>₹${(c.total_spent || 0).toLocaleString('en-IN')}</strong></td>
          <td>
            <span class="admin-badge ${c.group_tag === 'VIP' ? 'admin-badge-success' : (c.group_tag === 'COD_RISK' ? 'admin-badge-danger' : 'admin-badge-dark')}">
              ${c.group_tag || 'NEW'}
            </span>
          </td>
          <td>
            <button class="luxury-btn secondary" onclick="promptUpdateCustomerTag('${c.phone}')" style="padding:6px 12px; font-size:0.6rem;">UPDATE TAG</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.warn('[Admin Customers] Error:', err);
  }
}

async function promptUpdateCustomerTag(phone) {
  const newTag = prompt('Enter new tag for customer (VIP, NEW, COD_RISK, RETURNING):', 'VIP');
  if (!newTag) return;
  try {
    const res = await fetch('/api/admin/customers', {
      method: 'PUT',
      headers: { ...getAdminAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, group_tag: newTag.toUpperCase() })
    });
    const json = await res.json();
    if (json.success) {
      showNotification('CUSTOMER TAG UPDATED: ' + newTag.toUpperCase());
      loadAdminCustomers();
    }
  } catch (e) {
    showNotification('FAILED TO UPDATE TAG');
  }
}

// 10. PAYMENTS & COD RECONCILIATION
async function loadAdminPayments() {
  const tbody = document.getElementById('admin-payments-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/payments', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      if (json.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px; color:#888;">No transactions found.</td></tr>';
        return;
      }
      tbody.innerHTML = json.data.map(p => `
        <tr>
          <td><strong>${p.order_number}</strong></td>
          <td>${p.customer_name || 'Customer'}</td>
          <td><strong>₹${(p.amount || 0).toLocaleString('en-IN')}</strong></td>
          <td><span class="admin-badge admin-badge-dark">${p.payment_method}</span></td>
          <td>
            <span class="admin-badge ${p.status === 'PAID' || p.status === 'SUCCESS' ? 'admin-badge-success' : (p.status === 'REFUNDED' ? 'admin-badge-warning' : 'admin-badge-secondary')}">
              ${p.status}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:6px;">
              ${p.payment_method === 'COD' && p.status !== 'PAID' ? `
                <button class="luxury-btn gold-btn" onclick="markCodCollected('${p.order_number}')" style="padding:6px 10px; font-size:0.6rem;">MARK COLLECTED</button>
              ` : ''}
              ${(p.status === 'PAID' || p.status === 'SUCCESS') ? `
                <button class="luxury-btn secondary" onclick="processAdminRefund('${p.order_number}', ${p.amount})" style="padding:6px 10px; font-size:0.6rem; color:#cf222e;">REFUND</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.warn('[Admin Payments] Error:', err);
  }
}

async function markCodCollected(orderNumber) {
  if (!confirm(`Confirm COD cash collection for Order ${orderNumber}?`)) return;
  try {
    const res = await fetch('/api/admin/payments', {
      method: 'POST',
      headers: { ...getAdminAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_number: orderNumber, action: 'MARK_COD_COLLECTED' })
    });
    const json = await res.json();
    if (json.success) {
      showNotification('COD PAYMENT CONFIRMED');
      loadAdminPayments();
      loadAdminOrders();
    }
  } catch (e) {
    showNotification('FAILED TO UPDATE PAYMENT');
  }
}

async function processAdminRefund(orderNumber, amount) {
  const reason = prompt(`Enter refund reason for Order ${orderNumber} (Amount: ₹${amount}):`, 'Customer return approved');
  if (!reason) return;

  try {
    showNotification('PROCESSING REFUND VIA GATEWAY...');
    const res = await fetch('/api/admin/refunds', {
      method: 'POST',
      headers: { ...getAdminAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_number: orderNumber, amount, reason })
    });
    const json = await res.json();
    if (json.success) {
      showNotification(`REFUND PROCESSED: ₹${amount} (Ref: ${json.data.gateway_refund_id || 'OK'})`);
      loadAdminPayments();
      loadAdminOrders();
      loadAdminReturns();
    } else {
      showNotification(json.message || 'REFUND FAILED');
    }
  } catch (e) {
    showNotification('FAILED TO PROCESS REFUND');
  }
}

// 11. ABANDONED CARTS
async function loadAdminAbandoned() {
  const tbody = document.getElementById('admin-abandoned-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/checkout/abandoned', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      if (json.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px; color:#888;">No abandoned checkouts detected.</td></tr>';
        return;
      }
      tbody.innerHTML = json.data.map(a => `
        <tr>
          <td><code>${a.session_id.slice(-8)}</code></td>
          <td>${a.customer_phone || a.customer_email || 'Anonymous'}<br><span style="font-size:0.75rem; color:#888;">${a.customer_name || ''}</span></td>
          <td>${Array.isArray(a.items) ? a.items.length : 1} garment(s)</td>
          <td><strong>₹${(a.subtotal || 0).toLocaleString('en-IN')}</strong></td>
          <td><span class="admin-badge admin-badge-warning">${a.recovery_status || 'ABANDONED'}</span></td>
          <td style="font-size:0.75rem; color:var(--medium-gray);">${new Date(a.created_at).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</td>
        </tr>
      `).join('');
    }
  } catch (e) {
    console.warn('[Admin Abandoned] Error:', e);
  }
}

// 12. USERS & RBAC MANAGEMENT
async function loadAdminUsers() {
  const tbody = document.getElementById('admin-users-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/users', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      tbody.innerHTML = json.data.map(u => `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td>${u.email}</td>
          <td><span class="admin-badge ${u.role === 'OWNER' ? 'admin-badge-success' : 'admin-badge-dark'}">${u.role}</span></td>
          <td><span class="admin-badge ${u.is_active ? 'admin-badge-success' : 'admin-badge-danger'}">${u.is_active ? 'ACTIVE' : 'DISABLED'}</span></td>
          <td style="font-size:0.75rem; color:var(--medium-gray);">${new Date(u.created_at).toLocaleDateString('en-IN')}</td>
        </tr>
      `).join('');
    }
  } catch (e) {
    console.warn('[Admin Users] Error:', e);
  }
}

function openNewAdminUserModal() {
  openAdminModal('admin-user-modal');
}

async function saveAdminUserForm(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('user-form-name').value.trim();
  const email = document.getElementById('user-form-email').value.trim();
  const password = document.getElementById('user-form-password').value;
  const role = document.getElementById('user-form-role').value;

  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { ...getAdminAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const json = await res.json();
    if (json.success) {
      showNotification('ADMIN USER CREATED: ' + email);
      closeAdminModal('admin-user-modal');
      loadAdminUsers();
      document.getElementById('admin-user-form').reset();
    } else {
      showNotification(json.message || 'FAILED TO CREATE USER');
    }
  } catch (err) {
    showNotification('FAILED TO CREATE USER');
  }
}

// 13. SYSTEM HEALTH DIAGNOSTIC
async function loadAdminHealth() {
  const dbCard = document.getElementById('health-db-status');
  const payCard = document.getElementById('health-pay-status');
  const shipCard = document.getElementById('health-ship-status');
  const checklist = document.getElementById('health-checklist');
  if (!dbCard) return;

  dbCard.textContent = 'QUERYING...';
  try {
    const res = await fetch('/api/admin/health', { headers: getAdminAuthHeader() });
    const json = await res.json();
    if (json.success && json.data) {
      const h = json.data;
      const dbInfo = h.integrations.database;
      const payInfo = h.integrations.payment_gateway;
      const shipInfo = h.integrations.shipping_logistics;

      dbCard.textContent = dbInfo.status;
      dbCard.style.color = dbInfo.status === 'HEALTHY' ? '#127938' : '#b25900';
      document.getElementById('health-db-details').textContent = `${dbInfo.engine} ${dbInfo.latency ? '(' + dbInfo.latency + ')' : ''}`;

      payCard.textContent = payInfo.configured ? 'CONFIGURED' : 'DEV SIMULATION';
      payCard.style.color = payInfo.configured ? '#127938' : '#b25900';
      document.getElementById('health-pay-details').textContent = payInfo.configured ? 'Live Razorpay Keys Active' : 'Sandbox Simulated Mode';

      shipCard.textContent = shipInfo.configured ? 'ONLINE' : 'DEV SIMULATION';
      shipCard.style.color = shipInfo.configured ? '#127938' : '#b25900';
      document.getElementById('health-ship-details').textContent = shipInfo.configured ? `Hub: ${shipInfo.pickup_location}` : 'Simulated Courier Matrix';

      if (checklist) {
        checklist.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;"><span class="admin-badge ${dbInfo.is_production_ready ? 'admin-badge-success' : 'admin-badge-warning'}">${dbInfo.is_production_ready ? 'CONNECTED' : 'DEV MODE'}</span> <strong>PostgreSQL Database:</strong> ${dbInfo.is_production_ready ? 'Connected & Verified as Sole Source of Truth' : 'Operating in Dev Fallback without DATABASE_URL'}</div>
          <div style="display:flex; align-items:center; gap:8px;"><span class="admin-badge ${payInfo.configured ? 'admin-badge-success' : 'admin-badge-warning'}">${payInfo.configured ? 'ACTIVE' : 'DEV MODE'}</span> <strong>Razorpay Payment Gateway:</strong> ${payInfo.configured ? 'Server-Verified HMAC Verification Active' : 'Dev Mode (Set RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET for live)'}</div>
          <div style="display:flex; align-items:center; gap:8px;"><span class="admin-badge ${shipInfo.configured ? 'admin-badge-success' : 'admin-badge-warning'}">${shipInfo.configured ? 'ACTIVE' : 'DEV MODE'}</span> <strong>Shiprocket Logistics Provider:</strong> ${shipInfo.configured ? 'Official API v1 Connected' : 'Dev Mode (Set SHIPROCKET_API_EMAIL & PASSWORD for live)'}</div>
          <div style="display:flex; align-items:center; gap:8px;"><span class="admin-badge admin-badge-success">ACTIVE</span> <strong>Security Hardening:</strong> Zero Plaintext Secrets in Tracked Files & Brute-Force Defense Active</div>
          <div style="display:flex; align-items:center; gap:8px;"><span class="admin-badge admin-badge-success">ACTIVE</span> <strong>Logistics Workflow:</strong> Rate Check &bull; Courier Choice &bull; AWB Generation &bull; Pickup &bull; Label PDF &bull; NDR/RTO</div>
        `;
      }
    }
  } catch (err) {
    console.warn('[Health Check] Error:', err);
  }
}

// 14. CUSTOMER RETURN / EXCHANGE MODAL
function openCustomerReturnModal(orderNumber = '') {
  const input = document.getElementById('return-form-order-number');
  if (input && orderNumber) input.value = orderNumber;
  openModal('customer-return-modal');
}

function toggleDesiredSizeInput(type) {
  const group = document.getElementById('desired-size-group');
  if (group) {
    group.style.display = type === 'EXCHANGE' ? 'block' : 'none';
  }
}

async function handleCustomerReturnSubmit(e) {
  if (e) e.preventDefault();
  const orderNumber = document.getElementById('return-form-order-number').value.trim();
  const type = document.getElementById('return-form-type').value;
  const desiredSize = document.getElementById('return-form-desired-size').value;
  const reason = document.getElementById('return-form-reason').value;
  const notes = document.getElementById('return-form-notes').value.trim();

  try {
    showNotification('SUBMITTING RETURN / EXCHANGE REQUEST...');
    const res = await fetch('/api/returns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_number: orderNumber,
        type,
        desired_size: type === 'EXCHANGE' ? desiredSize : null,
        reason,
        notes
      })
    });
    const json = await res.json();
    if (json.success) {
      closeModal('customer-return-modal');
      showNotification('REQUEST SUBMITTED SUCCESSFULLY! OUR TEAM WILL REVIEW WITHIN 24 HOURS.');
      document.getElementById('customer-return-form').reset();
    } else {
      showNotification(json.message || 'FAILED TO SUBMIT REQUEST');
    }
  } catch (err) {
    showNotification('FAILED TO SUBMIT REQUEST');
  }
}

// 15. STORE SETTINGS
async function saveAdminSettings(e) {
  if (e) e.preventDefault();
  const storeName = document.getElementById('setting-store-name').value;
  const freeShip = document.getElementById('setting-free-shipping').value;
  const stdShip = document.getElementById('setting-standard-shipping').value;
  const codFee = document.getElementById('setting-cod-fee').value;
  const pincode = document.getElementById('setting-pickup-pincode').value;

  try {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: getAdminAuthHeader(),
      body: JSON.stringify({
        store_name: storeName,
        free_shipping_threshold: freeShip ? parseFloat(freeShip) : 999,
        standard_shipping_rate: stdShip ? parseFloat(stdShip) : 99,
        cod_fee: codFee ? parseFloat(codFee) : 49,
        pickup_pincode: pincode
      })
    });
    const json = await res.json();
    if (json.success) {
      showNotification('STORE CONFIGURATION SAVED');
    }
  } catch (err) {
    showNotification('FAILED TO SAVE SETTINGS');
  }
}

function renderAdminDashboard() {
  try { renderStorefrontMedia(); } catch(e) {}

  // Populate Logo Forms
  document.getElementById('admin-logo-letters-input').value = STATE.logo.letters || 'OV';
  document.getElementById('admin-logo-subtext-input').value = STATE.logo.subtext || 'ORIGINAL VERSION';
  
  const logoImage = STATE.logo.image || '';
  document.getElementById('admin-logo-image-data').value = logoImage;
  const logoPreview = document.getElementById('admin-logo-img-preview');
  const logoRemoveBtn = document.getElementById('admin-logo-remove-img-btn');
  if (logoImage) {
    logoPreview.src = logoImage;
    logoPreview.style.display = 'block';
    logoRemoveBtn.style.display = 'block';
  } else {
    logoPreview.style.display = 'none';
    logoRemoveBtn.style.display = 'none';
  }

  // Render Slides list
  const slidesList = document.getElementById('admin-slides-list');
  slidesList.innerHTML = '';
  STATE.slides.forEach((slide, idx) => {
    const item = document.createElement('div');
    item.className = 'admin-list-item';
    item.style.display = 'flex';
    item.style.gap = '20px';
    item.style.padding = '20px';
    item.style.border = '1px solid var(--border-color)';
    item.style.alignItems = 'center';

    item.innerHTML = `
      <img src="${slide.image}" style="width: 100px; height: 60px; object-fit: cover; border: 1px solid var(--border-color);">
      <div style="flex: 1;">
        <h4 style="font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">${slide.title || 'UNTITLED SLIDE'}</h4>
        <p style="font-size:0.75rem; color:var(--medium-gray); margin-top:3px;">Position: ${slide.position || 'center'}</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="luxury-btn outline-gold-btn" onclick="editSlide(${idx})" style="padding: 8px 15px; font-size:0.6rem; min-width:unset;">EDIT</button>
        <button class="luxury-btn secondary" onclick="deleteSlide(${idx})" style="padding: 8px 15px; font-size:0.6rem; min-width:unset;">DELETE</button>
      </div>
    `;
    slidesList.appendChild(item);
  });

  // Render Products list
  const productsList = document.getElementById('admin-products-list');
  productsList.innerHTML = '';
  STATE.products.forEach(prod => {
    const item = document.createElement('div');
    item.className = 'admin-list-item';
    item.style.display = 'flex';
    item.style.gap = '20px';
    item.style.padding = '20px';
    item.style.border = '1px solid var(--border-color)';
    item.style.alignItems = 'center';

    const photoCount = (Array.isArray(prod.gallery) && prod.gallery.length > 0) ? prod.gallery.length : 1;

    item.innerHTML = `
      <img src="${prod.image}" style="width: 60px; height: 80px; object-fit: cover; border: 1px solid var(--border-color); background:#cab8aa;">
      <div style="flex: 1;">
        <h4 style="font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">${prod.name}</h4>
        <p style="font-size:0.75rem; color:var(--medium-gray); margin-top:3px;">
          ₹${prod.price.toLocaleString('en-IN')} | Category: ${prod.type} | Stock: ${prod.stock} | 
          <span style="display:inline-flex; align-items:center; gap:4px; font-weight:600; color:#b08d57;">
            📷 ${photoCount} Photo${photoCount > 1 ? 's' : ''} in Gallery
          </span>
        </p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="luxury-btn outline-gold-btn" onclick="editProduct('${prod.id}')" style="padding: 8px 15px; font-size:0.6rem; min-width:unset;">EDIT & PHOTOS</button>
        <button class="luxury-btn secondary" onclick="deleteProduct('${prod.id}')" style="padding: 8px 15px; font-size:0.6rem; min-width:unset;">DELETE</button>
      </div>
    `;
    productsList.appendChild(item);
  });
}

function handleFileAsBase64(input, previewId, hiddenInputId) {
  handleFileAsCompressedBase64(input, previewId, hiddenInputId);
}

function handleFileAsCompressedBase64(input, previewId, hiddenInputId, urlInputId, maxWidth = 1600, maxHeight = 1600, quality = 0.82) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let w = img.width;
      let h = img.height;

      if (w > maxWidth || h > maxHeight) {
        if (w / h > maxWidth / maxHeight) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        } else {
          w = Math.round((w * maxHeight) / h);
          h = maxHeight;
        }
      }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

      const preview = document.getElementById(previewId);
      const hidden = document.getElementById(hiddenInputId);
      const urlInput = urlInputId ? document.getElementById(urlInputId) : null;

      if (preview) {
        preview.src = compressedDataUrl;
        preview.style.display = 'block';
      }
      if (hidden) {
        hidden.value = compressedDataUrl;
      }
      if (urlInput) {
        urlInput.value = ''; // clear text URL if uploaded custom file
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function updateSlidePreviewFromUrl(url) {
  const preview = document.getElementById('slide-form-img-preview');
  const hidden = document.getElementById('slide-form-image-data');
  if (url && url.trim()) {
    if (preview) {
      preview.src = url.trim();
      preview.style.display = 'block';
    }
    if (hidden) hidden.value = url.trim();
  }
}

function setSlideImagePreset(presetUrl) {
  const urlInput = document.getElementById('slide-form-image-url');
  if (urlInput) urlInput.value = presetUrl;
  updateSlidePreviewFromUrl(presetUrl);
}

// ==============================================================================
// PRODUCT MULTI-IMAGE GALLERY MANAGER (ADMIN)
// ==============================================================================
let currentProductGallery = [];

function handleProductGalleryUpload(input) {
  if (!input.files || input.files.length === 0) return;
  const files = Array.from(input.files);
  let processed = 0;
  
  if (!Array.isArray(currentProductGallery)) currentProductGallery = [];

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const maxWidth = 1200;
        const maxHeight = 1200;
        let w = img.width;
        let h = img.height;

        if (w > maxWidth || h > maxHeight) {
          if (w / h > maxWidth / maxHeight) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxHeight) / h);
            h = maxHeight;
          }
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.80);
        
        currentProductGallery.push(compressedDataUrl);
        processed++;
        if (processed === files.length) {
          renderProductGalleryManager();
          showNotification(`${files.length} PHOTO${files.length > 1 ? 'S' : ''} ADDED TO GALLERY`);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function handleAddUrlToGallery() {
  const urlInput = document.getElementById('product-form-add-url');
  if (!urlInput) return;
  const val = urlInput.value.trim();
  if (!val) {
    showNotification('PLEASE ENTER AN IMAGE URL OR PATH');
    return;
  }
  addGalleryImageUrl(val);
  urlInput.value = '';
}

function addGalleryImageUrl(url) {
  if (!url || !url.trim()) return;
  if (!Array.isArray(currentProductGallery)) currentProductGallery = [];
  currentProductGallery.push(url.trim());
  renderProductGalleryManager();
  showNotification('IMAGE ADDED TO GALLERY');
}

function removeGalleryImage(idx) {
  if (!Array.isArray(currentProductGallery)) return;
  if (idx < 0 || idx >= currentProductGallery.length) return;
  currentProductGallery.splice(idx, 1);
  renderProductGalleryManager();
  showNotification('PHOTO REMOVED');
}

function setAsMainGalleryImage(idx) {
  if (!Array.isArray(currentProductGallery)) return;
  if (idx <= 0 || idx >= currentProductGallery.length) return;
  const item = currentProductGallery.splice(idx, 1)[0];
  currentProductGallery.unshift(item);
  renderProductGalleryManager();
  showNotification('★ PRIMARY COVER PHOTO UPDATED');
}

function moveGalleryImage(idx, dir) {
  if (!Array.isArray(currentProductGallery)) return;
  const targetIdx = idx + dir;
  if (targetIdx < 0 || targetIdx >= currentProductGallery.length) return;
  const temp = currentProductGallery[idx];
  currentProductGallery[idx] = currentProductGallery[targetIdx];
  currentProductGallery[targetIdx] = temp;
  renderProductGalleryManager();
}

function renderProductGalleryManager() {
  const grid = document.getElementById('product-gallery-preview-grid');
  const badge = document.getElementById('product-gallery-count-badge');
  if (!Array.isArray(currentProductGallery)) currentProductGallery = [];

  if (badge) {
    badge.textContent = `${currentProductGallery.length} Photo${currentProductGallery.length === 1 ? '' : 's'}`;
    badge.style.background = currentProductGallery.length > 0 ? '#b08d57' : '#222';
  }

  // Keep hidden inputs in sync for any legacy scripts
  const hiddenData = document.getElementById('product-form-image-data');
  const hiddenUrl = document.getElementById('product-form-image-url');
  if (hiddenData) hiddenData.value = currentProductGallery[0] || '';
  if (hiddenUrl) hiddenUrl.value = currentProductGallery[0] || '';

  if (!grid) return;

  if (currentProductGallery.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 26px 15px; text-align: center; border: 1px dashed var(--border-color); background: #ffffff; border-radius: 4px; color: #777; font-size: 0.74rem;">
        <span style="font-size: 1.4rem; display:block; margin-bottom:6px;">📷</span>
        <strong style="color:#222;">NO PHOTOS ADDED YET</strong><br>
        Click <span style="text-decoration:underline;">"CHOOSE MULTIPLE PHOTOS AT ONCE"</span> above or pick from quick presets to add front, back, and detail images.
      </div>
    `;
    return;
  }

  grid.innerHTML = currentProductGallery.map((imgSrc, idx) => {
    const isCover = idx === 0;
    return `
      <div class="gallery-admin-card ${isCover ? 'is-cover' : ''}">
        <div class="gallery-admin-card-img-wrap">
          <img src="${imgSrc}" alt="Product Photo ${idx + 1}" onerror="this.src='images/product_beige_front_model.jpg'">
          ${isCover ? '<div class="gallery-cover-tag">★ MAIN COVER</div>' : `
            <button type="button" class="gallery-set-cover-btn" onclick="setAsMainGalleryImage(${idx})">
              SET COVER
            </button>
          `}
          <button type="button" class="gallery-del-btn" onclick="removeGalleryImage(${idx})" title="Delete image">✕</button>
        </div>
        <div class="gallery-admin-card-footer">
          <span class="gallery-card-label">${isCover ? '1 (Cover)' : '#' + (idx + 1)}</span>
          <div class="gallery-card-controls">
            <button type="button" class="order-btn" onclick="moveGalleryImage(${idx}, -1)" ${idx === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="Move Earlier">◀</button>
            <button type="button" class="order-btn" onclick="moveGalleryImage(${idx}, 1)" ${idx === currentProductGallery.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="Move Later">▶</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateProductPreviewFromUrl(url) {
  if (url && url.trim()) addGalleryImageUrl(url.trim());
}

function setProductImagePreset(presetUrl) {
  addGalleryImageUrl(presetUrl);
}

function openAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.pointerEvents = 'auto';
    document.body.classList.add('no-scroll');
  }
}

function closeAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    modal.style.pointerEvents = 'none';
    document.body.classList.remove('no-scroll');
  }
}

// Allow clicking outside modal panel to close admin modals smoothly
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList && e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
    closeAdminModal(e.target.id);
  }
});

function openNewSlideForm() {
  document.getElementById('admin-slide-form').reset();
  document.getElementById('slide-form-index').value = '';
  document.getElementById('slide-form-image-data').value = '';
  const urlInput = document.getElementById('slide-form-image-url');
  if (urlInput) urlInput.value = '';
  const preview = document.getElementById('slide-form-img-preview');
  if (preview) { preview.src = ''; preview.style.display = 'none'; }
  document.getElementById('slide-modal-title').textContent = 'ADD NEW HERO SLIDE';
  openAdminModal('admin-slide-modal');
}

function editSlide(idx) {
  const slide = STATE.slides[idx];
  if (!slide) return;

  document.getElementById('slide-form-index').value = idx;
  document.getElementById('slide-form-image-data').value = slide.image || '';
  
  const urlInput = document.getElementById('slide-form-image-url');
  if (urlInput) urlInput.value = slide.image || '';

  const preview = document.getElementById('slide-form-img-preview');
  if (preview) {
    preview.src = slide.image;
    preview.style.display = slide.image ? 'block' : 'none';
  }

  const posEl = document.getElementById('slide-form-position');
  if (posEl) posEl.value = slide.position || 'right 20% center';

  document.getElementById('slide-form-eyebrow').value = slide.eyebrow || '';
  document.getElementById('slide-form-title').value = slide.title || '';
  document.getElementById('slide-form-script').value = slide.scriptTitle || '';
  document.getElementById('slide-form-desc').value = slide.desc || '';
  document.getElementById('slide-form-btn-text').value = slide.btnText || 'SHOP NOW';
  document.getElementById('slide-form-is-logo').checked = !!slide.isLogoGraphic;

  document.getElementById('slide-modal-title').textContent = 'EDIT HERO SLIDE #' + (idx + 1);
  openAdminModal('admin-slide-modal');
}

function deleteSlide(idx) {
  if (confirm('Are you sure you want to delete this banner slide?')) {
    STATE.slides.splice(idx, 1);
    try { localStorage.setItem('ov_custom_slides', JSON.stringify(STATE.slides)); } catch(e) {}
    renderHeroSlider();
    renderAdminDashboard();
    showNotification('SLIDE REMOVED SUCCESSFUL');
    fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAdminAuthHeader() },
      body: JSON.stringify({ hero_slides: STATE.slides, custom_hero_slides_saved: true })
    }).catch(() => {});
  }
}

function saveSlideForm(event) {
  event.preventDefault();
  const idx = document.getElementById('slide-form-index').value;
  const urlInput = document.getElementById('slide-form-image-url');
  let imageData = (urlInput && urlInput.value.trim()) ? urlInput.value.trim() : document.getElementById('slide-form-image-data').value;
  
  if (!imageData) {
    showNotification('PLEASE PROVIDE AN IMAGE URL OR UPLOAD A FILE');
    return;
  }

  const posVal = document.getElementById('slide-form-position').value || 'right 20% center';

  const slideData = {
    image: imageData,
    position: posVal,
    overlay: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
    eyebrow: document.getElementById('slide-form-eyebrow').value.trim(),
    title: document.getElementById('slide-form-title').value.trim(),
    scriptTitle: document.getElementById('slide-form-script').value.trim(),
    desc: document.getElementById('slide-form-desc').value.trim(),
    btnText: document.getElementById('slide-form-btn-text').value.trim() || 'SHOP NOW',
    btnAction: 'shop',
    layout: 'layout-split',
    isLogoGraphic: document.getElementById('slide-form-is-logo').checked,
    vFeatures: [
      { num: '01', title: 'PREMIUM QUALITY', desc: 'Double-combed heavy cotton' },
      { num: '02', title: 'MODERN DESIGNS', desc: 'Designed for the modern muse' },
      { num: '03', title: 'TIMELESS ELEGANCE', desc: 'Crafted to outlast trends' }
    ]
  };

  if (idx !== '') {
    // Edit existing
    STATE.slides[parseInt(idx)] = slideData;
  } else {
    // Add new
    STATE.slides.push(slideData);
  }

  try {
    localStorage.setItem('ov_custom_slides', JSON.stringify(STATE.slides));
  } catch(e) {
    console.warn('LocalStorage limit for slides:', e);
  }

  renderHeroSlider();
  renderAdminDashboard();
  closeAdminModal('admin-slide-modal');
  showNotification('BANNER SLIDE SAVED SUCCESSFULLY');

  fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAdminAuthHeader() },
    body: JSON.stringify({ hero_slides: STATE.slides, custom_hero_slides_saved: true })
  }).catch(() => {});
}

function openNewProductForm() {
  document.getElementById('admin-product-form').reset();
  document.getElementById('product-form-id').value = '';
  document.getElementById('product-form-image-data').value = '';
  const urlInput = document.getElementById('product-form-image-url');
  if (urlInput) urlInput.value = '';
  const addUrlInput = document.getElementById('product-form-add-url');
  if (addUrlInput) addUrlInput.value = '';
  
  currentProductGallery = [];
  renderProductGalleryManager();

  document.getElementById('product-modal-title').textContent = 'ADD NEW CATALOG PRODUCT';
  openAdminModal('admin-product-modal');
}

function editProduct(id) {
  const prod = STATE.products.find(p => p.id === id);
  if (!prod) return;

  document.getElementById('product-form-id').value = prod.id;
  
  // Populate multi-image gallery
  if (Array.isArray(prod.gallery) && prod.gallery.length > 0) {
    currentProductGallery = [...prod.gallery];
  } else if (prod.image) {
    currentProductGallery = [prod.image];
  } else {
    currentProductGallery = [];
  }
  renderProductGalleryManager();

  const addUrlInput = document.getElementById('product-form-add-url');
  if (addUrlInput) addUrlInput.value = '';

  document.getElementById('product-form-name').value = prod.name || '';
  document.getElementById('product-form-basename').value = prod.baseName || prod.name || '';
  document.getElementById('product-form-price').value = prod.price || 0;
  document.getElementById('product-form-orig-price').value = prod.originalPrice || prod.price || 0;
  document.getElementById('product-form-type').value = prod.type || 'tee';
  document.getElementById('product-form-brand').value = prod.brand || 'OV™ BLACK LABEL';
  document.getElementById('product-form-stock').value = prod.stock || 5;
  document.getElementById('product-form-badge').value = prod.badge || '';

  // Set sizes checkboxes safely
  const checkboxes = document.querySelectorAll('input[name="product-form-sizes"]');
  const prodSizes = Array.isArray(prod.sizes) ? prod.sizes : ['M', 'L'];
  checkboxes.forEach(cb => {
    cb.checked = prodSizes.includes(cb.value);
  });

  document.getElementById('product-modal-title').textContent = 'EDIT CATALOG PRODUCT';
  openAdminModal('admin-product-modal');
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    STATE.products = STATE.products.filter(p => p.id !== id);
    try {
      localStorage.setItem('ov_custom_products_v5', JSON.stringify(STATE.products));
      localStorage.setItem('ov_custom_products_v3', JSON.stringify(STATE.products));
      localStorage.setItem('ov_custom_products', JSON.stringify(STATE.products));
    } catch(e) {}
    
    // Re-render all storefront product grids
    renderHomePageProducts();
    renderLookbookMarquee();
    renderShopCatalog();
    renderProductGrid('plp-products-grid', STATE.products);
    renderFeaturedGrid('featured-products-grid', STATE.products);
    renderAdminDashboard();
    showNotification('PRODUCT REMOVED');

    fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAdminAuthHeader() },
      body: JSON.stringify({ custom_products: STATE.products, custom_products_saved: true })
    }).catch(() => {});
  }
}

function saveProductForm(event) {
  event.preventDefault();
  const id = document.getElementById('product-form-id').value;

  // Check gallery photos: if user pasted a URL but didn't click "Add", auto-add it!
  const addUrlInput = document.getElementById('product-form-add-url');
  if (addUrlInput && addUrlInput.value.trim()) {
    if (!Array.isArray(currentProductGallery)) currentProductGallery = [];
    currentProductGallery.push(addUrlInput.value.trim());
    addUrlInput.value = '';
    renderProductGalleryManager();
  }

  if (!currentProductGallery || currentProductGallery.length === 0) {
    showNotification('PLEASE ADD AT LEAST ONE PRODUCT PHOTO');
    return;
  }

  const finalGallery = [...currentProductGallery];
  const primaryImage = finalGallery[0];

  // Get selected sizes
  const checkboxes = document.querySelectorAll('input[name="product-form-sizes"]:checked');
  const sizes = Array.from(checkboxes).map(cb => cb.value);

  // Preserve existing product details if editing
  const existingProduct = id ? STATE.products.find(p => p.id === id) : null;

  const productData = {
    id: id || 'custom-' + Date.now(),
    name: document.getElementById('product-form-name').value.trim(),
    baseName: document.getElementById('product-form-basename').value.trim(),
    price: parseInt(document.getElementById('product-form-price').value, 10) || 999,
    originalPrice: parseInt(document.getElementById('product-form-orig-price').value, 10) || 2999,
    type: document.getElementById('product-form-type').value,
    brand: document.getElementById('product-form-brand').value,
    stock: parseInt(document.getElementById('product-form-stock').value, 10) || 5,
    badge: document.getElementById('product-form-badge').value.trim() || null,
    sizes: sizes.length > 0 ? sizes : ['M'],
    reviews: existingProduct ? (existingProduct.reviews || []) : [],
    rating: existingProduct ? (existingProduct.rating || 4.8) : 4.8,
    fit: existingProduct ? (existingProduct.fit || 'Oversized Boxy Fit') : 'Oversized Boxy Fit',
    fabric: existingProduct ? (existingProduct.fabric || '240 GSM Luxury Combed Cotton') : '240 GSM Luxury Combed Cotton',
    desc: existingProduct ? (existingProduct.desc || '') : '',
    image: primaryImage,
    gallery: finalGallery
  };

  if (id !== '') {
    // Edit existing
    const idx = STATE.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      STATE.products[idx] = { ...existingProduct, ...productData };
    }
  } else {
    // Add new
    STATE.products.unshift(productData);
  }

  try {
    localStorage.setItem('ov_custom_products_v5', JSON.stringify(STATE.products));
    localStorage.setItem('ov_custom_products_v3', JSON.stringify(STATE.products));
    localStorage.setItem('ov_custom_products', JSON.stringify(STATE.products));
  } catch(e) {
    console.warn('LocalStorage limit for products:', e);
  }
  
  // Re-render all storefront grids immediately
  renderHomePageProducts();
  renderLookbookMarquee();
  renderShopCatalog();
  renderProductGrid('plp-products-grid', STATE.products);
  renderFeaturedGrid('featured-products-grid', STATE.products);
  renderAdminDashboard();
  
  // If user is currently looking at this product's PDP, refresh it live!
  if (STATE.currentRoute === 'product' || (STATE.activeProduct && STATE.activeProduct.id === productData.id)) {
    STATE.activeProduct = productData;
    renderProductDetailPage(productData);
  }

  closeAdminModal('admin-product-modal');
  showNotification(`PRODUCT SAVED WITH ${finalGallery.length} PHOTO${finalGallery.length > 1 ? 'S' : ''}`);

  fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAdminAuthHeader() },
    body: JSON.stringify({ custom_products: STATE.products, custom_products_saved: true })
  }).catch(() => {});
}

function removeUploadedLogoImage() {
  document.getElementById('admin-logo-image-file').value = '';
  document.getElementById('admin-logo-image-data').value = '';
  document.getElementById('admin-logo-img-preview').style.display = 'none';
  document.getElementById('admin-logo-remove-img-btn').style.display = 'none';
}

function saveAdminLogo() {
  const letters = document.getElementById('admin-logo-letters-input').value.trim();
  const subtext = document.getElementById('admin-logo-subtext-input').value.trim();
  const imageData = document.getElementById('admin-logo-image-data').value;

  if (!letters && !imageData) {
    alert('Please input logo letters or upload a transparent PNG logo image.');
    return;
  }

  STATE.logo = {
    letters: letters || 'OV',
    subtext: subtext || 'ORIGINAL VERSION',
    image: imageData || ''
  };

  localStorage.setItem('ov_custom_logo', JSON.stringify(STATE.logo));
  renderLogoMarks();
  showNotification('BRAND LOGO STYLING SAVED');

  fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAdminAuthHeader() },
    body: JSON.stringify({ brand_logo: STATE.logo })
  }).catch(() => {});
}

/* ==========================================================================
   DRAG-TO-POSITION STUDIO & WEBSITE MEDIA CMS ENGINE
   ========================================================================== */

let isBannerDragging = false;

function initBannerDragEngine() {
  const stage = document.getElementById('banner-drag-stage');
  if (!stage) return;

  function handleDragMove(e) {
    const rect = stage.getBoundingClientRect();
    const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;

    let x = Math.round(((clientX - rect.left) / rect.width) * 100);
    let y = Math.round(((clientY - rect.top) / rect.height) * 100);

    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setFocalCoords(x, y);
  }

  stage.addEventListener('mousedown', (e) => {
    isBannerDragging = true;
    handleDragMove(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isBannerDragging) {
      e.preventDefault();
      handleDragMove(e);
    }
  });

  window.addEventListener('mouseup', () => {
    isBannerDragging = false;
  });

  stage.addEventListener('touchstart', (e) => {
    isBannerDragging = true;
    handleDragMove(e);
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (isBannerDragging) {
      e.preventDefault();
      handleDragMove(e);
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    isBannerDragging = false;
  });
}

function setFocalCoords(x, y) {
  const pin = document.getElementById('banner-focal-pin');
  const badge = document.getElementById('banner-drag-coords-badge');
  const mockupBg = document.getElementById('banner-mini-mockup-bg');
  const inputX = document.getElementById('banner-form-pos-x');
  const inputY = document.getElementById('banner-form-pos-y');

  if (pin) {
    pin.style.left = `${x}%`;
    pin.style.top = `${y}%`;
  }
  if (badge) {
    badge.textContent = `X: ${x}% | Y: ${y}%`;
  }
  if (mockupBg) {
    mockupBg.style.backgroundPosition = `${x}% ${y}%`;
  }
  if (inputX) inputX.value = x;
  if (inputY) inputY.value = y;
}

function applyFocalPreset(x, y, label, btn) {
  setFocalCoords(x, y);
  if (btn) {
    document.querySelectorAll('#admin-banner-drag-modal .admin-stepper-btn').forEach(b => b.classList.remove('preset-active'));
    btn.classList.add('preset-active');
  }
}

function setBannerSourceImage(url) {
  if (!url) return;
  const stageImg = document.getElementById('banner-drag-source-img');
  const mockupBg = document.getElementById('banner-mini-mockup-bg');
  const inputUrl = document.getElementById('banner-form-image-url');

  if (stageImg) stageImg.src = url;
  if (mockupBg) mockupBg.style.backgroundImage = `url("${url}")`;
  if (inputUrl) inputUrl.value = url;
}

function handleBannerFileUpload(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    setBannerSourceImage(dataUrl);
  };
  reader.readAsDataURL(file);
}

let activeHeroBannerSlideIndex = 0;
let heroBannerAutoplayTimer = null;
let studioEditingBannerIndex = 0;

function renderHeroBannerSlide(index) {
  if (!Array.isArray(STATE.heroBanners) || STATE.heroBanners.length === 0) return;
  if (index < 0) index = STATE.heroBanners.length - 1;
  if (index >= STATE.heroBanners.length) index = 0;
  activeHeroBannerSlideIndex = index;

  const hb = STATE.heroBanners[index];
  if (!hb) return;

  const heroBg = document.getElementById('hero-banner-bg');
  const heroTag = document.getElementById('hero-banner-tag');
  const heroTitle = document.getElementById('hero-banner-title');
  const heroDesc = document.getElementById('hero-banner-desc');
  const heroBtn1 = document.getElementById('hero-banner-btn1');
  const heroBtn2 = document.getElementById('hero-banner-btn2');
  const heroContent = document.querySelector('.ecommerce-hero-content');

  if (heroBg) {
    heroBg.style.opacity = '0.7';
    setTimeout(() => {
      if (hb.image) heroBg.style.backgroundImage = `url("${hb.image}")`;
      const posX = hb.posX !== undefined ? hb.posX : 50;
      const posY = hb.posY !== undefined ? hb.posY : 10;
      heroBg.style.backgroundPosition = `${posX}% ${posY}%`;
      heroBg.style.opacity = '1';
    }, 120);
  }

  if (heroTag && hb.tag) heroTag.textContent = hb.tag;
  if (heroTitle && hb.title) heroTitle.textContent = hb.title;
  if (heroDesc && hb.desc) heroDesc.textContent = hb.desc;
  if (heroBtn1 && hb.btn1Text) {
    const b1 = hb.btn1Text.replace(/[→\->]/g, '').trim();
    heroBtn1.innerHTML = `${b1} <span style="margin-left: 8px;">→</span>`;
  }
  if (heroBtn2 && hb.btn2Text) {
    const b2 = hb.btn2Text.replace(/[↓v]/g, '').trim();
    heroBtn2.innerHTML = `${b2} <span style="margin-left: 8px;">↓</span>`;
  }

  // Smooth fade-in refresh
  if (heroContent) {
    heroContent.style.animation = 'none';
    void heroContent.offsetWidth;
    heroContent.style.animation = 'heroFadeInUp 0.6s var(--ease-premium)';
  }

  // Update indicators
  renderHeroBannerIndicators();
}

function setupHeroBannerCarouselInteractions() {
  const heroSection = document.getElementById('hero-banner');
  if (!heroSection || heroSection.dataset.carouselEventsBound) return;
  heroSection.dataset.carouselEventsBound = 'true';

  // Hover Pause & Resume
  heroSection.addEventListener('mouseenter', () => {
    stopHeroBannerAutoplay();
  });
  heroSection.addEventListener('mouseleave', () => {
    startHeroBannerAutoplay();
  });

  // Mobile Touch Swipe Navigation
  let touchStartX = 0;
  let touchStartY = 0;
  heroSection.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  heroSection.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          nextHeroBannerSlide();
        } else {
          prevHeroBannerSlide();
        }
      }
    }
  }, { passive: true });
}

function renderHeroBannerIndicators() {
  const container = document.getElementById('hero-banner-indicators');
  const prevBtn = document.querySelector('.hero-arrow-prev');
  const nextBtn = document.querySelector('.hero-arrow-next');
  if (!container) return;

  const total = (Array.isArray(STATE.heroBanners)) ? STATE.heroBanners.length : 1;

  if (total <= 1) {
    container.innerHTML = '';
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  if (prevBtn) prevBtn.style.display = 'flex';
  if (nextBtn) nextBtn.style.display = 'flex';

  container.innerHTML = STATE.heroBanners.map((_, idx) => `
    <div class="hero-indicator-dot ${idx === activeHeroBannerSlideIndex ? 'active' : ''}" 
         onclick="goToHeroBannerSlide(${idx})" 
         title="Go to Banner ${idx + 1}">
    </div>
  `).join('');
}

function nextHeroBannerSlide() {
  renderHeroBannerSlide(activeHeroBannerSlideIndex + 1);
  resetHeroBannerAutoplay();
}

function prevHeroBannerSlide() {
  renderHeroBannerSlide(activeHeroBannerSlideIndex - 1);
  resetHeroBannerAutoplay();
}

function goToHeroBannerSlide(idx) {
  renderHeroBannerSlide(idx);
  resetHeroBannerAutoplay();
}

function startHeroBannerAutoplay() {
  stopHeroBannerAutoplay();
  if (!Array.isArray(STATE.heroBanners) || STATE.heroBanners.length <= 1) return;
  heroBannerAutoplayTimer = setInterval(() => {
    renderHeroBannerSlide(activeHeroBannerSlideIndex + 1);
  }, 6000);
}

function stopHeroBannerAutoplay() {
  if (heroBannerAutoplayTimer) {
    clearInterval(heroBannerAutoplayTimer);
    heroBannerAutoplayTimer = null;
  }
}

function resetHeroBannerAutoplay() {
  stopHeroBannerAutoplay();
  startHeroBannerAutoplay();
}

function openHeroBannerDragModal(targetIndex = 0) {
  const modal = document.getElementById('admin-banner-drag-modal');
  if (!modal) return;

  if (!Array.isArray(STATE.heroBanners) || STATE.heroBanners.length === 0) {
    STATE.heroBanners = [
      {
        id: 'banner-grace-drop',
        image: 'images/product_beige_front_model.jpg',
        posX: 50,
        posY: 10,
        tag: 'NEW SEASON 2026 // LUXURY STREETWEAR',
        title: 'OVERSIZED HEAVYWEIGHT ESSENTIALS',
        desc: 'Engineered in 240 & 280 GSM combed compact cotton. Designed for an immaculate architectural boxy drape that never collapses.',
        btn1Text: 'SHOP ALL PIECES →',
        btn2Text: 'VIEW BESTSELLERS ↓'
      }
    ];
  }

  studioEditingBannerIndex = Math.max(0, Math.min(targetIndex, STATE.heroBanners.length - 1));
  renderStudioBannerTabs();
  loadBannerIntoStudio(studioEditingBannerIndex);
  openAdminModal('admin-banner-drag-modal');
}

function renderStudioBannerTabs() {
  const container = document.getElementById('banner-slide-tabs-container');
  const deleteBtn = document.getElementById('delete-current-banner-btn');
  if (!container) return;

  if (deleteBtn) {
    deleteBtn.style.display = (STATE.heroBanners.length > 1) ? 'inline-flex' : 'none';
  }

  container.innerHTML = STATE.heroBanners.map((b, idx) => {
    const isActive = idx === studioEditingBannerIndex;
    const label = `BANNER ${idx + 1}${isActive ? ' ★' : ''}`;
    return `
      <button type="button" class="banner-tab-btn ${isActive ? 'active' : ''}" onclick="switchStudioBannerTab(${idx})">
        ${label}
      </button>
    `;
  }).join('');
}

function switchStudioBannerTab(index) {
  syncStudioFormToMemory();
  studioEditingBannerIndex = index;
  renderStudioBannerTabs();
  loadBannerIntoStudio(index);
}

function syncStudioFormToMemory() {
  if (!Array.isArray(STATE.heroBanners) || !STATE.heroBanners[studioEditingBannerIndex]) return;
  const b = STATE.heroBanners[studioEditingBannerIndex];
  const imgInput = document.getElementById('banner-form-image-url');
  const posXInput = document.getElementById('banner-form-pos-x');
  const posYInput = document.getElementById('banner-form-pos-y');
  const tagInput = document.getElementById('banner-form-tag');
  const titleInput = document.getElementById('banner-form-title');
  const descInput = document.getElementById('banner-form-desc');
  const btn1Input = document.getElementById('banner-form-btn1-text');
  const btn2Input = document.getElementById('banner-form-btn2-text');

  if (imgInput && imgInput.value.trim()) b.image = imgInput.value.trim();
  if (posXInput) b.posX = parseInt(posXInput.value, 10) || 50;
  if (posYInput) b.posY = parseInt(posYInput.value, 10) || 10;
  if (tagInput) b.tag = tagInput.value.trim();
  if (titleInput) b.title = titleInput.value.trim();
  if (descInput) b.desc = descInput.value.trim();
  if (btn1Input) b.btn1Text = btn1Input.value.trim();
  if (btn2Input) b.btn2Text = btn2Input.value.trim();
}

function loadBannerIntoStudio(index) {
  const current = STATE.heroBanners[index] || STATE.heroBanners[0];
  if (!current) return;

  setBannerSourceImage(current.image || 'images/product_beige_front_model.jpg');
  setFocalCoords(current.posX || 50, current.posY || 10);

  const tagInput = document.getElementById('banner-form-tag');
  const titleInput = document.getElementById('banner-form-title');
  const descInput = document.getElementById('banner-form-desc');
  const btn1Input = document.getElementById('banner-form-btn1-text');
  const btn2Input = document.getElementById('banner-form-btn2-text');

  if (tagInput) tagInput.value = current.tag || '';
  if (titleInput) titleInput.value = current.title || '';
  if (descInput) descInput.value = current.desc || '';
  if (btn1Input) btn1Input.value = current.btn1Text || 'SHOP ALL PIECES →';
  if (btn2Input) btn2Input.value = current.btn2Text || 'VIEW BESTSELLERS ↓';

  const miniTag = document.getElementById('banner-mini-tag');
  const miniTitle = document.getElementById('banner-mini-title');
  const miniDesc = document.getElementById('banner-mini-desc');
  if (miniTag) miniTag.textContent = current.tag || '';
  if (miniTitle) miniTitle.textContent = current.title || '';
  if (miniDesc) miniDesc.textContent = current.desc || '';
}

function addNewHeroBannerSlide() {
  syncStudioFormToMemory();
  const nextNum = STATE.heroBanners.length + 1;
  const presets = [
    {
      image: 'images/antigravity_tshirts_float.jpg',
      tag: `DROP 02 // EDITION ${nextNum}`,
      title: 'ARCHITECTURAL BOXY FIT 280 GSM',
      desc: 'Double combed Tirupur cotton cut in an intentional boxy drop shoulder silhouette.',
      btn1Text: 'EXPLORE DROP 02 →',
      btn2Text: 'VIEW LOOKBOOK ↓'
    },
    {
      image: 'images/product_beige_back_model.jpg',
      tag: `SPECIAL DROP // CAPSULE ${nextNum}`,
      title: 'EMPOWERING FLORAL MUSE EDITION',
      desc: 'Quiet. Unbreakable. Limitless. Back graphic architectural luxury tee.',
      btn1Text: 'DISCOVER PIECE →',
      btn2Text: 'SHOP COLLECTION ↓'
    },
    {
      image: 'images/model_runway.jpg',
      tag: 'NEW ATELIER RELEASE',
      title: 'FRENCH TERRY HIGH-DENSITY SWEATS',
      desc: 'Engineered for statement layering and intentional wardrobes.',
      btn1Text: 'SHOP NOW →',
      btn2Text: 'VIEW BESTSELLERS ↓'
    }
  ];
  const preset = presets[(nextNum - 2) % presets.length];

  const newBanner = {
    id: 'banner-' + Date.now(),
    image: preset.image,
    posX: 50,
    posY: 20,
    tag: preset.tag,
    title: preset.title,
    desc: preset.desc,
    btn1Text: preset.btn1Text,
    btn2Text: preset.btn2Text
  };

  STATE.heroBanners.push(newBanner);
  studioEditingBannerIndex = STATE.heroBanners.length - 1;
  renderStudioBannerTabs();
  loadBannerIntoStudio(studioEditingBannerIndex);
  showNotification(`NEW BANNER ${nextNum} ADDED! CUSTOMIZE & CLICK SAVE.`);
}

function deleteCurrentHeroBannerSlide() {
  if (STATE.heroBanners.length <= 1) {
    showNotification('AT LEAST ONE BANNER IS REQUIRED');
    return;
  }
  if (confirm(`Are you sure you want to delete BANNER ${studioEditingBannerIndex + 1}?`)) {
    STATE.heroBanners.splice(studioEditingBannerIndex, 1);
    studioEditingBannerIndex = Math.max(0, studioEditingBannerIndex - 1);
    renderStudioBannerTabs();
    loadBannerIntoStudio(studioEditingBannerIndex);
    renderStorefrontMedia();
    showNotification('BANNER SLIDE REMOVED');
  }
}

function saveHeroBannerFromModal(event) {
  if (event) event.preventDefault();

  syncStudioFormToMemory();

  try {
    localStorage.setItem('ov_hero_banners_v2', JSON.stringify(STATE.heroBanners));
    localStorage.setItem('ov_hero_banners', JSON.stringify(STATE.heroBanners));
    if (STATE.heroBanners[0]) {
      localStorage.setItem('ov_hero_banner', JSON.stringify(STATE.heroBanners[0]));
    }
  } catch(e) {
    console.warn('LocalStorage save error:', e);
  }

  renderStorefrontMedia();
  closeAdminModal('admin-banner-drag-modal');
  showNotification(`ALL ${STATE.heroBanners.length} HERO BANNERS SAVED & APPLIED TO HOMEPAGE!`);

  fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAdminAuthHeader() },
    body: JSON.stringify({ hero_banners: STATE.heroBanners, hero_banner: STATE.heroBanners[0] })
  }).catch(() => {});
}

function quickSetBannerPosition(posStr) {
  const parts = posStr.split(' ');
  let x = 50;
  let y = 10;
  if (parts.length >= 2) {
    if (parts[0] === 'center') x = 50;
    else if (parts[0].includes('%')) x = parseInt(parts[0], 10);

    if (parts[1].includes('%')) y = parseInt(parts[1], 10);
  }

  if (Array.isArray(STATE.heroBanners) && STATE.heroBanners[studioEditingBannerIndex]) {
    STATE.heroBanners[studioEditingBannerIndex].posX = x;
    STATE.heroBanners[studioEditingBannerIndex].posY = y;
  }

  try {
    localStorage.setItem('ov_hero_banners_v2', JSON.stringify(STATE.heroBanners));
  } catch(e) {}
  renderStorefrontMedia();
  showNotification(`FOCAL SET TO ${x}% ${y}%`);
}

function saveSpotlightsFromAdmin() {
  const img1 = document.getElementById('admin-spotlight-img-1').value.trim();
  const title1 = document.getElementById('admin-spotlight-title-1').value.trim();
  const price1 = document.getElementById('admin-spotlight-price-1').value.trim();

  const img2 = document.getElementById('admin-spotlight-img-2').value.trim();
  const title2 = document.getElementById('admin-spotlight-title-2').value.trim();
  const price2 = document.getElementById('admin-spotlight-price-2').value.trim();

  STATE.spotlights = [
    { id: 1, image: img1, title: title1, price: price1 },
    { id: 2, image: img2, title: title2, price: price2 }
  ];

  try {
    localStorage.setItem('ov_spotlights', JSON.stringify(STATE.spotlights));
  } catch(e) {}
  renderStorefrontMedia();
  showNotification('SPOTLIGHT BANNERS SAVED');
}

function saveBrandStoryFromAdmin() {
  const img = document.getElementById('admin-brand-story-img-url').value.trim();
  const badge = document.getElementById('admin-brand-story-badge').value.trim();
  const title = document.getElementById('admin-brand-story-title').value.trim();
  const desc = document.getElementById('admin-brand-story-desc').value.trim();

  STATE.brandStory = { image: img, badge, title, desc };
  try {
    localStorage.setItem('ov_brand_story', JSON.stringify(STATE.brandStory));
  } catch(e) {}
  renderStorefrontMedia();
  showNotification('BRAND STORY ASSET SAVED');
}

function renderStorefrontMedia() {
  // Setup carousel interactions (hover pause & touch swipe)
  setupHeroBannerCarouselInteractions();

  // Render active hero banner slide & indicators
  if (Array.isArray(STATE.heroBanners) && STATE.heroBanners.length > 0) {
    renderHeroBannerSlide(activeHeroBannerSlideIndex);
    startHeroBannerAutoplay();
  }

  // Also update Admin Panel representation
  const hb = (Array.isArray(STATE.heroBanners) && STATE.heroBanners.length > 0) ? STATE.heroBanners[0] : null;
  if (hb) {
    const adminThumbBg = document.getElementById('admin-hero-thumb-bg');
    const adminPosBadge = document.getElementById('admin-hero-pos-badge');
    const adminMetaTag = document.getElementById('admin-hero-meta-tag');
    const adminMetaTitle = document.getElementById('admin-hero-meta-title');
    const adminMetaDesc = document.getElementById('admin-hero-meta-desc');

    if (adminThumbBg) {
      if (hb.image) adminThumbBg.style.backgroundImage = `url("${hb.image}")`;
      adminThumbBg.style.backgroundPosition = `${hb.posX || 50}% ${hb.posY || 10}%`;
    }
    if (adminPosBadge) {
      const bannerCount = STATE.heroBanners.length;
      adminPosBadge.textContent = `${bannerCount} BANNER${bannerCount > 1 ? 'S' : ''} ACTIVE · FOCAL: ${hb.posX || 50}% ${hb.posY || 10}%`;
    }
    if (adminMetaTag && hb.tag) adminMetaTag.textContent = hb.tag;
    if (adminMetaTitle && hb.title) adminMetaTitle.textContent = hb.title;
    if (adminMetaDesc && hb.desc) adminMetaDesc.textContent = hb.desc;
  }

  // Spotlights
  if (Array.isArray(STATE.spotlights) && STATE.spotlights.length >= 2) {
    const s1 = STATE.spotlights[0];
    const s2 = STATE.spotlights[1];

    const bg1 = document.getElementById('spotlight-bg-1');
    const t1 = document.getElementById('spotlight-title-1');
    const p1 = document.getElementById('spotlight-price-1');
    if (bg1 && s1.image) bg1.style.backgroundImage = `url("${s1.image}")`;
    if (t1 && s1.title) t1.textContent = s1.title;
    if (p1 && s1.price) p1.innerHTML = `${s1.price} <span class="old">₹1,999</span>`;

    const bg2 = document.getElementById('spotlight-bg-2');
    const t2 = document.getElementById('spotlight-title-2');
    const p2 = document.getElementById('spotlight-price-2');
    if (bg2 && s2.image) bg2.style.backgroundImage = `url("${s2.image}")`;
    if (t2 && s2.title) t2.textContent = s2.title;
    if (p2 && s2.price) p2.innerHTML = `${s2.price} <span class="old">₹2,399</span>`;

    const aImg1 = document.getElementById('admin-spotlight-img-1');
    const aT1 = document.getElementById('admin-spotlight-title-1');
    const aP1 = document.getElementById('admin-spotlight-price-1');
    if (aImg1 && s1.image) aImg1.value = s1.image;
    if (aT1 && s1.title) aT1.value = s1.title;
    if (aP1 && s1.price) aP1.value = s1.price;

    const aImg2 = document.getElementById('admin-spotlight-img-2');
    const aT2 = document.getElementById('admin-spotlight-title-2');
    const aP2 = document.getElementById('admin-spotlight-price-2');
    if (aImg2 && s2.image) aImg2.value = s2.image;
    if (aT2 && s2.title) aT2.value = s2.title;
    if (aP2 && s2.price) aP2.value = s2.price;
  }

  // Brand Story
  const bs = STATE.brandStory;
  if (bs) {
    const storyImg = document.getElementById('brand-story-img-el');
    const storyBadge = document.getElementById('brand-story-badge-el');
    const storyTitle = document.getElementById('brand-story-title-el');
    const storyDesc = document.getElementById('brand-story-desc-el');

    if (storyImg && bs.image) storyImg.src = bs.image;
    if (storyBadge && bs.badge) storyBadge.textContent = bs.badge;
    if (storyTitle && bs.title) storyTitle.textContent = bs.title;
    if (storyDesc && bs.desc) storyDesc.textContent = bs.desc;

    const aStoryPreview = document.getElementById('admin-brand-story-preview');
    const aStoryUrl = document.getElementById('admin-brand-story-img-url');
    const aStoryBadge = document.getElementById('admin-brand-story-badge');
    const aStoryTitle = document.getElementById('admin-brand-story-title');
    const aStoryDesc = document.getElementById('admin-brand-story-desc');

    if (aStoryPreview && bs.image) aStoryPreview.src = bs.image;
    if (aStoryUrl && bs.image) aStoryUrl.value = bs.image;
    if (aStoryBadge && bs.badge) aStoryBadge.value = bs.badge;
    if (aStoryTitle && bs.title) aStoryTitle.value = bs.title;
    if (aStoryDesc && bs.desc) aStoryDesc.value = bs.desc;
  }
}

