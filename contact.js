/**
 * ════════════════════════════════════════════════════════════════
 * Contact Form Handler — Client-Side Module
 * ════════════════════════════════════════════════════════════════
 * 
 * Handles:
 *   - Client-side validation (name, email, subject, message)
 *   - reCAPTCHA v3 token generation
 *   - API submission to /api/contact
 *   - Loading, success, and error UI states
 *   - Toast notifications
 *   - Button ripple effects
 *   - Rate limit error handling
 * 
 * This module is loaded after script.js and operates independently.
 * It preserves ALL existing UI classes and animations.
 * 
 * @author Divyanshu Kanojia
 */

(function () {
    'use strict';

    // ─── DOM References ───
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const toast = document.getElementById('contactToast');
    const toastError = document.getElementById('contactToastError');
    const toastClose = document.getElementById('toastClose');
    const toastCloseError = document.getElementById('toastCloseError');
    const errorDesc = document.getElementById('errorToastDesc');

    // Exit early if form doesn't exist on the page
    if (!form || !submitBtn) return;

    // ─── reCAPTCHA Site Key ───
    // Replace this with your actual reCAPTCHA v3 site key
    const RECAPTCHA_SITE_KEY = '6LfiIT4tAAAAANbkA_LbS2D2qOr2ph8ijHQBzfg6';

    // ─── API Endpoint ───
    const API_ENDPOINT = '/api/contact';

    // ─── Toast Notification System ───
    // (Recreated here to keep contact.js fully self-contained)

    /** Auto-hide timeout reference */
    let toastTimeout = null;
    let toastErrorTimeout = null;

    /**
     * Show a toast notification (success or error).
     * @param {'success'|'error'} type 
     */
    function showToast(type) {
        const target = type === 'success' ? toast : toastError;
        if (!target) return;
        const progress = target.querySelector('.toast-progress');

        // Clear any existing auto-hide timeout
        if (type === 'success' && toastTimeout) clearTimeout(toastTimeout);
        if (type === 'error' && toastErrorTimeout) clearTimeout(toastErrorTimeout);

        // Reset and show
        target.classList.add('active');
        if (progress) {
            progress.classList.remove('active');
            void progress.offsetHeight; // force reflow for animation restart
            progress.classList.add('active');
        }

        // Auto-hide after 5 seconds
        const timeout = setTimeout(() => hideToast(type), 5000);
        if (type === 'success') toastTimeout = timeout;
        else toastErrorTimeout = timeout;
    }

    /**
     * Hide a toast notification.
     * @param {'success'|'error'} type 
     */
    function hideToast(type) {
        const target = type === 'success' ? toast : toastError;
        if (!target) return;
        target.classList.remove('active');
    }

    // Toast close button listeners
    if (toastClose) toastClose.addEventListener('click', () => hideToast('success'));
    if (toastCloseError) toastCloseError.addEventListener('click', () => hideToast('error'));

    // ─── Button Ripple Effect ───
    submitBtn.addEventListener('click', function (e) {
        const rippleContainer = this.querySelector('.btn-ripple-container');
        if (!rippleContainer) return;
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });

    // ─── Input Sanitization (Client-Side) ───

    /**
     * Basic HTML entity encoding to prevent XSS in displayed values.
     * Full sanitization happens server-side.
     * @param {string} str 
     * @returns {string}
     */
    function sanitizeInput(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .trim();
    }

    // ─── Validation ───

    /**
     * Validate email address format.
     * @param {string} email 
     * @returns {boolean}
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }

    /**
     * Show an error toast with a custom message.
     * @param {string} msg 
     */
    function showError(msg) {
        if (errorDesc) errorDesc.textContent = msg;
        showToast('error');
    }

    // ─── reCAPTCHA Token Generation ───

    /**
     * Get a reCAPTCHA v3 token. Returns null if reCAPTCHA is not loaded
     * or not configured (graceful degradation).
     * @returns {Promise<string|null>}
     */
    async function getRecaptchaToken() {
        // Skip if reCAPTCHA is not loaded or site key is placeholder
        if (typeof grecaptcha === 'undefined' || RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_SITE_KEY') {
            console.warn('⚠️ reCAPTCHA not configured — skipping token generation');
            return null;
        }

        try {
            await new Promise((resolve) => grecaptcha.ready(resolve));
            return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' });
        } catch (err) {
            console.error('reCAPTCHA error:', err);
            return null;
        }
    }

    // ─── Form Submission Handler ───

    /** Prevent double submissions */
    let isSubmitting = false;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Guard against double submit
        if (isSubmitting) return;

        // ── Read Input Values ──
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // ── Client-Side Validation ──
        if (!name || !email || !message) {
            showError('Please fill in all required fields.');
            return;
        }
        if (name.length < 2) {
            showError('Name must be at least 2 characters.');
            return;
        }
        if (name.length > 100) {
            showError('Name must be 100 characters or fewer.');
            return;
        }
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        if (subject.length > 200) {
            showError('Subject must be 200 characters or fewer.');
            return;
        }
        if (message.length < 10) {
            showError('Message must be at least 10 characters.');
            return;
        }
        if (message.length > 5000) {
            showError('Message must be 5000 characters or fewer.');
            return;
        }

        // ── Set Loading State ──
        isSubmitting = true;
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.classList.remove('is-success');

        try {
            // ── Get reCAPTCHA Token ──
            const recaptchaToken = await getRecaptchaToken();

            // ── Send to API ──
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: sanitizeInput(name),
                    email: email.trim().toLowerCase(),
                    subject: sanitizeInput(subject),
                    message: sanitizeInput(message),
                    recaptchaToken: recaptchaToken,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to send message.');
            }

            // ── Success State ──
            submitBtn.classList.remove('is-loading');
            submitBtn.classList.add('is-success');
            showToast('success');
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.classList.remove('is-success');
            }, 3000);

        } catch (err) {
            console.error('Contact form error:', err);
            submitBtn.classList.remove('is-loading');

            // Show user-friendly error message
            const errorMessage = err.message || 'Failed to send message. Please try again or email me directly.';
            showError(errorMessage);

        } finally {
            // Re-enable submission
            isSubmitting = false;
            submitBtn.disabled = false;
        }
    });

})();
