document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const topicLinks = document.querySelectorAll('[data-topic]');
  const cards = document.querySelectorAll('.post-card');
  const emptyState = document.querySelector('#empty-state');
  topicLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const selected = link.dataset.topic;
    let visibleCount = 0;
    topicLinks.forEach(item => item.classList.toggle('selected', item === link));
    cards.forEach(card => {
      const visible = selected === 'All' || card.dataset.category.toLowerCase().includes(selected.toLowerCase());
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (emptyState) emptyState.hidden = visibleCount > 0;
  }));

  const signupForm = document.querySelector('#signup-form');
  if (signupForm) signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = signupForm.querySelector('input[type="email"]');
    const message = document.querySelector('#signup-message');
    if (email && email.checkValidity() && message) {
      message.textContent = 'Thanks for stopping by. Newsletter signup is coming soon.';
      email.value = '';
    }
  });
});
