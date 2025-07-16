// ===== LWEE FILM WEBSITE JAVASCRIPT =====
// Dark Theme Design - Background: #414040

// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let cart = [];
let currentProduct = null;
let currentTrailerMovie = null;
let slideInterval;
let isAdminMode = false;

// ===== PRODUCT DATA =====
const products = {
    'diaspora-hoodie': {
        name: 'THE DIASPORA Hoodie',
        price: 75,
        image: '👕',
        description: 'Premium quality hoodie from The Diaspora collection. Made with 100% organic cotton and featuring exclusive artwork from the film.'
    },
    'diaspora-bag': {
        name: 'THE DIASPORA Tote Bag',
        price: 35,
        image: '🎒',
        description: 'Stylish tote bag perfect for everyday use. Features minimalist design inspired by The Diaspora aesthetic.'
    },
    'diaspora-poster': {
        name: 'THE DIASPORA Poster',
        price: 25,
        image: '🖼️',
        description: 'High-quality art print of the official movie poster. Perfect for decorating your space with cinematic art.'
    },
    'diaspora-tshirt': {
        name: 'THE DIASPORA T-Shirt',
        price: 30,
        image: '👕',
        description: 'Comfortable cotton t-shirt with subtle branding. Available in multiple sizes and colors.'
    },
    'fishbowl-figurine': {
        name: '어항 Fish Figurine',
        price: 45,
        image: '🐠',
        description: 'Collectible figurine inspired by the symbolic fish from 어항. Handcrafted with attention to detail.'
    },
    'fishbowl-tshirt': {
        name: '어항 T-Shirt',
        price: 28,
        image: '👕',
        description: 'Soft cotton t-shirt featuring artwork from 어항. Comfortable fit with artistic design.'
    },
    'fishbowl-mug': {
        name: '어항 Coffee Mug',
        price: 18,
        image: '☕',
        description: 'Ceramic coffee mug with beautiful 어항 motifs. Perfect for your morning coffee or tea.'
    },
    'fishbowl-notebook': {
        name: '어항 Notebook',
        price: 22,
        image: '📓',
        description: 'Premium notebook with 어항-inspired cover design. Perfect for writing, sketching, or journaling.'
    }
};

// ===== MOVIE DATA =====
const movies = {
    'diaspora': {
        title: 'The Diaspora',
        subtitle: '2024 • Drama • 120 min',
        hero: 'https://raw.githubusercontent.com/yonseiarts/chine-film-images/main/diaspora2.jpg',
        trailer: 'https://www.youtube.com/watch?v=zrk1Dc8XSNs',
        trailerEmbed: 'https://www.youtube.com/embed/zrk1Dc8XSNs?autoplay=1&rel=0&modestbranding=1'
    },
    'fishbowl': {
        title: '어항',
        subtitle: '2024 • Drama • 95 min',
        hero: 'https://raw.githubusercontent.com/yonseiarts/chine-film-images/main/Fish bowl2.jpg',
        trailer: 'https://www.youtube.com/watch?v=gRtc6tfjykU',
        trailerEmbed: 'https://www.youtube.com/embed/gRtc6tfjykU?autoplay=1&rel=0&modestbranding=1'
    },
    'spring-dreams': {
        title: 'Spring Dreams',
        subtitle: '2024 • Romance • 110 min',
        hero: 'https://picsum.photos/1920/1080?random=7',
        trailer: 'https://www.youtube.com/watch?v=GHI789RST',
        trailerEmbed: 'https://www.youtube.com/embed/GHI789RST?autoplay=1&rel=0&modestbranding=1'
    },
    'urban-tales': {
        title: 'Urban Tales',
        subtitle: '2024 • Action • 130 min',
        hero: 'https://picsum.photos/1920/1080?random=8',
        trailer: 'https://www.youtube.com/watch?v=JKL012MNO',
        trailerEmbed: 'https://www.youtube.com/embed/JKL012MNO?autoplay=1&rel=0&modestbranding=1'
    },
    'memories': {
        title: 'Memories',
        subtitle: '2023 • Drama • 105 min',
        hero: 'https://picsum.photos/1920/1080?random=9',
        trailer: 'https://www.youtube.com/watch?v=PQR345STU',
        trailerEmbed: 'https://www.youtube.com/embed/PQR345STU?autoplay=1&rel=0&modestbranding=1'
    },
    'silence': {
        title: 'Silence',
        subtitle: '2023 • Thriller • 98 min',
        hero: 'https://picsum.photos/1920/1080?random=10',
        trailer: 'https://www.youtube.com/watch?v=VWX678YZA',
        trailerEmbed: 'https://www.youtube.com/embed/VWX678YZA?autoplay=1&rel=0&modestbranding=1'
    },
    'journey': {
        title: 'Journey',
        subtitle: '2023 • Adventure • 140 min',
        hero: 'https://picsum.photos/1920/1080?random=11',
        trailer: 'https://www.youtube.com/watch?v=BCD901EFG',
        trailerEmbed: 'https://www.youtube.com/embed/BCD901EFG?autoplay=1&rel=0&modestbranding=1'
    }
};

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== LWEE FILM Website Loading ===');
    initializeWebsite();
});

