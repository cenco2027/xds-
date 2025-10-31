// ========================================
// VIDEO BACKGROUND (SIMPLE AUTO LOOP)
// ========================================
// Video is set to autoplay, muted, and loop in HTML
// No controls needed - just automatic looping
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    
    if (video) {
        // Ensure video plays (some browsers need user interaction)
        video.play().catch(e => {
            console.log('Video autoplay blocked by browser, will play on user interaction');
            // Fallback to showing image if video fails
            const fallback = document.querySelector('.hero-bg-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
        
        // Pause video when tab is hidden to save resources
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                video.pause();
            } else {
                video.play();
            }
        });
    }
});

// ========================================
// MOBILE HAMBURGER MENU FUNCTIONALITY
// ========================================
const hamburgerMenu = document.getElementById('hamburgerMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMenu = document.getElementById('closeMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (hamburgerMenu && mobileMenuOverlay && closeMenu) {
    // Open mobile menu
    hamburgerMenu.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    closeMenu.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            // Close menu
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Scroll to target
            if (target && target.startsWith('#')) {
                const targetElement = document.querySelector(target);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });

    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ========================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all content sections
const sections = document.querySelectorAll('.content-section, .text-section, .welcome-section');
sections.forEach(section => {
    observer.observe(section);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// NEWSLETTER MODAL (LIGHT THEME)
// ========================================
const newsletterModal = document.getElementById('newsletterModal');
const footerSignupBtn = document.getElementById('footerSignupBtn');
const closeNewsletterModal = document.getElementById('closeNewsletterModal');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

// Open newsletter modal when footer signup button is clicked
if (footerSignupBtn && newsletterModal) {
    footerSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newsletterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close newsletter modal
if (closeNewsletterModal && newsletterModal) {
    closeNewsletterModal.addEventListener('click', () => {
        newsletterModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (newsletterForm) newsletterForm.reset();
            if (newsletterSuccess) newsletterSuccess.style.display = 'none';
            if (newsletterForm) newsletterForm.style.display = 'flex';
        }, 300);
    });
}

// Close when clicking outside
if (newsletterModal) {
    newsletterModal.addEventListener('click', (e) => {
        if (e.target === newsletterModal) {
            newsletterModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                if (newsletterForm) newsletterForm.reset();
                if (newsletterSuccess) newsletterSuccess.style.display = 'none';
                if (newsletterForm) newsletterForm.style.display = 'flex';
            }, 300);
        }
    });
}

// Handle newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        console.log('Newsletter signup:', email);
        
        newsletterForm.style.display = 'none';
        newsletterSuccess.style.display = 'block';
        
        setTimeout(() => {
            newsletterModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                newsletterForm.reset();
                newsletterSuccess.style.display = 'none';
                newsletterForm.style.display = 'flex';
            }, 300);
        }, 3000);
    });
}

// ========================================
// CONTACT US MODAL (DARK THEME)
// ========================================
const contactModal = document.getElementById('contactModal');
const contactNavLink = document.getElementById('contactNavLink');
const contactMobileLink = document.getElementById('contactMobileLink');
const closeContactModal = document.getElementById('closeContactModal');
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

// Open contact modal when clicking nav links
if (contactNavLink && contactModal) {
    contactNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (contactMobileLink && contactModal) {
    contactMobileLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Close mobile menu first
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
        }
        // Open contact modal
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close contact modal
if (closeContactModal && contactModal) {
    closeContactModal.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (contactForm) contactForm.reset();
            if (contactSuccess) contactSuccess.style.display = 'none';
            if (contactForm) contactForm.style.display = 'flex';
        }, 300);
    });
}

// Close when clicking outside
if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                if (contactForm) contactForm.reset();
                if (contactSuccess) contactSuccess.style.display = 'none';
                if (contactForm) contactForm.style.display = 'flex';
            }, 300);
        }
    });
}

