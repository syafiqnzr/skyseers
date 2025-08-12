// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        localStorage.setItem('theme', theme);

        // Update toggle button icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }

        // Debug: Check if theme is applied
        console.log('Theme set to:', theme);
        console.log('Document theme attribute:', document.documentElement.getAttribute('data-theme'));
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle scroll for active nav links
        this.handleScrollNavigation();
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    handleScrollNavigation() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Animation on Scroll
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        // Add fade-in class to elements that should animate
        const animateElements = document.querySelectorAll('.activity-card, .product-card, .stat-item, .contact-item');
        animateElements.forEach(el => el.classList.add('fade-in'));

        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            this.showMessage('Sila isi semua medan yang diperlukan.', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Sila masukkan alamat email yang sah.', 'error');
            return;
        }

        // Simulate form submission (since no backend)
        this.showMessage('Terima kasih! Mesej anda telah dihantar. Kami akan menghubungi anda tidak lama lagi.', 'success');
        this.form.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            padding: 15px;
            margin-top: 15px;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
            ${type === 'success' 
                ? `background: #d4edda; color: #155724; border: 1px solid #c3e6cb;` 
                : `background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;`
            }
        `;

        this.form.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Product Purchase Handler
class ProductManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.product-btn').forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', (e) => this.handlePurchase(e));
            }
        });
    }

    handlePurchase(e) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Simulate purchase process (since no backend)
        alert(`Terima kasih atas minat anda terhadap ${productName}! Sila hubungi kami melalui WhatsApp atau media sosial untuk membuat pesanan.`);
    }
}

// Navbar Background on Scroll
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.style.background = `${getComputedStyle(document.documentElement).getPropertyValue('--bg-primary')}ee`;
            } else {
                this.navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
            }
        });
    }
}

// Activity Modal Manager
class ActivityModalManager {
    constructor() {
        console.log('ActivityModalManager constructor called');

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        console.log('ActivityModalManager initializing...');

        this.modal = document.getElementById('activityModal');
        this.modalClose = document.getElementById('modalClose');
        this.imageSlider = document.getElementById('imageSlider');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.sliderDots = document.getElementById('sliderDots');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalDetails = document.getElementById('modalDetails');

        this.currentImageIndex = 0;
        this.activityData = this.getActivityData();

        console.log('ActivityModalManager initialized');
        console.log('Modal element:', this.modal);
        console.log('Activity data:', this.activityData);

        if (!this.modal) {
            console.error('Modal element not found!');
            return;
        }

        this.init();
    }

    init() {
        // Check if modal elements exist
        if (!this.modal) {
            console.error('Modal element not found!');
            return;
        }

        // Test modal functionality first
        console.log('Testing modal...');

        // Add click listeners to activity cards
        const activityCards = document.querySelectorAll('.activity-card');
        console.log('Found activity cards:', activityCards.length);

        if (activityCards.length === 0) {
            console.error('No activity cards found!');
            return;
        }

        activityCards.forEach((card, index) => {
            const title = card.querySelector('.activity-title');
            if (title) {
                const activityType = title.getAttribute('data-activity');
                console.log(`Adding click listener to card ${index + 1}:`, activityType);

                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Activity card clicked:', activityType);
                    this.openModal(activityType);
                });
            }
        });

        // Modal close events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Slider navigation
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }

    getActivityData() {
        return {
            moon: {
                title: 'Program Cerapan Bulan',
                location: 'Observatori Langkawi',
                description: 'Program komprehensif untuk mempelajari bulan dan fenomena berkaitan. Kami menggunakan teleskop berkualiti tinggi untuk memberikan pengalaman cerapan yang terbaik. Program ini sesuai untuk semua peringkat umur dan tidak memerlukan pengalaman sebelumnya.',
                images: [
                    'images/moon-observation.png',
                    'images/moon-observation-2.png',
                    'images/moon-observation-3.png',
                    'images/moon-observation-4.png',
                    'images/moon-observation-5.png'
                ],
                details: [
                    { icon: 'fas fa-calendar', text: 'Setiap Bulan - Bergantung kepada fasa bulan' },
                    { icon: 'fas fa-clock', text: '8:00 PM - 11:00 PM' },
                    { icon: 'fas fa-users', text: 'Maksimum 20 peserta setiap sesi' },
                    { icon: 'fas fa-map-marker-alt', text: 'Lokasi akan dimaklumkan kemudian' },
                    { icon: 'fas fa-money-bill', text: 'RM 25 per peserta' }
                ]
            },
            solar: {
                title: 'Program Cerapan Matahari',
                location: 'Pusat Sains Negara',
                description: 'Program khusus untuk memerhatikan matahari dengan selamat menggunakan peralatan yang sesuai. Pelajari tentang bintik matahari, solar flare, dan aktiviti matahari yang menarik. Keselamatan adalah keutamaan kami.',
                images: [
                    'images/solar-observation.png',
                    'images/solar-observation-2.png',
                    'images/solar-observation-3.png',
                    'images/solar-observation-4.png',
                    'images/solar-observation-5.png'
                ],
                details: [
                    { icon: 'fas fa-calendar', text: 'Setiap Minggu - Bergantung kepada cuaca' },
                    { icon: 'fas fa-clock', text: '7:00 AM - 10:00 AM' },
                    { icon: 'fas fa-users', text: 'Maksimum 15 peserta setiap sesi' },
                    { icon: 'fas fa-shield-alt', text: 'Peralatan keselamatan disediakan' },
                    { icon: 'fas fa-money-bill', text: 'RM 30 per peserta' }
                ]
            },
            workshop: {
                title: 'Workshop Ilmu Falak',
                location: 'Planetarium Negara',
                description: 'Workshop komprehensif yang merangkumi asas-asas ilmu falak, penggunaan teleskop, teknik-teknik cerapan, dan pengetahuan astronomi am. Sesuai untuk pemula mahupun yang sudah berpengalaman.',
                images: [
                    'images/astronomy-workshop.png',
                    'images/astronomy-workshop-2.png',
                    'images/astronomy-workshop-3.png',
                    'images/astronomy-workshop-4.png',
                    'images/astronomy-workshop-5.png'
                ],
                details: [
                    { icon: 'fas fa-calendar', text: 'Dua Minggu Sekali - Hujung minggu' },
                    { icon: 'fas fa-clock', text: '2:00 PM - 6:00 PM' },
                    { icon: 'fas fa-users', text: 'Maksimum 25 peserta setiap sesi' },
                    { icon: 'fas fa-certificate', text: 'Sijil penyertaan disediakan' },
                    { icon: 'fas fa-money-bill', text: 'RM 50 per peserta' }
                ]
            }
        };
    }

    openModal(activityType) {
        console.log('=== OPENING MODAL ===');
        console.log('Activity type:', activityType);
        console.log('Modal element:', this.modal);
        console.log('Activity data available:', Object.keys(this.activityData));

        const data = this.activityData[activityType];
        if (!data) {
            console.error('No data found for activity type:', activityType);
            console.log('Available activity types:', Object.keys(this.activityData));
            return;
        }

        console.log('Activity data found:', data);

        // Set modal content with Instagram-style header
        this.updateModalContent(data);

        // Load images
        this.loadImages(data.images);

        // Load details
        this.loadDetails(data.details);

        // Show modal with proper display
        console.log('Setting modal display to flex...');
        this.modal.style.display = 'flex';
        console.log('Modal display style:', this.modal.style.display);

        setTimeout(() => {
            console.log('Adding active class to modal...');
            this.modal.classList.add('active');
            console.log('Modal classes:', this.modal.classList.toString());
        }, 10);
        document.body.style.overflow = 'hidden';
        console.log('Modal opened successfully');
    }

    closeModal() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
        this.currentImageIndex = 0;
    }

    loadImages(images) {
        this.imageSlider.innerHTML = '';
        this.sliderDots.innerHTML = '';

        images.forEach((imageSrc, index) => {
            // Create image element
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Activity Image ${index + 1}`;
            img.className = `modal-image ${index === 0 ? 'active' : ''}`;
            img.onerror = () => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdhbWJhciBha2FuIGRpbXVhdGthbiBkaSBzaW5pPC90ZXh0Pjwvc3ZnPg==';
            };
            this.imageSlider.appendChild(img);

            // Create dot
            const dot = document.createElement('div');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToImage(index));
            this.sliderDots.appendChild(dot);
        });
    }

    updateModalContent(data) {
        // Create Instagram-style modal content
        const modalInfo = document.querySelector('.modal-info');
        modalInfo.innerHTML = `
            <div class="modal-header">
                <div class="modal-header-avatar">
                    ${data.title.charAt(0).toUpperCase()}
                </div>
                <div class="modal-header-info">
                    <h3>${data.title}</h3>
                    <p>Aktiviti • ${data.location || 'Lokasi tidak dinyatakan'}</p>
                </div>
            </div>
            <div class="modal-content-area">
                <h2 class="modal-title">${data.title}</h2>
                <div class="modal-description">${data.description}</div>
                <div class="modal-details" id="modalDetails"></div>
            </div>
        `;

        // Update references
        this.modalDetails = document.getElementById('modalDetails');
        this.loadDetails(data.details);
    }

    loadDetails(details) {
        this.modalDetails.innerHTML = '';

        details.forEach(detail => {
            const detailItem = document.createElement('div');
            detailItem.className = 'modal-detail-item';
            detailItem.innerHTML = `
                <i class="${detail.icon}"></i>
                <span>${detail.text}</span>
            `;
            this.modalDetails.appendChild(detailItem);
        });
    }

    goToImage(index) {
        const images = this.imageSlider.querySelectorAll('.modal-image');
        const dots = this.sliderDots.querySelectorAll('.slider-dot');

        // Remove active class from all
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        images[index].classList.add('active');
        dots[index].classList.add('active');

        this.currentImageIndex = index;
    }

    nextImage() {
        const totalImages = this.imageSlider.querySelectorAll('.modal-image').length;
        const nextIndex = (this.currentImageIndex + 1) % totalImages;
        this.goToImage(nextIndex);
    }

    prevImage() {
        const totalImages = this.imageSlider.querySelectorAll('.modal-image').length;
        const prevIndex = (this.currentImageIndex - 1 + totalImages) % totalImages;
        this.goToImage(prevIndex);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new SmoothScroller();
    new ScrollAnimations();
    new ContactForm();
    new ProductManager();
    new NavbarScroll();
    new BackToTopManager();
    new ActivityModalManager();
    new TypewriterEffect();

    // Add loading animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Utility function for smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add scroll event listener for animations
window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on load
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Back to Top Button Functionality
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Back to Top Button based on scroll position
class BackToTopManager {
    constructor() {
        this.backToTopBtn = document.getElementById('back-to-top');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.toggleBackToTop());
    }

    toggleBackToTop() {
        if (window.pageYOffset > 300) {
            this.backToTopBtn.style.display = 'flex';
        } else {
            this.backToTopBtn.style.display = 'none';
        }
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor() {
        this.textElement = document.getElementById('typewriter-text');
        this.phrases = ["Selamat Datang ke SKYSEERS", "Journeying Through Universe", "Inspiring Generations"];
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.typingSpeed = 100;
        this.pauseBetweenPhrases = 2000;
        this.init();
    }

    init() {
        if (!this.textElement) {
            console.error('Typewriter element not found');
            return;
        }

        console.log('TypewriterEffect initialized');

        // Clear existing content
        this.textElement.innerHTML = '';

        // Start typewriter effect after page load
        setTimeout(() => {
            this.typeWriter();
        }, 1000);
    }

    typeWriter() {
        if (this.charIndex < this.phrases[this.phraseIndex].length) {
            const currentChar = this.phrases[this.phraseIndex].charAt(this.charIndex);
            const currentText = this.textElement.textContent + currentChar;

            // Handle SKYSEERS highlighting
            if (currentText.includes('SKYSEERS')) {
                const beforeSky = currentText.substring(0, currentText.indexOf('SKYSEERS'));
                const skyPart = currentText.substring(currentText.indexOf('SKYSEERS'));
                this.textElement.innerHTML = beforeSky + '<span class="highlight">' + skyPart + '</span>';
            } else {
                this.textElement.textContent = currentText;
            }

            this.charIndex++;
            setTimeout(() => this.typeWriter(), this.typingSpeed);
        } else {
            // Phrase finished, prepare for next or loop
            setTimeout(() => {
                this.charIndex = 0;
                this.textElement.textContent = ''; // Clear for next phrase
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length; // Cycle through phrases
                this.typeWriter(); // Start typing the next phrase
            }, this.pauseBetweenPhrases);
        }
    }
}

// Test function for modal
function testModal() {
    const modal = document.getElementById('activityModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Test modal opened');
    } else {
        console.error('Modal not found');
    }
}