function initializeWebsite() {
    showPage('home');
    initializeSlider();
    setupEventListeners();
    setupDragAndDrop();
    loadSavedLogo();
    handleScrollEffects();
    handleSmoothScrolling();
    handleButtonInteractions();
    handleMobileMenu();
    handleAnimations();
    handleKeyboardNavigation();
    
    console.log('=== Website Initialized ===');
}

// ===== ADMIN MODE FUNCTIONS =====
function toggleAdminMode() {
    isAdminMode = !isAdminMode;
    const logoUploadBtn = document.getElementById('logo-upload-btn');
    const adminToggle = document.querySelector('.admin-toggle');
    
    if (isAdminMode) {
        logoUploadBtn.style.display = 'inline-block';
        adminToggle.textContent = '일반 모드';
        adminToggle.style.background = 'rgba(255, 0, 0, 0.1)';
        adminToggle.style.borderColor = 'rgba(255, 0, 0, 0.3)';
        console.log('Admin mode enabled');
    } else {
        logoUploadBtn.style.display = 'none';
        adminToggle.textContent = '관리자 모드';
        adminToggle.style.background = 'rgba(255, 255, 255, 0.1)';
        adminToggle.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        console.log('Admin mode disabled');
    }
}

// ===== LOGO UPLOAD FUNCTIONS =====
function openLogoUpload() {
    if (!isAdminMode) {
        console.warn('Logo upload attempted without admin mode');
        return;
    }
    
    document.getElementById('upload-overlay').classList.add('active');
    document.getElementById('logo-upload-area').classList.add('active');
    console.log('Logo upload modal opened');
}

function closeLogoUpload() {
    document.getElementById('upload-overlay').classList.remove('active');
    document.getElementById('logo-upload-area').classList.remove('active');
    console.log('Logo upload modal closed');
}

function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Processing logo upload:', file.name, file.size, 'bytes');

    // File size check (2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('파일 크기가 2MB를 초과합니다.');
        console.error('File size exceeds 2MB limit');
        return;
    }

    // File type check
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        console.error('Invalid file type:', file.type);
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const logoImage = document.getElementById('logo-image');
        const logoText = document.getElementById('logo-text');
        
        logoImage.src = e.target.result;
        logoImage.style.display = 'block';
        logoText.style.display = 'none';
        
        // Save to localStorage
        localStorage.setItem('lweeFilmLogo', e.target.result);
        
        closeLogoUpload();
        alert('로고가 성공적으로 업로드되었습니다!');
        console.log('Logo upload successful');
    };
    
    reader.onerror = function() {
        console.error('Error reading file');
        alert('파일 읽기 중 오류가 발생했습니다.');
    };
    
    reader.readAsDataURL(file);
}

function setupDragAndDrop() {
    const dropzone = document.getElementById('upload-dropzone');
    if (!dropzone) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropzone.classList.add('dragover');
    }

    function unhighlight(e) {
        dropzone.classList.remove('dragover');
    }

    dropzone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            console.log('File dropped:', files[0].name);
            const event = { target: { files: [files[0]] } };
            handleLogoUpload(event);
        }
    }
}

