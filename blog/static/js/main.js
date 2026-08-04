document.addEventListener('DOMContentLoaded', () => {

    // Auto-dismiss Django message alerts after 5 seconds, and on manual close
    const dismissAlert = (alert) => {
        alert.classList.add('is-hiding');
        setTimeout(() => alert.remove(), 300);
    };

    document.querySelectorAll('.js-alert').forEach((alert) => {
        const timer = setTimeout(() => dismissAlert(alert), 5000);

        const closeBtn = alert.querySelector('.js-alert-dismiss');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearTimeout(timer);
                dismissAlert(alert);
            });
        }
    });

    // Confirmation before deleting a post
    document.querySelectorAll('.js-confirm-delete').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const confirmed = window.confirm('Are you sure you want to delete this post? This cannot be undone.');
            if (!confirmed) {
                event.preventDefault();
            }
        });
    });

    // Responsive mobile nav toggle
    const navToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('mobile-nav-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navMenu.classList.toggle('hidden', !isOpen);
            iconOpen.classList.toggle('hidden', isOpen);
            iconClose.classList.toggle('hidden', !isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

});
