// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Audio functionality
    const audioToggle = document.getElementById('audioToggle');
    const audioElement = document.getElementById('synthwaveAudio');
    const audioText = document.querySelector('.audio-text');
    let audioEnabled = false;

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');

    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    const vaporNav = document.querySelector('.vapor-nav');

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');

    // Terminal animation
    const terminalCursor = document.querySelector('.terminal-cursor');

    // Initialize functions
    initAudio();
    initThemeToggle();
    initMenuToggle();
    initSkillBars();
    initTerminal();
    initSmoothScroll();
    initContactForm();
    initAnimations();

    

    // Mobile menu toggle
    function initMenuToggle() {
        menuToggle.addEventListener('click', function() {
            vaporNav.classList.toggle('active');
            
            // Animate menu bars
            const bars = document.querySelectorAll('.menu-bar');
            if (vaporNav.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                vaporNav.classList.remove('active');
                const bars = document.querySelectorAll('.menu-bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // Animate skill bars on scroll
    function initSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const skillLevel = bar.getAttribute('data-skill');
                        setTimeout(() => {
                            bar.style.width = skillLevel + '%';
                        }, 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelector('.skills-section').addEventListener('mouseenter', () => {
            skillBars.forEach(bar => {
                const skillLevel = bar.getAttribute('data-skill');
                bar.style.width = skillLevel + '%';
            });
        });

        observer.observe(document.querySelector('.skills-section'));
    }

    // Terminal animation
    function initTerminal() {
        // Blinking cursor
        setInterval(() => {
            if (terminalCursor) {
                terminalCursor.style.opacity = terminalCursor.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
    }

    // Smooth scrolling for navigation links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.vapor-header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Contact form handling
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                // Simulate form submission
                showNotification('Message sent! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Add some visual feedback
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> SENT!';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
        }
    }

    // Initialize animations
    function initAnimations() {
        // Add fade-in animation to elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .research-card, .skills-category, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(40, 202, 66, 0.9)' : 'rgba(255, 95, 87, 0.9)'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid ${type === 'success' ? '#28ca42' : '#ff5f57'};
            box-shadow: var(--box-glow) ${type === 'success' ? 'rgba(40, 202, 66, 0.5)' : 'rgba(255, 95, 87, 0.5)'};
            animation: slideInRight 0.3s ease;
            font-family: 'VT323', monospace;
            font-size: 1.1rem;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
        }
    `;
    document.head.appendChild(notificationStyles);

    // Parallax effect for floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // Add random glitch effect occasionally
    setInterval(() => {
        if (Math.random() < 0.02) { // 2% chance every interval
            document.body.style.transform = 'translateX(2px)';
            setTimeout(() => {
                document.body.style.transform = 'translateX(-2px)';
                setTimeout(() => {
                    document.body.style.transform = 'translateX(0)';
                }, 50);
            }, 50);
        }
    }, 5000);

    // Add interactive cursor effects
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.3) { // 30% chance to create cursor effect
            const cursorGlow = document.createElement('div');
            cursorGlow.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 10}px;
                top: ${e.clientY - 10}px;
                opacity: 0.7;
                animation: fadeOut 1s forwards;
            `;
            
            document.body.appendChild(cursorGlow);
            
            setTimeout(() => {
                cursorGlow.remove();
            }, 1000);
        }
    });

    // Add CSS for cursor glow animation
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(2); }
        }
        
        .theme-cyber {
            /* Cyber theme styles would go here */
        }
    `;
    document.head.appendChild(cursorStyles);

    // Add particle effect on click
    document.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
    });

    function createParticles(x, y) {
        const colors = ['var(--neon-pink)', 'var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-blue)'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${x}px;
                top: ${y}px;
                opacity: 0.8;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            let posX = x;
            let posY = y;
            let opacity = 0.8;
            
            function animate() {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            }
            
            animate();
        }
    }
});

// ===== PARTICLE EFFECTS ON CLICK =====
document.addEventListener('click', function(e) {
    createParticles(e.clientX, e.clientY);
});

function createParticles(x, y) {
    const particleCount = 12;
    const colors = [
        'var(--neon-pink)',
        'var(--neon-cyan)',
        'var(--neon-purple)',
        'var(--neon-blue)',
        'var(--sunset-orange)',
        'var(--sunset-yellow)'
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 4px and 8px
        const size = Math.random() * 4 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        
        // Random movement direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Position at click location
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

// ===== MOUSE TRAIL EFFECT =====
let mouseX = 0;
let mouseY = 0;
let trailInterval;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createMouseTrail() {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    
    // Random size between 6px and 12px
    const size = Math.random() * 6 + 6;
    trail.style.width = `${size}px`;
    trail.style.height = `${size}px`;
    
    // Random color with neon glow
    const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-purple)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    trail.style.background = color;
    trail.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
    
    // Position at current mouse position
    trail.style.left = `${mouseX - size / 2}px`;
    trail.style.top = `${mouseY - size / 2}px`;
    
    document.body.appendChild(trail);
    
    // Remove trail after animation completes
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 800);
}

// Start mouse trail effect
function startMouseTrail() {
    trailInterval = setInterval(createMouseTrail, 50); // Create trail every 50ms
}

// Stop mouse trail effect
function stopMouseTrail() {
    clearInterval(trailInterval);
}

// Initialize mouse trail when page loads
document.addEventListener('DOMContentLoaded', function() {
    startMouseTrail();
});

// Optional: Pause trail when mouse leaves window
document.addEventListener('mouseleave', stopMouseTrail);
document.addEventListener('mouseenter', startMouseTrail);

// ===== ENHANCED PARTICLE ANIMATIONS =====
// Update the existing particle CSS for better performance
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        border-radius: 50%;
        animation: particleFloat 1.5s ease-out forwards;
        will-change: transform, opacity;
    }

    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0) rotate(360deg);
        }
    }

    .mouse-trail {
        position: fixed;
        pointer-events: none;
        z-index: 9997;
        border-radius: 50%;
        animation: trailFade 0.8s ease-out forwards;
        will-change: transform, opacity;
    }

    @keyframes trailFade {
        0% {
            opacity: 0.6;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle mouse trail for better performance
let lastTrailTime = 0;
const trailThrottle = 30; // milliseconds

function throttledMouseTrail() {
    const now = Date.now();
    if (now - lastTrailTime >= trailThrottle) {
        createMouseTrail();
        lastTrailTime = now;
    }
}

// Update the trail creation to use throttled version
function startOptimizedMouseTrail() {
    trailInterval = setInterval(throttledMouseTrail, trailThrottle);
}

// Replace the original start function with optimized version
document.removeEventListener('DOMContentLoaded', startMouseTrail);
document.addEventListener('DOMContentLoaded', startOptimizedMouseTrail);

// ===== COLOR PALETTE INTEGRATION =====
// Ensure particles use current color palette
function updateParticleColors() {
    // This will automatically use CSS variables from the current palette
    console.log('Particle colors updated to current palette');
}

// Listen for palette changes (if you have palette switching functionality)
document.addEventListener('paletteChange', updateParticleColors);



// Initialize toggle button
document.addEventListener('DOMContentLoaded', addEffectsToggle);

// ===== SKILL PROGRESS BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    console.log('Animating skill bars:', skillBars.length); // Debug
    
    skillBars.forEach((bar, index) => {
        const percentage = bar.getAttribute('data-skill');
        console.log(`Bar ${index}: ${percentage}%`); // Debug
        
        // Reset to 0 first
        bar.style.width = '0%';
        
        // Animate with staggered delay
        setTimeout(() => {
            bar.style.width = `${percentage}%`;
        }, index * 100); // Stagger animation
    });
}

// ===== INTERSECTION OBSERVER =====
function setupSkillBarObserver() {
    const skillsSection = document.querySelector('.skills-section');
    console.log('Skills section found:', skillsSection); // Debug
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('Intersection observed:', entry.isIntersecting); // Debug
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(skillsSection);
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - setting up skill bars'); // Debug
    setupSkillBarObserver();
});

// ===== MANUAL TRIGGER (for testing) =====
// You can call this in browser console to test: window.animateSkillBars()
window.animateSkillBars = animateSkillBars;