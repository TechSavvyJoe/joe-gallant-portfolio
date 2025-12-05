// Scroll Reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Skills Tab System
function openTab(evt, tabName) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.skill-tab').forEach(tab => {
        tab.classList.remove('active-tab');
    });

    // Show selected tab pane
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked tab
    evt.currentTarget.classList.add('active-tab');
}

// Initialize first tab
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Strategy').classList.add('active');
    document.querySelector('.skill-tab').classList.add('active-tab');
});

// Modal System
function openModal(modalID) {
    const modal = document.getElementById(modalID);
    const overlay = document.getElementById('modal-overlay');

    overlay.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal-wrapper');
    const overlay = document.getElementById('modal-overlay');

    overlay.classList.remove('active');
    modals.forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = '';
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
        closeMobileMenu();
    }
});

// Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const isOpen = menu.classList.contains('mobile-menu-open');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        menu.classList.remove('mobile-menu-closed');
        menu.classList.add('mobile-menu-open');
        menuBtn.classList.add('hamburger-open');
        menuBtn.setAttribute('aria-expanded', 'true');
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (menu && menuBtn) {
        menu.classList.remove('mobile-menu-open');
        menu.classList.add('mobile-menu-closed');
        menuBtn.classList.remove('hamburger-open');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (menu && menuBtn && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            closeMobileMenu();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Spy - Active Nav Highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset for fixed nav
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
        updateActiveNav();
    });
});

// Initial call
updateActiveNav();



// Process Section Animation
const processSection = document.querySelector('.process-container');
if (processSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                processSection.classList.add('active');
            }
        });
    }, { threshold: 0.2 });
    observer.observe(processSection);
}

// Hero Parallax Effect
const heroVisual = document.getElementById('hero-visual');
const heroContainer = document.querySelector('.hero-3d-container');

if (heroVisual && heroContainer) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        heroContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        heroContainer.style.transform = 'rotateX(0) rotateY(0)';
    });
}

// Animated Counters
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counters when in view
const impactSection = document.getElementById('impact');
if (impactSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(impactSection);
}