function loadSavedLogo() {
    const savedLogo = localStorage.getItem('lweeFilmLogo');
    if (savedLogo) {
        const logoImage = document.getElementById('logo-image');
        const logoText = document.getElementById('logo-text');
        
        logoImage.src = savedLogo;
        logoImage.style.display = 'block';
        logoText.style.display = 'none';
        console.log('Saved logo loaded from localStorage');
    }
}

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
    console.log('Navigating to page:', pageId);
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    if (pageId === 'home') {
        setTimeout(() => {
            resetSliderToFirst();
        }, 100);
    }
}

function showSection(sectionId) {
    showPage('home');
    setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            console.log('Scrolled to section:', sectionId);
        }
    }, 100);
}

// ===== SLIDER FUNCTIONS =====
function initializeSlider() {
    currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    console.log('Initializing slider with', slides.length, 'slides');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[0]) slides[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');
    
    updateSliderCounter();
    setTimeout(() => updateSliderButtons(), 100);
    startSliderProgress();
}

function resetSliderToFirst() {
    currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[0]) slides[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');
    
    updateSliderCounter();
    updateSliderButtons();
    resetSliderProgress();
    console.log('Slider reset to first slide');
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    updateSliderCounter();
    updateSliderButtons();
    resetSliderProgress();
    console.log('Advanced to slide:', currentSlide + 1);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    updateSliderCounter();
    updateSliderButtons();
    resetSliderProgress();
    console.log('Went back to slide:', currentSlide + 1);
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = slideIndex;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    updateSliderCounter();
    updateSliderButtons();
    resetSliderProgress();
    console.log('Jumped to slide:', currentSlide + 1);
}

function updateSliderCounter() {
    const counterElement = document.querySelector('.current-slide');
    if (counterElement) {
        counterElement.textContent = currentSlide + 1;
    }
}

function updateSliderButtons() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
        const slideMovieId = slide.getAttribute('data-movie');
        const watchBtn = slide.querySelector('.slide-watch-btn');
        const trailerBtn = slide.querySelector('.slide-trailer-btn');
        
        if (watchBtn) {
            watchBtn.onclick = null;
            watchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Watch button clicked for:', slideMovieId);
                showMovieDetail(slideMovieId);
            });
        }
        
        if (trailerBtn) {
            trailerBtn.onclick = null;
            trailerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Trailer button clicked for:', slideMovieId);
                showTrailer(slideMovieId);
            });
        }
    });
}

function resetSliderProgress() {
    const progressBar = document.querySelector('.timeline-progress');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    clearInterval(slideInterval);
    startSliderProgress();
}

function startSliderProgress() {
    let progress = 0;
    const progressBar = document.querySelector('.timeline-progress');
    
    slideInterval = setInterval(() => {
        progress += 1;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (progress >= 100) {
            nextSlide();
        }
    }, 80); // 8 seconds total (100 * 80ms)
}

