const scrollAmount = 300;

const setupScroll = (containerId, leftArrowId, rightArrowId) => {
	const container = document.getElementById(containerId);
	const leftArrow = document.getElementById(leftArrowId);
	const rightArrow = document.getElementById(rightArrowId);
	const scrollProgress = container.closest('.grid-scroll-container').querySelector('.scroll-progress');

	// Function to update scroll progress indicator
	const updateScrollProgress = () => {
		const maxScroll = container.scrollWidth - container.clientWidth;
		const progress = (container.scrollLeft / maxScroll) * 100;
		scrollProgress.style.setProperty('--scroll-percent', `${progress}%`);
		
		// Show/hide arrows based on scroll position
		leftArrow.style.opacity = container.scrollLeft <= 0 ? '0.5' : '1';
		rightArrow.style.opacity = container.scrollLeft >= maxScroll ? '0.5' : '1';
	};

	// Add click handlers for arrows
	rightArrow.addEventListener('click', () => {
		container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	});

	leftArrow.addEventListener('click', () => {
		container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	});

	// Track scroll progress
	container.addEventListener('scroll', updateScrollProgress);

	// Initial update
	updateScrollProgress();

	// Add touch scrolling
	let isDown = false;
	let startX;
	let scrollLeft;

	container.addEventListener('mousedown', (e) => {
		isDown = true;
		container.style.cursor = 'grabbing';
		startX = e.pageX - container.offsetLeft;
		scrollLeft = container.scrollLeft;
	});

	container.addEventListener('mouseleave', () => {
		isDown = false;
		container.style.cursor = 'grab';
	});

	container.addEventListener('mouseup', () => {
		isDown = false;
		container.style.cursor = 'grab';
	});

	container.addEventListener('mousemove', (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - container.offsetLeft;
		const walk = (x - startX) * 2;
		container.scrollLeft = scrollLeft - walk;
	});

	// Add grab cursor
	container.style.cursor = 'grab';
};

setupScroll('cardContainer', 'leftArrow', 'rightArrow');
setupScroll('cardContainer-tools', 'leftArrow-tools', 'rightArrow-tools');


document.getElementById('menu-btn').addEventListener('click', function () {
	const menu = document.getElementById('mobile-menu');
	menu.classList.toggle('hidden');
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer for progress bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Navbar scroll handler
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animations to sections
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Add progress bar animations
    document.querySelectorAll('.progress-bar').forEach(bar => {
        progressObserver.observe(bar);
    });

    // Initialize navbar scroll
    window.addEventListener('scroll', handleNavbarScroll);

    // Add entrance animations to hero section
    const heroElements = document.querySelectorAll('.hero-animate');
    heroElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Initialize project filters if they exist
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                    setTimeout(() => project.classList.add('visible'), 100);
                } else {
                    project.classList.remove('visible');
                    setTimeout(() => project.style.display = 'none', 300);
                }
            });
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
            }
        });
    });

    // Contact form animation
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('[type="submit"]');
            submitBtn.classList.add('btn-loading');
            
            // Simulate form submission (replace with actual form submission)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            submitBtn.classList.remove('btn-loading');
            // Add success message handling here
        });
    }

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    function initHeroAnimation() {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        
        tl.from(".hero-title", {
            y: 100,
            opacity: 0,
            duration: 1.5
        })
        .from(".hero-subtitle", {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=1")
        .from(".hero-cta", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        }, "-=0.8")
        .from(".hero-image", {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            rotate: -10
        }, "-=1");
    }

    // Skill Cards Animation
    function initSkillsAnimation() {
        gsap.from(".skill-card", {
            scrollTrigger: {
                trigger: ".skills-section",
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });
    }

    // Initialize Particles.js
    function initParticles() {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#4158D0", "#C850C0", "#FFCC70"]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: ["grab", "bubble"]
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 4,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Project Cards Tilt Effect
    function initTiltEffect() {
        const cards = document.querySelectorAll('.modern-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // Navbar Scroll Effect
    function initNavbarEffect() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Typewriter Effect for About Section
    const typewriterTexts = document.querySelectorAll('.typewriter-text');
    
    const startTypewriter = (element) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    };
    
    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypewriter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    typewriterTexts.forEach(text => observer.observe(text));
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'growBar 1.5s ease forwards';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));

    initHeroAnimation();
    initSkillsAnimation();
    initParticles();
    initTiltEffect();
    initNavbarEffect();
});

// Typewriter Animation for About Section
document.addEventListener('DOMContentLoaded', function() {
    const typewriterTexts = document.querySelectorAll('.typewriter-text');
    
    function animateTypewriter(element, delay) {
        setTimeout(() => {
            element.style.animation = 'fadeInUp 0.5s ease forwards';
        }, delay);
    }

    typewriterTexts.forEach((text, index) => {
        animateTypewriter(text, index * 500); // 500ms delay between each line
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('mobile-menu-open');
    menuBtn.classList.toggle('mobile-menu-open');
});

// Active Link Indicator
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);
window.addEventListener('load', highlightNavLink);

// Skills and Tools Scroll Controls
document.addEventListener('DOMContentLoaded', function() {
    // Skills Section Scroll
    const skillsContainer = document.getElementById('cardContainer');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');

    if (skillsContainer && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            skillsContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            skillsContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });

        // Update arrows visibility
        const updateSkillsArrows = () => {
            leftArrow.style.opacity = skillsContainer.scrollLeft <= 0 ? '0.5' : '1';
            rightArrow.style.opacity = 
                Math.ceil(skillsContainer.scrollLeft + skillsContainer.clientWidth) >= skillsContainer.scrollWidth 
                ? '0.5' 
                : '1';
        };

        skillsContainer.addEventListener('scroll', updateSkillsArrows);
        window.addEventListener('resize', updateSkillsArrows);
        updateSkillsArrows();
    }

    // Tools Section Scroll
    const toolsContainer = document.getElementById('cardContainer-tools');
    const toolsLeftArrow = document.getElementById('leftArrow-tools');
    const toolsRightArrow = document.getElementById('rightArrow-tools');

    if (toolsContainer && toolsLeftArrow && toolsRightArrow) {
        toolsLeftArrow.addEventListener('click', () => {
            toolsContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        toolsRightArrow.addEventListener('click', () => {
            toolsContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });

        // Update arrows visibility
        const updateToolsArrows = () => {
            toolsLeftArrow.style.opacity = toolsContainer.scrollLeft <= 0 ? '0.5' : '1';
            toolsRightArrow.style.opacity = 
                Math.ceil(toolsContainer.scrollLeft + toolsContainer.clientWidth) >= toolsContainer.scrollWidth 
                ? '0.5' 
                : '1';
        };

        toolsContainer.addEventListener('scroll', updateToolsArrows);
        window.addEventListener('resize', updateToolsArrows);
        updateToolsArrows();
    }
});