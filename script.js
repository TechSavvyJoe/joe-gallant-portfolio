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
    }
});

// Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');
    const iconMobile = themeToggleMobile.querySelector('i');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            iconMobile.classList.remove('fa-moon');
            iconMobile.classList.add('fa-sun');
        }
    }

    function switchTheme() {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            iconMobile.classList.remove('fa-sun');
            iconMobile.classList.add('fa-moon');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            iconMobile.classList.remove('fa-moon');
            iconMobile.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', switchTheme);
    themeToggleMobile.addEventListener('click', switchTheme);

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
});
