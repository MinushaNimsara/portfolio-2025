// Enhanced Intersection Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Add stagger effect for children
            const children = entry.target.querySelectorAll('.stagger');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
                child.classList.add('active');
            });
        }
    });
}, observerOptions);
// Add to Intersection Observer
document.querySelectorAll('.timeline-item').forEach(element => {
    revealObserver.observe(element);
});
// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// Enhanced Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');

const navbarScrollEffect = () => {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrollPosition > heroHeight * 0.1) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', navbarScrollEffect);

// Enhanced Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    menuToggle.setAttribute('aria-expanded', isMenuOpen);
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Disable body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Add animation to nav links
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach((link, index) => {
        if (isMenuOpen) {
            link.style.transitionDelay = `${index * 0.1}s`;
            link.classList.add('fade-in');
        } else {
            link.style.transitionDelay = '0s';
            link.classList.remove('fade-in');
        }
    });
};

menuToggle.addEventListener('click', toggleMenu);

// Enhanced Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (isMenuOpen) toggleMenu();
        }
    });
});

const projects = [
    {
        title: "TechFix Inventory System",
        description: "Full-stack inventory management solution for computer shops with real-time tracking and analytics.",
        tech: ["PHP", "SQL Server", "Bootstrap", "jQuery"],
        image: "project1.jpg",
        link: "#"
    },
    {
        title: "Puppy's Food Mobile App",
        description: "Cross-platform app for dog owners to find and purchase pet food with personalized recommendations.",
        tech: ["Java", "Firebase", "Android Studio"],
        image: "project2.jpg",
        link: "#"
    },
    {
        title: "Safari Beyond Website",
        description: "Vehicle rental system for safari adventures with booking management.",
        tech: ["HTML5", "CSS3", "PHP", "MySQL"],
        image: "project3.jpg",
        link: "#"
    },
    {
        title: "Gallery Cafe Website",
        description: "Restaurant management system with menu and order tracking features.",
        tech: ["PHP", "MySQL", "JavaScript"],
        image: "project4.jpg",
        link: "#"
    }
];

// Enhanced Project Card Generation
const createProjectCard = (project) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    
    card.innerHTML = `
        <div class="project-content">
            <h3 class="project-title stagger">${project.title}</h3>
            <p class="project-description stagger">${project.description}</p>
            <div class="tech-stack stagger">
                ${project.tech.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
            </div>
            ${project.link ? `
                <a href="${project.link}" 
                   class="project-link stagger" 
                   aria-label="View ${project.title}">
                    View Project <span class="arrow">→</span>
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
};

// Render Projects
const projectGrid = document.querySelector('.project-grid');
if (projectGrid) {
    projects.forEach(project => {
        projectGrid.appendChild(createProjectCard(project));
    });
}

// Enhanced Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        // Disable form
        const formElements = contactForm.elements;
        for (let element of formElements) {
            // Form handling continuation...
        try {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            // Disable all form inputs
            Array.from(formElements).forEach(element => {
                element.disabled = true;
            });

            // Simulate API call (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            submitBtn.textContent = 'Message Sent ✓';
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button state after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
                Array.from(formElements).forEach(element => {
                    element.disabled = false;
                });
            }, 3000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Error state
            submitBtn.textContent = 'Error! Try Again';
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            
            // Reset button state after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('error');
                Array.from(formElements).forEach(element => {
                    element.disabled = false;
                });
            }, 3000);
        }
    });
}