// ========================================
// POPULATE COUNTRIES DROPDOWN
// ========================================
const countries = [
    "United States", "China", "Canada", "United Kingdom", "Australia",
    "Germany", "France", "Japan", "South Korea", "Italy",
    "Spain", "Mexico", "Brazil", "India", "Singapore",
    "Hong Kong", "Taiwan", "Netherlands", "Switzerland", "Sweden",
    "Norway", "Denmark", "Finland", "Belgium", "Austria",
    "Poland", "Ireland", "New Zealand", "Thailand", "Vietnam",
    "Indonesia", "Philippines", "Malaysia", "Portugal", "Greece",
    "Turkey", "Russia", "Ukraine", "Czech Republic", "Hungary",
    "Romania", "Argentina", "Chile", "Colombia", "Peru",
    "South Africa", "Egypt", "Israel", "United Arab Emirates", "Saudi Arabia",
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Armenia", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
    "Barbados", "Belarus", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde",
    "Central African Republic", "Chad", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Ethiopia", "Fiji", "Gabon", "Gambia",
    "Georgia", "Ghana", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Iceland",
    "Iran", "Iraq", "Ivory Coast", "Jamaica", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "North Korea", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Macedonia", "Madagascar", "Malawi", "Maldives", "Mali",
    "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Nicaragua", "Niger", "Nigeria", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
    "Qatar", "Rwanda", "Samoa", "San Marino", "Sao Tome and Principe",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Slovakia",
    "Slovenia", "Solomon Islands", "Somalia", "South Sudan", "Sri Lanka",
    "Sudan", "Suriname", "Swaziland", "Syria", "Tajikistan",
    "Tanzania", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkmenistan", "Tuvalu", "Uganda", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Yemen", "Zambia", "Zimbabwe"
];

// Auto-populate country dropdown
document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('countrySelect');
    if (countrySelect) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }
});

// Handle contact form submission (Typeform integration)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Note: Form will submit to Typeform via the action attribute
        // We can also capture the data here if needed
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            reason: formData.get('reason'),
            country: formData.get('country'),
            message: formData.get('message')
        };
        console.log('Contact form submitted:', data);
        
        // Form will submit to Typeform automatically via target="_blank"
        // Show success message locally
        setTimeout(() => {
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
            
            setTimeout(() => {
                contactModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    contactForm.reset();
                    contactSuccess.style.display = 'none';
                    contactForm.style.display = 'flex';
                }, 300);
            }, 2000);
        }, 500);
    });
}

// ========================================
// PARALLAX EFFECT FOR HERO SECTION
// ========================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            const heroBg = document.querySelector('.hero-bg');
            const windowWidth = window.innerWidth;
            
            if (heroSection && heroBg) {
                // Different parallax speeds for different screen sizes
                if (windowWidth < 768) {
                    // Mobile: gentle parallax with preserved centering
                    if (scrolled < 500) {
                        heroBg.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
                    }
                } else if (windowWidth < 1024) {
                    // Tablet: medium parallax
                    if (scrolled < 742) {
                        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                } else {
                    // Desktop: stronger parallax
                    if (scrolled < 800) {
                        heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
                    }
                }
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ========================================
// TOUCH FEEDBACK FOR MOBILE CARDS
// ========================================
function setupTouchFeedback() {
    if (window.innerWidth < 768) {
        document.querySelectorAll('.card-container').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }
}

// Setup on load and don't re-run since CSS handles it
setupTouchFeedback();

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// HANDLE ORIENTATION CHANGE (MOBILE)
// ========================================
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, window.pageYOffset);
    }, 100);
});

// ========================================
// ACTIVE NAVIGATION LINK BASED ON SCROLL
// ========================================
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            if (id) {
                current = id;
            }
        }
    });
    
    // Update desktop nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav links
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// RESPONSIVE IMAGE HANDLING & RESIZE LOGIC
// ========================================
function updateResponsiveImages() {
    const windowWidth = window.innerWidth;
    const heroBg = document.querySelector('.hero-bg');
    
    // Reset parallax transform on resize
    if (heroBg) {
        if (windowWidth < 768) {
            heroBg.style.transform = 'translateX(-50%)';
        } else {
            heroBg.style.transform = 'translateY(0)';
        }
    }
    
    // Log for debugging
    console.log(`Viewport resized to: ${windowWidth}px`);
    if (windowWidth < 768) {
        console.log('Breakpoint: Mobile');
    } else if (windowWidth < 1024) {
        console.log('Breakpoint: Tablet');
    } else {
        console.log('Breakpoint: Desktop');
    }
}

// Update on resize with debounce
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateResponsiveImages();
    }, 250);
});

// ========================================
// CONSOLE LOG FOR DEBUGGING
// ========================================
console.log('XDS Responsive Website Loaded Successfully!');
console.log(`Initial viewport: ${window.innerWidth}px x ${window.innerHeight}px`);

// Log breakpoint information
if (window.innerWidth < 768) {
    console.log('Device: Mobile');
} else if (window.innerWidth < 1024) {
    console.log('Device: Tablet');
} else {
    console.log('Device: Desktop');
}

