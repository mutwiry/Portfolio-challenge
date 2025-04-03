document.addEventListener("DOMContentLoaded", function () {
    // --- Contact Form Validation ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status'); // Get the status paragraph

    if (form) { // Check if the form exists on the page
        form.addEventListener('submit', function(event) {
            // Basic validation: Check if fields are empty
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                event.preventDefault(); // Stop form submission
                setStatus('Please fill out all fields.', 'error');
                return; // Exit the function
            }

            // Basic email format check (very simple)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                event.preventDefault(); // Stop form submission
                setStatus('Please enter a valid email address.', 'error');
                return; // Exit the function
            }

            // If validation passes, you might want to show a temporary "Sending..." message
            // Formspree will handle the actual submission and redirection/success message
            // setStatus('Sending...', 'sending'); // Optional: Indicate sending

            // Note: We are NOT preventing default submission here if validation passes,
            // allowing Formspree to handle it.
        });
    }

    // Helper function to display status messages
    function setStatus(message, type) {
        if (!formStatus) return; // Exit if status element doesn't exist
        formStatus.textContent = message;
        formStatus.className = ''; // Clear previous classes
        if (type === 'error') {
            formStatus.classList.add('status-error'); // Add error styling (define .status-error in CSS)
        } else if (type === 'success') {
            formStatus.classList.add('status-success'); // Add success styling (define .status-success in CSS)
        } else {
             formStatus.classList.add('status-sending'); // Add sending styling (define .status-sending in CSS)
        }
         // Optional: Clear message after some time
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = '';
        }, 5000); // Clear after 5 seconds
    }

    // --- Add CSS classes for status messages (add these to style.css) ---
    /*
    .status-error { color: red; }
    .status-success { color: green; }
    .status-sending { color: blue; }
    */
   


}); // End of DOMContentLoaded

// --- Animation on Scroll ---
// Example: Fade in elements when they come into view
const observers = document.querySelectorAll('.animate-fade');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

observers.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// --- Dark Mode Toggle ---
const modeCheckbox = document.getElementById('mode-checkbox');
const icon = document.getElementById('mode-icon');
const modeText = document.getElementById('mode-text');
const body = document.body;

function applyMode(isLight) {
    body.classList.toggle('dark-mode', !isLight);
    icon.textContent = isLight ? '🌞' : '🌙';  
    modeText.textContent = isLight ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// On toggle
modeCheckbox.addEventListener('change', () => {
    applyMode(modeCheckbox.checked);
});

// On page load
const savedTheme = localStorage.getItem('theme');
let isInitiallyLight = savedTheme ? (savedTheme === 'light') : false;
modeCheckbox.checked = isInitiallyLight;
applyMode(isInitiallyLight);
    



