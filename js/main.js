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
