/* ==========================================================================
   OV™ — ORIGINAL VERSION | MINIMAL LUXURY STREETWEAR INTERACTIVE ENGINE
   ========================================================================== */

// Global State
// Global State
const STATE = {
  products: JSON.parse(localStorage.getItem('ov_custom_products')) || [
    { id: 'tee-01', name: 'OV™ Heavyweight Tee - Onyx', baseName: 'Heavyweight Tee', price: 2499, originalPrice: 2999, type: 'tee', brand: 'OV™ BLACK LABEL', badge: 'NEW', stock: 3, sizes: ['S', 'M', 'L', 'XL'], reviews: [], rating: 4.8, image: 'images/model1.jpg' },
    { id: 'tee-02', name: 'OV™ Heavyweight Tee - Ivory', baseName: 'Heavyweight Tee', price: 2499, originalPrice: 2499, type: 'tee', brand: 'OV™ BLACK LABEL', badge: 'NEW', stock: 8, sizes: ['M', 'L', 'XL'], reviews: [], rating: 4.7, image: 'images/model2.jpg' },
    { id: 'hoodie-01', name: 'OV™ Boxy Fit Hoodie - Slate', baseName: 'Boxy Fit Hoodie', price: 4299, originalPrice: 5499, type: 'hoodie', brand: 'OV™ ESSENTIALS', badge: 'SALE', stock: 2, sizes: ['S', 'M', 'L'], reviews: [], rating: 4.9, image: 'images/model3.jpg' },
    { id: 'hoodie-02', name: 'OV™ Boxy Fit Hoodie - Bone', baseName: 'Boxy Fit Hoodie', price: 4299, originalPrice: 4299, type: 'hoodie', brand: 'OV™ ESSENTIALS', badge: null, stock: 6, sizes: ['S', 'M', 'L', 'XL'], reviews: [], rating: 4.8, image: 'images/model4.jpg' },
    { id: 'pants-01', name: 'OV™ Signature Cargo - Onyx', baseName: 'Signature Cargo', price: 3799, originalPrice: 4499, type: 'pants', brand: 'OV™ STUDIO', badge: 'SALE', stock: 4, sizes: ['M', 'L', 'XL'], reviews: [], rating: 4.6, image: 'images/model5.jpg' },
    { id: 'pants-02', name: 'OV™ Signature Cargo - Slate', baseName: 'Signature Cargo', price: 3799, originalPrice: 3799, type: 'pants', brand: 'OV™ STUDIO', badge: null, stock: 9, sizes: ['S', 'M', 'L'], reviews: [], rating: 4.5, image: 'images/model1.jpg' },
    { id: 'cap-01', name: 'OV™ Premium Cap - Black', baseName: 'Premium Cap', price: 1599, originalPrice: 1999, type: 'cap', brand: 'OV™ ACTIVE', badge: 'SALE', stock: 11, sizes: ['O/S'], reviews: [], rating: 4.4, image: 'images/model2.jpg' },
    { id: 'cap-02', name: 'OV™ Premium Cap - Sand', baseName: 'Premium Cap', price: 1599, originalPrice: 1599, type: 'cap', brand: 'OV™ ACTIVE', badge: null, stock: 15, sizes: ['O/S'], reviews: [], rating: 4.3, image: 'images/model3.jpg' },
    { id: 'bag-01', name: 'OV™ Studio Canvas Tote - Cream', baseName: 'Studio Canvas Tote', price: 1899, originalPrice: 2299, type: 'bag', brand: 'OV™ STUDIO', badge: 'SALE', stock: 3, sizes: ['O/S'], reviews: [], rating: 4.6, image: 'images/model4.jpg' }
  ],
  slides: JSON.parse(localStorage.getItem('ov_custom_slides')) || [
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
      image: 'images/model3.jpg',
      position: 'right 30% center',
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
  ],
  logo: JSON.parse(localStorage.getItem('ov_custom_logo')) || {
    letters: 'OV',
    subtext: 'ORIGINAL VERSION'
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
  ]
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
  try { renderProductGrid('plp-products-grid', STATE.products); } catch(e) { console.error(e); }
  try { renderFeaturedGrid('featured-products-grid', STATE.products); } catch(e) { console.error(e); }
  try { updateCartBadge(); } catch(e) { console.error(e); }
  try { updateWishlistBadge(); } catch(e) { console.error(e); }

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
    if (productId) {
      const prod = STATE.products.find(p => p.id === productId);
      if (prod) {
        STATE.activeProduct = prod;
        renderProductDetailPage(prod);
      }
    }
  } else if (route === 'admin') {
    document.getElementById('admin-page').classList.add('active');
    STATE.currentRoute = 'admin';
    renderAdminDashboard();
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
   6. Three.js 3D T-Shirt Reveal Canvas
   ========================================================================== */
let scene3D, camera3D, renderer3D, tshirtMesh;
let lights = {};

function setupThreeJSReveal() {
  const container = document.getElementById('reveal-canvas-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  scene3D = new THREE.Scene();
  scene3D.background = new THREE.Color(0xffffff);

  camera3D = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera3D.position.set(0, 0, 5);

  renderer3D = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer3D.setSize(width, height);
  renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer3D.shadowMap.enabled = true;
  renderer3D.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer3D.domElement);

  const controls = new THREE.OrbitControls(camera3D, renderer3D.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 1.8;
  controls.minDistance = 3;
  controls.maxDistance = 8;

  lights.ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene3D.add(lights.ambient);

  lights.mainSpot = new THREE.SpotLight(0xffffff, 0.9);
  lights.mainSpot.position.set(2, 4, 3);
  lights.mainSpot.castShadow = true;
  lights.mainSpot.shadow.mapSize.width = 1024;
  lights.mainSpot.shadow.mapSize.height = 1024;
  lights.mainSpot.shadow.bias = -0.001;
  scene3D.add(lights.mainSpot);

  lights.fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
  lights.fillLight.position.set(-3, -1, -2);
  scene3D.add(lights.fillLight);

  tshirtMesh = createTShirtMesh();
  scene3D.add(tshirtMesh);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (tshirtMesh && controls.state === -1) {
      tshirtMesh.rotation.y += 0.004;
    }

    renderer3D.render(scene3D, camera3D);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera3D.aspect = w / h;
    camera3D.updateProjectionMatrix();
    renderer3D.setSize(w, h);
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    gsap.to(lights.mainSpot.position, {
      x: 2 + x * 1.5,
      y: 4 + y * 1.5,
      duration: 0.8,
      ease: "power2.out"
    });
  });
}

