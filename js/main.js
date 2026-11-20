/**
 * NEVIX STORE - SCRIPT PRINCIPAL (Vanilla JS)
 * Boutique fictive d'électronique à Cotonou, Bénin
 * Slogan : « L'électronique, simplifiée. »
 */

(function () {
  'use strict';

  /* ==========================================================================
     DONNÉES DU PRODUIT ET DES ACCESSOIRES (SANS FETCH)
     ========================================================================== */
  const STORE_DATA = {
    product: {
      name: 'iPhone 14 Pro',
      brand: 'Apple',
      state: 'Venu',
      battery: '90 %',
      capacities: {
        '128 Go': 280000,
        '256 Go': 320000,
        '512 Go': 360000
      },
      colors: {
        'noir': {
          name: 'Noir sidéral',
          hex: '#1F1F21',
          bg: '#FFFFFF',
          images: [
            {
              src: 'img/noir1.jpg',
              alt: 'iPhone 14 Pro Noir sidéral - Vue 1',
              width: 447,
              height: 447,
              fit: 'contain',
              label: 'Vue 1'
            },
            {
              src: 'img/noir2.jpg',
              alt: 'iPhone 14 Pro Noir sidéral - Vue 2',
              width: 800,
              height: 800,
              fit: 'contain',
              label: 'Vue 2'
            },
            {
              src: 'img/noir3.jpg',
              alt: 'iPhone 14 Pro Noir sidéral - Vue 3',
              width: 653,
              height: 914,
              fit: 'contain',
              label: 'Vue 3'
            },
            {
              src: 'img/noir4.jpg',
              alt: 'iPhone 14 Pro Noir sidéral - Vue 4',
              width: 800,
              height: 800,
              fit: 'contain',
              label: 'Vue 4'
            },
            {
              src: 'img/noir5.jpg',
              alt: 'iPhone 14 Pro Noir sidéral - Vue 5',
              width: 497,
              height: 616,
              fit: 'contain',
              label: 'Vue 5'
            },
            {
              src: 'img/iphone-14-pro-noir-lifestyle-1.webp',
              alt: 'iPhone 14 Pro Noir sidéral - En main, écran des réglages',
              width: 1024,
              height: 682,
              fit: 'cover',
              label: 'En main (réglages)'
            },
            {
              src: 'img/iphone-14-pro-noir-lifestyle-2.webp',
              alt: 'iPhone 14 Pro Noir sidéral - En main, appareil photo',
              width: 1024,
              height: 682,
              fit: 'cover',
              label: 'En main (photo)'
            }
          ]
        },
        'argent': {
          name: 'Argent',
          hex: '#E4E4E6',
          bg: '#FFFFFF',
          images: [
            {
              src: 'img/iphone-14-pro-argent.webp',
              alt: 'iPhone 14 Pro Argent - Vue du produit',
              width: 1000,
              height: 1000,
              fit: 'contain',
              label: 'Argent'
            }
          ]
        },
        'or': {
          name: 'Or',
          hex: '#F2DFC2',
          bg: '#FAFAFA',
          images: [
            {
              src: 'img/iphone-14-pro-or.webp',
              alt: 'iPhone 14 Pro Or - Vue du produit',
              width: 378,
              height: 529,
              fit: 'contain',
              label: 'Or'
            }
          ]
        },
        'violet': {
          name: 'Violet intense',
          hex: '#5B4A86',
          bg: '#9F9EC0',
          images: [
            {
              src: 'img/iphone-14-pro-violet.webp',
              alt: 'iPhone 14 Pro Violet intense - Vue du produit',
              width: 1155,
              height: 1200,
              fit: 'contain',
              label: 'Violet intense'
            }
          ]
        }
      }
    },
    accessories: [
      {
        id: 'coque-silicone',
        name: 'Coque en silicone',
        price: 2500,
        image: 'img/accessoire-coque-silicone.webp',
        alt: 'Coque en silicone protectrice'
      },
      {
        id: 'chargeur-20w',
        name: 'Chargeur rapide 20 W',
        price: 8000,
        image: 'img/accessoire-chargeur-20w.webp',
        alt: 'Chargeur rapide USB-C 20 W'
      },
      {
        id: 'airpods-3',
        name: 'AirPods 3',
        price: 15000,
        image: 'img/accessoire-airpods-3.webp',
        alt: 'Écouteurs sans fil Apple AirPods 3'
      }
    ]
  };

  /* ==========================================================================
     ÉTAT LOCAL
     ========================================================================== */
  const state = {
    selectedColorKey: 'noir',
    selectedCapacity: '128 Go',
    quantity: 1,
    currentImageIndex: 0,
    cart: []
  };

  /* ==========================================================================
     SÉLECTEURS DU DOM
     ========================================================================== */
  // Galerie
  const galleryViewport = document.getElementById('gallery-viewport');
  const galleryMainImg = document.getElementById('gallery-main-img');
  const galleryPrevBtn = document.getElementById('gallery-prev-btn');
  const galleryNextBtn = document.getElementById('gallery-next-btn');
  const galleryDots = document.getElementById('gallery-dots');
  const galleryThumbnails = document.getElementById('gallery-thumbnails');

  // Prix
  const productPriceDisplay = document.getElementById('product-price-display');
  const bottomBarTotal = document.getElementById('bottom-bar-total');

  // Sélecteurs
  const colorButtons = document.querySelectorAll('.swatch-btn');
  const capacityButtons = document.querySelectorAll('.capacity-btn-mockup');
  const qtyDecrementBtn = document.getElementById('qty-decrement');
  const qtyIncrementBtn = document.getElementById('qty-increment');
  const qtyDisplay = document.getElementById('qty-display');

  // Boutons d'achat
  const stickyAddToCartBtn = document.getElementById('sticky-add-to-cart-btn');
  const accAddButtons = document.querySelectorAll('.btn-add-accessory');

  // Menu latéral hamburger
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuDrawerOverlay = document.getElementById('menu-drawer-overlay');
  const menuDrawerCloseBtn = document.getElementById('menu-drawer-close-btn');

  // WhatsApp
  const whatsappLinkBtn = document.getElementById('whatsapp-link-btn');
  const whatsappBubble = document.getElementById('whatsapp-bubble');

  // Panier & Drawer
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartBadge = document.getElementById('cart-badge');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartDrawerCloseBtn = document.getElementById('cart-drawer-close-btn');
  const cartDrawerItemsList = document.getElementById('cart-drawer-items-list');
  const drawerItemsCount = document.getElementById('drawer-items-count');
  const drawerSubtotal = document.getElementById('drawer-subtotal');
  const cartDrawerFooter = document.getElementById('cart-drawer-footer');
  const btnOpenCheckout = document.getElementById('btn-open-checkout');
  const btnCheckoutWhatsApp = document.getElementById('btn-checkout-whatsapp');
  const btnBackToCart = document.getElementById('btn-back-to-cart');
  const cartCheckoutCloseBtn = document.getElementById('cart-checkout-close-btn');
  const checkoutOrderForm = document.getElementById('checkout-order-form');
  const checkoutTotalDisplay = document.getElementById('checkout-total-display');
  const orderRefDisplay = document.getElementById('order-ref-display');
  const btnSuccessWhatsApp = document.getElementById('btn-success-whatsapp');
  const btnOrderFinish = document.getElementById('btn-order-finish');

  // Toast
  const toastPopup = document.getElementById('toast-popup');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  // Recherche
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const headerSearchBar = document.getElementById('header-search-bar');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');

  // Onglets
  const tabButtons = document.querySelectorAll('.tab-nav-btn');
  const tabPanels = document.querySelectorAll('.tab-panel-content');

  // FAQ
  const faqToggleButtons = document.querySelectorAll('.faq-toggle-btn');

  /* ==========================================================================
     UTILITAIRES DE FORMATAGE
     ========================================================================== */
  function formatPrice(amount) {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    return `${formatted}\u00A0FCFA`;
  }

  /* ==========================================================================
     GESTION DE LA GALERIE PHOTOS
     ========================================================================== */
  function getCurrentImages() {
    return STORE_DATA.product.colors[state.selectedColorKey].images;
  }

  function updateGalleryDisplay() {
    const images = getCurrentImages();
    if (!images || images.length === 0) return;

    if (state.currentImageIndex >= images.length) {
      state.currentImageIndex = 0;
    }

    const currentImgData = images[state.currentImageIndex];
    const colorObj = STORE_DATA.product.colors[state.selectedColorKey];
    if (colorObj && colorObj.bg && galleryViewport) {
      galleryViewport.style.backgroundColor = colorObj.bg;
    }

    galleryMainImg.style.opacity = '0.5';
    setTimeout(() => {
      galleryMainImg.src = currentImgData.src;
      galleryMainImg.alt = currentImgData.alt;
      galleryMainImg.width = currentImgData.width;
      galleryMainImg.height = currentImgData.height;

      galleryMainImg.classList.remove('fit-contain', 'fit-cover', 'fit-gold-natural');
      if (currentImgData.fit === 'cover') {
        galleryMainImg.classList.add('fit-cover');
      } else if (currentImgData.fit === 'gold-natural') {
        galleryMainImg.classList.add('fit-gold-natural');
      } else {
        galleryMainImg.classList.add('fit-contain');
      }

      galleryMainImg.style.opacity = '1';
    }, 120);

    if (images.length <= 1) {
      galleryDots.style.display = 'none';
      galleryThumbnails.style.display = 'none';
      galleryPrevBtn.style.display = 'none';
      galleryNextBtn.style.display = 'none';
    } else {
      galleryDots.style.display = 'flex';
      galleryThumbnails.style.display = 'flex';
      galleryPrevBtn.style.display = 'flex';
      galleryNextBtn.style.display = 'flex';

      const dots = galleryDots.querySelectorAll('.gallery-dot');
      dots.forEach((dot, index) => {
        const isActive = index === state.currentImageIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      const thumbs = galleryThumbnails.querySelectorAll('.thumb-btn');
      thumbs.forEach((thumb, index) => {
        const isActive = index === state.currentImageIndex;
        thumb.classList.toggle('active', isActive);
        thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }
  }

  function renderGalleryControls() {
    const images = getCurrentImages();
    galleryDots.innerHTML = '';
    galleryThumbnails.innerHTML = '';

    if (images.length <= 1) {
      galleryDots.style.display = 'none';
      galleryThumbnails.style.display = 'none';
      galleryPrevBtn.style.display = 'none';
      galleryNextBtn.style.display = 'none';
      return;
    }

    galleryDots.style.display = 'flex';
    galleryThumbnails.style.display = 'flex';
    galleryPrevBtn.style.display = 'flex';
    galleryNextBtn.style.display = 'flex';

    images.forEach((imgItem, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `gallery-dot ${idx === state.currentImageIndex ? 'active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Voir photo ${idx + 1} sur ${images.length} : ${imgItem.label || ''}`);
      dot.setAttribute('aria-selected', idx === state.currentImageIndex ? 'true' : 'false');
      dot.addEventListener('click', () => {
        state.currentImageIndex = idx;
        updateGalleryDisplay();
      });
      galleryDots.appendChild(dot);
    });

    images.forEach((imgItem, idx) => {
      const thumbBtn = document.createElement('button');
      thumbBtn.type = 'button';
      thumbBtn.className = `thumb-btn ${idx === state.currentImageIndex ? 'active' : ''}`;
      thumbBtn.setAttribute('role', 'tab');
      thumbBtn.setAttribute('aria-label', `Miniature ${idx + 1} : ${imgItem.label || ''}`);
      thumbBtn.setAttribute('aria-selected', idx === state.currentImageIndex ? 'true' : 'false');

      const thumbImg = document.createElement('img');
      thumbImg.src = imgItem.src;
      thumbImg.alt = `Miniature ${imgItem.alt}`;
      thumbImg.width = 60;
      thumbImg.height = 60;
      thumbImg.loading = 'lazy';
      thumbImg.className = 'thumb-img';

      thumbBtn.appendChild(thumbImg);
      thumbBtn.addEventListener('click', () => {
        state.currentImageIndex = idx;
        updateGalleryDisplay();
      });
      galleryThumbnails.appendChild(thumbBtn);
    });
  }

  function nextGalleryImage() {
    const images = getCurrentImages();
    if (images.length <= 1) return;
    state.currentImageIndex = (state.currentImageIndex + 1) % images.length;
    updateGalleryDisplay();
  }

  function prevGalleryImage() {
    const images = getCurrentImages();
    if (images.length <= 1) return;
    state.currentImageIndex = (state.currentImageIndex - 1 + images.length) % images.length;
    updateGalleryDisplay();
  }

  if (galleryNextBtn) galleryNextBtn.addEventListener('click', nextGalleryImage);
  if (galleryPrevBtn) galleryPrevBtn.addEventListener('click', prevGalleryImage);

  // Balayage tactile (swipe)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (galleryViewport) {
    galleryViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    galleryViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) nextGalleryImage();
        else prevGalleryImage();
      }
    }, { passive: true });

    galleryViewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextGalleryImage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevGalleryImage();
      }
    });
  }

  /* ==========================================================================
     CONFIGURATION ET PRIX
     ========================================================================== */
  function getUnitPrice() {
    return STORE_DATA.product.capacities[state.selectedCapacity] || 280000;
  }

  function getTotalPrice() {
    return getUnitPrice() * state.quantity;
  }

  function updatePricesAndLinks() {
    const colorObj = STORE_DATA.product.colors[state.selectedColorKey];
    const colorName = colorObj ? colorObj.name : 'Noir sidéral';
    const capacityText = state.selectedCapacity;

    // Nom de la couleur sélectionnée
    const selectedColorNameEl = document.getElementById('selected-color-name');
    if (selectedColorNameEl) {
      selectedColorNameEl.textContent = colorName;
    }

    // Prix unitaire à droite de la note
    const unitPrice = getUnitPrice();
    if (productPriceDisplay) {
      productPriceDisplay.innerHTML = formatPrice(unitPrice);
    }

    // Total dans la barre d'achat flottante
    if (bottomBarTotal) {
      bottomBarTotal.innerHTML = formatPrice(getTotalPrice());
    }

    // Message WhatsApp dynamique
    updateWhatsAppLink(colorName, capacityText);
  }

  function updateWhatsAppLink(colorName, capacityText) {
    if (!whatsappLinkBtn) return;
    const message = `Bonjour Nevix Store, je suis intéressé par l'iPhone 14 Pro (${colorName}, ${capacityText}, état Venu). Pouvez-vous me donner plus d'informations ?`;
    const encoded = encodeURIComponent(message);
    whatsappLinkBtn.href = `https://wa.me/2290151693339?text=${encoded}`;
  }

  // Choix de couleur
  colorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const colorKey = btn.dataset.colorKey;
      if (!STORE_DATA.product.colors[colorKey]) return;

      state.selectedColorKey = colorKey;
      state.currentImageIndex = 0;

      colorButtons.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('active', isCurrent);
        b.setAttribute('aria-checked', isCurrent ? 'true' : 'false');
      });

      renderGalleryControls();
      updateGalleryDisplay();
      updatePricesAndLinks();
    });
  });

  // Choix de capacité
  capacityButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const capacity = btn.dataset.capacity;
      if (!STORE_DATA.product.capacities[capacity]) return;

      state.selectedCapacity = capacity;

      capacityButtons.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('active', isCurrent);
        b.setAttribute('aria-checked', isCurrent ? 'true' : 'false');
      });

      updatePricesAndLinks();
    });
  });

  // Sélecteur de quantité
  if (qtyDecrementBtn) {
    qtyDecrementBtn.addEventListener('click', () => {
      if (state.quantity > 1) {
        state.quantity -= 1;
        updateQuantityDisplay();
      }
    });
  }

  if (qtyIncrementBtn) {
    qtyIncrementBtn.addEventListener('click', () => {
      if (state.quantity < 5) {
        state.quantity += 1;
        updateQuantityDisplay();
      }
    });
  }

  function updateQuantityDisplay() {
    if (qtyDisplay) qtyDisplay.textContent = state.quantity;
    if (qtyDecrementBtn) qtyDecrementBtn.disabled = state.quantity <= 1;
    if (qtyIncrementBtn) qtyIncrementBtn.disabled = state.quantity >= 5;
    updatePricesAndLinks();
  }

  /* ==========================================================================
     TOAST DE CONFIRMATION
     ========================================================================== */
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toastPopup.hidden = false;
    toastPopup.classList.add('is-visible');
    toastPopup.style.display = 'block';

    toastTimer = setTimeout(() => {
      toastPopup.hidden = true;
      toastPopup.classList.remove('is-visible');
      toastPopup.style.display = 'none';
    }, 3200);
  }

  /* ==========================================================================
     AJOUT AU PANIER ET MINI-PANIER (DRAWER)
     ========================================================================== */
  function triggerAddToCartFeedback(buttonEl, originalText, successText) {
    if (!buttonEl) return;
    const spanText = buttonEl.querySelector('span');
    if (spanText) {
      spanText.textContent = successText;
      buttonEl.style.backgroundColor = '#16A34A';
      setTimeout(() => {
        spanText.textContent = originalText;
        buttonEl.style.backgroundColor = '';
      }, 1500);
    }
  }

  function addProductToCart() {
    const colorObj = STORE_DATA.product.colors[state.selectedColorKey];
    const colorName = colorObj ? colorObj.name : 'Noir sidéral';
    const unitPrice = getUnitPrice();

    const existingIndex = state.cart.findIndex(
      (item) => item.type === 'phone' && item.colorKey === state.selectedColorKey && item.capacity === state.selectedCapacity
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += state.quantity;
    } else {
      state.cart.push({
        id: `phone-${state.selectedColorKey}-${state.selectedCapacity}`,
        type: 'phone',
        name: 'iPhone 14 Pro',
        variant: `${state.selectedCapacity}, ${colorName}`,
        colorKey: state.selectedColorKey,
        capacity: state.selectedCapacity,
        unitPrice: unitPrice,
        quantity: state.quantity,
        image: colorObj.images[0].src
      });
    }

    updateCartBadge();
    showToast(`iPhone 14 Pro (${state.selectedCapacity}, ${colorName}) ajouté au panier`);
    triggerAddToCartFeedback(stickyAddToCartBtn, 'Ajouter au panier', 'Ajouté ✓');
  }

  function addAccessoryToCart(accId, btnEl) {
    const acc = STORE_DATA.accessories.find((a) => a.id === accId);
    if (!acc) return;

    const existingIndex = state.cart.findIndex((item) => item.id === acc.id);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        id: acc.id,
        type: 'accessory',
        name: acc.name,
        variant: 'Accessoire certifié',
        unitPrice: acc.price,
        quantity: 1,
        image: acc.image
      });
    }

    updateCartBadge();
    showToast(`${acc.name} ajouté au panier`);
    triggerAddToCartFeedback(btnEl, 'Ajouter', 'Ajouté ✓');
  }

  function updateCartBadge() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.classList.add('badge-bump');
      setTimeout(() => cartBadge.classList.remove('badge-bump'), 250);
    }
    if (cartToggleBtn) {
      cartToggleBtn.setAttribute('aria-label', `Panier (${totalCount} ${totalCount > 1 ? 'articles' : 'article'})`);
    }
  }

  if (stickyAddToCartBtn) stickyAddToCartBtn.addEventListener('click', addProductToCart);

  accAddButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const accId = btn.dataset.accId;
      addAccessoryToCart(accId, btn);
    });
  });

  // Basculement entre les vues du tiroir panier
  function showCartView(viewName) {
    const viewItems = document.getElementById('cart-view-items');
    const viewCheckout = document.getElementById('cart-view-checkout');
    const viewSuccess = document.getElementById('cart-view-success');

    if (viewItems) viewItems.style.display = viewName === 'items' ? 'flex' : 'none';
    if (viewCheckout) viewCheckout.style.display = viewName === 'checkout' ? 'flex' : 'none';
    if (viewSuccess) viewSuccess.style.display = viewName === 'success' ? 'flex' : 'none';
  }

  // Affichage du mini-panier professionnel
  function renderCartDrawer() {
    if (!cartDrawerItemsList) return;
    cartDrawerItemsList.innerHTML = '';
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (drawerItemsCount) drawerItemsCount.textContent = totalCount;

    if (state.cart.length === 0) {
      cartDrawerItemsList.innerHTML = `
        <div class="empty-cart-box">
          <div class="empty-cart-icon-wrap">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1.5"></circle>
              <circle cx="19" cy="21" r="1.5"></circle>
              <path d="M2.5 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22.5 7H6.2"></path>
            </svg>
          </div>
          <h3 class="empty-cart-heading">Votre panier est vide</h3>
          <p class="empty-cart-subtext">Ajoutez un iPhone 14 Pro ou des accessoires pour commencer votre commande.</p>
          <button type="button" class="btn-continue-shopping" id="btn-empty-continue">Continuer mes achats</button>
        </div>
      `;
      if (drawerSubtotal) drawerSubtotal.innerHTML = formatPrice(0);
      if (checkoutTotalDisplay) checkoutTotalDisplay.innerHTML = formatPrice(0);
      if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';

      const btnEmptyContinue = document.getElementById('btn-empty-continue');
      if (btnEmptyContinue) btnEmptyContinue.addEventListener('click', closeCartDrawer);
      return;
    }

    if (cartDrawerFooter) cartDrawerFooter.style.display = 'flex';

    let subtotal = 0;

    state.cart.forEach((item, index) => {
      const itemSubtotal = item.unitPrice * item.quantity;
      subtotal += itemSubtotal;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item-row';
      itemRow.innerHTML = `
        <div class="cart-item-thumbnail">
          <img src="${item.image}" alt="${item.name}" width="64" height="64" loading="lazy">
        </div>
        <div class="cart-item-info">
          <h3 class="cart-item-title">${item.name}</h3>
          ${item.variant ? `<div class="cart-item-variant">${item.variant}</div>` : ''}
          <div class="cart-item-price">${formatPrice(item.unitPrice * item.quantity)}</div>
          <div class="cart-item-actions">
            <div class="cart-qty-capsule">
              <button type="button" class="cart-qty-btn cart-qty-minus" data-index="${index}" aria-label="Diminuer la quantité">−</button>
              <span class="cart-qty-value">${item.quantity}</span>
              <button type="button" class="cart-qty-btn cart-qty-plus" data-index="${index}" aria-label="Augmenter la quantité">+</button>
            </div>
            <button type="button" class="cart-item-remove-btn" data-index="${index}" aria-label="Supprimer cet article">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Retirer</span>
            </button>
          </div>
        </div>
      `;
      cartDrawerItemsList.appendChild(itemRow);
    });

    if (drawerSubtotal) drawerSubtotal.innerHTML = formatPrice(subtotal);
    if (checkoutTotalDisplay) checkoutTotalDisplay.innerHTML = formatPrice(subtotal);

    // Mettre à jour le lien WhatsApp direct
    if (btnCheckoutWhatsApp) {
      let waText = `Bonjour Nevix Store, je souhaite commander les articles suivants :

`;
      state.cart.forEach((it) => {
        waText += `• ${it.quantity}x ${it.name} ${it.variant ? '(' + it.variant + ')' : ''} : ${formatPrice(it.unitPrice * it.quantity)}
`;
      });
      waText += `
💰 Total : ${formatPrice(subtotal)}
🚚 Livraison en 24h à Cotonou / Calavi.
Pouvez-vous me confirmer la disponibilité svp ? Merci !`;
      btnCheckoutWhatsApp.href = `https://wa.me/2290151693339?text=${encodeURIComponent(waText)}`;
    }

    // Gestion de l'incrémentation
    cartDrawerItemsList.querySelectorAll('.cart-qty-plus').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        state.cart[idx].quantity += 1;
        updateCartBadge();
        renderCartDrawer();
      });
    });

    // Gestion de la décrémentation
    cartDrawerItemsList.querySelectorAll('.cart-qty-minus').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        if (state.cart[idx].quantity > 1) {
          state.cart[idx].quantity -= 1;
        } else {
          state.cart.splice(idx, 1);
        }
        updateCartBadge();
        renderCartDrawer();
      });
    });

    // Gestion de la suppression directe
    cartDrawerItemsList.querySelectorAll('.cart-item-remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        state.cart.splice(idx, 1);
        updateCartBadge();
        renderCartDrawer();
      });
    });
  }

  function openCartDrawer() {
    showCartView('items');
    renderCartDrawer();
    if (cartDrawerOverlay) {
      cartDrawerOverlay.hidden = false;
      cartDrawerOverlay.classList.add('is-open');
      cartDrawerOverlay.style.display = 'flex';
    }
    if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', 'true');
    if (cartDrawerCloseBtn) cartDrawerCloseBtn.focus();
    document.body.style.overflow = 'hidden';
    // Push history state so phone back button closes the drawer
    history.pushState({ drawer: 'cart' }, '');
  }

  function closeCartDrawer() {
    if (cartDrawerOverlay) {
      cartDrawerOverlay.hidden = true;
      cartDrawerOverlay.classList.remove('is-open');
      cartDrawerOverlay.style.display = 'none';
    }
    if (cartToggleBtn) {
      cartToggleBtn.setAttribute('aria-expanded', 'false');
      cartToggleBtn.focus();
    }
    document.body.style.overflow = '';
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
  if (cartDrawerCloseBtn) {
    cartDrawerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCartDrawer();
    });
  }

  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) {
        closeCartDrawer();
      }
    });
  }

  // Navigation vers la commande
  if (btnOpenCheckout) {
    btnOpenCheckout.addEventListener('click', () => {
      if (state.cart.length === 0) return;
      showCartView('checkout');
    });
  }

  if (btnBackToCart) {
    btnBackToCart.addEventListener('click', () => {
      showCartView('items');
    });
  }

  if (cartCheckoutCloseBtn) {
    cartCheckoutCloseBtn.addEventListener('click', closeCartDrawer);
  }

  // Validation du formulaire de commande
  if (checkoutOrderForm) {
    checkoutOrderForm.addEventListener('click', (e) => e.stopPropagation());
    checkoutOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullname = document.getElementById('order-fullname')?.value || 'Client';
      const phone = document.getElementById('order-phone')?.value || '';
      const address = document.getElementById('order-address')?.value || '';
      const paymentEl = document.querySelector('input[name="order-payment"]:checked');
      const payment = paymentEl ? paymentEl.value : 'Paiement à la livraison';

      const randomRef = 'NVX-' + Math.floor(10000 + Math.random() * 90000);
      if (orderRefDisplay) orderRefDisplay.textContent = `Réf : #${randomRef}`;

      let waText = `Bonjour Nevix Store, je viens de valider ma commande #${randomRef} :

`;
      state.cart.forEach((it) => {
        waText += `• ${it.quantity}x ${it.name} ${it.variant ? '(' + it.variant + ')' : ''} : ${formatPrice(it.unitPrice * it.quantity)}
`;
      });
      const subtotal = state.cart.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
      waText += `
💰 Total : ${formatPrice(subtotal)}
`;
      waText += `👤 Nom : ${fullname}
`;
      waText += `📞 Téléphone : ${phone}
`;
      waText += `📍 Adresse : ${address}
`;
      waText += `💳 Mode de règlement : ${payment}

`;
      waText += `Merci de me confirmer la livraison en 24h !`;

      if (btnSuccessWhatsApp) {
        btnSuccessWhatsApp.href = `https://wa.me/2290151693339?text=${encodeURIComponent(waText)}`;
      }

      state.cart = [];
      updateCartBadge();
      showCartView('success');
    });
  }

  if (btnOrderFinish) {
    btnOrderFinish.addEventListener('click', () => {
      closeCartDrawer();
      showCartView('items');
    });
  }

  /* ==========================================================================
     MENU LATÉRAL HAMBURGER
     ========================================================================== */
  function openMenuDrawer() {
    if (menuDrawerOverlay) {
      menuDrawerOverlay.hidden = false;
      menuDrawerOverlay.classList.add('is-open');
      menuDrawerOverlay.style.display = 'flex';
    }
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
    if (menuDrawerCloseBtn) menuDrawerCloseBtn.focus();
    document.body.style.overflow = 'hidden';
    // Push history state so phone back button closes the drawer
    history.pushState({ drawer: 'menu' }, '');
  }

  function closeMenuDrawer() {
    if (menuDrawerOverlay) {
      menuDrawerOverlay.hidden = true;
      menuDrawerOverlay.classList.remove('is-open');
      menuDrawerOverlay.style.display = 'none';
    }
    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      menuToggleBtn.focus();
    }
    document.body.style.overflow = '';
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenuDrawer);
  if (menuDrawerCloseBtn) {
    menuDrawerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMenuDrawer();
    });
  }

  if (menuDrawerOverlay) {
    menuDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === menuDrawerOverlay) {
        closeMenuDrawer();
      }
    });
  }

  // Fermer le tiroir quand on clique sur un lien du menu
  const drawerNavLinks = document.querySelectorAll('.drawer-nav-item');
  drawerNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenuDrawer();
    });
  });

  /* ==========================================================================
     BARRE DE RECHERCHE DÉPLIABLE
     ========================================================================== */
  function openSearchBar() {
    if (headerSearchBar) {
      headerSearchBar.hidden = false;
      headerSearchBar.classList.add('is-open');
      headerSearchBar.style.display = 'block';
    }
    if (searchToggleBtn) searchToggleBtn.setAttribute('aria-expanded', 'true');
    if (searchInput) searchInput.focus();
  }

  function closeSearchBar() {
    if (headerSearchBar) {
      headerSearchBar.hidden = true;
      headerSearchBar.classList.remove('is-open');
      headerSearchBar.style.display = 'none';
    }
    if (searchToggleBtn) {
      searchToggleBtn.setAttribute('aria-expanded', 'false');
      searchToggleBtn.focus();
    }
  }

  if (searchToggleBtn) {
    searchToggleBtn.addEventListener('click', () => {
      if (!headerSearchBar) return;
      if (headerSearchBar.hidden || headerSearchBar.style.display === 'none') {
        openSearchBar();
      } else {
        closeSearchBar();
      }
    });
  }

  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearchBar);

  /* ==========================================================================
     ONGLETS
     ========================================================================== */
  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      selectTab(index);
    });

    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight') {
        targetIndex = (index + 1) % tabButtons.length;
      } else if (e.key === 'ArrowLeft') {
        targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabButtons.length - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        selectTab(targetIndex);
        tabButtons[targetIndex].focus();
      }
    });
  });

  function selectTab(index) {
    tabButtons.forEach((btn, i) => {
      const isSelected = i === index;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    tabPanels.forEach((panel, i) => {
      const isCurrent = i === index;
      panel.classList.toggle('active', isCurrent);
      panel.hidden = !isCurrent;
      panel.style.display = isCurrent ? 'block' : 'none';
    });
  }

  /* ==========================================================================
     ACCORDÉON FAQ
     ========================================================================== */
  faqToggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetPanelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(targetPanelId);

      btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      if (panel) {
        panel.hidden = isExpanded;
        panel.classList.toggle('is-open', !isExpanded);
        panel.style.display = isExpanded ? 'none' : 'block';
      }
    });
  });

  /* ==========================================================================
     TOUCHE ÉCHAP
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (menuDrawerOverlay && !menuDrawerOverlay.hidden && menuDrawerOverlay.classList.contains('is-open')) {
        closeMenuDrawer();
      }
      if (cartDrawerOverlay && !cartDrawerOverlay.hidden && cartDrawerOverlay.classList.contains('is-open')) {
        closeCartDrawer();
      }
      if (headerSearchBar && !headerSearchBar.hidden && headerSearchBar.classList.contains('is-open')) {
        closeSearchBar();
      }
    }
  });

  /* ==========================================================================
     BARRE D'ACHAT DYNAMIQUE (Arrêt au niveau du pied de page / après accessoires)
     + BOUTON WHATSAPP FLOTTANT (visible uniquement près du pied de page)
     ========================================================================== */
  const fixedBottomBar = document.getElementById('fixed-bottom-bar');
  const footerElement = document.querySelector('.site-footer');
  const floatingWhatsApp = document.querySelector('.floating-whatsapp-wrapper');

  function showFloatingWhatsApp() {
    if (floatingWhatsApp) floatingWhatsApp.classList.add('is-visible');
  }
  function hideFloatingWhatsApp() {
    if (floatingWhatsApp) floatingWhatsApp.classList.remove('is-visible');
  }

  if (fixedBottomBar && footerElement) {
    if ('IntersectionObserver' in window) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fixedBottomBar.classList.add('is-hidden');
            document.body.classList.add('bottom-bar-hidden');
            showFloatingWhatsApp();
          } else {
            fixedBottomBar.classList.remove('is-hidden');
            document.body.classList.remove('bottom-bar-hidden');
            hideFloatingWhatsApp();
          }
        });
      }, {
        root: null,
        threshold: 0.05
      });

      footerObserver.observe(footerElement);
    } else {
      window.addEventListener('scroll', () => {
        const footerRect = footerElement.getBoundingClientRect();
        if (footerRect.top <= window.innerHeight) {
          fixedBottomBar.classList.add('is-hidden');
          document.body.classList.add('bottom-bar-hidden');
          showFloatingWhatsApp();
        } else {
          fixedBottomBar.classList.remove('is-hidden');
          document.body.classList.remove('bottom-bar-hidden');
          hideFloatingWhatsApp();
        }
      }, { passive: true });
    }
  }

  /* ==========================================================================
     BOUTON RETOUR DU TÉLÉPHONE : ferme le drawer au lieu de quitter la page
     ========================================================================== */
  window.addEventListener('popstate', (e) => {
    // Si le panier est ouvert, le fermer
    if (cartDrawerOverlay && !cartDrawerOverlay.hidden && cartDrawerOverlay.classList.contains('is-open')) {
      closeCartDrawer();
      return;
    }
    // Si le menu est ouvert, le fermer
    if (menuDrawerOverlay && !menuDrawerOverlay.hidden && menuDrawerOverlay.classList.contains('is-open')) {
      closeMenuDrawer();
      return;
    }
  });

  /* ==========================================================================
     INITIALISATION
     ========================================================================== */
  function init() {
    closeMenuDrawer();
    closeCartDrawer();
    closeSearchBar();
    renderGalleryControls();
    updateGalleryDisplay();
    updatePricesAndLinks();
    updateQuantityDisplay();
  }

  init();
})();
