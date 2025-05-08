document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 811) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize EmailJS
    emailjs.init("rpDxofHS7MQi1p8-w"); // Replace with your EmailJS public key

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

        // Send the email using EmailJS
        emailjs.sendForm('service_33yenjm', 'template_jkh9wdq', this)
            .then(() => {
                // Show success message
                submitButton.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
                submitButton.style.backgroundColor = '#64ffda';
                submitButton.style.color = '#0a192f';
                
                // Reset form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                    submitButton.style.backgroundColor = '';
                    submitButton.style.color = '';
                }, 3000);
            })
            .catch((error) => {
                // Show error message
                submitButton.innerHTML = '<span>Failed to Send</span> <i class="fas fa-exclamation-circle"></i>';
                submitButton.style.backgroundColor = '#ff6b6b';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                    submitButton.style.backgroundColor = '';
                }, 3000);
                
                console.error('EmailJS error:', error);
            });
    });
}); 