function createTShirtMesh() {
  const tshirtGroup = new THREE.Group();

  const fabricMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.85,
    metalness: 0.1,
    side: THREE.DoubleSide
  });

  const bodyGeo = new THREE.CylinderGeometry(0.85, 0.9, 2.0, 32, 1);
  const body = new THREE.Mesh(bodyGeo, fabricMaterial);
  body.castShadow = true;
  body.receiveShadow = true;
  tshirtGroup.add(body);

  const sleeveLGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.8, 16);
  const sleeveL = new THREE.Mesh(sleeveLGeo, fabricMaterial);
  sleeveL.position.set(-0.85, 0.7, 0);
  sleeveL.rotation.z = Math.PI / 4.5;
  sleeveL.castShadow = true;
  sleeveL.receiveShadow = true;
  tshirtGroup.add(sleeveL);

  const sleeveRGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.8, 16);
  const sleeveR = new THREE.Mesh(sleeveRGeo, fabricMaterial);
  sleeveR.position.set(0.85, 0.7, 0);
  sleeveR.rotation.z = -Math.PI / 4.5;
  sleeveR.castShadow = true;
  sleeveR.receiveShadow = true;
  tshirtGroup.add(sleeveR);

  const collarGeo = new THREE.TorusGeometry(0.32, 0.06, 16, 32);
  const collar = new THREE.Mesh(collarGeo, fabricMaterial);
  collar.position.set(0, 1.02, 0);
  collar.rotation.x = Math.PI / 2;
  tshirtGroup.add(collar);

  tshirtGroup.position.y = -0.3;
  return tshirtGroup;
}

