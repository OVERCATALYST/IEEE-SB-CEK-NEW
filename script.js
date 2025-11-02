function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const body = document.body;

    if (!navbar) return;

    // Create overlay for mobile menu
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });

        // Close menu when clicking a non-dropdown link
        const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        });
    }

    // Dropdown handling
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            // Mobile: click to toggle
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });

            // Desktop: hover to show
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    dropdown.classList.add('active');
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }, 250);
    });

    // Navbar scroll behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        navbar.classList.toggle('scrolled', scrollTop > 50);
        
        // Hide/show navbar on scroll (only on desktop when menu is closed)
        if (window.innerWidth > 768 || !navMenu.classList.contains('active')) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
}

function initScrollFeatures() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
}

function initInteractiveElements() {
    // Add any additional interactive features here
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        formStatus.innerHTML = 'Sending...';
        formStatus.style.color = 'var(--text-light)';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                formStatus.innerHTML = 'Message sent successfully!';
                formStatus.style.color = 'green'; 
                form.reset();
            } else {
                console.error('Submission error:', result);
                formStatus.innerHTML = result.message || 'An error occurred. Please try again.';
                formStatus.style.color = 'red'; 
            }
        } catch (error) {
            console.error('Fetch error:', error);
            formStatus.innerHTML = 'A network error occurred. Please check your connection.';
            formStatus.style.color = 'red';
        }

        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 5000);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('IEEE SB CEK Website Initializing...');

    initNavbar();
    initScrollFeatures();
    initInteractiveElements();
    initContactForm();

    console.log('IEEE SB CEK Website initialized successfully!');
});

/* === MODAL LOGIC FOR AITHON 3.0 === */
document.addEventListener('DOMContentLoaded', () => {
    const aithonModal = document.getElementById('aithonModal');
    const aithonCard = document.getElementById('aithonEventCard');
    const closeModalBtn = aithonModal ? aithonModal.querySelector('.modal-close') : null;

    function openModal() {
       if (aithonModal) aithonModal.classList.add('active');
    }

    function closeModal() {
        if (aithonModal) aithonModal.classList.remove('active');
    }

    if (aithonCard) {
        aithonCard.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target == aithonModal) {
            closeModal();
        }
    });
});