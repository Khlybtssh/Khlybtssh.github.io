// Main Logic script

document.addEventListener('DOMContentLoaded', () => {

    // 1. Render Projects
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && typeof projectsData !== 'undefined') {
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass-card';
            card.setAttribute('data-id', project.id);

            const tagsHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="project-header">
                    <h3>${project.title}</h3>
                </div>
                <div class="tech-stack">
                    ${tagsHTML}
                </div>
                <p class="project-desc-short">${project.description.substring(0, 120)}...</p>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="project-link" onclick="event.stopPropagation()">
                        <i class="bi bi-github"></i> Code
                    </a>
                </div>
            `;

            card.addEventListener('click', () => openModal(project));
            projectsContainer.appendChild(card);
        });
    }

    // 2. Render Skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && typeof skillsData !== 'undefined') {
        skillsData.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'skill-category-card glass-card';

            const skillsHTML = cat.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('');

            card.innerHTML = `
                <h3>${cat.category}</h3>
                <div class="skills-list">${skillsHTML}</div>
            `;
            skillsContainer.appendChild(card);
        });
    }

    // 3. Render Experience
    const experienceContainer = document.getElementById('experience-container');
    if (experienceContainer && typeof experienceData !== 'undefined') {
        experienceData.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'timeline-item glass-card';

            const responsibilitiesHTML = exp.responsibilities.map(r => `<li>${r}</li>`).join('');
            const softSkillsHTML = exp.softSkills.map(s => `<span class="tech-tag">${s}</span>`).join('');

            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="exp-header">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                        <h3 class="exp-role">${exp.role}</h3>
                        <span class="date-badge">${exp.date}</span>
                    </div>
                    <p class="exp-company">${exp.company} - ${exp.location}</p>
                </div>
                <p class="exp-desc">${exp.description}</p>
                <ul class="exp-responsibilities">
                    ${responsibilitiesHTML}
                </ul>
                <div style="margin-top: 1rem; border-top: 1px solid var(--glass-border); padding-top: 1rem;">
                    <strong>Transferable Skills:</strong>
                    <div class="tech-stack" style="margin-top: 0.5rem; margin-bottom:0;">
                        ${softSkillsHTML}
                    </div>
                </div>
            `;
            experienceContainer.appendChild(item);
        });
    }

    // 4. Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    function openModal(project) {
        const tagsHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

        modalBody.innerHTML = `
            <h2 style="margin-bottom: 1rem; color: var(--accent-blue);">${project.title}</h2>
            <div class="tech-stack">${tagsHTML}</div>
            <p style="margin-bottom: 2rem; color: var(--text-secondary); line-height: 1.8;">${project.description}</p>
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="btn btn-primary">
                    <i class="bi bi-github"></i> View Repository
                </a>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 5. Intersection Observer for Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // trigger hero reveal immediately
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) hero.classList.add('active');
    }, 100);

    // 6. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 7. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('bi-moon-stars');
            icon.classList.add('bi-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon-stars');
            localStorage.setItem('theme', 'dark');
        }
    });
});