function switch3DColor(colorName, element) {
  const swatches = document.querySelectorAll('.swatch');
  swatches.forEach(s => s.classList.remove('active'));
  element.classList.add('active');

  STATE.activeColor = colorName;
  let targetColor;

  if (colorName === 'white') targetColor = 0xffffff;
  else if (colorName === 'black') targetColor = 0x111111;
  else if (colorName === 'cream') targetColor = 0xf3efe0;

  if (tshirtMesh) {
    tshirtMesh.traverse((child) => {
      if (child.isMesh) {
        gsap.to(child.material.color, {
          r: ((targetColor >> 16) & 255) / 255,
          g: ((targetColor >> 8) & 255) / 255,
          b: (targetColor & 255) / 255,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    });
  }
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

function addToCart(productId, color, size, qty) {
  const item = STATE.products.find(p => p.id === productId);
  if (!item) return;

  const existingItemIndex = STATE.cart.findIndex(i => i.id === productId && i.color === color && i.size === size);

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
      resultDiv.textContent = '⚠ PLEASE ENTER A VALID 6-DIGIT INDIAN PINCODE (e.g. 600006)';
      return;
    }

    // Metro Area Prefix Checking (Chennai, Bangalore, Mumbai, Delhi, etc.)
    const isMetro = ['600', '560', '400', '110', '700', '500'].some(prefix => code.startsWith(prefix));
    const isRemote = ['799', '190', '744'].some(prefix => code.startsWith(prefix));

    resultDiv.className = 'pincode-result success';
    resultDiv.style.display = 'block';

    if (isMetro) {
      resultDiv.innerHTML = `✓ EXPRESS DELIVERY AVAILABLE<br>• Estimated Delivery: <strong>2 Days (Metro Fast-track)</strong><br>• Cash on Delivery (COD) Available`;
    } else if (isRemote) {
      resultDiv.innerHTML = `✓ STANDARD DELIVERY AVAILABLE<br>• Estimated Delivery: <strong>7-9 Days (Remote Location)</strong><br>• Prepaid Orders Only (COD Not Available)`;
    } else {
      resultDiv.innerHTML = `✓ STANDARD SHIPPING AVAILABLE<br>• Estimated Delivery: <strong>4-5 Days</strong><br>• Cash on Delivery (COD) Available`;
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

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-list');
  if (!container) return;

  container.innerHTML = '';
  STATE.cart.forEach(item => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.marginBottom = '12px';
    row.innerHTML = `
      <div style="font-size: 0.85rem;">${item.name} × ${item.qty}</div>
      <div style="font-size: 0.85rem; font-weight: 500;">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
    `;
    container.appendChild(row);
  });

  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.12);
  const shipping = subtotal > 2999 ? 0 : 150;
  
  let discount = 0;
  if (STATE.appliedCoupon) {
    if (STATE.appliedCoupon.type === 'percent') {
      discount = Math.round(subtotal * (STATE.appliedCoupon.value / 100));
    } else {
      discount = STATE.appliedCoupon.value;
    }
  }

  const grandTotal = subtotal + tax + shipping - discount;

  document.getElementById('checkout-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('checkout-tax').textContent = `₹${tax.toLocaleString('en-IN')}`;
  document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('checkout-total').textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  const rowDiscount = document.getElementById('checkout-discount-row');
  const valDiscount = document.getElementById('checkout-discount-value');
  if (STATE.appliedCoupon && rowDiscount && valDiscount) {
    rowDiscount.style.display = 'flex';
    valDiscount.textContent = `- ₹${discount.toLocaleString('en-IN')}`;
  } else if (rowDiscount) {
    rowDiscount.style.display = 'none';
  }
}

function completeCheckoutOrder() {
  const address = document.getElementById('checkout-address-input');
  if (!address || !address.value.trim()) {
    showNotification('PLEASE PROVIDE DELIVERY ADDRESS');
    return;
  }

  const orderId = 'OV-' + Math.floor(10000 + Math.random() * 90000);
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.12);
  const shipping = subtotal > 2999 ? 0 : 150;
  let discount = 0;
  if (STATE.appliedCoupon) {
    discount = STATE.appliedCoupon.type === 'percent' ? Math.round(subtotal * (STATE.appliedCoupon.value / 100)) : STATE.appliedCoupon.value;
  }
  const grandTotal = subtotal + tax + shipping - discount;

  const newOrder = {
    orderId: orderId,
    date: new Date().toISOString().split('T')[0],
    items: [...STATE.cart],
    total: grandTotal,
    status: 'placed',
    trackingStep: 1,
    address: address.value
  };

  STATE.orders.unshift(newOrder);
  localStorage.setItem('ov_orders', JSON.stringify(STATE.orders));

  STATE.loyaltyPoints += Math.round(grandTotal * 0.05);

  STATE.cart = [];
  localStorage.removeItem('ov_cart');
  updateCartBadge();
  renderCartDrawer();
  STATE.appliedCoupon = null;

  closeModal('checkout-modal');
  showNotification('ORDER PLACED SUCCESSFULLY: ' + orderId);

  setTimeout(() => {
    trackSpecificOrder(orderId);
  }, 1000);
}

/* ==========================================================================
   17. Order tracking live status
   ========================================================================== */
function trackSpecificOrder(orderId) {
  const order = STATE.orders.find(o => o.orderId === orderId);
  if (!order) return;

  const container = document.getElementById('track-order-modal-body');
  if (!container) return;

  container.innerHTML = `
    <div style="font-size: 1rem; font-weight:600; margin-bottom: 5px;">ORDER ID: ${order.orderId}</div>
    <div style="font-size: 0.8rem; color:#777; margin-bottom: 25px;">PLACED ON: ${order.date}</div>

    <div class="tracking-steps">
      <div class="tracking-step-item ${order.trackingStep >= 1 ? 'completed' : ''}">
        <div class="tracking-step-dot">1</div>
        <div class="tracking-step-label">Placed</div>
      </div>
      <div class="tracking-step-item ${order.trackingStep >= 2 ? 'completed' : ''}">
        <div class="tracking-step-dot">2</div>
        <div class="tracking-step-label">Processed</div>
      </div>
      <div class="tracking-step-item ${order.trackingStep >= 3 ? 'completed' : ''}">
        <div class="tracking-step-dot">3</div>
        <div class="tracking-step-label">Shipped</div>
      </div>
      <div class="tracking-step-item ${order.trackingStep >= 4 ? 'completed' : ''}">
        <div class="tracking-step-dot">4</div>
        <div class="tracking-step-label">Out Delivery</div>
      </div>
      <div class="tracking-step-item ${order.trackingStep >= 5 ? 'completed' : ''}">
        <div class="tracking-step-dot">5</div>
        <div class="tracking-step-label">Delivered</div>
      </div>
    </div>
    
    <div style="margin-top: 40px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 20px;">
      <div style="font-weight: 600; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 10px;">DELIVERY ADDRESS</div>
      <div style="font-size: 0.9rem; color: #555;">${order.address || 'OV CUSTOMER LOGISTICS HUB'}</div>
    </div>

    <div style="margin-top: 30px; display: flex; gap: 15px;">
      <button class="luxury-btn" style="width: 100%;" onclick="downloadPdfInvoice('${order.orderId}')">DOWNLOAD INVOICE PDF</button>
    </div>
  `;

  openModal('track-order-modal');
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
    card.className = 'collection-card';
    card.setAttribute('onclick', `navigateTo('product', '${p.id}')`);

    // Badge Render logic
    let badgeHTML = '';
    if (p.badge) {
      const cls = p.badge === 'SALE' ? 'sale' : '';
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
    const sizesRowStr = p.sizes.map(s => `<span class="card-size-item">${s}</span>`).join('');

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
    priceContainer.innerHTML = `
      <span class="product-price original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
      <span class="product-price sale">₹${product.price.toLocaleString('en-IN')}</span>
      <span style="color:var(--red-discount); font-weight:bold; font-size:1.1rem; margin-left:10px;">(${pct}% OFF)</span>
    `;
  } else {
    priceContainer.innerHTML = `<span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>`;
  }

  document.getElementById('pdp-material-desc').textContent = `${product.type === 'tee' ? '280 GSM Double-Combed Organic Cotton. Boxy fitting drop shoulder pattern. Pre-shrunk fabric with silicone softening finish.' : '450 GSM Heavyweight French Terry cotton. Relaxed silhouette. Double lined hood. Ribbed side panels.'}`;
  
  const stockText = document.getElementById('pdp-stock-text');
  if (product.stock <= 5) {
    stockText.style.display = 'flex';
    document.getElementById('pdp-stock-count').textContent = `ONLY ${product.stock} PIECES LEFT IN STOCK`;
  } else {
    stockText.style.display = 'none';
  }

  const mainImageContainer = document.getElementById('pdp-main-image-container');
  if (mainImageContainer) {
    mainImageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;" id="pdp-main-image-el">`;
  }

  const zoomOverlay = document.querySelector('.zoom-overlay');
  if (zoomOverlay) {
    zoomOverlay.style.backgroundImage = `url('${product.image}')`;
  }

  // Render Thumbnails
  const thumbsContainer = document.getElementById('pdp-thumbs-container');
  if (thumbsContainer) {
    const otherImg1 = `images/model${product.id === 'tee-01' ? '2' : '1'}.jpg`;
    const otherImg2 = `images/model${product.id === 'tee-01' ? '3' : '3'}.jpg`;
    thumbsContainer.innerHTML = `
      <div class="thumb-item active" onclick="switchPdpThumb(this, '${product.image}')">
        <img src="${product.image}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="thumb-item" onclick="switchPdpThumb(this, '${otherImg1}')">
        <img src="${otherImg1}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="thumb-item" onclick="switchPdpThumb(this, '${otherImg2}')">
        <img src="${otherImg2}" style="width:100%; height:100%; object-fit:cover;">
      </div>
    `;
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
    mainImageContainer.innerHTML = `<img src="${imageSrc}" style="width:100%; height:100%; object-fit:cover;" id="pdp-main-image-el">`;
  }

  const zoomOverlay = document.querySelector('.zoom-overlay');
  if (zoomOverlay) {
    zoomOverlay.style.backgroundImage = `url('${imageSrc}')`;
  }

  STATE.activeColor = 'Custom';
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
        innerHTML += `
          <div class="large-logo-graphic">
            <svg viewBox="0 0 500 350" class="logo-svg-large">
              <defs>
                <mask id="logo-cut-mask-large-${i}">
                  <rect width="500" height="350" fill="white" />
                  <rect x="0" y="160" width="500" height="30" fill="black" />
                </mask>
              </defs>
              <g mask="url(#logo-cut-mask-large-${i})" fill="currentColor">
                <text x="60" y="275" class="logo-letters" font-size="250">O</text>
                <text x="250" y="275" class="logo-letters" font-size="250">V</text>
              </g>
              <text x="250" y="180" class="logo-subtext" font-size="14" fill="var(--gold-accent)" text-anchor="middle" letter-spacing="0.45em">ORIGINAL VERSION</text>
            </svg>
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
  const firstLetter = letters.charAt(0) || 'O';
  const secondLetter = letters.substring(1) || 'V';

  document.querySelectorAll('.logo-svg').forEach(svg => {
    const lettersG = svg.querySelector('g');
    const subtextText = svg.querySelector('.logo-subtext');

    if (lettersG) {
      const texts = lettersG.querySelectorAll('.logo-letters');
      if (texts.length >= 2) {
        texts[0].textContent = firstLetter;
        texts[1].textContent = secondLetter;
      }
    }
    if (subtextText) {
      subtextText.textContent = subtext;
    }
  });

  document.querySelectorAll('.logo-svg-large').forEach(svg => {
    const lettersG = svg.querySelector('g');
    const subtextText = svg.querySelector('.logo-subtext');

    if (lettersG) {
      const texts = lettersG.querySelectorAll('.logo-letters');
      if (texts.length >= 2) {
        texts[0].textContent = firstLetter;
        texts[1].textContent = secondLetter;
      }
    }
    if (subtextText) {
      subtextText.textContent = subtext;
    }
  });
}

/* ==========================================================================
   23. Admin Dashboard & Portal Manager
   ========================================================================== */
function switchAdminTab(tabId) {
  const buttons = document.querySelectorAll('.admin-tab-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
      btn.style.borderLeft = '2px solid var(--black)';
      btn.style.color = 'var(--black)';
    } else {
      btn.classList.remove('active');
      btn.style.borderLeft = '2px solid transparent';
      btn.style.color = 'var(--medium-gray)';
    }
  });

  const panels = document.querySelectorAll('.admin-panel');
  panels.forEach(panel => {
    if (panel.id === tabId) {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  });
}

function renderAdminDashboard() {
  // Populate Logo Forms
  document.getElementById('admin-logo-letters-input').value = STATE.logo.letters || 'OV';
  document.getElementById('admin-logo-subtext-input').value = STATE.logo.subtext || 'ORIGINAL VERSION';

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

    item.innerHTML = `
      <img src="${prod.image}" style="width: 60px; height: 80px; object-fit: cover; border: 1px solid var(--border-color);">
      <div style="flex: 1;">
        <h4 style="font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">${prod.name}</h4>
        <p style="font-size:0.75rem; color:var(--medium-gray); margin-top:3px;">₹${prod.price} | Category: ${prod.type} | Stock: ${prod.stock}</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="luxury-btn outline-gold-btn" onclick="editProduct('${prod.id}')" style="padding: 8px 15px; font-size:0.6rem; min-width:unset;">EDIT</button>
        <button class="luxury-btn secondary" onclick="deleteProduct('${prod.id}')" style="padding: 8px 15px; font-size:0.6rem; min-width:unset;">DELETE</button>
      </div>
    `;
    productsList.appendChild(item);
  });
}

function handleFileAsBase64(input, previewId, hiddenInputId) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById(previewId);
    const hidden = document.getElementById(hiddenInputId);
    if (preview) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
    if (hidden) {
      hidden.value = e.target.result;
    }
  };
  reader.readAsDataURL(file);
}

function openAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function openNewSlideForm() {
  document.getElementById('admin-slide-form').reset();
  document.getElementById('slide-form-index').value = '';
  document.getElementById('slide-form-image-data').value = '';
  document.getElementById('slide-form-img-preview').style.display = 'none';
  document.getElementById('slide-modal-title').textContent = 'ADD NEW HERO SLIDE';
  openAdminModal('admin-slide-modal');
}

function editSlide(idx) {
  const slide = STATE.slides[idx];
  if (!slide) return;

  document.getElementById('slide-form-index').value = idx;
  document.getElementById('slide-form-image-data').value = slide.image;
  
  const preview = document.getElementById('slide-form-img-preview');
  preview.src = slide.image;
  preview.style.display = 'block';

  document.getElementById('slide-form-position').value = slide.position || 'center center';
  document.getElementById('slide-form-eyebrow').value = slide.eyebrow || '';
  document.getElementById('slide-form-title').value = slide.title || '';
  document.getElementById('slide-form-script').value = slide.scriptTitle || '';
  document.getElementById('slide-form-desc').value = slide.desc || '';
  document.getElementById('slide-form-btn-text').value = slide.btnText || 'SHOP NOW';
  document.getElementById('slide-form-is-logo').checked = !!slide.isLogoGraphic;

  document.getElementById('slide-modal-title').textContent = 'EDIT HERO SLIDE';
  openAdminModal('admin-slide-modal');
}

function deleteSlide(idx) {
  if (confirm('Are you sure you want to delete this banner slide?')) {
    STATE.slides.splice(idx, 1);
    localStorage.setItem('ov_custom_slides', JSON.stringify(STATE.slides));
    renderHeroSlider();
    renderAdminDashboard();
    showNotification('SLIDE REMOVED SUCCESSFUL');
  }
}

function saveSlideForm(event) {
  event.preventDefault();
  const idx = document.getElementById('slide-form-index').value;
  const imageData = document.getElementById('slide-form-image-data').value;
  
  if (!imageData) {
    alert('Please upload an image for the slide.');
    return;
  }

  const slideData = {
    image: imageData,
    position: document.getElementById('slide-form-position').value,
    overlay: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
    eyebrow: document.getElementById('slide-form-eyebrow').value,
    title: document.getElementById('slide-form-title').value,
    scriptTitle: document.getElementById('slide-form-script').value,
    desc: document.getElementById('slide-form-desc').value,
    btnText: document.getElementById('slide-form-btn-text').value,
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

  localStorage.setItem('ov_custom_slides', JSON.stringify(STATE.slides));
  renderHeroSlider();
  renderAdminDashboard();
  closeAdminModal('admin-slide-modal');
  showNotification('BANNER SLIDE SAVED');
}

function openNewProductForm() {
  document.getElementById('admin-product-form').reset();
  document.getElementById('product-form-id').value = '';
  document.getElementById('product-form-image-data').value = '';
  document.getElementById('product-form-img-preview').style.display = 'none';
  document.getElementById('product-modal-title').textContent = 'ADD NEW CATALOG PRODUCT';
  openAdminModal('admin-product-modal');
}

function editProduct(id) {
  const prod = STATE.products.find(p => p.id === id);
  if (!prod) return;

  document.getElementById('product-form-id').value = prod.id;
  document.getElementById('product-form-image-data').value = prod.image;
  
  const preview = document.getElementById('product-form-img-preview');
  preview.src = prod.image;
  preview.style.display = 'block';

  document.getElementById('product-form-name').value = prod.name;
  document.getElementById('product-form-basename').value = prod.baseName;
  document.getElementById('product-form-price').value = prod.price;
  document.getElementById('product-form-orig-price').value = prod.originalPrice || prod.price;
  document.getElementById('product-form-type').value = prod.type;
  document.getElementById('product-form-brand').value = prod.brand;
  document.getElementById('product-form-stock').value = prod.stock;
  document.getElementById('product-form-badge').value = prod.badge || '';

  // Set sizes checkboxes
  const checkboxes = document.querySelectorAll('input[name="product-form-sizes"]');
  checkboxes.forEach(cb => {
    cb.checked = prod.sizes.includes(cb.value);
  });

  document.getElementById('product-modal-title').textContent = 'EDIT CATALOG PRODUCT';
  openAdminModal('admin-product-modal');
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    STATE.products = STATE.products.filter(p => p.id !== id);
    localStorage.setItem('ov_custom_products', JSON.stringify(STATE.products));
    
    // Re-render grids
    renderShopCatalog();
    renderProductGrid('plp-products-grid', STATE.products);
    renderFeaturedGrid('featured-products-grid', STATE.products);
    renderAdminDashboard();
    showNotification('PRODUCT REMOVED');
  }
}

function saveProductForm(event) {
  event.preventDefault();
  const id = document.getElementById('product-form-id').value;
  const imageData = document.getElementById('product-form-image-data').value;
  
  if (!imageData) {
    alert('Please upload a product image.');
    return;
  }

  // Get selected sizes
  const checkboxes = document.querySelectorAll('input[name="product-form-sizes"]:checked');
  const sizes = Array.from(checkboxes).map(cb => cb.value);

  const productData = {
    id: id || 'custom-' + Date.now(),
    name: document.getElementById('product-form-name').value,
    baseName: document.getElementById('product-form-basename').value,
    price: parseInt(document.getElementById('product-form-price').value),
    originalPrice: parseInt(document.getElementById('product-form-orig-price').value),
    type: document.getElementById('product-form-type').value,
    brand: document.getElementById('product-form-brand').value,
    stock: parseInt(document.getElementById('product-form-stock').value),
    badge: document.getElementById('product-form-badge').value || null,
    sizes: sizes.length > 0 ? sizes : ['M'],
    reviews: [],
    rating: 4.8,
    image: imageData
  };

  if (id !== '') {
    // Edit existing
    const idx = STATE.products.findIndex(p => p.id === id);
    if (idx !== -1) STATE.products[idx] = productData;
  } else {
    // Add new
    STATE.products.unshift(productData);
  }

  localStorage.setItem('ov_custom_products', JSON.stringify(STATE.products));
  
  // Re-render grids
  renderShopCatalog();
  renderProductGrid('plp-products-grid', STATE.products);
  renderFeaturedGrid('featured-products-grid', STATE.products);
  renderAdminDashboard();
  
  closeAdminModal('admin-product-modal');
  showNotification('PRODUCT INVENTORY UPDATED');
}

function saveAdminLogo() {
  const letters = document.getElementById('admin-logo-letters-input').value.trim();
  const subtext = document.getElementById('admin-logo-subtext-input').value.trim();

  if (!letters) {
    alert('Please input logo letters.');
    return;
  }

  STATE.logo = {
    letters: letters,
    subtext: subtext || 'ORIGINAL VERSION'
  };

  localStorage.setItem('ov_custom_logo', JSON.stringify(STATE.logo));
  renderLogoMarks();
  showNotification('BRAND LOGO STYLING SAVED');
}