// ===== MOVIE FUNCTIONS =====
function showMovieDetail(movieId) {
    const movie = movies[movieId];
    if (!movie) {
        console.error('Movie not found:', movieId);
        return;
    }

    console.log('Showing movie detail:', movie.title);

    const heroEl = document.getElementById('movie-hero');
    heroEl.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('${movie.hero}')`;
    
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-subtitle').textContent = movie.subtitle;
    
    document.getElementById('trailer-btn').onclick = () => showTrailer(movieId);
    
    showPage('movie-detail');
}

function showTrailer(movieId) {
    console.log('=== showTrailer called ===');
    console.log('Requested movieId:', movieId);
    
    const movie = movies[movieId];
    if (!movie) {
        console.error('Movie not found for ID:', movieId);
        return;
    }

    console.log('Found movie:', movie.title);
    currentTrailerMovie = movieId;
    
    // Update trailer header
    document.getElementById('trailer-info').textContent = movie.title.toUpperCase();
    document.getElementById('trailer-movie-title').textContent = `${movie.title} 트레일러`;
    
    // Initialize video player
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.innerHTML = `
        <div class="video-placeholder" id="video-placeholder" onclick="playTrailer()">
            <button class="play-button">▶</button>
            <div style="font-size: 24px; margin-bottom: 8px;">${movie.title} 트레일러</div>
            <small style="font-size: 16px; opacity: 0.7;">클릭하여 트레일러 재생</small>
        </div>
    `;
    
    console.log('Trailer page setup complete for:', movie.title);
    showPage('trailer-page');
}

function playTrailer() {
    console.log('=== playTrailer called ===');
    console.log('Current trailer movie:', currentTrailerMovie);
    
    const movie = movies[currentTrailerMovie];
    if (!movie) {
        console.error('No movie found for currentTrailerMovie:', currentTrailerMovie);
        return;
    }

    console.log('Playing trailer for:', movie.title);
    console.log('Trailer embed URL:', movie.trailerEmbed);

    const videoPlayer = document.getElementById('video-player');
    videoPlayer.innerHTML = `
        <iframe class="video-element" 
                src="${movie.trailerEmbed}" 
                allowfullscreen>
        </iframe>
    `;
}

function minimizeTrailer() {
    showPage('home');
    console.log('Trailer minimized');
}

function closeTrailer() {
    const videoPlayer = document.getElementById('video-player');
    const movie = movies[currentTrailerMovie];
    if (movie) {
        videoPlayer.innerHTML = `
            <div class="video-placeholder" id="video-placeholder">
                <button class="play-button">▶</button>
                <div style="font-size: 24px; margin-bottom: 8px;">${movie.title} 트레일러</div>
                <small style="font-size: 16px; opacity: 0.7;">클릭하여 트레일러 재생</small>
            </div>
        `;
    }
    showPage('home');
    console.log('Trailer closed');
}

// ===== PRODUCT FUNCTIONS =====
function showProductDetail(productId) {
    const product = products[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    console.log('Showing product detail:', product.name);

    currentProduct = productId;
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price-large').textContent = `${product.price} USD`;
    document.getElementById('product-description').textContent = product.description;
    
    const imageEl = document.getElementById('product-image-large');
    imageEl.innerHTML = `<div class="card-placeholder">${product.image}</div>`;
    
    document.getElementById('quantity').value = 1;
    showPage('product-detail');
}

function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value) + delta;
    quantity = Math.max(1, Math.min(10, quantity));
    quantityInput.value = quantity;
    console.log('Quantity changed to:', quantity);
}

function addToCart() {
    if (!currentProduct) {
        console.error('No current product selected');
        return;
    }
    
    const product = products[currentProduct];
    const quantity = parseInt(document.getElementById('quantity').value);
    
    console.log('Adding to cart:', product.name, 'x', quantity);
    
    const existingItem = cart.find(item => item.id === currentProduct);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        console.log('Updated existing cart item quantity:', existingItem.quantity);
    } else {
        cart.push({
            id: currentProduct,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
        console.log('Added new item to cart');
    }
    
    updateCartUI();
    alert(`${product.name} added to cart!`);
}

// ===== SHOPPING CART FUNCTIONS =====
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('active');
    updateCartUI();
    console.log('Cart modal toggled');
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const totalPrice = document.getElementById('total-price');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <div class="card-placeholder">${item.image}</div>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} USD</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', 1)">+</button>
                        <button onclick="removeFromCart('${item.id}')" style="margin-left: 12px; background: none; border: none; color: #ff0000; cursor: pointer;">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = `${total.toFixed(2)} USD`;
        cartTotal.style.display = 'block';
    }
    
    console.log('Cart UI updated. Total items:', totalItems);
}

function updateCartItemQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
        console.log('Updated cart item quantity:', productId, item.quantity);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    console.log('Removed from cart:', productId);
}

function checkout() {
    console.log('Checkout initiated with', cart.length, 'items');
    alert('Checkout functionality would be implemented here!');
}

function showCollection(collectionId) {
    console.log('Showing collection:', collectionId);
    showSection('shop');
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    // Slider navigation
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Slider dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // ESC key handlers
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const trailerPage = document.getElementById('trailer-page');
            if (trailerPage && trailerPage.classList.contains('active')) {
                closeTrailer();
            }
            
            const uploadArea = document.getElementById('logo-upload-area');
            if (uploadArea && uploadArea.classList.contains('active')) {
                closeLogoUpload();
            }
        }
    });
    
    // Cart modal click outside to close
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCart();
            }
        });
    }
    
    console.log('Event listeners setup complete');
}

// ===== SCROLL EFFECTS =====
function handleScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== SMOOTH SCROLLING =====
function handleSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== BUTTON INTERACTIONS =====
function handleButtonInteractions() {
    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent.includes('Play Trailer')) {
            button.addEventListener('click', function() {
                handleTrailerPlay(this);
            });
        }
        
        if (button.textContent.includes('Add to Wishlist')) {
            button.addEventListener('click', function() {
                handleWishlistAdd(this);
            });
        }
        
        if (button.textContent.includes('Pre-Order Now')) {
            button.addEventListener('click', function() {
                handlePreOrder(this);
            });
        }
    });
}

function handleTrailerPlay(button) {
    button.classList.add('loading');
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    
    setTimeout(() => {
        button.textContent = '▶ Playing...';
        button.style.background = '#28a745';
        button.style.borderColor = '#28a745';
        button.style.color = '#ffffff';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
            button.classList.remove('loading');
        }, 3000);
    }, 1000);
    
    trackEvent('trailer_play', {
        movie: getMovieTitle(button)
    });
}

function handleWishlistAdd(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Added!';
    button.style.background = '#28a745';
    button.style.borderColor = '#28a745';
    button.style.color = '#ffffff';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
    
    trackEvent('wishlist_add', {
        movie: getMovieTitle(button)
    });
}

function handlePreOrder(button) {
    const originalText = button.textContent;
    button.textContent = 'Added to Cart!';
    button.style.background = '#007bff';
    button.style.borderColor = '#007bff';
    button.style.color = '#ffffff';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
    
    trackEvent('preorder_click', {
        product: getProductName(button)
    });
}

// ===== MOBILE MENU =====
function handleMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            this.textContent = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-open');
                if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('mobile-open');
                if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
            }
        });
    }
}

// ===== ANIMATIONS =====
function handleAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section, .card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Subtle parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-slider');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }, { passive: true });
}

// ===== KEYBOARD NAVIGATION =====
function handleKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navMenu && navMenu.classList.contains('mobile-open')) {
                navMenu.classList.remove('mobile-open');
                if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
            }
        }
        
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== UTILITY FUNCTIONS =====
function getMovieTitle(button) {
    const movieCard = button.closest('.card, .slide');
    const titleElement = movieCard ? movieCard.querySelector('.movie-title, .slide-title') : null;
    return titleElement ? titleElement.textContent : 'Unknown';
}

function getProductName(button) {
    const productCard = button.closest('.card');
    const nameElement = productCard ? productCard.querySelector('.product-name') : null;
    return nameElement ? nameElement.textContent : 'Unknown';
}

// ===== ANALYTICS TRACKING =====
function trackEvent(eventName, properties = {}) {
    console.log(`Event: ${eventName}`, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, properties);
    
    // Example: Custom analytics
    // analytics.track(eventName, properties);
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    console.error('Error details:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== BROWSER COMPATIBILITY =====
function checkBrowserCompatibility() {
    const requiredFeatures = [
        'IntersectionObserver',
        'requestAnimationFrame',
        'addEventListener',
        'localStorage'
    ];
    
    const unsupportedFeatures = requiredFeatures.filter(feature => !(feature in window));
    
    if (unsupportedFeatures.length > 0) {
        console.warn('Unsupported features detected:', unsupportedFeatures);
    }
}

// ===== DEVELOPMENT HELPERS =====
if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') {
    console.log('LWEE FILM Website - Development Mode');
    
    window.LWEE_DEBUG = {
        trackEvent,
        getMovieTitle,
        getProductName,
        showTrailer,
        showMovieDetail,
        showProductDetail,
        toggleAdminMode
    };
}

// Run compatibility check
checkBrowserCompatibility();

// ===== INITIALIZATION LOG =====
console.log('LWEE FILM Website JavaScript Loaded');
console.log('Theme: Dark (#414040)');
console.log('Features: Logo Upload, Dark Theme, Responsive Design');
console.log('Products:', Object.keys(products).length);
console.log('Movies:', Object.keys(movies).length);
