// High-Performance Staggered Intersection Observer for Scroll Animations
const observeElements = document.querySelectorAll('.reveal');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    let delay = 0;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stagger animation if multiple elements enter at once
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay);
            delay += 100; // 100ms stagger between elements
            observer.unobserve(entry.target); // Apply only once!
        }
    });
}, observerOptions);

observeElements.forEach(el => observer.observe(el));


// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light');
        const icon = themeToggleBtn.querySelector('i');
        
        if (body.classList.contains('light')) {
            icon.classList.replace('bi-sun', 'bi-moon-stars');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('bi-moon-stars', 'bi-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // On Load: Check saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light');
        themeToggleBtn.querySelector('i').classList.replace('bi-sun', 'bi-moon-stars');
    }
}
// --------------------------


// Intersection Observer for Sticky Navbar (Replaces Scroll Listener)
const navSentinel = document.getElementById('nav-sentinel');
const navbar = document.getElementById('navbar');

const navObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { threshold: 0 });

if (navSentinel) {
    navObserver.observe(navSentinel);
}

// Cinematic Parallax Background
const bgParallax = document.getElementById('bg-parallax');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking && bgParallax) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            bgParallax.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// --- Interactive Skills Filtering ---
const filterTabs = document.querySelectorAll('.tab-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const target = tab.getAttribute('data-target');

        skillCards.forEach(card => {
            // Remove animation classes to restart animation
            card.classList.remove('fade-in');
            
            // Check if card matches target category
            if (target === 'all' || card.getAttribute('data-category') === target) {
                card.classList.remove('hidden');
                // Trigger reflow to restart animation
                void card.offsetWidth;
                card.classList.add('fade-in');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
