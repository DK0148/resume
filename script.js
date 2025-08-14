// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const contentPanels = document.querySelectorAll('.content-panel');

function showSection(sectionName) {
    // Remove active class from all nav items
    navItems.forEach(item => item.classList.remove('active'));
    
    // Hide all content panels
    contentPanels.forEach(panel => panel.classList.add('hidden'));
    
    // Add active class to clicked nav item
    const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Show selected content panel
    const activePanel = document.getElementById(`${sectionName}-content`);
    if (activePanel) {
        activePanel.classList.remove('hidden');
        
        // Animate skill bars if skills section is shown
        if (sectionName === 'skills') {
            animateSkillBars();
        }
    }
}

// Add click event listeners to navigation items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionName = item.getAttribute('data-section');
        showSection(sectionName);
    });
});

// Animate skill bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 100);
    });
}

// Contact form functionality
function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate sending message
    alert('Message sent successfully! (This is just a demo)');
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-open');
}

// Improved typing animation effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Particle background effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(124, 58, 237, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: float 6s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with experience section visible
    showSection('experience');
    
    // Add smooth scroll behavior
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
    
    // Store original text and initialize typing animation ONCE
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML; // Use innerHTML to preserve the span
        // Clear the content first to avoid duplication
        heroTitle.innerHTML = '';
        // Start typing animation after a short delay
        setTimeout(() => {
            // For the typing effect, we'll type the plain text but preserve the gradient span
            const plainText = "I'm Dhanushka.";
            typeWriter(heroTitle, plainText, 100);
            // After typing is complete, restore the gradient styling
            setTimeout(() => {
                heroTitle.innerHTML = originalText;
            }, plainText.length * 100 + 500);
        }, 500);
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.experience-item, .project-card, .skill-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Remove the duplicate window load event listener that was causing the issue
// The typing animation should only run once on DOM content loaded

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Create particles periodically
setInterval(createParticle, 3000);