// Enhanced Skill Cards Animation
const skills = [
    { name: "JavaScript", icon: "fa-js", level: "Advanced" },
    { name: "React", icon: "fa-react", level: "Advanced" },
    { name: "Node.js", icon: "fa-node", level: "Intermediate" },
    { name: "Python", icon: "fa-python", level: "Advanced" },
    { name: "HTML5", icon: "fa-html5", level: "Expert" },
    { name: "CSS3", icon: "fa-css3-alt", level: "Expert" },
    { name: "Git", icon: "fa-git-alt", level: "Advanced" },
    { name: "Database", icon: "fa-database", level: "Intermediate" }
];

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card reveal';
        skillCard.style.animationDelay = `${index * 0.1}s`;
        
        skillCard.innerHTML = `
            <i class="fab ${skill.icon} skill-icon"></i>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-level">${skill.level}</div>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// Enhanced Mouse Move Effect for Cards
const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
    `;
};

const resetCardTransform = (card) => {
    card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
    `;
};

// Apply card hover effects only on non-touch devices
if (!('ontouchstart' in window)) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
        card.addEventListener('mouseleave', () => resetCardTransform(card));
    });
}

// Scroll Progress Indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
};

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    createScrollIndicator();
    navbarScrollEffect();
    
    // Add copyright year
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML += `<p class="copyright">© ${new Date().getFullYear()} Minusha Nimsara. All rights reserved.</p>`;
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    // Clear previous timeout
    clearTimeout(resizeTimer);
    
    // Add class during resize
    document.body.classList.add('resize-animation-stopper');
    
    // Remove class after resize is complete
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});
// Enhanced Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(contactForm);

        try {
            // Update button state
            submitBtn.innerHTML = `
                <span class="btn-text">Sending...</span>
                <div class="loading-spinner"></div>
            `;
            submitBtn.disabled = true;

            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                submitBtn.innerHTML = `
                    <span class="btn-text">Message Sent ✓</span>
                    <i class="fas fa-check"></i>
                `;
                contactForm.reset();
                
                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = `
                <span class="btn-text">Error! Try Again</span>
                <i class="fas fa-exclamation-triangle"></i>
            `;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}
// Add image hover rotation
document.querySelectorAll('.profile-image').forEach(image => {
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        image.style.transform = `
            translateY(-5px)
            rotateX(${y * 10}deg)
            rotateY(${x * 10}deg)
        `;
    });
    
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});
// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Enhanced Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
let isMenuOpen = false;

const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Animate nav links
    navLinksItems.forEach((link, index) => {
        if (isMenuOpen) {
            link.style.transitionDelay = `${index * 0.1}s`;
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        } else {
            link.style.transitionDelay = '0s';
            link.style.opacity = '0';
            link.style.transform = 'translateX(30px)';
        }
    });
};

menuToggle.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        toggleMenu();
    }
});

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Add stagger effect for children
            const staggerItems = entry.target.querySelectorAll('.stagger');
            staggerItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.classList.add('active');
            });
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal, .fade-up').forEach(element => {
    revealObserver.observe(element);
});

// Smooth Scroll with Dynamic Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        if (isMenuOpen) toggleMenu();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('page-transition');
});

// Prevent animation during window resize
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});
document.addEventListener("DOMContentLoaded", function () {
    const percentElements = document.querySelectorAll('.skill-percent');
    const progressBars = document.querySelectorAll('.progress');

    const animateSkills = () => {
        percentElements.forEach((element, index) => {
            const targetPercent = parseInt(element.dataset.percent);
            const progressBar = progressBars[index];

            // Animate percentage counter
            let currentPercent = 0;
            const increment = targetPercent / 100; // Adjust for speed
            
            const updateCounter = () => {
                if (currentPercent < targetPercent) {
                    currentPercent += increment;
                    element.textContent = Math.ceil(currentPercent) + "%";
                    requestAnimationFrame(updateCounter);
                }
            };

            // Trigger CSS transition for progress bar
            progressBar.style.width = targetPercent + "%";
            
            // Start counter animation
            updateCounter();
        });
    };

    // Intersection Observer setup
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        observer.unobserve(skillsSection);
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(skillsSection);
    }
});

// Update copyright year automatically
document.querySelector('.copyright').textContent = 
    `© ${new Date().getFullYear()} Minusha Nimsara. All rights reserved.`;
