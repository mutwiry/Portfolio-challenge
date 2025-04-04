document.addEventListener("DOMContentLoaded", function () {
    // --- Cache DOM Elements ---
    // It's good practice to get frequently used elements once
    const body = document.body;
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navList = document.getElementById('main-nav-list');
    const modeCheckbox = document.getElementById('mode-checkbox');
    const icon = document.getElementById('mode-icon');
    const modeText = document.getElementById('mode-text');
    const animatedElements = document.querySelectorAll('.animate-fade'); // For scroll animation

    // --- Helper Function: Display Status Messages (for Contact Form) ---
    function setStatus(message, type) {
        if (!formStatus) {
            console.warn("Form status element not found.");
            return; // Exit if status element doesn't exist
        }
        formStatus.textContent = message;
        formStatus.className = ''; // Clear previous classes

        // Add appropriate class based on type
        if (type === 'error') {
            formStatus.classList.add('status-error');
        } else if (type === 'success') {
            formStatus.classList.add('status-success');
        } else if (type === 'sending') {
            formStatus.classList.add('status-sending');
        } else {
            // Default/info styling if needed
        }

        // Optional: Clear message after some time
        setTimeout(() => {
            if (formStatus) { // Check again in case it was removed
                 formStatus.textContent = '';
                 formStatus.className = '';
            }
        }, 5000); // Clear after 5 seconds
    }

    // --- Helper Function: Apply Dark/Light Mode ---
    function applyMode(isLight) {
        // Toggle dark mode class on the body
        body.classList.toggle('dark-mode', !isLight); // Add class if NOT light (i.e., if dark)

        // Update icon and text if elements exist
        if (icon) {
            icon.textContent = isLight ? '🌞' : '🌙';
        }
        if (modeText) {
            modeText.textContent = isLight ? 'Light Mode' : 'Dark Mode';
        }

        // Save preference to localStorage
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }


    // --- 1. Contact Form Validation Logic ---
    if (form) {
        form.addEventListener('submit', function(event) {
            // Get current values inside the submit handler
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Basic validation: Check if fields are empty
            if (!name || !email || !message) {
                event.preventDefault(); // Stop form submission
                setStatus('Please fill out all fields.', 'error');
                return; // Exit the handler
            }

            // Basic email format check
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                event.preventDefault(); // Stop form submission
                setStatus('Please enter a valid email address.', 'error');
                return; // Exit the handler
            }

            // Optional: Indicate sending state (Formspree handles the actual success/error after submission)
            // setStatus('Sending...', 'sending');

            // If validation passes, allow default form submission (to Formspree)
        });
    } else {
        // console.log("Contact form not found on this page."); // Optional logging
    }


    // --- 2. Responsive Navigation (Hamburger Menu) Logic ---
    if (hamburgerBtn && navList) {
        // Toggle menu on hamburger click
        hamburgerBtn.addEventListener('click', function() {
            navList.classList.toggle('nav-list--open');
            const isExpanded = navList.classList.contains('nav-list--open');
            this.setAttribute('aria-expanded', isExpanded); // 'this' refers to hamburgerBtn
        });

        // Close menu if a navigation link is clicked
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('nav-list--open')) {
                    navList.classList.remove('nav-list--open');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close menu if clicked outside of it
        document.addEventListener('click', function(event) {
            // Check if the click target is NOT the nav list or any of its children,
            // AND also NOT the hamburger button or any of its children
            if (!navList.contains(event.target) && !hamburgerBtn.contains(event.target) && navList.classList.contains('nav-list--open')) {
                navList.classList.remove('nav-list--open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });

    } else {
        console.warn("Hamburger button or navigation list element not found. Responsive navigation disabled.");
    }


    // --- 3. Dark Mode Toggle Logic ---
    if (modeCheckbox) {
        // Set initial state based on localStorage or default (Dark)
        const savedTheme = localStorage.getItem('theme');
        // Default to DARK if no theme saved or if saved theme is 'dark'
        let isInitiallyLight = savedTheme === 'light';
        modeCheckbox.checked = isInitiallyLight;
        applyMode(isInitiallyLight); // Apply the determined mode on load

        // Add listener for changes
        modeCheckbox.addEventListener('change', () => {
            applyMode(modeCheckbox.checked);
        });

    } else {
        // Fallback if toggle checkbox isn't present (e.g., apply theme anyway)
        const savedTheme = localStorage.getItem('theme');
        const isInitiallyDark = !savedTheme || savedTheme === 'dark';
        body.classList.toggle('dark-mode', isInitiallyDark);
        console.warn("Dark mode toggle checkbox not found. Applying theme based on localStorage or default (dark).");
    }


    // --- 4. Animation on Scroll Logic ---
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% visible

        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused'; // Start paused
            observer.observe(el);
        });
    } else {
        // console.log("No elements found for scroll animation."); // Optional logging
    }

}); // End of DOMContentLoaded