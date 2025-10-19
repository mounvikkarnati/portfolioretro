// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    const vaporNav = document.querySelector('.vapor-nav');

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');

    // Terminal animation
    const terminalCursor = document.querySelector('.terminal-cursor');

    // Initialize functions
    initMenuToggle();
    initSkillBars();
    initTerminal();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initNavHighlighting();
    initProjectHover();

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

    
    // Update initScrollAnimations function
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150); // 150ms delay between each card
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-card').forEach(el => {
        observer.observe(el);
    });
}

    // Navigation highlighting based on scroll position
    function initNavHighlighting() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
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
    trailInterval = setInterval(createMouseTrail, 50);
}

// Stop mouse trail effect
function stopMouseTrail() {
    clearInterval(trailInterval);
}

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

// Initialize mouse trail when page loads
document.addEventListener('DOMContentLoaded', function() {
    startMouseTrail();
});

// Optional: Pause trail when mouse leaves window
document.addEventListener('mouseleave', stopMouseTrail);
document.addEventListener('mouseenter', startMouseTrail);
});
// Add scroll to top for logo
document.getElementById('logoHome').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add this to enhance project hover interactions
function initProjectHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.style.transform = 'scale(1)';
        });
    });
}

;