function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (!navbar || !navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) dropdown.classList.add('active');
        });
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) dropdown.classList.remove('active');
        });

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); 
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    navMenu.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link:not(.dropdown-toggle)') || e.target.matches('.dropdown-item')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.classList.toggle('scrolled', scrollTop > 50);
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
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


document.addEventListener('DOMContentLoaded', () => {
    console.log('IEEE SB CEK Website Initializing...');

    initNavbar();
    initScrollFeatures();
    initInteractiveElements();
    initContactForm();

    console.log('IEEE SB CEK Website initialized successfully!');
});