// Intersection Observer for Scroll Animations
const observeElements = document.querySelectorAll('.reveal');

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Apply only once!
        }
    });
}, observerOptions);

observeElements.forEach(el => observer.observe(el));


// Section-Based Dynamic Background Color Shift
const sections = document.querySelectorAll('section');
const body = document.body;

const sectionObserverOpts = {
    threshold: 0.25,
    rootMargin: "-10% 0px -10% 0px"
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
            body.setAttribute('data-active-section', entry.target.id);
        }
    });
}, sectionObserverOpts);

sections.forEach(sec => sectionObserver.observe(sec));


// Smooth Background Parallax
const bgParallax = document.getElementById('bg-parallax');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            if (bgParallax) {
                // Parallax moves slightly slower than scroll (0.2x speed limit to avoid tearing)
                bgParallax.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});


// Sticky Navbar Background
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
